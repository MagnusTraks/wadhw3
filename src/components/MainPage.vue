<template>
    <div id="app">
      <header class="header">
        <ul class="nav">
          <li><router-link to="/">Home</router-link></li>
          <li><router-link to="/signup">Sign Up</router-link></li>
        </ul>
        <div class="logo">
        <img src="images/pilt.jpg" alt="My picture" width="50" height="50"/>
      </div>
      </header>
      <router-view></router-view> 
      <div class="container">
        <div class="left-box"></div>
        <div class="main-content" id="main-content">
          <div v-for="post in posts" :key="post.createTime" class="post">
            <div class="post-header">
              <img class="profile-pic" src="images/pilt.jpg" alt="Profile Picture" />
              <div class="post-info">
                <p class="authorName">{{ post.authorName }}</p>
                <p class="post-date">{{ post.createTime }}</p>
                <p class="post-location" v-if="post.location">{{ post.location }}</p>
              </div>
            </div>
            <p>{{ post.postContent }}</p>
            <img v-if="post.imageUrl" :src="post.imageUrl" alt="Post image" class="post-img" />
            <button @click="likePost(post)">Like ({{ post.likes || 0 }})</button>
          </div>
        </div>
        <div class="right-box"></div>
      </div>
      <button @click="resetLikes">Reset All Likes</button>
      <footer class="footer">
        <p>&copy; 2024 PostIt</p>
      </footer>
    </div>
    
  </template>
  
  <script>
  import { computed, onMounted } from 'vue';
  import { useStore } from 'vuex';
  
  export default {
    name: 'App',
    setup() {
      const store = useStore();
  
      const posts = computed(() => store.getters.posts);
  
      onMounted(() => {
        store.dispatch('fetchPosts');
      });
  
      const likePost = (post) => {
        store.commit('likePost', post.createTime);
      };
  
      const resetLikes = () => {
        store.commit('resetLikes');
      };
  
      return {
        posts,
        likePost,
        resetLikes,
      };
    },
  };
  </script>

  