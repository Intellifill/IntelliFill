// @vitest-environment jsdom

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { FieldType } from '../shared/types/field-detection';

// Polyfill CSS.escape for jsdom (not implemented natively)
if (typeof globalThis.CSS === 'undefined') {
  (globalThis as any).CSS = {};
}
if (typeof globalThis.CSS.escape !== 'function') {
  globalThis.CSS.escape = (value: string) =>
    value.replace(/([^\w-])/g, '\\$1');
}

import {
  detectFieldType,
  getFieldIdentifier,
  getFieldLabel,
  isElementVisible,
  shouldExclude,
  markAsProcessed,
  isProcessed,
  detectFields,
  observeDOMChanges,
} from '../lib/field-detector';

type FormElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

/** Helper: create an input element with given attributes */
function createInput(attrs: Record<string, string> = {}): HTMLInputElement {
  const el = document.createElement('input');
  for (const [key, value] of Object.entries(attrs)) {
    el.setAttribute(key, value);
  }
  return el;
}

/** Helper: make an element appear visible to jsdom by stubbing offsetParent and computed style */
function makeVisible(el: HTMLElement): void {
  Object.defineProperty(el, 'offsetParent', { value: document.body, configurable: true });
}

beforeEach(() => {
  document.body.innerHTML = '';
});

// ---------------------------------------------------------------------------
// detectFieldType
// ---------------------------------------------------------------------------
describe('detectFieldType', () => {
  describe('by input type attribute', () => {
    it('returns EMAIL for type="email"', () => {
      const el = createInput({ type: 'email' });
      expect(detectFieldType(el)).toBe(FieldType.EMAIL);
    });

    it('returns PHONE for type="tel"', () => {
      const el = createInput({ type: 'tel' });
      expect(detectFieldType(el)).toBe(FieldType.PHONE);
    });

    it('returns DATE for type="date"', () => {
      const el = createInput({ type: 'date' });
      expect(detectFieldType(el)).toBe(FieldType.DATE);
    });

    it('returns NUMBER for type="number"', () => {
      const el = createInput({ type: 'number' });
      expect(detectFieldType(el)).toBe(FieldType.NUMBER);
    });
  });

  describe('by name/id pattern matching', () => {
    it('returns EMAIL when name contains "email_address"', () => {
      const el = createInput({ type: 'text', name: 'email_address' });
      expect(detectFieldType(el)).toBe(FieldType.EMAIL);
    });

    it('returns PHONE when name contains "phone_number"', () => {
      const el = createInput({ type: 'text', name: 'phone_number' });
      expect(detectFieldType(el)).toBe(FieldType.PHONE);
    });

    it('returns DATE when name contains "date_of_birth"', () => {
      const el = createInput({ type: 'text', name: 'date_of_birth' });
      expect(detectFieldType(el)).toBe(FieldType.DATE);
    });

    it('returns ADDRESS when name contains "street_address"', () => {
      const el = createInput({ type: 'text', name: 'street_address' });
      expect(detectFieldType(el)).toBe(FieldType.ADDRESS);
    });

    it('returns SSN when name is "ssn"', () => {
      const el = createInput({ type: 'text', name: 'ssn' });
      expect(detectFieldType(el)).toBe(FieldType.SSN);
    });

    it('returns SSN when name contains "social_security"', () => {
      const el = createInput({ type: 'text', name: 'social_security' });
      expect(detectFieldType(el)).toBe(FieldType.SSN);
    });

    it('returns NUMBER when name contains "account_number"', () => {
      const el = createInput({ type: 'text', name: 'account_number' });
      // "account" matches NUMBER pattern first, then "number" also matches
      expect(detectFieldType(el)).toBe(FieldType.NUMBER);
    });
  });

  describe('by placeholder pattern matching', () => {
    it('returns PHONE when placeholder says "Enter your phone"', () => {
      const el = createInput({ type: 'text', placeholder: 'Enter your phone' });
      expect(detectFieldType(el)).toBe(FieldType.PHONE);
    });

    it('returns EMAIL when placeholder says "Email address"', () => {
      const el = createInput({ type: 'text', placeholder: 'Email address' });
      expect(detectFieldType(el)).toBe(FieldType.EMAIL);
    });
  });

  describe('fallback', () => {
    it('returns TEXT for a generic text input with no matching patterns', () => {
      const el = createInput({ type: 'text', name: 'some_random_field' });
      expect(detectFieldType(el)).toBe(FieldType.TEXT);
    });

    it('returns TEXT for an input with no attributes', () => {
      const el = createInput({});
      expect(detectFieldType(el)).toBe(FieldType.TEXT);
    });
  });
});

