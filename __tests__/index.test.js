import { test, expect } from '@jest/globals';
import genDiff from '../src/index.js';

const result = `
{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

test('json flat files', () => {
  const path1 = '__tests__/__fixtures__/file1.json';
  const path2 = '__tests__/__fixtures__/file2.json';

  expect(genDiff(path1, path2)).toStrictEqual(result);
});

test('yaml flat files', () => {
  const path1 = '__tests__/__fixtures__/file1.yml';
  const path2 = '__tests__/__fixtures__/file2.yml';

  expect(genDiff(path1, path2)).toStrictEqual(result);
});
