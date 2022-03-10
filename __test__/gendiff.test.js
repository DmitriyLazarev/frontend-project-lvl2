import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import * as path from 'path';
import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const getDiffStylishExpectedResult = `{
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

const getDiffPlainExpectedResult = `Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]`;

const getDiffJsonExpectedResult = '[{"actionType":"compareChildren","key":"common","value":[{"actionType":"added","key":"follow","value":false},{"actionType":"equal","key":"setting1","value":"Value 1"},{"actionType":"removed","key":"setting2","value":200},{"actionType":"updated","key":"setting3","removedValue":true,"value":null},{"actionType":"added","key":"setting4","value":"blah blah"},{"actionType":"added","key":"setting5","value":{"key5":"value5"}},{"actionType":"compareChildren","key":"setting6","value":[{"actionType":"compareChildren","key":"doge","value":[{"actionType":"updated","key":"wow","removedValue":"","value":"so much"}]},{"actionType":"equal","key":"key","value":"value"},{"actionType":"added","key":"ops","value":"vops"}]}]},{"actionType":"compareChildren","key":"group1","value":[{"actionType":"updated","key":"baz","removedValue":"bas","value":"bars"},{"actionType":"equal","key":"foo","value":"bar"},{"actionType":"updated","key":"nest","removedValue":{"key":"value"},"value":"str"}]},{"actionType":"removed","key":"group2","value":{"abc":12345,"deep":{"id":45}}},{"actionType":"added","key":"group3","value":{"deep":{"id":{"number":45}},"fee":100500}}]';

test('genDiff, JSON files, stylish format', () => {
  const getDiffResultJson = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'));
  expect(getDiffResultJson).toBe(getDiffStylishExpectedResult);
});

test('genDiff, YAML files, stylish format', () => {
  const getDiffResultYaml = genDiff(getFixturePath('file1.yaml'), getFixturePath('file2.yaml'));
  expect(getDiffResultYaml).toBe(getDiffStylishExpectedResult);
});

test('genDiff, JSON files, plain format', () => {
  const getDiffResultJson = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'plain');
  expect(getDiffResultJson).toBe(getDiffPlainExpectedResult);
});

test('genDiff, YAML files, plain format', () => {
  const getDiffResultYaml = genDiff(getFixturePath('file1.yaml'), getFixturePath('file2.yaml'), 'plain');
  expect(getDiffResultYaml).toBe(getDiffPlainExpectedResult);
});

test('genDiff, JSON files, json format', () => {
  const getDiffResultJson = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'json');
  expect(getDiffResultJson).toBe(getDiffJsonExpectedResult);
});
