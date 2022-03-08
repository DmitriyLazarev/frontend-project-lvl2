import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import * as path from 'path';
import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const getDiffExpectedResult = `{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: 
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}`;

test('genDiff Json stylish', () => {
  const getDiffResultJson = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'));
  expect(getDiffResultJson).toBe(getDiffExpectedResult);
});

test('genDiff Yaml stylish', () => {
  const getDiffResultYaml = genDiff(getFixturePath('file1.yaml'), getFixturePath('file2.yaml'));
  expect(getDiffResultYaml).toBe(getDiffExpectedResult);
});
