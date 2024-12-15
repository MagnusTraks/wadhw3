<template>
  <div id="app">
    <header class="header">
      <ul class="nav">
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/contact">Contacts</router-link></li> 
      </ul>
      <div class="logo">
        <img src="images/pilt.jpg" alt="My picture" width="50" height="50"/>
      </div>
    </header>

    <router-view></router-view> 

    <footer class="footer">
      <p>&copy; 2024 PostIt</p>
    </footer>
  </div>
</template>

<script>
import { useStore } from 'vuex';

export default {
  name: 'App',
  setup() {
    const store = useStore();

    return { store };
  },
};
</script>
