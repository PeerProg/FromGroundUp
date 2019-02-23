const users = [{
  createdAt: "2019-02-17T17:36:48.754Z",
  email: "john@doe.com",
  id: "d560c7f6-dd9e-4944-8a8f-9t4519e56t4e",
  imageURL: null,
  isActive: true,
  isAdmin: false,
  isSuperAdmin: false,
  token: "jkdjjkdsjkdjkjkjjjldljsldssd",
  updatedAt: "2019-02-22T13:12:48.476Z",
  username: "johndoe"
}];

export default {
  updateUserInfo({ username, email, imageURL, id }) {
    const selectedUser = users.find(user => user.id === id);
    const modifiedUser = { ...selectedUser, username, email, imageURL };
    return {
      data: {
        ...modifiedUser
      }
    }
  },
  firstUser: users[0]
}
