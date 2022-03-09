import * as fs from 'fs';
import * as path from 'path';
import checkAndParseFormat from './parser.js';
import compareData from './compare-data.js';
import formatData from './formatters/index.js';

const readFile = (file) => {
  const filePath = path.isAbsolute(file) ? file : path.resolve(process.cwd(), file);
  const extname = path.extname(filePath);
  return checkAndParseFormat(extname, fs.readFileSync(filePath, 'utf8'));
};

const genDiff = (file1, file2, formatName = 'stylish') => {
  const data = compareData(readFile(file1), readFile(file2));
  return formatData(data, formatName);
};

export default genDiff;
