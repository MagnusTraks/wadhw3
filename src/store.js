import { createStore } from 'vuex';

const store = createStore({
  state() {
    return {
      posts: []  // Initialize the posts array
    };
  },
  mutations: {
    // Mutation to set posts when fetched
    setPosts(state, posts) {
      // Ensure each post has a 'likes' property initialized to 0 if not present
      state.posts = posts.map(post => ({
        ...post,
        likes: post.likes || 0  // Default likes to 0 if not present
      }));
    },
    likePost(state, post) {
      const targetPost = state.posts.find(p => p.createTime === post.createTime);
      if (targetPost) {
        targetPost.likes += 1;  // Increment the likes
      }
    },
    resetLikes(state) {
      state.posts.forEach(post => post.likes = 0); // Reset likes to 0
    }
  },
  actions: {
    // Action to fetch posts from a local JSON file or API
    fetchPosts({ commit }) {
      fetch('posts.json')  // Make sure the path is correct for your posts file
        .then(response => response.json())
        .then(posts => {
          commit('setPosts', posts);  // Commit the fetched posts to state
        })
        .catch(error => console.error('Error fetching posts:', error));
    }
  },
  getters: {
    // Getter to access the posts
    posts: state => state.posts
  }
});

export default store;