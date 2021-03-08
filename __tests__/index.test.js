import { test, expect, describe } from '@jest/globals';
import fs from 'fs';
import path from 'path';
import genDiff from '../src/index.js';

const getFixturePath = (filename) => path.resolve(process.cwd(), '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8').trim();

const stylishResult = readFile('stylish-result.txt');
const plainResult = readFile('plain-result.txt');

describe('JSON files', () => {
  const path1 = getFixturePath('file1.json');
  const path2 = getFixturePath('file2.json');

  test('formatters', () => {
    expect(genDiff(path1, path2)).toEqual(stylishResult);
    expect(genDiff(path1, path2, 'plain')).toEqual(plainResult);
  });
});

describe('YAML files', () => {
  const path1 = getFixturePath('file1.yml');
  const path2 = getFixturePath('file2.yml');

  test('formatters', () => {
    expect(genDiff(path1, path2)).toEqual(stylishResult);
    expect(genDiff(path1, path2, 'plain')).toEqual(plainResult);
  });
});
