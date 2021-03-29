import _ from 'lodash';

const getIndent = (depth, indents = 2) => ' '.repeat(depth * indents);

const prefixes = {
  deleted: '- ',
  added: '+ ',
  unchanged: '  ',
};

const mapObject = (item, depth = 1) => {
  if (!_.isObject(item)) {
    return item;
  }
  const lines = Object.entries(item).map(([key, value]) => `${getIndent(depth)}${prefixes.unchanged}${key}: ${mapObject(value, depth + 2)}`);
  const string = lines.join('\n');
  return `{\n${string}\n${getIndent(depth - 1)}}`;
};

const stringify = (ast, depth = 1) => {
  const genStr = (item, value, type) => `${getIndent(depth)}${prefixes[type]}${item.key}: ${mapObject(item[value], depth + 2)}`;
  const map = ast.flatMap((item) => {
    const { state } = item;

    switch (state) {
      case 'nested':
        return `${getIndent(depth)}${prefixes.unchanged}${item.key}: ${stringify(item.children, depth + 2)}`;
      case 'deleted':
        return genStr(item, 'value', 'deleted');
      case 'added':
        return genStr(item, 'value', 'added');
      case 'changed':
        return `${genStr(item, 'originalValue', 'deleted')}\n${genStr(item, 'changedValue', 'added')}`;
      default:
        return genStr(item, 'value', 'unchanged');
    }
  });
  const string = map.join('\n');
  const i = depth === 0 ? 0 : depth - 1;
  const result = `{\n${string}\n${getIndent(i)}}`;
  return result;
};

export default stringify;
