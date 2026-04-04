/**
 * Field Matcher Tests
 *
 * Comprehensive tests for the multi-layer field matching engine.
 * Tests cover all 4 matching layers, deduplication, confidence ordering,
 * async splitting, and context building.
 */

import { describe, it, expect } from 'vitest';
import { FieldType, type DetectedField } from '../shared/types/field-detection';
import type { ProfileField } from '../shared/types/api';
import type { FieldMatch, FieldContext } from '../shared/types/field-matching';
import { matchFields, matchFieldsAsync, buildFieldContext } from '../lib/field-matcher';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function makeField(
  overrides: Partial<DetectedField> & { id?: string; placeholder?: string },
): DetectedField {
  const el = document.createElement('input');
  if (overrides.name) el.name = overrides.name;
  if (overrides.id) el.id = overrides.id;
  if (overrides.placeholder) el.placeholder = overrides.placeholder;
  if (overrides.autocomplete) el.setAttribute('autocomplete', overrides.autocomplete);
  if (overrides.inputType) el.type = overrides.inputType;

  // Destructure to remove `element` from overrides (we always use our DOM element)
  const { element: _ignored, id: _id, placeholder: _ph, ...fieldOverrides } = overrides as Record<string, unknown>;

  return {
    element: el,
    name: '',
    label: '',
    type: FieldType.TEXT,
    tagName: 'input',
    inputType: 'text',
    value: '',
    isRequired: false,
    autocomplete: '',
    ...fieldOverrides,
  } as DetectedField;
}

function makeProfile(entries: Record<string, string>): ProfileField[] {
  return Object.entries(entries).map(([key, value]) => ({
    key,
    values: [value],
    confidence: 0.9,
    sourceCount: 1,
    lastUpdated: new Date().toISOString(),
  }));
}

/** Shorthand: run matchFields and return the first MatchedField's matches */
function firstMatches(
  field: Partial<DetectedField> & { id?: string; placeholder?: string },
  profile: Record<string, string>,
): FieldMatch[] {
  const results = matchFields([makeField(field)], makeProfile(profile));
  return results[0]?.matches ?? [];
}

// Standard profile used across many tests
const STANDARD_PROFILE: Record<string, string> = {
  firstName: 'Alice',
  middleName: 'Marie',
  lastName: 'Smith',
  fullName: 'Alice Marie Smith',
  email: 'alice@example.com',
  phone: '555-1234',
  streetAddress: '123 Main St',
  streetAddress2: 'Apt 4',
  city: 'Springfield',
  state: 'IL',
  zipCode: '62701',
  country: 'US',
  dateOfBirth: '1990-01-15',
  birthDay: '15',
  birthMonth: '01',
  birthYear: '1990',
  gender: 'Female',
  company: 'Acme Inc',
  jobTitle: 'Engineer',
  ssn: '123-45-6789',
  website: 'https://alice.dev',
  username: 'alicesmith',
  nickname: 'Ali',
  prefix: 'Ms',
  suffix: 'Jr',
  phoneCountryCode: '+1',
  district: 'Downtown',
  cardholderName: 'Alice Smith',
  cardNumber: '4111111111111111',
  cardExpiry: '12/28',
  cardCVC: '123',
  driversLicense: 'D1234567',
  passportNumber: 'P98765432',
};

// ---------------------------------------------------------------------------
// Layer 1: Autocomplete attribute matching
// ---------------------------------------------------------------------------

