import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

// Clean up React Testing Library's DOM after each test
afterEach(() => {
  cleanup();
});