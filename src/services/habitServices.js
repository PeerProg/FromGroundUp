import Api from './Api';

export const showMyHabits = userId => {
  if (userId) {
    return Api()
      .get(`api/v1/habit/user/${userId}/all-habits`)
      .then(res => Promise.resolve(res.data))
      .catch(err => Promise.reject(err.response.data.error));
  }
};
