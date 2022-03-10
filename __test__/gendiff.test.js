import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import * as path from 'path';
import genDiff from '../index.js';
import getStylishFormatMockData from '../__fixtures__/mocks/stylish.js';
import getPlainFormatMockData from '../__fixtures__/mocks/plain.js';
import getJsonFormatMockData from '../__fixtures__/mocks/json.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const getDiffStylishExpectedResult = getStylishFormatMockData();
const getDiffPlainExpectedResult = getPlainFormatMockData();
const getDiffJsonExpectedResult = getJsonFormatMockData();

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

test('genDiff, JSON files, json.js format', () => {
  const getDiffResultJson = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'json');
  expect(getDiffResultJson).toBe(getDiffJsonExpectedResult);
});
