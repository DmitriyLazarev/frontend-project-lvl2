import _ from 'lodash';

const getComparedData = (data1, data2) => {
  const sortedAllKeysArray = _.sortBy(_.uniq(Object.keys({ ...data1, ...data2 })));

  return sortedAllKeysArray.map((key) => {
    const value1 = data1[key];
    const value2 = data2[key];

    if (!_.has(data1, key)) {
      return { actionType: 'added', key, value: value2 };
    }
    if (!_.has(data2, key)) {
      return { actionType: 'removed', key, value: value1 };
    }
    if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
      return { actionType: 'compareChildren', key, value: getComparedData(value1, value2) };
    }
    if (!_.isEqual(value1, value2)) {
      return {
        actionType: 'updated', key, removedValue: value1, value: value2,
      };
    }
    return { actionType: 'equal', key, value: value1 };
  });
};

export const getActionType = (data) => (_.has(data, 'actionType') ? data.actionType : undefined);
export const getKey = (data) => data.key;
export const getValue = (data) => data.value;
export const getRemovedValue = (data) => data.removedValue;

export default getComparedData;
