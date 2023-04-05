// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios';

const URL_USERPROFILES = 'https://raw.githubusercontent.com/alj-devops/santa-data/master/userProfiles.json';
const URL_USERS = 'https://raw.githubusercontent.com/alj-devops/santa-data/master/users.json';

export const getRegisteredUsersFromURL = async () => {
  const response = await axios.get(URL_USERS);
  return response ? response.data : null;
};

export const getUserProfilesFromURL = async () => {
  const response = await axios.get(URL_USERPROFILES);
  return response ? response.data : null;
};

const search = (arr, searchParam, field) => arr.find((e) => e[field] === searchParam);
export const searchUser = (arr, userId) => search(arr, userId, 'username');
export const searchUserProfile = (arr, userId) => search(arr, userId, 'userUid');
