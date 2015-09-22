import objectPath from 'object-path';

export default function hydrate(flat) {
  return Object.keys(flat).reduce((obj, path) => {
    objectPath.set(obj, path, flat[path]);
    return obj;
  }, {});
}
