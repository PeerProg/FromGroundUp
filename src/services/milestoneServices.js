import Api from './Api';

export const fetchMilestones = habitId => {
  return Api()
    .get(`api/v1/milestone/${habitId}/milestones`)
    .then(res => Promise.resolve(res.data))
    .catch(err => Promise.reject(err.response.data.error));
};

export const createNewMilestone = credentials => {
  return Api()
    .post(`api/v1/milestone/${credentials.habitId}/add`, credentials)
    .then(res => Promise.resolve(res.data))
    .catch(err => Promise.reject(err.response.data.error));
};
