import yaml from 'js-yaml';
import path from 'path';

const jsonParse = (data) => JSON.parse(data);
const yamlParse = (data) => yaml.load(data, 'utf-8');

export default (data, filepath) => {
  const typeOfFile = path.extname(filepath);
  switch (typeOfFile) {
    case '.json':
      return jsonParse(data);
    case '.yml':
      return yamlParse(data);
    default:
      throw new Error(`${typeOfFile} not supported`);
  }
};
