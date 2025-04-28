import { DEFAULT_ERROR_CODE } from './error-codes';

describe('error-codes constants', () => {
  describe('DEFAULT_ERROR_CODE', () => {
    it('should be defined', () => {
      expect(DEFAULT_ERROR_CODE).toBeDefined();
    });

    it('should have the value "UNKNOWN_ERROR"', () => {
      expect(DEFAULT_ERROR_CODE).toBe('UNKNOWN_ERROR');
    });

    it('should be a string', () => {
      expect(typeof DEFAULT_ERROR_CODE).toBe('string');
    });
  });
});
