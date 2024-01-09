import { selectSearchType, SearchType } from '../search';

describe('selectSearchType unit tests', () => {

  it('returns SearchType.NAME when searchType is NAME', () => {
    const result = selectSearchType(SearchType.NAME);
    expect(result).toBe(SearchType.NAME);
  });

  it('returns SearchType.LETTER when searchType is LETTER', () => {
    const result = selectSearchType(SearchType.LETTER);
    expect(result).toBe(SearchType.LETTER);
  });

  it('returns null when searchType does not match any SearchType', () => {
    const result = selectSearchType('INVALID_TYPE');
    expect(result).toBeNull();
  });

  // You can add more tests for other possible search types if needed
});

