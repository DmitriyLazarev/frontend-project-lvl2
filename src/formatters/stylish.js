import {
  getKey, getActionType, getValue, getRemovedValue,
} from '../compare-data.js';

const gap = (depth, spaceCount = 4) => ' '.repeat(spaceCount * depth - 2); // prefix + indent

const objectToString = (obj, depth, depthStep) => {
  const result = Object.entries(obj).map(([k, v]) => {
    if (typeof v === 'object') {
      return `${gap(depth + depthStep)}  ${k}: ${objectToString(v, depth + depthStep, depthStep)}`;
    }
    return `${gap(depth + depthStep)}  ${k}: ${v}`;
  });

  return [
    '{',
    result.join('\n'),
    `${gap(depth + depthStep / 2)}}`,
  ].join('\n');
};

const stylish = (data) => {
  const depthStep = 1;
  const iter = (tree, depth) => tree.map((item) => {
    const key = getKey(item);
    const value = getValue(item);

    const valueToString = (prefix, val) => {
      if (typeof val === 'object' && !getActionType(val) && val !== null) {
        return `${gap(depth)}${prefix} ${key}: ${objectToString(val, depth, depthStep)}`;
      }
      return `${gap(depth)}${prefix} ${key}: ${val}`;
    };

    switch (getActionType(item)) {
      case 'added':
        return valueToString('+', value);
      case 'removed':
        return valueToString('-', value);
      case 'updated':
        return `${valueToString('-', getRemovedValue(item))}\n${valueToString('+', value)}`;
      case 'compareChildren':
        return valueToString(' ', [
          '{',
          iter(value, depth + depthStep).join('\n'),
          `${gap(depth + depthStep / 2)}}`,
        ].join('\n'));
      default:
        return valueToString(' ', value);
    }
  });

  const result = [
    '{',
    iter(data, depthStep).join('\n'),
    '}',
  ];

  return result.join('\n');
};

export default stylish;
