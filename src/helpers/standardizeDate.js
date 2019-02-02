import moment from 'moment';

export default (rawDate) => {
  const formattedDate = moment(new Date(rawDate)).format('LLL');
  const elements = formattedDate.split(' ')
  const mutatedTimePortion = elements[3][1] === ':' ? `0${elements[3]}` : elements[3];
  const newElements = elements.map((element, index) => {
    return index === 3 ? mutatedTimePortion : element;
  })
  return newElements.join(' ');
}
