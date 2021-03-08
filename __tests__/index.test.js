import { test, expect, describe } from '@jest/globals';
import fs from 'fs';
import path from 'path';
import genDiff from '../src/main.js';

const getFixturePath = (filename) => path.resolve(process.cwd(), '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8').trim();
const cases = [
  ['json', 'json', 'stylish'],
  ['json', 'json', 'plain'],
  ['yml', 'yml', 'stylish'],
  ['yml', 'yml', 'plain'],
  ['yml', 'yml', 'json'],
  ['yml', 'json', 'plain'],
];

const expectedData = {
  stylish: readFile('stylish-result.txt'),
  plain: readFile('plain-result.txt'),
  json: readFile('json-result.txt'),
};

describe.each(cases)('genDiff between %s and %s to %s', (type1, type2, format) => {
  test('valid data', () => {
    const expected = expectedData[format];
    const path1 = getFixturePath(`file1.${type1}`);
    const path2 = getFixturePath(`file2.${type2}`);
    const actual = genDiff(path1, path2, format);

    expect(actual).toEqual(expected);
  });
});
