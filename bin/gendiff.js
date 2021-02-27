#!/usr/bin/env node

import { Command } from 'commander';
import getDifferences from '../src/index.js';

const program = new Command();

program
  .version('0.1.0', '-V, --version', 'output the version number')
  .arguments('<filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format')
  .action((first, second) => {
    console.log(getDifferences(first, second));
  })
  .parse(process.argv);
