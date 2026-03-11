import '@testing-library/jest-dom';

// Tweener's RAF loop and animation Runner use requestAnimationFrame / setTimeout.
// jsdom doesn't implement rAF, so proxy it through setTimeout.
global.requestAnimationFrame = (cb) => setTimeout(cb, 0);
global.cancelAnimationFrame  = clearTimeout;
