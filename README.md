# Difference calculator

### Hexlet tests and linter status:
[![Actions Status](https://github.com/dimidroll450/frontend-project-lvl2/workflows/hexlet-check/badge.svg)](https://github.com/dimidroll450/frontend-project-lvl2/actions)
[![js-linter](https://github.com/dimidroll450/frontend-project-lvl2/workflows/js-linter/badge.svg)](https://github.com/dimidroll450/frontend-project-lvl2/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/bcc43bd08edb43133437/maintainability)](https://codeclimate.com/github/dimidroll450/frontend-project-lvl2/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/bcc43bd08edb43133437/test_coverage)](https://codeclimate.com/github/dimidroll450/frontend-project-lvl2/test_coverage)

## About the utility
A difference calculator is a program that determines the difference between two data structures. Such a mechanism is used when outputting tests or when automatically tracking changes in configuration files.

Features of utilities:
- support of different input format: yaml, json;
- report generation in different format: plain text, stylish and json;

### Install (use local)
This package is not installed to NPM registry so you need to clone it from GitHub. After you have copied the project to your computer, go to the game directory and run the command:
```bash
make link
```

### Uninstall
```bash
npm unlink
rm -r frontend-project-lvl2
```

## Example of usage
```bash
# format plain
$ gendiff --format plain path/to/file.yml another/path/file.json

Property 'common.follow' was added with value: false
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group2' was removed

# format stylish
$ gendiff filepath1.json filepath2.json

{
  + follow: false
    setting1: Value 1
  - setting2: 200
  - setting3: true
  + setting3: {
        key: value
    }
  + setting4: blah blah
  + setting5: {
        key5: value5
    }
}
```
