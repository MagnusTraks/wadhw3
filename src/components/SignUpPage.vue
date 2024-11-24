<template>
  <div class="container">
    <div class="signup-box">
      <form @submit.prevent="signup">
        <div>
          <label for="email">Email</label>
          <input type="email" id="email" v-model="email" required />
        </div>

        <div>
          <label for="password">Password</label>
          <input type="password" id="password" v-model="password" required />
        </div>

        <p v-if="passwordError" class="error">{{ passwordError }}</p>

        <button type="submit" class="signup-btn">Signup</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      passwordError: '', // For displaying validation messages
    };
  },
  methods: {
    validatePassword(password) {
      const errors = [];
      if (password.length < 8 || password.length >= 15) {
        errors.push('Password must be between 8 and 15 characters.');
      }
      if (!/^[A-Z]/.test(password)) {
        errors.push('Password must start with an uppercase letter.');
      }
      if (!/[A-Z]/.test(password)) {
        errors.push('Password must include at least one uppercase letter.');
      }
      if (!/[a-z].*[a-z]/.test(password)) {
        errors.push('Password must include at least two lowercase letters.');
      }
      if (!/\d/.test(password)) {
        errors.push('Password must include at least one numeric value.');
      }
      if (!/_/.test(password)) {
        errors.push('Password must include the character "_".');
      }

      return errors;
    },
    signup() {
      const passwordValidationErrors = this.validatePassword(this.password);

      if (passwordValidationErrors.length > 0) {
        this.passwordError = `The password is not valid - ${passwordValidationErrors.join(
          ' '
        )}`;
        return;
      }

      // If password is valid
      console.log('Signup successful with', this.email, this.password);
      this.passwordError = '';
      this.$router.push('/');
    },
  },
};
</script>
