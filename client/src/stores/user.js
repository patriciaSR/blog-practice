import login from '../resources/login'

export default {
  state: {
    token: null,
    data: null
  },

  async authenticate(username, password) {
    const result = await login(username, password)

    if(result) {
      this.state.token = result.token
      this.state.data = result.userData
    }

    return result
  },
}
