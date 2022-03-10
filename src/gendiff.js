import * as fs from 'fs';
import * as path from 'path';
import parseData from './parser.js';
import getComparedData from './compare-data.js';
import getFormattedData from './formatters/index.js';

const readFile = (file) => {
  const filePath = path.isAbsolute(file) ? file : path.resolve(process.cwd(), file);
  const extname = path.extname(filePath);
  return parseData(extname, fs.readFileSync(filePath, 'utf8'));
};

const genDiff = (file1, file2, formatName = 'stylish') => {
  const data = getComparedData(readFile(file1), readFile(file2));
  return getFormattedData(data, formatName);
};

export default genDiff;
