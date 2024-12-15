<template>
    <div class="container">
      <div class="signup-box">
        <form @submit.prevent="login">
          <div>
            <label for="email">Email</label>
            <input type="email" id="email" v-model="email" required />
          </div>
  
          <div>
            <label for="password">Password</label>
            <input type="password" id="password" v-model="password" required />
          </div>
  
          <p v-if="loginError" class="error">{{ loginError }}</p>
  
          <button type="submit" class="login-btn">Login</button>
        </form>
  
        <div class="signup-redirect">
          <p>Don't have an account?</p>
          <router-link to="/signup">Signup</router-link>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import api from '@/services/api';
  
  export default {
    data() {
      return {
        email: '',
        password: '',
        loginError: '',
      };
    },
    methods: {
      async login() {
        this.loginError = '';
  
        try {
          const response = await api.post('/auth/login', {
            email: this.email,
            password: this.password,
          });
  
          if (response.data.token) {
            this.$store.commit('setToken', response.data.token);
            this.$store.commit('setUser', response.data.user);
            this.$router.push('/');
          } else {
            this.loginError = 'Invalid email or password.';
          }
        } catch (error) {
          console.error('Login error:', error);
          this.loginError =
            error.response?.data?.message || 'Invalid email or password.';
        }
      },
    },
  };
  </script>