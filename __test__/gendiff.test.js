import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import * as path from 'path';
import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const getDiffExpectedResult = '{\n'
  + '  - follow: false\n'
  + '    host: hexlet.io\n'
  + '  - proxy: 123.234.53.22\n'
  + '  - timeout: 50\n'
  + '  + timeout: 20\n'
  + '  + verbose: true\n'
  + '}';

test('genDiff Json', () => {
  const getDiffResultJson = genDiff(getFixturePath('flatfile1.json'), getFixturePath('flatfile2.json'));
  expect(getDiffResultJson).toBe(getDiffExpectedResult);
});

test('genDiff Yaml', () => {
  const getDiffResultYaml = genDiff(getFixturePath('flatfile1.yaml'), getFixturePath('flatfile2.yaml'));
  expect(getDiffResultYaml).toBe(getDiffExpectedResult);
});
