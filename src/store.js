import { createStore } from 'vuex';

const store = createStore({
  state() {
    return {
      posts: []
    };
  },
  mutations: {
    setPosts(state, posts) {
      state.posts = posts;
    },
    likePost(state, postId) {
      const post = state.posts.find(post => post.id === postId);
      if (post) post.likes += 1;
    },
    resetLikes(state) {
      state.posts.forEach(post => post.likes = 0);
    }
  },
  actions: {
    fetchPosts({ commit }) {
      fetch('posts.json')
        .then(response => response.json())
        .then(posts => {
          commit('setPosts', posts);
        })
        .catch(error => console.error('Error fetching posts:', error));
    }
  },
  getters: {
    posts: state => state.posts
  }
});

export default store;
