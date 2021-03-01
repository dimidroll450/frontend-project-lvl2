import yaml from 'js-yaml';
import path from 'path';

const jsonParse = (data) => JSON.parse(data);
const yamlParse = (data) => yaml.load(data, 'utf-8');

export default (data, file) => {
  const typeOfFile = path.extname(file);
  switch (typeOfFile) {
    case '.json':
      return jsonParse(data);
    case '.yml':
      return yamlParse(data);
    default:
      throw new Error(`${typeOfFile} not supported`);
  }
};
