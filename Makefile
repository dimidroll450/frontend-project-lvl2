install:
	npm install

ast:
	node src/buildAST.js

help:
	node bin/gendiff.js -h

lint:
	npx eslint .

test:
	npm test

test-coverage:
	npm test -- --coverage --coverageProviders=v8

publish:
	npm publish --dry-run

link:
	sudo npm link

.PHONY: test