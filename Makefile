install:
	npm install

publish:
	npm publish --dry-run

install-local:
	sudo npm link

gendiff:
	node bin/gendiff.js

help:
	node bin/gendiff.js -h

lint:
	npx eslint .

.PHONY: test