//to be a certain number as a test result:
import { calculateResults } from './App.jsx';
//viell. erst function noch purifyen??
describe('calculation of game results', () => {
  it('has...', () => {
    expect(calculateResults(...)).toBe(...);
  });
});

//to be or not to be:
import { calculateResults } from './App.jsx';

describe('calculation of game results', () => {
  it('has a...', () => {
    expect(...).toBe(true);
  });
});