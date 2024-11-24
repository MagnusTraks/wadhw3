import { createStore } from 'vuex';

const store = createStore({
  state() {
    return {
      posts: [] 
    };
  },
  mutations: {
    setPosts(state, posts) {
      state.posts = posts.map(post => ({
        ...post,
        likes: post.likes || 0
      }));
    },
    likePost(state, post) {
      const targetPost = state.posts.find(p => p.createTime === post.createTime);
      if (targetPost) {
        targetPost.likes += 1;
      }
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