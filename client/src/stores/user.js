import login from '../resources/login';

export default {
  state: {
    token: null,
    data: null
  },

  async authenticate(username, password) {
    const result = await login(username, password);

    if(result) {
      this.state.token = result.token;
      this.state.data = result.userData;

      localStorage.setItem('userToken', this.state.token);
      localStorage.setItem('userData', JSON.stringify(this.state.data));
    }

    return result;
  },
  getFromLocalStorage(){
    this.state.token = localStorage.getItem('userToken');
    this.state.data = JSON.parse(localStorage.getItem('userData'));
  }
}

