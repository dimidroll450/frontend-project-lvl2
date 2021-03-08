import fs from 'fs';
import path from 'path';
import toParse from './parsers.js';
import astDiff from './ast-diff.js';
import render from './formatters/index.js';

const readFile = (pathToFile) => fs.readFileSync(path.resolve(process.cwd(), pathToFile), 'utf-8');

export default (path1, path2, format = 'stylish') => {
  const data1 = readFile(path1);
  const data2 = readFile(path2);

  const obj1 = toParse(data1, path1);
  const obj2 = toParse(data2, path2);

  const ast = astDiff(obj1, obj2);
  const result = render(ast, format);
  return result;
};
