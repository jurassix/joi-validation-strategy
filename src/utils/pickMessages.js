
export default function pickMessages(error) {
  if (error !== null) {
    return Object.keys(error).reduce((obj, key) => {
      obj[key] = error[key].map(item => item.message);
      return obj;
    }, {});
  }
  return {};
}
