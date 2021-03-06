import stylish from './formaters/stylish.js';

export default (data, format) => {
  switch (format) {
    case 'stylish':
      return stylish(data);
    default:
      throw new Error(`${format} not supported`);
  }
};
