import Api from './Api';

export const fetchMyHabits = userId => {
  return Api()
    .get(`api/v1/habit/user/${userId}/all-habits`)
    .then(res => Promise.resolve(res.data))
    .catch(err => Promise.reject(err.response.data.error));
};

export const createNewHabit = credentials => {
  return Api()
    .post(`api/v1/habit/create`, credentials)
    .then(res => Promise.resolve(res.data))
    .catch(err => Promise.reject(err.response.data.error));
};

export const deleteHabit = ({ userId, habitId }) => {
  return Api()
    .delete(`api/v1/habit/user/${userId}/${habitId}`)
    .then(res => Promise.resolve(res.data))
    .catch(err => Promise.reject(err.response.data.error));
};

export const updateHabitName = ({ userId, habitId, name }) => {
  return Api()
    .patch(`api/v1/habit/user/${userId}/${habitId}`, { name })
    .then(res => Promise.resolve(res.data))
    .catch(err => Promise.reject(err.response.data.error));
};
