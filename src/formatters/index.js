import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const formatData = (data, format) => {
  switch (format) {
    case 'plain':
      return plain(data);
    case 'json':
      return json(data);
    default:
      return stylish(data);
  }
};

export default formatData;