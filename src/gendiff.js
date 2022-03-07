import * as fs from 'fs';
import * as path from 'path';
import _ from 'lodash';
import yaml from 'js-yaml';

const readFile = (file) => {
  const filePath = path.isAbsolute(file) ? file : path.resolve(process.cwd(), file);
  const extname = path.extname(filePath);
  let obj;
  if (extname === '.yaml' || extname === '.yml') {
    obj = yaml.load(fs.readFileSync(filePath, 'utf8'));
  } else {
    obj = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  }
  return [obj, Object.keys(obj)];
};

const compareToString = (compare) => {
  const data = _.clone(compare);

  const result = data.reduce((acc, item) => {
    acc.push(`  ${item.prefix} ${item.key}: ${item.value}`);
    return acc;
  }, []);

  result.unshift('{');
  result.push('}');

  return result.join('\n');
};

const genDiff = (file1, file2) => {
  const [file1Data, file1Keys] = readFile(file1);
  const [file2Data, file2Keys] = readFile(file2);

  const allKeysArray = _.sortBy(_.uniq(file1Keys.concat(file2Keys)));

  const compare = allKeysArray.reduce((acc, key) => {
    const wasInFirstFile = { prefix: '-', key, value: file1Data[key] };
    const wasInSecondFile = { prefix: '+', key, value: file2Data[key] };
    const wasInBothFiles = { prefix: ' ', key, value: file1Data[key] };

    if (file1Keys.includes(key) && file2Keys.includes(key)) {
      if (file1Data[key] !== file2Data[key]) {
        acc.push(wasInFirstFile);
        acc.push(wasInSecondFile);
      } else {
        acc.push(wasInBothFiles);
      }
    } else if (file1Keys.includes(key) && !file2Keys.includes(key)) {
      acc.push(wasInFirstFile);
    } else {
      acc.push(wasInSecondFile);
    }
    return acc;
  }, []);

  return compareToString(compare);
};

export default genDiff;
