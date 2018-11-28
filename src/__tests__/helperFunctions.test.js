import { isEmpty } from '../helpers';

const testString = '   ';
const sampleEmptyArray = [];
const sampleNonEmptyArray = ['value', 'target', 'name', 'field'];
const sampleNestedObject = {
  division: {
    house: {
      utilities: [],
      food: ''
    }
  }
};

describe('HELPER FUNCTIONS TEST SUITE', () => {
  describe('isEmpty', () => {
    it('Should indicate if a string is empty', (done) => {
      expect(isEmpty(testString)).toBe(true);
      done();
    });

    it('Should indicate if an array is empty', (done) => {
      expect(isEmpty(sampleEmptyArray)).toBe(true);
      done();
    });

    it('Should return false if the subblied param is not empty', (done) => {
      expect(isEmpty(sampleNonEmptyArray)).toBe(false);
      done();
    });

    it('Should verify the emptiness of an object with nested properties', (done) => {
      expect(isEmpty(sampleNestedObject)).toBe(true);
      done();
    });
  });
});
