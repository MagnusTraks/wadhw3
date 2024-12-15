<template>
    <div class="container">
      <h2>Add New Post</h2>
      <form @submit.prevent="addPost">
        <div>
          <label for="postContent">Post Content</label>
          <textarea id="postContent" v-model="postContent" required></textarea>
        </div>
        <div>
          <button type="submit">Add Post</button>
        </div>
      </form>
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