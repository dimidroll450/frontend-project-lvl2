import _ from 'lodash';

const getIndent = (depth, indents = 2) => ' '.repeat(depth * indents);

const mapping = {
  deleted: '- ',
  added: '+ ',
  unchanged: '  ',
};

const mapObject = (item, depth = 0) => {
  if (!_.isObject(item)) {
    return item;
  }
  const lines = Object.entries(item).map(([key, value]) => `${getIndent(depth)}${mapping.unchanged}${key}: ${mapObject(value, depth + 2)}`);
  const string = lines.join('\n');
  return `{\n${string}\n${getIndent(depth - 1)}}`;
};

const stringify = (ast, depth = 0) => {
  const map = ast.flatMap((item) => {
    const { state } = item;

    switch (state) {
      case 'nested':
        return `${getIndent(depth)}${mapping.unchanged}${item.key}: ${stringify(item.children, depth + 2)}`;
      case 'deleted':
        return `${getIndent(depth)}${mapping.deleted}${item.key}: ${mapObject(item.value, depth + 2)}`;
      case 'added':
        return `${getIndent(depth)}${mapping.added}${item.key}: ${mapObject(item.value, depth + 2)}`;
      case 'changed':
        return `${getIndent(depth)}${mapping.deleted}${item.key}: ${mapObject(item.originalValue, depth + 2)}
${getIndent(depth)}${mapping.added}${item.key}: ${mapObject(item.changedValue, depth + 2)}`;
      default:
        return `${getIndent(depth)}${mapping.unchanged}${item.key}: ${mapObject(item.value, depth + 2)}`;
    }
  });
  const string = map.join('\n');
  const i = depth === 0 ? 0 : depth - 1;
  const result = `{\n${string}\n${getIndent(i)}}`;
  return result;
};

export default stringify;
