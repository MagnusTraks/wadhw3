<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/contact">Contact Us</router-link> |
      <button v-if="isLoggedIn" @click="logout">Logout</button>
      <router-link v-if="isLoggedIn" to="/add-post">Add Post</router-link>
      <button v-if="isLoggedIn" @click="deleteAllPosts">Delete All Posts</button>
    </nav>
    <router-view></router-view>
    <div class="container" v-if="isLoggedIn">
      <div class="left-box"></div>
      <div class="main-content" id="main-content">
        <div v-for="post in posts" :key="post.id" class="post">
          <div class="post-header">
            <img class="profile-pic" src="images/pilt.jpg" alt="Profile Picture" />
            <div class="post-info">
              <p class="authorName">{{ post.authorName }}</p>
              <p class="post-date">{{ formatDate(post.createTime) }}</p>
              <p class="post-location" v-if="post.location">{{ post.location }}</p>
            </div>
          </div>
          <router-link :to="'/post/' + post.id">
            <p>{{ post.postContent }}</p>
            <img v-if="post.imageUrl" :src="post.imageUrl" alt="Post image" class="post-img" />
          </router-link>
          <button class="like-btn" @click="likePost(post)">Like ({{ post.likes}})</button>
        </div>
      </div>
      <div class="right-box"></div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import api from '@/services/api'; 

export default {
  name: 'MainPage',
  setup() {
    const store = useStore();

    const posts = computed(() => store.getters.posts);
    const isLoggedIn = computed(() => store.getters.isLoggedIn);

    onMounted(async () => {
      if (isLoggedIn.value) {
        await store.dispatch('fetchPosts');
      }
    });

    const likePost = async (post) => {
      try {
        await api.put(`/posts/${post.id}/like`);
        store.dispatch('fetchPosts'); // Refresh posts after liking
      } catch (error) {
        console.error('Error liking post:', error);
      }
    };

    const logout = () => {
      store.dispatch('logout');
      this.$router.push('/login');
    };

    const deleteAllPosts = async () => {
      if (confirm('Are you sure you want to delete all posts?')) {
        try {
          await api.delete('/posts');
          store.dispatch('fetchPosts');
        } catch (error) {
          console.error('Error deleting posts:', error);
        }
      }
    };

    const formatDate = (dateString) => {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return {
      posts,
      isLoggedIn,
      likePost,
      logout,
      deleteAllPosts,
      formatDate,
    };
  },
};
</script>