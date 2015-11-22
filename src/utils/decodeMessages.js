import he from 'he';

export default function decodeMessages(error) {
  if (error !== null) {
    error.details = error.details.map(e => ({
      ...e,
      message: he.decode(e.message),
    }));
    return error;
  }
  return {};
}
