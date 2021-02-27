import { test, expect } from '@jest/globals';
import getDifferences from '../src/index.js';

test('getDifferences main flow', () => {
  const path1 = '__tests__/__fixtures__/file1.json';
  const path2 = '__tests__/__fixtures__/file2.json';
  const result = `
{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

  expect(getDifferences(path1, path2)).toStrictEqual(result);
});