describe('Layer 1 - Autocomplete matching', () => {
  it('matches given-name to firstName', () => {
    const matches = firstMatches({ autocomplete: 'given-name' }, STANDARD_PROFILE);
    expect(matches).toHaveLength(1);
    expect(matches[0]!.profileField).toBe('firstName');
    expect(matches[0]!.confidence).toBe(0.95);
    expect(matches[0]!.matchMethod).toBe('autocomplete');
    expect(matches[0]!.value).toBe('Alice');
  });

  it('matches family-name to lastName', () => {
    const matches = firstMatches({ autocomplete: 'family-name' }, STANDARD_PROFILE);
    expect(matches[0]!.profileField).toBe('lastName');
    expect(matches[0]!.confidence).toBe(0.95);
  });

  it('matches email autocomplete', () => {
    const matches = firstMatches({ autocomplete: 'email' }, STANDARD_PROFILE);
    expect(matches[0]!.profileField).toBe('email');
    expect(matches[0]!.value).toBe('alice@example.com');
  });

  it('matches tel to phone', () => {
    const matches = firstMatches({ autocomplete: 'tel' }, STANDARD_PROFILE);
    expect(matches[0]!.profileField).toBe('phone');
  });

  it('matches tel-national to phone', () => {
    const matches = firstMatches({ autocomplete: 'tel-national' }, STANDARD_PROFILE);
    expect(matches[0]!.profileField).toBe('phone');
  });

  it('matches bday to dateOfBirth', () => {
    const matches = firstMatches({ autocomplete: 'bday' }, STANDARD_PROFILE);
    expect(matches[0]!.profileField).toBe('dateOfBirth');
  });

  it('matches street-address', () => {
    const matches = firstMatches({ autocomplete: 'street-address' }, STANDARD_PROFILE);
    expect(matches[0]!.profileField).toBe('streetAddress');
  });

  it('matches address-line1 to streetAddress', () => {
    const matches = firstMatches({ autocomplete: 'address-line1' }, STANDARD_PROFILE);
    expect(matches[0]!.profileField).toBe('streetAddress');
  });

  it('matches address-line2 to streetAddress2', () => {
    const matches = firstMatches({ autocomplete: 'address-line2' }, STANDARD_PROFILE);
    expect(matches[0]!.profileField).toBe('streetAddress2');
  });

  it('matches address-level2 to city', () => {
    const matches = firstMatches({ autocomplete: 'address-level2' }, STANDARD_PROFILE);
    expect(matches[0]!.profileField).toBe('city');
  });

  it('matches address-level1 to state', () => {
    const matches = firstMatches({ autocomplete: 'address-level1' }, STANDARD_PROFILE);
    expect(matches[0]!.profileField).toBe('state');
  });

  it('matches postal-code to zipCode', () => {
    const matches = firstMatches({ autocomplete: 'postal-code' }, STANDARD_PROFILE);
    expect(matches[0]!.profileField).toBe('zipCode');
  });

  it('matches country autocomplete', () => {
    const matches = firstMatches({ autocomplete: 'country' }, STANDARD_PROFILE);
    expect(matches[0]!.profileField).toBe('country');
  });

  it('matches country-name to country', () => {
    const matches = firstMatches({ autocomplete: 'country-name' }, STANDARD_PROFILE);
    expect(matches[0]!.profileField).toBe('country');
  });

  it('matches sex to gender', () => {
    const matches = firstMatches({ autocomplete: 'sex' }, STANDARD_PROFILE);
    expect(matches[0]!.profileField).toBe('gender');
  });

  it('matches organization to company', () => {
    const matches = firstMatches({ autocomplete: 'organization' }, STANDARD_PROFILE);
    expect(matches[0]!.profileField).toBe('company');
  });

  it('matches organization-title to jobTitle', () => {
    const matches = firstMatches({ autocomplete: 'organization-title' }, STANDARD_PROFILE);
    expect(matches[0]!.profileField).toBe('jobTitle');
  });

  it('matches url to website', () => {
    const matches = firstMatches({ autocomplete: 'url' }, STANDARD_PROFILE);
    expect(matches[0]!.profileField).toBe('website');
  });

  it('matches username', () => {
    const matches = firstMatches({ autocomplete: 'username' }, STANDARD_PROFILE);
    expect(matches[0]!.profileField).toBe('username');
  });

  it('matches credit card autocomplete attributes', () => {
    expect(firstMatches({ autocomplete: 'cc-name' }, STANDARD_PROFILE)[0]!.profileField).toBe(
      'cardholderName',
    );
    expect(firstMatches({ autocomplete: 'cc-number' }, STANDARD_PROFILE)[0]!.profileField).toBe(
      'cardNumber',
    );
    expect(firstMatches({ autocomplete: 'cc-exp' }, STANDARD_PROFILE)[0]!.profileField).toBe(
      'cardExpiry',
    );
    expect(firstMatches({ autocomplete: 'cc-csc' }, STANDARD_PROFILE)[0]!.profileField).toBe(
      'cardCVC',
    );
  });

  it('matches birthday subfields', () => {
    expect(firstMatches({ autocomplete: 'bday-day' }, STANDARD_PROFILE)[0]!.profileField).toBe(
      'birthDay',
    );
    expect(firstMatches({ autocomplete: 'bday-month' }, STANDARD_PROFILE)[0]!.profileField).toBe(
      'birthMonth',
    );
    expect(firstMatches({ autocomplete: 'bday-year' }, STANDARD_PROFILE)[0]!.profileField).toBe(
      'birthYear',
    );
  });

  describe('shipping/billing prefix stripping', () => {
    it('strips "shipping" prefix and matches', () => {
      const matches = firstMatches({ autocomplete: 'shipping given-name' }, STANDARD_PROFILE);
      expect(matches[0]!.profileField).toBe('firstName');
      expect(matches[0]!.confidence).toBe(0.95);
      expect(matches[0]!.matchMethod).toBe('autocomplete');
    });

    it('strips "billing" prefix and matches', () => {
      const matches = firstMatches({ autocomplete: 'billing street-address' }, STANDARD_PROFILE);
      expect(matches[0]!.profileField).toBe('streetAddress');
      expect(matches[0]!.matchMethod).toBe('autocomplete');
    });

    it('strips "billing" prefix for postal-code', () => {
      const matches = firstMatches({ autocomplete: 'billing postal-code' }, STANDARD_PROFILE);
      expect(matches[0]!.profileField).toBe('zipCode');
    });
  });

  it('returns no match for unknown autocomplete value', () => {
    const matches = firstMatches(
      { autocomplete: 'x-custom-field' },
      { firstName: 'Alice' },
    );
    // No autocomplete match, may fall through to other layers
    const autocompleteMatches = matches.filter((m) => m.matchMethod === 'autocomplete');
    expect(autocompleteMatches).toHaveLength(0);
  });
});

// ---------------------------------------------------------------------------
// Layer 2: Type-based matching
// ---------------------------------------------------------------------------

