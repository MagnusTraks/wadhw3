import { createStore } from 'vuex';
import api from '@/services/api';

const store = createStore({
  state() {
    return {
      posts: [],
      token: localStorage.getItem('token') || null,
      user: JSON.parse(localStorage.getItem('user')) || null,
    };
  },
  mutations: {
    setPosts(state, posts) {
      state.posts = posts;
    },
    setToken(state, token) {
      state.token = token;
      localStorage.setItem('token', token);
    },
    setUser(state, user) {
      state.user = user;
      localStorage.setItem('user', JSON.stringify(user));
    },
    clearToken(state) {
      state.token = null;
      localStorage.removeItem('token');
    },
    clearUser(state) {
      state.user = null;
      localStorage.removeItem('user');
    },
    likePost(state, postId) {
      const post = state.posts.find((p) => p.id === postId);
      if (post) {
        post.likes++;
      }
    },
  },
  actions: {
    async fetchPosts({ commit, state }) {
      try {
        const response = await api.get('/posts', {
          headers: { Authorization: `Bearer ${state.token}` },
        });
        commit('setPosts', response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
        if (error.response && error.response.status === 401) {
          commit('clearToken');
          commit('clearUser');
        }
      }
    },
    logout({ commit }) {
      commit('clearToken');
      commit('clearUser');
    },
  },
  getters: {
    posts: (state) => state.posts,
    isLoggedIn: (state) => !!state.token,
  },
});

export default store;