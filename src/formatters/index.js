import plain from './plain.js';
import stylish from './stylish.js';

export default (data, format) => {
  switch (format) {
    case 'stylish':
      return stylish(data);
    case 'plain':
      return plain(data);
    default:
      throw new Error(`${format} not supported`);
  }
};