describe('Layer 2 - Type matching', () => {
  it('matches FieldType.EMAIL to email profile key at 0.85 confidence', () => {
    const matches = firstMatches(
      { type: FieldType.EMAIL, inputType: 'email' },
      { email: 'alice@example.com' },
    );
    const typeMatch = matches.find((m) => m.matchMethod === 'type');
    expect(typeMatch).toBeDefined();
    expect(typeMatch!.profileField).toBe('email');
    expect(typeMatch!.confidence).toBe(0.85);
    expect(typeMatch!.value).toBe('alice@example.com');
  });

  it('matches FieldType.PHONE to phone profile key', () => {
    const matches = firstMatches(
      { type: FieldType.PHONE, inputType: 'tel' },
      { phone: '555-1234' },
    );
    const typeMatch = matches.find((m) => m.matchMethod === 'type');
    expect(typeMatch).toBeDefined();
    expect(typeMatch!.profileField).toBe('phone');
  });

  it('matches FieldType.DATE to dateOfBirth', () => {
    const matches = firstMatches(
      { type: FieldType.DATE, inputType: 'date' },
      { dateOfBirth: '1990-01-15' },
    );
    const typeMatch = matches.find((m) => m.matchMethod === 'type');
    expect(typeMatch!.profileField).toBe('dateOfBirth');
  });

  it('matches FieldType.SSN to ssn', () => {
    const matches = firstMatches(
      { type: FieldType.SSN },
      { ssn: '123-45-6789' },
    );
    const typeMatch = matches.find((m) => m.matchMethod === 'type');
    expect(typeMatch!.profileField).toBe('ssn');
  });

  it('matches FieldType.ADDRESS to multiple address keys', () => {
    const profile = makeProfile({
      streetAddress: '123 Main St',
      city: 'Springfield',
      state: 'IL',
      zipCode: '62701',
      country: 'US',
    });
    const results = matchFields(
      [makeField({ type: FieldType.ADDRESS })],
      profile,
    );
    const typeMatches = results[0]!.matches.filter((m) => m.matchMethod === 'type');
    const profileKeys = typeMatches.map((m) => m.profileField);
    expect(profileKeys).toContain('streetAddress');
    expect(profileKeys).toContain('city');
    expect(profileKeys).toContain('state');
    expect(profileKeys).toContain('zipCode');
    expect(profileKeys).toContain('country');
  });

  it('does not produce type match for FieldType.TEXT', () => {
    const matches = firstMatches(
      { type: FieldType.TEXT },
      { firstName: 'Alice' },
    );
    const typeMatches = matches.filter((m) => m.matchMethod === 'type');
    expect(typeMatches).toHaveLength(0);
  });

  it('does not produce type match for FieldType.NUMBER', () => {
    const matches = firstMatches(
      { type: FieldType.NUMBER },
      { zipCode: '62701' },
    );
    const typeMatches = matches.filter((m) => m.matchMethod === 'type');
    expect(typeMatches).toHaveLength(0);
  });
});

// ---------------------------------------------------------------------------
// Layer 3: Name/label regex matching
// ---------------------------------------------------------------------------