// ---------------------------------------------------------------------------
// getFieldIdentifier
// ---------------------------------------------------------------------------
describe('getFieldIdentifier', () => {
  it('returns name when present', () => {
    const el = createInput({ name: 'first_name', id: 'fname', placeholder: 'First' });
    expect(getFieldIdentifier(el)).toBe('first_name');
  });

  it('falls back to id when name is absent', () => {
    const el = createInput({ id: 'fname', placeholder: 'First' });
    expect(getFieldIdentifier(el)).toBe('fname');
  });

  it('falls back to placeholder when name and id are absent', () => {
    const el = createInput({ placeholder: 'First Name' });
    expect(getFieldIdentifier(el)).toBe('First Name');
  });

  it('falls back to aria-label when name, id, and placeholder are absent', () => {
    const el = createInput({ 'aria-label': 'Your name' });
    expect(getFieldIdentifier(el)).toBe('Your name');
  });

  it('falls back to autocomplete when nothing else is available', () => {
    const el = createInput({ autocomplete: 'given-name' });
    expect(getFieldIdentifier(el)).toBe('given-name');
  });

  it('returns empty string when no identifying attributes exist', () => {
    const el = createInput({});
    expect(getFieldIdentifier(el)).toBe('');
  });
});

// ---------------------------------------------------------------------------
// getFieldLabel
// ---------------------------------------------------------------------------
describe('getFieldLabel', () => {
  it('finds label via for attribute matching element id', () => {
    document.body.innerHTML = `
      <label for="email-field">Email Address</label>
      <input id="email-field" type="text" />
    `;
    const el = document.getElementById('email-field') as HTMLInputElement;
    expect(getFieldLabel(el)).toBe('Email Address');
  });

  it('finds label from parent label element, excluding inner input text', () => {
    document.body.innerHTML = `
      <label>
        Full Name
        <input type="text" id="name-field" />
      </label>
    `;
    const el = document.getElementById('name-field') as HTMLInputElement;
    expect(getFieldLabel(el)).toBe('Full Name');
  });

  it('returns aria-label when no label element exists', () => {
    const el = createInput({ 'aria-label': 'Search query' });
    document.body.appendChild(el);
    expect(getFieldLabel(el)).toBe('Search query');
  });

  it('returns placeholder as last resort', () => {
    const el = createInput({ placeholder: 'Enter value' });
    document.body.appendChild(el);
    expect(getFieldLabel(el)).toBe('Enter value');
  });

  it('returns empty string when no label source exists', () => {
    const el = createInput({ type: 'text' });
    document.body.appendChild(el);
    expect(getFieldLabel(el)).toBe('');
  });

  it('prefers for-label over parent label', () => {
    document.body.innerHTML = `
      <label>
        Parent Label
        <label for="inner">For Label</label>
        <input id="inner" type="text" />
      </label>
    `;
    const el = document.getElementById('inner') as HTMLInputElement;
    expect(getFieldLabel(el)).toBe('For Label');
  });
});

