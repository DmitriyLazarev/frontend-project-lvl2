import path from 'path';
import {
  getActionType, getKey, getRemovedValue, getValue,
} from '../compare-data.js';

const resolveItemType = (item) => {
  if (item === null) {
    return item;
  }
  switch (typeof item) {
    case 'string':
      return `'${item}'`;
    case 'object':
      return '[complex value]';
    default:
      return item;
  }
};

const formatDataInPlain = (data) => {
  const iter = (node, ancestry) => node.flatMap((item) => {
    const key = getKey(item);
    const value = getValue(item);

    const newAncestry = path.join(ancestry, `${key}`).split('/').join('.');

    switch (getActionType(item)) {
      case 'added':
        return `Property '${newAncestry}' was added with value: ${resolveItemType(value)}`;
      case 'removed':
        return `Property '${newAncestry}' was removed`;
      case 'updated':
        return `Property '${newAncestry}' was updated. From ${resolveItemType(getRemovedValue(item))} to ${resolveItemType(value)}`;
      case 'compareChildren':
        return iter(value, newAncestry);
      default:
        return '';
    }
  });

  const result = iter(data, '');
  return result.filter((item) => item !== '').join('\n');
};

export default formatDataInPlain;
