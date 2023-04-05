// eslint-disable-next-line import/no-extraneous-dependencies
import moment from 'moment';

export const isDateFormatValid = (date) => moment(date, 'YYYY/MM/DD', true).isValid();

export const getAge = (birthday) => new Date(new Date() - new Date(birthday)).getFullYear() - 1970;