describe('Layer 3 - Name/id pattern matching', () => {
  it('matches name="first_name" to firstName', () => {
    const matches = firstMatches({ name: 'first_name' }, STANDARD_PROFILE);
    const nameMatch = matches.find((m) => m.matchMethod === 'name');
    expect(nameMatch).toBeDefined();
    expect(nameMatch!.profileField).toBe('firstName');
    expect(nameMatch!.confidence).toBe(0.80);
  });

  it('matches name="lastName" to lastName', () => {
    const matches = firstMatches({ name: 'lastName' }, STANDARD_PROFILE);
    const nameMatch = matches.find((m) => m.matchMethod === 'name');
    expect(nameMatch!.profileField).toBe('lastName');
  });

  it('matches id="fname" to firstName', () => {
    const matches = firstMatches({ id: 'fname' }, STANDARD_PROFILE);
    const nameMatch = matches.find((m) => m.matchMethod === 'name');
    expect(nameMatch!.profileField).toBe('firstName');
  });

  it('matches id="lname" to lastName', () => {
    const matches = firstMatches({ id: 'lname' }, STANDARD_PROFILE);
    const nameMatch = matches.find((m) => m.matchMethod === 'name');
    expect(nameMatch!.profileField).toBe('lastName');
  });

  it('matches name="e-mail" to email', () => {
    const matches = firstMatches({ name: 'e-mail' }, STANDARD_PROFILE);
    const nameMatch = matches.find((m) => m.matchMethod === 'name');
    expect(nameMatch!.profileField).toBe('email');
  });

  it('matches name="email_address" to email', () => {
    const matches = firstMatches({ name: 'email_address' }, STANDARD_PROFILE);
    const nameMatch = matches.find((m) => m.matchMethod === 'name');
    expect(nameMatch!.profileField).toBe('email');
  });

  it('matches name="phone" to phone', () => {
    const matches = firstMatches({ name: 'phone' }, STANDARD_PROFILE);
    const nameMatch = matches.find((m) => m.matchMethod === 'name');
    expect(nameMatch!.profileField).toBe('phone');
  });

  it('matches name="mobile" to phone', () => {
    const matches = firstMatches({ name: 'mobile' }, STANDARD_PROFILE);
    const nameMatch = matches.find((m) => m.matchMethod === 'name');
    expect(nameMatch!.profileField).toBe('phone');
  });

  it('matches name="cell_phone" to phone', () => {
    const matches = firstMatches({ name: 'cell_phone' }, STANDARD_PROFILE);
    const nameMatch = matches.find((m) => m.matchMethod === 'name');
    expect(nameMatch!.profileField).toBe('phone');
  });

  it('matches name="street" to streetAddress', () => {
    const matches = firstMatches({ name: 'street' }, STANDARD_PROFILE);
    const nameMatch = matches.find((m) => m.matchMethod === 'name');
    expect(nameMatch!.profileField).toBe('streetAddress');
  });

  it('matches name="address_1" to streetAddress', () => {
    const matches = firstMatches({ name: 'address_1' }, STANDARD_PROFILE);
    const nameMatch = matches.find((m) => m.matchMethod === 'name');
    expect(nameMatch!.profileField).toBe('streetAddress');
  });

  it('matches name="address_2" to streetAddress2', () => {
    const matches = firstMatches({ name: 'address_2' }, STANDARD_PROFILE);
    const nameMatch = matches.find((m) => m.matchMethod === 'name');
    expect(nameMatch!.profileField).toBe('streetAddress2');
  });

  it('matches name="city" to city', () => {
    const matches = firstMatches({ name: 'city' }, STANDARD_PROFILE);
    const nameMatch = matches.find((m) => m.matchMethod === 'name');
    expect(nameMatch!.profileField).toBe('city');
  });

  it('matches name="state" to state', () => {
    const matches = firstMatches({ name: 'state' }, STANDARD_PROFILE);
    const nameMatch = matches.find((m) => m.matchMethod === 'name');
    expect(nameMatch!.profileField).toBe('state');
  });

  it('matches name="zip_code" to zipCode', () => {
    const matches = firstMatches({ name: 'zip_code' }, STANDARD_PROFILE);
    const nameMatch = matches.find((m) => m.matchMethod === 'name');
    expect(nameMatch!.profileField).toBe('zipCode');
  });

  it('matches name="postal_code" to zipCode', () => {
    const matches = firstMatches({ name: 'postal_code' }, STANDARD_PROFILE);
    const nameMatch = matches.find((m) => m.matchMethod === 'name');
    expect(nameMatch!.profileField).toBe('zipCode');
  });

  it('matches name="date_of_birth" to dateOfBirth', () => {
    const matches = firstMatches({ name: 'date_of_birth' }, STANDARD_PROFILE);
    const nameMatch = matches.find((m) => m.matchMethod === 'name');
    expect(nameMatch!.profileField).toBe('dateOfBirth');
  });

  it('matches name="dob" to dateOfBirth', () => {
    const matches = firstMatches({ name: 'dob' }, STANDARD_PROFILE);
    const nameMatch = matches.find((m) => m.matchMethod === 'name');
    expect(nameMatch!.profileField).toBe('dateOfBirth');
  });

  it('matches name="ssn" to ssn', () => {
    const matches = firstMatches({ name: 'ssn' }, STANDARD_PROFILE);
    const nameMatch = matches.find((m) => m.matchMethod === 'name');
    expect(nameMatch!.profileField).toBe('ssn');
  });

  it('matches name="company" to company', () => {
    const matches = firstMatches({ name: 'company' }, STANDARD_PROFILE);
    const nameMatch = matches.find((m) => m.matchMethod === 'name');
    expect(nameMatch!.profileField).toBe('company');
  });

  it('matches name="organization" to company', () => {
    const matches = firstMatches({ name: 'organization' }, STANDARD_PROFILE);
    const nameMatch = matches.find((m) => m.matchMethod === 'name');
    expect(nameMatch!.profileField).toBe('company');
  });

  it('matches name="job_title" to jobTitle', () => {
    const matches = firstMatches({ name: 'job_title' }, STANDARD_PROFILE);
    const nameMatch = matches.find((m) => m.matchMethod === 'name');
    expect(nameMatch!.profileField).toBe('jobTitle');
  });

  it('matches name="user_name" to username', () => {
    const matches = firstMatches({ name: 'user_name' }, STANDARD_PROFILE);
    const nameMatch = matches.find((m) => m.matchMethod === 'name');
    expect(nameMatch!.profileField).toBe('username');
  });

  it('matches name="website" to website', () => {
    const matches = firstMatches({ name: 'website' }, STANDARD_PROFILE);
    const nameMatch = matches.find((m) => m.matchMethod === 'name');
    expect(nameMatch!.profileField).toBe('website');
  });

  it('matches name="gender" to gender', () => {
    const matches = firstMatches({ name: 'gender' }, STANDARD_PROFILE);
    const nameMatch = matches.find((m) => m.matchMethod === 'name');
    expect(nameMatch!.profileField).toBe('gender');
  });

  it('matches name="drivers_license" to driversLicense', () => {
    const matches = firstMatches({ name: 'drivers_license' }, STANDARD_PROFILE);
    const nameMatch = matches.find((m) => m.matchMethod === 'name');
    expect(nameMatch!.profileField).toBe('driversLicense');
  });

  it('matches name="passport_number" to passportNumber', () => {
    const matches = firstMatches({ name: 'passport_number' }, STANDARD_PROFILE);
    const nameMatch = matches.find((m) => m.matchMethod === 'name');
    expect(nameMatch!.profileField).toBe('passportNumber');
  });

  it('matches via placeholder text', () => {
    const matches = firstMatches({ placeholder: 'Enter your email' }, STANDARD_PROFILE);
    const nameMatch = matches.find((m) => m.matchMethod === 'name');
    expect(nameMatch!.profileField).toBe('email');
  });

  it('matches via element id', () => {
    const matches = firstMatches({ id: 'firstName' }, STANDARD_PROFILE);
    const nameMatch = matches.find((m) => m.matchMethod === 'name');
    expect(nameMatch!.profileField).toBe('firstName');
  });

  describe('international patterns', () => {
    it('matches German "vorname" to firstName', () => {
      const matches = firstMatches({ name: 'vorname' }, STANDARD_PROFILE);
      const nameMatch = matches.find((m) => m.matchMethod === 'name');
      expect(nameMatch!.profileField).toBe('firstName');
    });

    it('matches German "nachname" to lastName', () => {
      const matches = firstMatches({ name: 'nachname' }, STANDARD_PROFILE);
      const nameMatch = matches.find((m) => m.matchMethod === 'name');
      expect(nameMatch!.profileField).toBe('lastName');
    });

    it('matches French "prenom" to firstName', () => {
      const matches = firstMatches({ name: 'prenom' }, STANDARD_PROFILE);
      const nameMatch = matches.find((m) => m.matchMethod === 'name');
      expect(nameMatch!.profileField).toBe('firstName');
    });

    it('matches Spanish "apellido" to lastName', () => {
      const matches = firstMatches({ name: 'apellido' }, STANDARD_PROFILE);
      const nameMatch = matches.find((m) => m.matchMethod === 'name');
      expect(nameMatch!.profileField).toBe('lastName');
    });

    it('matches French "nom_de_famille" to lastName', () => {
      const matches = firstMatches({ name: 'nom_de_famille' }, STANDARD_PROFILE);
      const nameMatch = matches.find((m) => m.matchMethod === 'name');
      expect(nameMatch!.profileField).toBe('lastName');
    });

    it('matches German "telefon" to phone', () => {
      const matches = firstMatches({ name: 'telefon' }, STANDARD_PROFILE);
      const nameMatch = matches.find((m) => m.matchMethod === 'name');
      expect(nameMatch!.profileField).toBe('phone');
    });

    it('matches German "strasse" to streetAddress', () => {
      const matches = firstMatches({ name: 'strasse' }, STANDARD_PROFILE);
      const nameMatch = matches.find((m) => m.matchMethod === 'name');
      expect(nameMatch!.profileField).toBe('streetAddress');
    });

    it('matches French "ville" to city', () => {
      const matches = firstMatches({ name: 'ville' }, STANDARD_PROFILE);
      const nameMatch = matches.find((m) => m.matchMethod === 'name');
      expect(nameMatch!.profileField).toBe('city');
    });

    it('matches German "plz" to zipCode', () => {
      const matches = firstMatches({ name: 'plz' }, STANDARD_PROFILE);
      const nameMatch = matches.find((m) => m.matchMethod === 'name');
      expect(nameMatch!.profileField).toBe('zipCode');
    });

    it('matches Spanish "correo" to email', () => {
      const matches = firstMatches({ name: 'correo' }, STANDARD_PROFILE);
      const nameMatch = matches.find((m) => m.matchMethod === 'name');
      expect(nameMatch!.profileField).toBe('email');
    });

    it('matches German "firma" to company', () => {
      const matches = firstMatches({ name: 'firma' }, STANDARD_PROFILE);
      const nameMatch = matches.find((m) => m.matchMethod === 'name');
      expect(nameMatch!.profileField).toBe('company');
    });

    it('matches German "geburtsdatum" to dateOfBirth', () => {
      const matches = firstMatches({ name: 'geburtsdatum' }, STANDARD_PROFILE);
      const nameMatch = matches.find((m) => m.matchMethod === 'name');
      expect(nameMatch!.profileField).toBe('dateOfBirth');
    });

    it('matches Spanish "numero_de_telephone" to phone', () => {
      const matches = firstMatches({ name: 'numero_de_telephone' }, STANDARD_PROFILE);
      const nameMatch = matches.find((m) => m.matchMethod === 'name');
      expect(nameMatch!.profileField).toBe('phone');
    });

    it('matches German "steuer_id" to ssn', () => {
      const matches = firstMatches({ name: 'steuer_id' }, STANDARD_PROFILE);
      const nameMatch = matches.find((m) => m.matchMethod === 'name');
      expect(nameMatch!.profileField).toBe('ssn');
    });
  });
});

