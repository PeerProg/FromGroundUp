import Api from './Api';


export default {
  homeUrl() {
    return Api().get('api/v1')
  }
  // registerUser(credentials) {
  //   return Api().post('register', credentials)
  // },

  // login(credentials) {
  //   return Api().post('login', credentials)
  // }
}