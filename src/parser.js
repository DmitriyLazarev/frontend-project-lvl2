import yaml from 'js-yaml';

const parseData = (data, type) => {
  switch (type) {
    case 'yaml':
    case 'yml':
      return yaml.load(data);
    case 'json':
      return JSON.parse(data);
    default:
      throw new Error(`Unknown file type: ${type}. Please use json or yaml`);
  }
};

export default parseData;
