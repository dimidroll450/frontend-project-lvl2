import _ from 'lodash';

const astDiff = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);

  const keys = _.union(keys1, keys2);
  const sortedKeys = _.sortBy(keys);

  return sortedKeys.flatMap((key) => {
    const originalValue = _.cloneDeep(data1[key]);
    const changedValue = _.cloneDeep(data2[key]);

    if (_.isObject(originalValue) && _.isObject(changedValue)) {
      return {
        state: 'nested',
        key,
        children: astDiff(originalValue, changedValue),
      };
    }

    if (_.has(data1, key) && !_.has(data2, key)) {
      return {
        state: 'deleted',
        key,
        value: originalValue,
      };
    }

    if (!_.has(data1, key) && _.has(data2, key)) {
      return {
        state: 'added',
        key,
        value: changedValue,
      };
    }

    if (originalValue === changedValue) {
      return {
        state: 'unchanged',
        key,
        value: originalValue,
      };
    }

    return {
      state: 'changed',
      key,
      originalValue,
      changedValue,
    };
  });
};

export default astDiff;
