import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import * as path from 'path';
import fs from 'fs';
import checkAndParseFormat from '../src/parser.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');
const extname = (filename) => path.extname(getFixturePath(filename));

test('Parsers', () => {
  const file1 = 'flatfile1.yaml';
  const file2 = 'flatfile1.json';
  const actualResult = checkAndParseFormat(extname(file1), readFile(file1));
  const expectedResult = checkAndParseFormat(extname(file2), readFile(file2));
  expect(actualResult).toEqual(expectedResult);
});
