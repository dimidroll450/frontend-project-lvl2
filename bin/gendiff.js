#!/usr/bin/env node

import { program } from 'commander/esm.mjs';
import genDiff from '../src/main.js';

program
  .version('0.5.1', '-V, --version', 'output the version number')
  .arguments('<filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format')
  .action((filepath1, filepath2, options) => {
    console.log(genDiff(filepath1, filepath2, options.format));
  })
  .parse(process.argv);
