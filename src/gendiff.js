import * as fs from 'fs';
import * as path from 'path';
import checkAndParseFormat from './parser.js';
import compareData from './compare-data.js';
import stylish from './formatters/stylish.js';

const readFile = (file) => {
  const filePath = path.isAbsolute(file) ? file : path.resolve(process.cwd(), file);
  const extname = path.extname(filePath);
  return checkAndParseFormat(extname, fs.readFileSync(filePath, 'utf8'));
};

const formatData = (data, format) => {
  if (format === 'stylish') {
    return stylish(data);
  }
  return null;
};

const genDiff = (file1, file2, format = 'stylish') => {
  const data = compareData(readFile(file1), readFile(file2));
  return formatData(data, format);
};

export default genDiff;
