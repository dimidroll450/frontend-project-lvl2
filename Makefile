install:
	npm install

gendiff:
	node bin/gendiff.js

help:
	node bin/gendiff.js -h

lint:
	npx eslint .

test:
	npm test

publish:
	npm publish --dry-run

install-local:
	sudo npm link

.PHONY: test