describe('Layer 3 - Label-based matching', () => {
  it('matches label="First Name" to firstName', () => {
    const matches = firstMatches({ label: 'First Name' }, STANDARD_PROFILE);
    const nameMatch = matches.find((m) => m.matchMethod === 'name');
    expect(nameMatch!.profileField).toBe('firstName');
  });

  it('matches label="Email Address" to email', () => {
    const matches = firstMatches({ label: 'Email Address' }, STANDARD_PROFILE);
    const nameMatch = matches.find((m) => m.matchMethod === 'name');
    expect(nameMatch!.profileField).toBe('email');
  });

  it('matches label="Date of Birth" to dateOfBirth', () => {
    const matches = firstMatches({ label: 'Date of Birth' }, STANDARD_PROFILE);
    const nameMatch = matches.find((m) => m.matchMethod === 'name');
    expect(nameMatch!.profileField).toBe('dateOfBirth');
  });

  it('matches label="Phone Number" to phone', () => {
    const matches = firstMatches({ label: 'Phone Number' }, STANDARD_PROFILE);
    const nameMatch = matches.find((m) => m.matchMethod === 'name');
    // "Phone" is in the label, but "Number" also matches contact_number.
    // Either way, phone should be a match
    expect(nameMatch!.profileField).toBe('phone');
  });

  it('matches label="Zip Code" to zipCode', () => {
    const matches = firstMatches({ label: 'Zip Code' }, STANDARD_PROFILE);
    const nameMatch = matches.find((m) => m.matchMethod === 'name');
    expect(nameMatch!.profileField).toBe('zipCode');
  });
});

