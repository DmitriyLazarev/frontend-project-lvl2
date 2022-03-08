import yaml from 'js-yaml';

const yamlParser = (file) => yaml.load(file);

export default yamlParser;
