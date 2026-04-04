/**
 * Form Filler Tests
 *
 * Tests for fillField() and fillAllFields() covering text inputs, textareas,
 * date inputs, select elements, and the multi-field fill orchestration logic.
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fillField, fillAllFields } from '../lib/form-filler';
import { FieldType } from '../shared/types/field-detection';
import type { DetectedField } from '../shared/types/field-detection';
import type { MatchedField, FieldMatch, FillResult } from '../shared/types/field-matching';

// ─── Helpers ──────────────────────────────────────────────────────────────────

type FormElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

function makeInput(type = 'text', value = ''): HTMLInputElement {
  const el = document.createElement('input');
  el.type = type;
  el.value = value;
  return el;
}

function makeTextarea(value = ''): HTMLTextAreaElement {
  const el = document.createElement('textarea');
  el.value = value;
  return el;
}

function makeSelect(options: { value: string; text: string }[]): HTMLSelectElement {
  const el = document.createElement('select');
  for (const opt of options) {
    const o = document.createElement('option');
    o.value = opt.value;
    o.text = opt.text;
    el.appendChild(o);
  }
  return el;
}

function makeMatch(value: string, confidence = 0.9): FieldMatch {
  return {
    profileField: 'test_field',
    value,
    confidence,
    matchMethod: 'name',
  };
}

function makeMatchedField(
  element: FormElement,
  matches: FieldMatch[],
  existingValue = '',
): MatchedField {
  return {
    field: {
      element,
      name: '',
      label: '',
      type: FieldType.TEXT,
      tagName: element.tagName.toLowerCase(),
      inputType: (element as HTMLInputElement).type ?? 'text',
      value: existingValue,
      isRequired: false,
      autocomplete: '',
    } as DetectedField,
    matches,
  };
}

// ─── fillField: text inputs ──────────────────────────────────────────────────

describe('fillField - text inputs', () => {
  it('fills value and returns true', () => {
    const el = makeInput('text');
    const result = fillField(el, 'John Doe');
    expect(result).toBe(true);
    expect(el.value).toBe('John Doe');
  });

  it('dispatches input, change, and blur events', () => {
    const el = makeInput('text');
    const events: string[] = [];
    el.addEventListener('input', () => events.push('input'));
    el.addEventListener('change', () => events.push('change'));
    el.addEventListener('blur', () => events.push('blur'));

    fillField(el, 'test');

    expect(events).toEqual(['input', 'change', 'blur']);
  });

  it('uses native setter when available', () => {
    const el = makeInput('text');
    const nativeSetter = Object.getOwnPropertyDescriptor(
      HTMLInputElement.prototype,
      'value',
    )?.set;

    // The native setter should exist in jsdom
    expect(nativeSetter).toBeDefined();

    // Spy on the native setter to confirm it gets called
    const spy = vi.fn(nativeSetter!);
    Object.defineProperty(HTMLInputElement.prototype, 'value', {
      set: spy,
      get: Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')!.get,
      configurable: true,
    });

    fillField(el, 'native-test');
    expect(spy).toHaveBeenCalled();

    // Restore the original setter
    Object.defineProperty(HTMLInputElement.prototype, 'value', {
      set: nativeSetter,
      get: Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')!.get,
      configurable: true,
    });
  });

  it('handles empty string value', () => {
    const el = makeInput('text', 'existing');
    const result = fillField(el, '');
    expect(result).toBe(true);
    expect(el.value).toBe('');
  });

  it('fills email input', () => {
    const el = makeInput('email');
    const result = fillField(el, 'user@example.com');
    expect(result).toBe(true);
    expect(el.value).toBe('user@example.com');
  });

  it('fills tel input', () => {
    const el = makeInput('tel');
    const result = fillField(el, '+1-555-0100');
    expect(result).toBe(true);
    expect(el.value).toBe('+1-555-0100');
  });
});

// ─── fillField: textarea ─────────────────────────────────────────────────────

describe('fillField - textarea', () => {
  it('fills textarea value correctly', () => {
    const el = makeTextarea();
    const result = fillField(el, 'Multi-line\ncontent here');
    expect(result).toBe(true);
    expect(el.value).toBe('Multi-line\ncontent here');
  });

  it('dispatches events on textarea', () => {
    const el = makeTextarea();
    const events: string[] = [];
    el.addEventListener('input', () => events.push('input'));
    el.addEventListener('change', () => events.push('change'));
    el.addEventListener('blur', () => events.push('blur'));

    fillField(el, 'test');

    expect(events).toEqual(['input', 'change', 'blur']);
  });
});

// ─── fillField: date inputs ─────────────────────────────────────────────────

describe('fillField - date inputs', () => {
  it('keeps YYYY-MM-DD format unchanged', () => {
    const el = makeInput('date');
    fillField(el, '1985-03-15');
    expect(el.value).toBe('1985-03-15');
  });

  it('converts parseable date strings to YYYY-MM-DD', () => {
    const el = makeInput('date');
    // Use an ISO-ish string that won't be affected by timezone offset
    fillField(el, '1985-03-15T12:00:00');
    expect(el.value).toBe('1985-03-15');
  });

  it('converts ISO datetime to YYYY-MM-DD', () => {
    const el = makeInput('date');
    fillField(el, '1990-06-20T00:00:00.000Z');
    expect(el.value).toBe('1990-06-20');
  });

  it('passes through invalid date strings (browser sanitizes to empty)', () => {
    const el = makeInput('date');
    fillField(el, 'not-a-date');
    // The form-filler passes the value through unchanged, but the browser's
    // date input sanitization rejects non-YYYY-MM-DD strings and sets value to ''
    expect(el.value).toBe('');
  });

  it('does not format non-date inputs', () => {
    const el = makeInput('text');
    fillField(el, 'March 15, 1985');
    // Text input should NOT get date formatting
    expect(el.value).toBe('March 15, 1985');
  });
});

// ─── fillField: select elements ─────────────────────────────────────────────

describe('fillField - select elements', () => {
  const stateOptions = [
    { value: '', text: 'Select a state' },
    { value: 'CA', text: 'California' },
    { value: 'NY', text: 'New York' },
    { value: 'TX', text: 'Texas' },
  ];

  it('matches by option value (exact, case-insensitive)', () => {
    const el = makeSelect(stateOptions);
    const result = fillField(el, 'ca');
    expect(result).toBe(true);
    expect(el.value).toBe('CA');
  });

  it('matches by option value (exact match)', () => {
    const el = makeSelect(stateOptions);
    const result = fillField(el, 'NY');
    expect(result).toBe(true);
    expect(el.value).toBe('NY');
  });

  it('matches by option text (exact, case-insensitive)', () => {
    const el = makeSelect(stateOptions);
    const result = fillField(el, 'california');
    expect(result).toBe(true);
    expect(el.value).toBe('CA');
  });

  it('matches by option text (contains)', () => {
    const el = makeSelect(stateOptions);
    const result = fillField(el, 'new');
    expect(result).toBe(true);
    expect(el.value).toBe('NY');
  });

  it('matches when option text is contained in provided value', () => {
    const el = makeSelect([
      { value: '', text: 'Choose' },
      { value: 'us', text: 'US' },
    ]);
    const result = fillField(el, 'United States (US)');
    expect(result).toBe(true);
    expect(el.value).toBe('us');
  });

  it('returns false when no option matches', () => {
    const el = makeSelect(stateOptions);
    const result = fillField(el, 'Florida');
    expect(result).toBe(false);
  });

  it('dispatches events after selecting an option', () => {
    const el = makeSelect(stateOptions);
    const events: string[] = [];
    el.addEventListener('input', () => events.push('input'));
    el.addEventListener('change', () => events.push('change'));
    el.addEventListener('blur', () => events.push('blur'));

    fillField(el, 'TX');

    expect(events).toEqual(['input', 'change', 'blur']);
  });

  it('does not dispatch events when no match found', () => {
    const el = makeSelect(stateOptions);
    const events: string[] = [];
    el.addEventListener('input', () => events.push('input'));
    el.addEventListener('change', () => events.push('change'));
    el.addEventListener('blur', () => events.push('blur'));

    fillField(el, 'Florida');

    expect(events).toEqual([]);
  });
});

// ─── fillAllFields ──────────────────────────────────────────────────────────

describe('fillAllFields', () => {
  it('fills fields with exactly 1 match', () => {
    const el1 = makeInput('text');
    const el2 = makeInput('email');
    const matched: MatchedField[] = [
      makeMatchedField(el1, [makeMatch('John')]),
      makeMatchedField(el2, [makeMatch('john@example.com')]),
    ];

    const result = fillAllFields(matched);

    expect(result).toEqual({ filled: 2, skipped: 0, failed: 0 });
    expect(el1.value).toBe('John');
    expect(el2.value).toBe('john@example.com');
  });

  it('skips fields with multiple matches (ambiguous)', () => {
    const el = makeInput('text');
    const matched: MatchedField[] = [
      makeMatchedField(el, [makeMatch('John', 0.8), makeMatch('Jonathan', 0.7)]),
    ];

    const result = fillAllFields(matched);

    expect(result).toEqual({ filled: 0, skipped: 1, failed: 0 });
    expect(el.value).toBe('');
  });

  it('skips fields with zero matches', () => {
    const el = makeInput('text');
    const matched: MatchedField[] = [makeMatchedField(el, [])];

    const result = fillAllFields(matched);

    expect(result).toEqual({ filled: 0, skipped: 1, failed: 0 });
  });

  it('skips fields that already have values', () => {
    const el = makeInput('text', 'existing value');
    const matched: MatchedField[] = [makeMatchedField(el, [makeMatch('New Value')])];

    const result = fillAllFields(matched);

    expect(result).toEqual({ filled: 0, skipped: 1, failed: 0 });
    // Original value should be preserved
    expect(el.value).toBe('existing value');
  });

  it('counts failed fills (select with no matching option)', () => {
    // Include an empty default option so the select starts with value ''
    const el = makeSelect([
      { value: '', text: 'Choose...' },
      { value: 'a', text: 'Alpha' },
    ]);
    const matched: MatchedField[] = [makeMatchedField(el, [makeMatch('Zeta')])];

    const result = fillAllFields(matched);

    expect(result).toEqual({ filled: 0, skipped: 0, failed: 1 });
  });

  it('returns correct counts for mixed outcomes', () => {
    const filledEl = makeInput('text');
    const skippedMultiEl = makeInput('text');
    const skippedExistingEl = makeInput('text', 'has value');
    const failedEl = makeSelect([
      { value: '', text: 'Pick one' },
      { value: 'x', text: 'Only X' },
    ]);

    const matched: MatchedField[] = [
      makeMatchedField(filledEl, [makeMatch('Good')]),
      makeMatchedField(skippedMultiEl, [makeMatch('A'), makeMatch('B')]),
      makeMatchedField(skippedExistingEl, [makeMatch('Ignored')]),
      makeMatchedField(failedEl, [makeMatch('No Match')]),
    ];

    const result = fillAllFields(matched);

    expect(result).toEqual({ filled: 1, skipped: 2, failed: 1 });
    expect(filledEl.value).toBe('Good');
  });

  it('handles empty matchedFields array', () => {
    const result = fillAllFields([]);
    expect(result).toEqual({ filled: 0, skipped: 0, failed: 0 });
  });
});