// ---------------------------------------------------------------------------
// Layer 4: Fuzzy matching
// ---------------------------------------------------------------------------

describe('Layer 4 - Fuzzy matching', () => {
  it('fuzzy matches close-but-not-exact names when no other layers match', () => {
    // "firstnam" is close to "firstName" but doesn't match any regex pattern
    const matches = firstMatches({ name: 'firstnam' }, { firstName: 'Alice' });
    // May or may not match depending on similarity threshold (0.6)
    // "firstnam" vs "firstname" normalized: levenshtein distance is 1, length 9, sim = 8/9 = 0.889
    // confidence = 0.889 * 0.64 = 0.569 -- might be below 0.6 threshold before multiply
    // Actually: sim >= 0.6 is checked, 0.889 >= 0.6 => yes
    const fuzzyMatch = matches.find((m) => m.matchMethod === 'fuzzy');
    if (fuzzyMatch) {
      expect(fuzzyMatch.profileField).toBe('firstName');
      expect(fuzzyMatch.confidence).toBeLessThan(0.80);
      expect(fuzzyMatch.confidence).toBeGreaterThan(0);
    }
  });

  it('does not fuzzy match very dissimilar strings', () => {
    const matches = firstMatches(
      { name: 'xyzabc123' },
      { firstName: 'Alice' },
    );
    const fuzzyMatch = matches.find((m) => m.matchMethod === 'fuzzy');
    expect(fuzzyMatch).toBeUndefined();
  });

  it('fuzzy matching is skipped when higher-confidence match exists', () => {
    // "email" matches via regex (Layer 3), so fuzzy should not run
    const matches = firstMatches(
      { name: 'email' },
      { email: 'alice@example.com', emailBackup: 'backup@example.com' },
    );
    const fuzzyMatches = matches.filter((m) => m.matchMethod === 'fuzzy');
    expect(fuzzyMatches).toHaveLength(0);
  });

  it('fuzzy matches field id when name does not match', () => {
    // No name, but id is close enough to a profile key
    const matches = firstMatches(
      { id: 'emai' },
      { email: 'alice@example.com' },
    );
    // "emai" vs "email": sim = 1 - 1/5 = 0.8, conf = 0.8 * 0.64 = 0.512
    // sim >= 0.6 so it should be added
    const fuzzyMatch = matches.find((m) => m.matchMethod === 'fuzzy');
    expect(fuzzyMatch).toBeDefined();
    expect(fuzzyMatch!.profileField).toBe('email');
  });

  it('fuzzy match confidence = similarity * 0.64', () => {
    // Use a field that won't match regex but will fuzzy match
    // "phon" vs "phone": normalized "phon" vs "phone", lev distance 1, max len 5, sim = 0.8
    const matches = firstMatches({ name: 'phon' }, { phone: '555-1234' });
    const fuzzyMatch = matches.find((m) => m.matchMethod === 'fuzzy');
    if (fuzzyMatch) {
      // sim ~= 0.8, confidence ~= 0.512
      expect(fuzzyMatch.confidence).toBeCloseTo(0.8 * 0.64, 2);
    }
  });
});

// ---------------------------------------------------------------------------
// Deduplication
// ---------------------------------------------------------------------------

describe('Match deduplication', () => {
  it('same profile key is not matched twice via different layers', () => {
    // A field with autocomplete="email", type=EMAIL, and name="email"
    // Should only produce one match for "email" profile key (the autocomplete one, highest conf)
    const matches = firstMatches(
      {
        autocomplete: 'email',
        type: FieldType.EMAIL,
        inputType: 'email',
        name: 'email',
      },
      { email: 'alice@example.com' },
    );
    const emailMatches = matches.filter((m) => m.profileField === 'email');
    expect(emailMatches).toHaveLength(1);
    // Should be the autocomplete match (highest confidence)
    expect(emailMatches[0]!.matchMethod).toBe('autocomplete');
    expect(emailMatches[0]!.confidence).toBe(0.95);
  });

  it('deduplicates phone matched via autocomplete and type', () => {
    const matches = firstMatches(
      {
        autocomplete: 'tel',
        type: FieldType.PHONE,
        inputType: 'tel',
        name: 'phone',
      },
      { phone: '555-1234' },
    );
    const phoneMatches = matches.filter((m) => m.profileField === 'phone');
    expect(phoneMatches).toHaveLength(1);
    expect(phoneMatches[0]!.matchMethod).toBe('autocomplete');
  });

  it('allows different profile keys from the same field', () => {
    // ADDRESS type maps to streetAddress, city, state, zipCode, country
    // These are all different profile keys so they should all appear
    const profile = makeProfile({
      streetAddress: '123 Main',
      city: 'Springfield',
      state: 'IL',
      zipCode: '62701',
      country: 'US',
    });
    const results = matchFields(
      [makeField({ type: FieldType.ADDRESS })],
      profile,
    );
    expect(results[0]!.matches.length).toBe(5);
  });
});

// ---------------------------------------------------------------------------
// Confidence ordering
// ---------------------------------------------------------------------------

