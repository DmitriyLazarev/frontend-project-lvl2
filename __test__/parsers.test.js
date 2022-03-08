import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import * as path from 'path';
import fs from 'fs';
import yamlParser from '../src/parsers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('yamlParser', () => {
  const actualResult = yamlParser(fs.readFileSync(getFixturePath('flatfile1.yaml'), 'utf8'));
  const expectedResult = {
    follow: false, host: 'hexlet.io', proxy: '123.234.53.22', timeout: 50,
  };
  expect(actualResult).toEqual(expectedResult);
});
