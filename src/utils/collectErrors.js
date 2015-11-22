import groupBy from 'lodash.groupby';

export default function collectErrors(error) {
  if (error !== null) {
    return groupBy(error.details, 'path');
  }
  return {};
}
