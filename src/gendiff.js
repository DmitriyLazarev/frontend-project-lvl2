import * as fs from 'fs';
import * as path from 'path';
import _ from 'lodash';

const readFile = (file) => {
  const filePath = path.isAbsolute(file) ? file : path.resolve(process.cwd(), file);
  return JSON.parse(fs.readFileSync(`${filePath}`, 'utf8'));
};

const compareToString = (compare) => {
  const data = _.clone(compare);

  const result = data.reduce((acc, item) => {
    acc.push(`  ${item.prefix} ${item.key}: ${item.value}`);
    return acc;
  }, []);

  result.unshift('{');
  result.push('{');

  return result.join('\n');
};

const genDiff = (file1, file2) => {
  const file1Data = readFile(file1);
  const file2Data = readFile(file2);

  const file1Keys = Object.keys(file1Data);
  const file2Keys = Object.keys(file2Data);
  const allKeysArray = _.sortBy(_.uniq(file1Keys.concat(file2Keys)));

  const compare = allKeysArray.reduce((result, key) => {
    const plusPrefix = '+';
    const minusPrefix = '-';
    const emptyPrefix = ' ';

    const wasInFirstFile = { prefix: minusPrefix, key, value: file1Data[key] };
    const wasInSecondFile = { prefix: plusPrefix, key, value: file2Data[key] };
    const wasInBothFiles = { prefix: emptyPrefix, key, value: file1Data[key] };

    if (file1Keys.includes(key) && file2Keys.includes(key)) {
      if (file1Data[key] !== file2Data[key]) {
        result.push(wasInFirstFile);
        result.push(wasInSecondFile);
      } else {
        result.push(wasInBothFiles);
      }
    } else if (file1Keys.includes(key) && !file2Keys.includes(key)) {
      result.push(wasInFirstFile);
    } else {
      result.push(wasInSecondFile);
    }
    return result;
  }, []);

  return compareToString(compare);
};

export default genDiff;
