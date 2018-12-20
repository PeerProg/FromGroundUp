import Api from './Api';

export const registerUser = credentials => {
  return Api()
    .post('api/v1/user/register', credentials)
    .then(res => Promise.resolve(res.data))
    .catch(err => Promise.reject(err.response.data.error));
};

export const loginUser = credentials => {
  return Api()
    .post('api/v1/user/login', credentials)
    .then(res => Promise.resolve(res.data))
    .catch(err => Promise.reject(err.response.data.error));
};

export const updateUserInfo = credentials => {
  return Api()
    .patch(`api/v1/user/${credentials.id}`, credentials)
    .then(res => Promise.resolve(res.data))
    .catch(err => Promise.reject(err.response.data.error));
};

export const validateToken = credentials => {
  return Api()
    .get(`api/v1/user/validateToken/${credentials.id}`)
    .then(res => Promise.resolve(res.data))
    .catch(err => Promise.reject(err.response.data.error));
};
