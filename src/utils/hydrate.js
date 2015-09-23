import set from 'lodash.set';

export default function hydrate(flat) {
  return Object.keys(flat).reduce((obj, path) => set(obj, path, flat[path]), {});
}
