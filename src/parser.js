import yaml from 'js-yaml';

const checkAndParseFormat = (extension, data) => {
  if (extension === '.json') {
    return JSON.parse(data);
  }
  if (extension === '.yaml' || extension === '.yml') {
    return yaml.load(data);
  }
  throw new Error(`Unknown file format: ${extension}. Please use .json, .yaml or .yml.`);
};

export default checkAndParseFormat;
