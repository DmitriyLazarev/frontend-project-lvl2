import {
  getKey, getActionType, getValue, getRemovedValue,
} from '../compare-data.js';

const setGap = (depth, spaceCount = 4) => ' '.repeat(spaceCount * depth - 2); // prefix + indent

const formatObjectToString = (obj, depth, depthStep) => {
  const result = Object.entries(obj).map(([k, v]) => {
    if (typeof v === 'object') {
      return `${setGap(depth + depthStep)}  ${k}: ${formatObjectToString(v, depth + depthStep, depthStep)}`;
    }
    return `${setGap(depth + depthStep)}  ${k}: ${v}`;
  });

  return [
    '{',
    result.join('\n'),
    `${setGap(depth + depthStep / 2)}}`,
  ].join('\n');
};

const formatValueToString = (prefix, key, value, depth, depthStep) => {
  if (typeof value === 'object' && !getActionType(value) && value !== null) {
    return `${setGap(depth)}${prefix} ${key}: ${formatObjectToString(value, depth, depthStep)}`;
  }
  return `${setGap(depth)}${prefix} ${key}: ${value}`;
};

const formatInStylish = (data) => {
  const depthStep = 1;
  const iter = (tree, depth) => tree.map((item) => {
    const key = getKey(item);
    const value = getValue(item);

    switch (getActionType(item)) {
      case 'added':
        return formatValueToString('+', key, value, depth, depthStep);
      case 'removed':
        return formatValueToString('-', key, value, depth, depthStep);
      case 'updated':
        return `${formatValueToString('-', key, getRemovedValue(item), depth, depthStep)}\n${formatValueToString('+', key, value, depth, depthStep)}`;
      case 'compareChildren':
        return formatValueToString(' ', key, [
          '{',
          iter(value, depth + depthStep).join('\n'),
          `${setGap(depth + depthStep / 2)}}`,
        ].join('\n'), depth, depthStep);
      default:
        return formatValueToString(' ', key, value, depth, depthStep);
    }
  });

  const result = [
    '{',
    iter(data, depthStep).join('\n'),
    '}',
  ];

  return result.join('\n');
};

export default formatInStylish;