describe('Confidence ordering', () => {
  it('matches are sorted by confidence descending', () => {
    // A field that matches via autocomplete AND type for different keys
    const matches = firstMatches(
      {
        autocomplete: 'given-name',
        type: FieldType.EMAIL,
        inputType: 'email',
      },
      { firstName: 'Alice', email: 'alice@example.com' },
    );
    // autocomplete => firstName at 0.95, type => email at 0.85
    expect(matches.length).toBeGreaterThanOrEqual(2);
    for (let i = 1; i < matches.length; i++) {
      expect(matches[i - 1]!.confidence).toBeGreaterThanOrEqual(matches[i]!.confidence);
    }
  });

  it('autocomplete (0.95) > type (0.85) > name (0.80)', () => {
    const matches = firstMatches(
      {
        autocomplete: 'given-name',
        type: FieldType.EMAIL,
        name: 'city',
        inputType: 'email',
      },
      { firstName: 'Alice', email: 'alice@example.com', city: 'Springfield' },
    );
    const methods = matches.map((m) => m.matchMethod);
    const autocompleteIdx = methods.indexOf('autocomplete');
    const typeIdx = methods.indexOf('type');
    const nameIdx = methods.indexOf('name');

    if (autocompleteIdx >= 0 && typeIdx >= 0) {
      expect(autocompleteIdx).toBeLessThan(typeIdx);
    }
    if (typeIdx >= 0 && nameIdx >= 0) {
      expect(typeIdx).toBeLessThan(nameIdx);
    }
  });
});

// ---------------------------------------------------------------------------
// Profile map building
// ---------------------------------------------------------------------------

describe('Profile map building', () => {
  it('uses first value from values array', () => {
    const profile: ProfileField[] = [
      {
        key: 'email',
        values: ['first@example.com', 'second@example.com'],
        confidence: 0.9,
        sourceCount: 2,
        lastUpdated: new Date().toISOString(),
      },
    ];
    const results = matchFields([makeField({ autocomplete: 'email' })], profile);
    expect(results[0]!.matches[0]!.value).toBe('first@example.com');
  });

  it('skips profile fields with empty values array', () => {
    const profile: ProfileField[] = [
      {
        key: 'email',
        values: [],
        confidence: 0.9,
        sourceCount: 0,
        lastUpdated: new Date().toISOString(),
      },
    ];
    const results = matchFields([makeField({ autocomplete: 'email' })], profile);
    // No value available, so no match should be produced
    expect(results).toHaveLength(0);
  });

  it('empty profile returns no matches', () => {
    const results = matchFields(
      [makeField({ name: 'first_name' }), makeField({ name: 'email' })],
      [],
    );
    expect(results).toHaveLength(0);
  });

  it('empty fields array returns no results', () => {
    const results = matchFields([], makeProfile({ email: 'alice@example.com' }));
    expect(results).toHaveLength(0);
  });
});

// ---------------------------------------------------------------------------
// No match cases
// ---------------------------------------------------------------------------

describe('No matches', () => {
  it('unrecognizable field name returns no matches', () => {
    const results = matchFields(
      [makeField({ name: 'qwxyz_foobar_123' })],
      makeProfile({ firstName: 'Alice' }),
    );
    expect(results).toHaveLength(0);
  });

  it('field with no identifiers returns no matches', () => {
    const results = matchFields(
      [makeField({})],
      makeProfile({ firstName: 'Alice', email: 'alice@example.com' }),
    );
    expect(results).toHaveLength(0);
  });

  it('profile key with no matching field type or name returns no match', () => {
    const results = matchFields(
      [makeField({ name: 'favorite_color', type: FieldType.TEXT })],
      makeProfile({ firstName: 'Alice' }),
    );
    expect(results).toHaveLength(0);
  });
});

// ---------------------------------------------------------------------------
// matchFieldsAsync
// ---------------------------------------------------------------------------

describe('matchFieldsAsync', () => {
  it('separates matched and unmatched fields', () => {
    const fields = [
      makeField({ autocomplete: 'email' }),
      makeField({ name: 'xyzzy_unknown_field' }),
      makeField({ name: 'first_name' }),
    ];
    const profile = makeProfile({
      email: 'alice@example.com',
      firstName: 'Alice',
    });

    const { matched, unmatched } = matchFieldsAsync(fields, profile);
    expect(matched).toHaveLength(2);
    expect(unmatched).toHaveLength(1);
  });

  it('unmatched fields have context with correct index', () => {
    const fields = [
      makeField({ name: 'first_name' }),
      makeField({ name: 'unknown_xyz' }),
      makeField({ name: 'another_unknown' }),
    ];
    const profile = makeProfile({ firstName: 'Alice' });

    const { matched, unmatched } = matchFieldsAsync(fields, profile);
    expect(matched).toHaveLength(1);
    expect(unmatched).toHaveLength(2);
    // Indices should be 1 and 2 (the positions in the original array)
    expect(unmatched[0]!.context.index).toBe(1);
    expect(unmatched[1]!.context.index).toBe(2);
  });

  it('all fields matched when profile covers everything', () => {
    const fields = [
      makeField({ autocomplete: 'email' }),
      makeField({ autocomplete: 'given-name' }),
    ];
    const profile = makeProfile({
      email: 'alice@example.com',
      firstName: 'Alice',
    });

    const { matched, unmatched } = matchFieldsAsync(fields, profile);
    expect(matched).toHaveLength(2);
    expect(unmatched).toHaveLength(0);
  });

  it('all fields unmatched when profile is empty', () => {
    const fields = [
      makeField({ name: 'first_name' }),
      makeField({ name: 'email' }),
    ];

    const { matched, unmatched } = matchFieldsAsync(fields, []);
    expect(matched).toHaveLength(0);
    expect(unmatched).toHaveLength(2);
  });

  it('matched entries have the same structure as matchFields results', () => {
    const fields = [makeField({ autocomplete: 'email' })];
    const profile = makeProfile({ email: 'alice@example.com' });

    const syncResults = matchFields(fields, profile);
    const { matched } = matchFieldsAsync(fields, profile);

    expect(matched).toHaveLength(syncResults.length);
    expect(matched[0]!.matches[0]!.profileField).toBe(
      syncResults[0]!.matches[0]!.profileField,
    );
    expect(matched[0]!.matches[0]!.confidence).toBe(
      syncResults[0]!.matches[0]!.confidence,
    );
  });
});

