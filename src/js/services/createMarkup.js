import refs from './refs';
const { selectEl } = refs;

export default function createMarkup(data) {
  return data.map(({ id, name }) => ({ text: name, value: id }));
}

