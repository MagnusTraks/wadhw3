<template>
  <div id="app">
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
          <button @click="likePost(post)">Like ({{ post.likes}})</button>
        </div>
        <!-- Move the reset button inside the main-content div -->
        <button @click="resetLikes" class="reset-likes-btn">Reset All Likes</button>
      </div>
      <div class="right-box"></div>
    </div>
    <!-- Footer remains here -->
    <footer class="footer">
      <p>&copy; 2024 PostIt</p>
    </footer>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'MainPage',
  setup() {
    const store = useStore();

    const posts = computed(() => store.getters.posts);

    onMounted(() => {
      store.dispatch('fetchPosts');
    });

    const likePost = (post) => {
      store.commit('likePost', post);  // Pass the entire post object
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

<style scoped>
/* Add your styles here */
.reset-likes-btn {
  display: block;
  margin: 20px auto;
  padding: 10px 20px;
  background-color: #f56;
  color: white;
  border: none;
  cursor: pointer;
}

.reset-likes-btn:hover {
  background-color: #f33;
}
</style>
