#!/usr/bin/env node

import { Command } from 'commander';
import getDifferences from '../src/index.js';

const program = new Command();

program
  .version('0.5.1', '-V, --version', 'output the version number')
  .arguments('<filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format')
  .action((filepath1, filepath2, options) => {
    console.log(getDifferences(filepath1, filepath2, options.format));
  })
  .parse(process.argv);
