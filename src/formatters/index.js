import formatDataInStylish from './stylish.js';
import formatDataInPlain from './plain.js';
import formatDataInJson from './json.js';

const getFormattedData = (data, format) => {
  switch (format) {
    case 'plain':
      return formatDataInPlain(data);
    case 'json':
      return formatDataInJson(data);
    default:
      return formatDataInStylish(data);
  }
};

export default getFormattedData;
