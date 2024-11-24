<template>
    <div class="signup-page">
  
      <div class="signup-box">
        <h1>Create Account</h1>
        <form @submit.prevent="signup">
  
          <label for="email">Email</label>
          <input type="email" id="email" v-model="email" required>
  
          <label for="password">Password</label>
          <input type="password" id="password" v-model="password" required>
  
          <button type="submit" class="signup-btn">Sign Up</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
export default {
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    signup() {
      if (this.email && this.password) {
        console.log('Signup successful with', this.email, this.password);
        
        this.$router.push('/');

      } else {
        alert('Please fill in all fields.');
      }
    }
  }
};
</script>
  

  