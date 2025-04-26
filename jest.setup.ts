/**
 * Jest setup file
 * This file is executed before running tests
 */

// Import any required dependencies for your tests
import 'reflect-metadata';

// Global setup code
beforeAll(() => {
  // Add any setup code that should run before all tests
  // For example, mocking global objects or setting up environment variables
});

// Global teardown code
afterAll(() => {
  // Add any teardown code that should run after all tests
  // For example, cleaning up mocks or resources
});

// You can also define global mocks here
// For example, mocking console methods to prevent noise during tests
// global.console = {
//   ...console,
//   log: jest.fn(),
//   error: jest.fn(),
//   warn: jest.fn(),
// };
