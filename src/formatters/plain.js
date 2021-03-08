import _ from 'lodash';

const getValue = (value) => {
  const str = typeof value === 'string' ? `'${value}'` : value;
  const result = _.isObject(value) ? '[complex value]' : str;
  return result;
};
const plain = (data, parentKey = null) => {
  const mapped = data.flatMap((item) => {
    const { state } = item;
    const currentKey = parentKey === null ? item.key : `${parentKey}.${item.key}`;

    switch (state) {
      case 'nested':
        return plain(item.children, currentKey);
      case 'unchanged':
        return '';
      case 'changed':
        return `Property '${currentKey}' was updated. From ${getValue(item.originalValue)} to ${getValue(item.changedValue)}`;
      case 'deleted':
        return `Property '${currentKey}' was removed`;
      case 'added':
        return `Property '${currentKey}' was added with value: ${getValue(item.value)}`;
      default:
        throw new Error('Invalid data');
    }
  });
  const filtered = mapped.filter((item) => item.length !== 0);

  return filtered.join('\n');
};

export default plain;
