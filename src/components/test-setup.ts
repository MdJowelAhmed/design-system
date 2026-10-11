import '@testing-library/jest-dom';

// jsdom lacks layout APIs that Radix and cmdk rely on.
globalThis.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

Element.prototype.scrollIntoView = function scrollIntoView() {};
