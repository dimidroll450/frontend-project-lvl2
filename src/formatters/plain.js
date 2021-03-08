import _ from 'lodash';

const getValue = (value) => {
  const str = typeof value === 'string' ? `'${value}'` : value;
  const result = _.isObject(value) ? '[complex value]' : str;
  return result;
};
const plain = (data, parentKey = null) => {
  const result = data.reduce((acc, item) => {
    const { state } = item;
    const currentKey = parentKey === null ? item.key : `${parentKey}.${item.key}`;

    switch (state) {
      case 'nested':
        acc.push(plain(item.children, currentKey));
        break;
      case 'unchanged':
        break;
      case 'changed':
        acc.push(`Property '${currentKey}' was updated. From ${getValue(item.originalValue)} to ${getValue(item.changedValue)}`);
        break;
      case 'deleted':
        acc.push(`Property '${currentKey}' was removed`);
        break;
      case 'added':
        acc.push(`Property '${currentKey}' was added with value: ${getValue(item.value)}`);
        break;
      default:
        throw new Error('Invalid data');
    }
    return acc;
  }, []);

  return result.join('\n');
};

export default plain;
