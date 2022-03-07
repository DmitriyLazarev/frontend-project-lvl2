import * as fs from 'fs';
import * as path from 'path';
import _ from 'lodash';

const readFile = (file) => {
  const filePath = path.isAbsolute(file) ? file : path.resolve(process.cwd(), file);
  return fs.readFileSync(`${filePath}`, 'utf8');
};

const genDiff = (file1, file2) => {
  const file1Data = typeof file1 !== 'object' ? JSON.parse(readFile(file1)) : file1;
  const file2Data = typeof file2 !== 'object' ? JSON.parse(readFile(file2)) : file2;

  const file1Keys = Object.keys(file1Data);
  const file2Keys = Object.keys(file2Data);
  const allKeysArray = _.sortBy(_.uniq(file1Keys.concat(file2Keys)));

  const compare = allKeysArray.reduce((result, key) => {
    const plusPrefix = '+ ';
    const minusPrefix = '- ';
    const emptyPrefix = '  ';
    let value;

    if (file1Keys.includes(key) && file2Keys.includes(key)) {
      console.log(file1Data[key], typeof file1Data[key], key);
      console.log(file2Data[key], typeof file2Data[key], key);

      if (typeof file1Data[key] === 'object' && typeof file2Data[key] === 'object') {
        value = [emptyPrefix, key, genDiff(file1Data[key], file2Data[key])];
      } else if (typeof file1Data[key] === 'object' && typeof file2Data[key] !== 'object') {
        value = [minusPrefix, key, genDiff(file1Data[key], file1Data[key])];
        value = [plusPrefix, key, file2Data[key]];
      } else if (typeof file1Data[key] !== 'object' && typeof file2Data[key] === 'object') {
        value = [minusPrefix, key, file1Data[key]];
        value = [plusPrefix, key, genDiff(file2Data[key], file2Data[key])];
      }

      if (file1Data[key] !== file2Data[key]) {
        value = [minusPrefix, key, file1Data[key]];
        value = [plusPrefix, key, file2Data[key]];
      } else {
        value = [emptyPrefix, key, file1Data[key]];
      }
    } else if (file1Keys.includes(key) && !file2Keys.includes(key)) {
      if (typeof file1Data[key] === 'object') {
        value = [minusPrefix, key, genDiff(file1Data[key], file1Data[key])];
      } else {
        value = [minusPrefix, key, file1Data[key]];
      }
    } else if (typeof file2Data[key] === 'object') {
      value = [plusPrefix, key, genDiff(file2Data[key], file2Data[key])];
    } else {
      value = [plusPrefix, key, file2Data[key]];
    }
    result.push(value);
    return result;
  }, []);

  return compare;
};

export default genDiff;
