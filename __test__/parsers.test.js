import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import * as path from 'path';
import fs from 'fs';
import parseData from '../src/parser.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');
const getType = (filename) => path.extname(getFixturePath(filename)).slice(1);

test('Parsers', () => {
  const file1 = 'flatfile1.yaml';
  const file2 = 'flatfile1.json';
  const actualResult = parseData(readFile(file1), getType(file1));
  const expectedResult = parseData(readFile(file2), getType(file2));
  expect(actualResult).toEqual(expectedResult);
});
