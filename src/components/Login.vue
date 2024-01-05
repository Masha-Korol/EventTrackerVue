<template>
  <form>
    <div class="container">
      <label for="uname"><b>Username</b></label>
      <input type="text" placeholder="Enter Username" name="uname" v-model="userName" required>

      <label for="psw"><b>Password</b></label>
      <input type="password" placeholder="Enter Password" name="psw" v-model="password" required>

      <button type="submit" @click="login">Login</button>

      <p class="error-text" v-if="error">Неверные данные</p>
    </div>
  </form>
</template>

<script>
import axios from 'axios';
import {authenticateUser} from '@/util/authentication-helper';

export default {
  data() {
    return {
      userName: '',
      password: '',
      error: false
    }
  },
  methods: {
    login(event) {
      event.preventDefault();

      axios.post(`http://localhost:7010/api/users/login`,
          {
            userName: this.userName,
            password: this.password,
          }).then((response) => {
            this.error = false;
            authenticateUser(response.data.userName, response.data.password);
            this.$router.push(this.$route.query.returnUrl || '/');
          })
          .catch((e) => {
            this.error = true;
            if (e.response.status === 401 || e.response.status === 403) {
              localStorage.removeItem('user');
            }
          });
    }
  }
}
</script>

<style scoped>
form {
  border: 3px solid #f1f1f1;
  background-color: white;
}

input[type=text], input[type=password] {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  box-sizing: border-box;
}

button {
  background-color: #04AA6D;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 100%;
}

button:hover {
  opacity: 0.8;
}

.container {
  padding: 16px;
}

.error-text {
  color: red;
}
</style>