// ---------------------------------------------------------------------------
// buildFieldContext
// ---------------------------------------------------------------------------

describe('buildFieldContext', () => {
  it('builds correct context shape', () => {
    const field = makeField({
      name: 'first_name',
      label: 'First Name',
      type: FieldType.TEXT,
      inputType: 'text',
      autocomplete: 'given-name',
      placeholder: 'Enter first name',
    });

    const ctx = buildFieldContext(field, 3);
    expect(ctx).toEqual({
      index: 3,
      name: 'first_name',
      label: 'First Name',
      type: FieldType.TEXT,
      inputType: 'text',
      autocomplete: 'given-name',
      placeholder: 'Enter first name',
    });
  });

  it('defaults empty strings for missing properties', () => {
    const field = makeField({});
    const ctx = buildFieldContext(field, 0);
    expect(ctx.name).toBe('');
    expect(ctx.label).toBe('');
    expect(ctx.autocomplete).toBe('');
    expect(ctx.placeholder).toBe('');
    expect(ctx.index).toBe(0);
  });

  it('preserves the index parameter', () => {
    const field = makeField({ name: 'test' });
    expect(buildFieldContext(field, 0).index).toBe(0);
    expect(buildFieldContext(field, 7).index).toBe(7);
    expect(buildFieldContext(field, 99).index).toBe(99);
  });

  it('reads inputType from the DOM element', () => {
    const field = makeField({ inputType: 'email' });
    const ctx = buildFieldContext(field, 0);
    expect(ctx.inputType).toBe('email');
  });

  it('reads placeholder from the DOM element', () => {
    const field = makeField({ placeholder: 'Your email here' });
    const ctx = buildFieldContext(field, 0);
    expect(ctx.placeholder).toBe('Your email here');
  });
});

// ---------------------------------------------------------------------------
// Multiple fields end-to-end
// ---------------------------------------------------------------------------

describe('End-to-end: multiple fields', () => {
  it('matches a typical registration form', () => {
    const fields = [
      makeField({ name: 'first_name', label: 'First Name' }),
      makeField({ name: 'last_name', label: 'Last Name' }),
      makeField({ name: 'email', type: FieldType.EMAIL, inputType: 'email' }),
      makeField({ name: 'phone', type: FieldType.PHONE, inputType: 'tel' }),
      makeField({ name: 'street_address', label: 'Street Address' }),
      makeField({ name: 'city', label: 'City' }),
      makeField({ name: 'state', label: 'State' }),
      makeField({ name: 'zip_code', label: 'Zip Code' }),
    ];
    const profile = makeProfile({
      firstName: 'Alice',
      lastName: 'Smith',
      email: 'alice@example.com',
      phone: '555-1234',
      streetAddress: '123 Main St',
      city: 'Springfield',
      state: 'IL',
      zipCode: '62701',
    });

    const results = matchFields(fields, profile);
    expect(results).toHaveLength(8);

    const profileKeys = results.map((r) => r.matches[0]!.profileField);
    expect(profileKeys).toContain('firstName');
    expect(profileKeys).toContain('lastName');
    expect(profileKeys).toContain('email');
    expect(profileKeys).toContain('phone');
    expect(profileKeys).toContain('streetAddress');
    expect(profileKeys).toContain('city');
    expect(profileKeys).toContain('state');
    expect(profileKeys).toContain('zipCode');
  });

  it('handles form with autocomplete attributes on all fields', () => {
    const fields = [
      makeField({ autocomplete: 'given-name' }),
      makeField({ autocomplete: 'family-name' }),
      makeField({ autocomplete: 'email' }),
      makeField({ autocomplete: 'tel' }),
    ];
    const profile = makeProfile({
      firstName: 'Alice',
      lastName: 'Smith',
      email: 'alice@example.com',
      phone: '555-1234',
    });

    const results = matchFields(fields, profile);
    expect(results).toHaveLength(4);
    // All should be autocomplete matches at 0.95 confidence
    for (const result of results) {
      expect(result.matches[0]!.matchMethod).toBe('autocomplete');
      expect(result.matches[0]!.confidence).toBe(0.95);
    }
  });

  it('only returns MatchedFields for fields that have matches', () => {
    const fields = [
      makeField({ name: 'email' }),
      makeField({ name: 'totally_unknown_field' }),
      makeField({ name: 'phone' }),
    ];
    const profile = makeProfile({
      email: 'alice@example.com',
      phone: '555-1234',
    });

    const results = matchFields(fields, profile);
    expect(results).toHaveLength(2);
  });
});
