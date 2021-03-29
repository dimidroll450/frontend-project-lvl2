import _ from 'lodash';

const astDiff = (data1, data2) => {
  const sortedKeys = _.sortBy(_.union(
    Object.keys(data1),
    Object.keys(data2),
  ));

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

    if (!_.has(data2, key)) {
      return {
        state: 'deleted',
        key,
        value: originalValue,
      };
    }

    if (!_.has(data1, key)) {
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
