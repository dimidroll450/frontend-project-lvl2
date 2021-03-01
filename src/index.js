import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import toParse from './parsers.js';

const readFile = (pathToFile) => fs.readFileSync(path.resolve(process.cwd(), pathToFile), 'utf-8');

export default (path1, path2) => {
  const data1 = readFile(path1);
  const data2 = readFile(path2);

  const obj1 = toParse(data1, path1);
  const obj2 = toParse(data2, path2);

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  const sec = keys2.filter((key) => !obj1[key]);
  const allKeys = [...keys1, ...sec];

  const sortedKeys = _.sortBy(allKeys);

  const difference = sortedKeys.reduce((acc, key) => {
    if (!_.has(obj2, key)) { // it`s problem
      acc.push(`- ${key}: ${obj1[key]}`);
    } else if (_.has(obj2, key)) {
      if (obj1[key] === obj2[key]) {
        acc.push(`  ${key}: ${obj1[key]}`);
      } else if (obj1[key] !== obj2[key] && obj1[key]) {
        acc.push(`- ${key}: ${obj1[key]}`);
        acc.push(`+ ${key}: ${obj2[key]}`);
      } else if (!_.has(obj2, key) && _.has(obj1, key)) {
        acc.push(`- ${key}: ${obj1[key]}`);
      } else if (_.has(obj2, key) && !_.has(obj1, key)) {
        acc.push(`+ ${key}: ${obj2[key]}`);
      }
    }
    return acc;
  }, []);

  // вынести в отдельный файл
  const string = difference.join('\n  ');
  const result = `
{
  ${string}
}`;

  return result;
};
