<template>
    <div class="container">
        <div class="signup-box">
      <div class="left-box"></div>
      <h2>Add New Post</h2>
      <form @submit.prevent="addPost">
        <div>
          <label for="postContent">Post Content</label>
          <textarea id="postContent" v-model="postContent" required></textarea>
        </div>
        <div>
          <button class="like-btn" type="submit">Add Post</button>
        </div>
      </form>
      <div class="right-box"></div>
    </div>
  </div>
  </template>
  
  <script>
  import api from '@/services/api';
  
  export default {
    data() {
      return {
        postContent: '',
      };
    },
    methods: {
      async addPost() {
        try {
          const newPost = {
            postContent: this.postContent,
            createTime: new Date().toISOString(),
          };
  
          await api.post('/posts', newPost);
          this.$router.push('/');
        } catch (error) {
          console.error('Error adding post:', error);
        }
      },
    },
  };
  </script>