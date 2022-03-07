import { test, expect } from '@jest/globals';
import genDiff from '../index.js';

test('genDiff', () => {
  expect(genDiff('../__fixtures__/flatfile1.json', '../__fixtures__/flatfile2.json')).toBe('{\n'
    + '  - follow: false\n'
    + '    host: hexlet.io\n'
    + '  - proxy: 123.234.53.22\n'
    + '  - timeout: 50\n'
    + '  + timeout: 20\n'
    + '  + verbose: true\n'
    + '{');
});
