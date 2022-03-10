import * as fs from 'fs';
import * as path from 'path';
import parseData from './parser.js';
import getComparedData from './compare-data.js';
import getFormattedData from './formatters/index.js';

const readFile = (file) => {
  const filePath = path.isAbsolute(file) ? file : path.resolve(process.cwd(), file);
  const fileType = path.extname(filePath).slice(1);
  return parseData(fs.readFileSync(filePath, 'utf8'), fileType);
};

const genDiff = (file1, file2, formatName) => {
  const data = getComparedData(readFile(file1), readFile(file2));
  return getFormattedData(data, formatName);
};

export default genDiff;
