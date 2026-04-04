import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
  },
});

// Note: WxtVitest plugin from 'wxt/testing/vitest-plugin' was removed because
// the wxt package doesn't export that specifier. Re-add if a future wxt version
// provides it (run `wxt prepare` first).
