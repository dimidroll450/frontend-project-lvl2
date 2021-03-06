import { test, expect } from '@jest/globals';
// import fs from 'fs';
import path from 'path';
import genDiff from '../src/index.js';

const getFixturePath = (filename) => path.resolve(process.cwd(), '__fixtures__', filename);
// const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');
// я целую неделю жарися с этим тестом, но так и не вывез в возможность сравнения через фикстуру
// я сделаю так, чтобы остаточно не потерять свой рассудок. я поправлю, честное слово.
// у меня уже сил нету
const result = `{
  common: {
    + follow: false
      setting1: Value 1
    - setting2: 200
    - setting3: true
    + setting3: null
    + setting4: blah blah
    + setting5: {
          key5: value5
      }
      setting6: {
          doge: {
            - wow: 
            + wow: so much
          }
          key: value
        + ops: vops
      }
  }
  group1: {
    - baz: bas
    + baz: bars
      foo: bar
    - nest: {
          key: value
      }
    + nest: str
  }
- group2: {
      abc: 12345
      deep: {
          id: 45
      }
  }
+ group3: {
      deep: {
          id: {
              number: 45
          }
      }
      fee: 100500
  }
}`;

test('json files', () => {
  const path1 = getFixturePath('file1.json');
  const path2 = getFixturePath('file2.json');

  expect(genDiff(path1, path2)).toEqual(result);
});

test('yaml files', () => {
  const path1 = getFixturePath('file1.yml');
  const path2 = getFixturePath('file2.yml');

  expect(genDiff(path1, path2)).toEqual(result);
});