// ---------------------------------------------------------------------------
// isElementVisible
// ---------------------------------------------------------------------------
describe('isElementVisible', () => {
  it('returns true for a visible element', () => {
    const el = createInput({ type: 'text' });
    document.body.appendChild(el);
    makeVisible(el);
    expect(isElementVisible(el)).toBe(true);
  });

  it('returns false when display is none', () => {
    const el = createInput({ type: 'text' });
    el.style.display = 'none';
    document.body.appendChild(el);
    makeVisible(el);
    expect(isElementVisible(el)).toBe(false);
  });

  it('returns false when visibility is hidden', () => {
    const el = createInput({ type: 'text' });
    el.style.visibility = 'hidden';
    document.body.appendChild(el);
    makeVisible(el);
    expect(isElementVisible(el)).toBe(false);
  });

  it('returns false when opacity is 0', () => {
    const el = createInput({ type: 'text' });
    el.style.opacity = '0';
    document.body.appendChild(el);
    makeVisible(el);
    expect(isElementVisible(el)).toBe(false);
  });

  it('returns false when offsetParent is null (not in layout)', () => {
    const el = createInput({ type: 'text' });
    document.body.appendChild(el);
    // jsdom defaults offsetParent to null, so no makeVisible call
    expect(isElementVisible(el)).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// shouldExclude
// ---------------------------------------------------------------------------
describe('shouldExclude', () => {
  it('excludes type="password"', () => {
    const el = createInput({ type: 'password' });
    document.body.appendChild(el);
    expect(shouldExclude(el)).toBe(true);
  });

  it('excludes type="hidden"', () => {
    const el = createInput({ type: 'hidden' });
    document.body.appendChild(el);
    expect(shouldExclude(el)).toBe(true);
  });

  it('excludes type="submit"', () => {
    const el = createInput({ type: 'submit' });
    document.body.appendChild(el);
    expect(shouldExclude(el)).toBe(true);
  });

  it('excludes type="button"', () => {
    const el = createInput({ type: 'button' });
    document.body.appendChild(el);
    expect(shouldExclude(el)).toBe(true);
  });

  it('excludes type="reset"', () => {
    const el = createInput({ type: 'reset' });
    document.body.appendChild(el);
    expect(shouldExclude(el)).toBe(true);
  });

  it('excludes type="file"', () => {
    const el = createInput({ type: 'file' });
    document.body.appendChild(el);
    expect(shouldExclude(el)).toBe(true);
  });

  it('excludes type="checkbox"', () => {
    const el = createInput({ type: 'checkbox' });
    document.body.appendChild(el);
    expect(shouldExclude(el)).toBe(true);
  });

  it('excludes type="radio"', () => {
    const el = createInput({ type: 'radio' });
    document.body.appendChild(el);
    expect(shouldExclude(el)).toBe(true);
  });

  it('excludes disabled elements', () => {
    const el = createInput({ type: 'text', disabled: '' });
    document.body.appendChild(el);
    expect(shouldExclude(el)).toBe(true);
  });

  it('excludes readonly elements', () => {
    const el = createInput({ type: 'text', readonly: '' });
    document.body.appendChild(el);
    expect(shouldExclude(el)).toBe(true);
  });

  it('excludes aria-hidden="true" elements', () => {
    const el = createInput({ type: 'text', 'aria-hidden': 'true' });
    document.body.appendChild(el);
    expect(shouldExclude(el)).toBe(true);
  });

  it('excludes elements inside .captcha container', () => {
    document.body.innerHTML = `
      <div class="captcha">
        <input type="text" id="captcha-input" />
      </div>
    `;
    const el = document.getElementById('captcha-input') as HTMLInputElement;
    expect(shouldExclude(el)).toBe(true);
  });

  it('excludes elements inside .recaptcha container', () => {
    document.body.innerHTML = `
      <div class="recaptcha">
        <input type="text" id="recaptcha-input" />
      </div>
    `;
    const el = document.getElementById('recaptcha-input') as HTMLInputElement;
    expect(shouldExclude(el)).toBe(true);
  });

  it('excludes elements inside [data-intellifill-ignore] container', () => {
    document.body.innerHTML = `
      <div data-intellifill-ignore>
        <input type="text" id="ignored-input" />
      </div>
    `;
    const el = document.getElementById('ignored-input') as HTMLInputElement;
    expect(shouldExclude(el)).toBe(true);
  });

  it('excludes elements with data-intellifill-processed attribute', () => {
    const el = createInput({ type: 'text', 'data-intellifill-processed': 'true' });
    document.body.appendChild(el);
    expect(shouldExclude(el)).toBe(true);
  });

  it('does not exclude a normal text input', () => {
    const el = createInput({ type: 'text' });
    document.body.appendChild(el);
    expect(shouldExclude(el)).toBe(false);
  });

  it('does not exclude a textarea', () => {
    const el = document.createElement('textarea');
    document.body.appendChild(el);
    expect(shouldExclude(el as HTMLTextAreaElement)).toBe(false);
  });

  it('does not exclude a select', () => {
    const el = document.createElement('select');
    document.body.appendChild(el);
    expect(shouldExclude(el as HTMLSelectElement)).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// markAsProcessed / isProcessed
// ---------------------------------------------------------------------------
describe('markAsProcessed / isProcessed', () => {
  it('marks an element as processed and reads it back', () => {
    const el = createInput({ type: 'text' });
    expect(isProcessed(el)).toBe(false);
    markAsProcessed(el);
    expect(isProcessed(el)).toBe(true);
  });

  it('sets the data-intellifill-processed attribute to "true"', () => {
    const el = createInput({ type: 'text' });
    markAsProcessed(el);
    expect(el.getAttribute('data-intellifill-processed')).toBe('true');
  });

  it('is idempotent when called multiple times', () => {
    const el = createInput({ type: 'text' });
    markAsProcessed(el);
    markAsProcessed(el);
    expect(isProcessed(el)).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// detectFields
// ---------------------------------------------------------------------------
describe('detectFields', () => {
  /** Make all inputs in the body visible for detection */
  function makeAllVisible() {
    document.querySelectorAll('input, textarea, select').forEach((el) => {
      Object.defineProperty(el, 'offsetParent', { value: document.body, configurable: true });
    });
  }

  it('detects text, email, tel, date, and number inputs', () => {
    document.body.innerHTML = `
      <input type="text" name="first_name" />
      <input type="email" name="user_email" />
      <input type="tel" name="user_phone" />
      <input type="date" name="dob" />
      <input type="number" name="age" />
    `;
    makeAllVisible();

    const fields = detectFields();
    expect(fields).toHaveLength(5);

    const types = fields.map((f) => f.type);
    expect(types).toContain(FieldType.TEXT);
    expect(types).toContain(FieldType.EMAIL);
    expect(types).toContain(FieldType.PHONE);
    expect(types).toContain(FieldType.DATE);
    expect(types).toContain(FieldType.NUMBER);
  });

  it('detects textarea and select elements', () => {
    document.body.innerHTML = `
      <textarea name="comments"></textarea>
      <select name="country"><option>US</option></select>
    `;
    makeAllVisible();

    const fields = detectFields();
    expect(fields).toHaveLength(2);
    expect(fields[0].tagName).toBe('textarea');
    expect(fields[1].tagName).toBe('select');
  });

  it('detects inputs without a type attribute (defaults to text)', () => {
    document.body.innerHTML = '<input name="unknown_type" />';
    makeAllVisible();

    const fields = detectFields();
    expect(fields).toHaveLength(1);
  });

  it('excludes password, hidden, disabled, and readonly inputs', () => {
    document.body.innerHTML = `
      <input type="password" name="pw" />
      <input type="hidden" name="csrf" />
      <input type="text" name="locked" disabled />
      <input type="text" name="ro" readonly />
      <input type="text" name="visible" />
    `;
    makeAllVisible();

    const fields = detectFields();
    expect(fields).toHaveLength(1);
    expect(fields[0].name).toBe('visible');
  });

  it('excludes elements inside captcha containers', () => {
    document.body.innerHTML = `
      <div class="captcha">
        <input type="text" name="captcha_answer" />
      </div>
      <input type="text" name="legit_field" />
    `;
    makeAllVisible();

    const fields = detectFields();
    expect(fields).toHaveLength(1);
    expect(fields[0].name).toBe('legit_field');
  });

  it('returns correct DetectedField shape', () => {
    document.body.innerHTML = `
      <label for="email-f">Email</label>
      <input type="email" id="email-f" name="user_email" placeholder="you@example.com" required autocomplete="email" />
    `;
    makeAllVisible();

    const fields = detectFields();
    expect(fields).toHaveLength(1);

    const field = fields[0];
    expect(field.element).toBeInstanceOf(HTMLInputElement);
    expect(field.name).toBe('user_email');
    expect(field.label).toBe('Email');
    expect(field.type).toBe(FieldType.EMAIL);
    expect(field.tagName).toBe('input');
    expect(field.inputType).toBe('email');
    expect(field.value).toBe('');
    expect(field.isRequired).toBe(true);
    expect(field.autocomplete).toBe('email');
  });

  it('does not detect already-processed elements', () => {
    document.body.innerHTML = `
      <input type="text" name="processed" data-intellifill-processed="true" />
      <input type="text" name="fresh" />
    `;
    makeAllVisible();

    const fields = detectFields();
    expect(fields).toHaveLength(1);
    expect(fields[0].name).toBe('fresh');
  });

  it('captures current value of inputs', () => {
    document.body.innerHTML = '<input type="text" name="prefilled" value="hello" />';
    makeAllVisible();

    const fields = detectFields();
    expect(fields[0].value).toBe('hello');
  });
});

// ---------------------------------------------------------------------------
// observeDOMChanges
// ---------------------------------------------------------------------------
describe('observeDOMChanges', () => {
  it('calls callback when a form field is added to the DOM', async () => {
    let called = false;
    const observer = observeDOMChanges(() => {
      called = true;
    });

    // Add an input to the body
    const input = createInput({ type: 'text', name: 'dynamic' });
    document.body.appendChild(input);

    // MutationObserver is async; wait for the debounce (200ms) + buffer
    await new Promise((resolve) => setTimeout(resolve, 300));

    expect(called).toBe(true);

    observer.disconnect();
  });

  it('does not call callback when non-form elements are added', async () => {
    let called = false;
    const observer = observeDOMChanges(() => {
      called = true;
    });

    const div = document.createElement('div');
    div.textContent = 'Just a div';
    document.body.appendChild(div);

    await new Promise((resolve) => setTimeout(resolve, 300));

    expect(called).toBe(false);

    observer.disconnect();
  });

  it('calls callback when a container with form fields is added', async () => {
    let called = false;
    const observer = observeDOMChanges(() => {
      called = true;
    });

    const wrapper = document.createElement('div');
    wrapper.innerHTML = '<input type="text" name="nested" />';
    document.body.appendChild(wrapper);

    await new Promise((resolve) => setTimeout(resolve, 300));

    expect(called).toBe(true);

    observer.disconnect();
  });

  it('debounces rapid DOM changes into a single callback', async () => {
    let callCount = 0;
    const observer = observeDOMChanges(() => {
      callCount++;
    });

    // Add multiple inputs rapidly
    for (let i = 0; i < 5; i++) {
      const input = createInput({ type: 'text', name: `rapid-${i}` });
      document.body.appendChild(input);
    }

    await new Promise((resolve) => setTimeout(resolve, 400));

    // Should have debounced into 1 call (or at most a few, not 5)
    expect(callCount).toBeGreaterThanOrEqual(1);
    expect(callCount).toBeLessThanOrEqual(2);

    observer.disconnect();
  });

  it('returns a MutationObserver that can be disconnected', () => {
    const observer = observeDOMChanges(() => {});
    expect(observer).toBeInstanceOf(MutationObserver);
    observer.disconnect(); // should not throw
  });
});
