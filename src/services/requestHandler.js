import Api from './Api';


export default {
  homeUrl() {
    return Api().get('api/v1')
  },
  registerUser(credentials) {
    return Api().post('api/v1/user/register', credentials)
  },
  loginUser(credentials) {
    return Api().post('api/v1/user/login', credentials)
  }
}