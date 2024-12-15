<template>
    <div class="container" v-if="post">
      <div class="post">
        <div class="post-header">
          <img class="profile-pic" src="../assets/logo.png" alt="Profile Picture" />
          <div class="post-info">
            <p class="authorName">{{ post.authorName }}</p>
            <p class="post-date">{{ formatDate(post.createTime) }}</p>
            <p class="post-location" v-if="post.location">{{ post.location }}</p>
          </div>
        </div>
        <p v-if="!isEditing">{{ post.postContent }}</p>
        <textarea v-else v-model="updatedPostContent"></textarea>
        <img v-if="post.imageUrl" :src="post.imageUrl" alt="Post image" class="post-img" />
        <button v-if="!isEditing" @click="startEditing">Update</button>
        <button v-if="isEditing" @click="updatePost">Save Changes</button>
        <button @click="deletePost">Delete</button>
      </div>
    </div>
  </template>
  
  <script>
  import { onMounted, ref } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import api from '@/services/api';
  
  export default {
    setup() {
      const route = useRoute();
      const router = useRouter();
      const post = ref(null);
      const isEditing = ref(false);
      const updatedPostContent = ref('');
  
      onMounted(async () => {
        const postId = route.params.id;
        try {
          const response = await api.get(`/posts/${postId}`);
          post.value = response.data;
          updatedPostContent.value = post.value.postContent;
        } catch (error) {
          console.error('Error fetching post:', error);
          // Handle error, e.g., redirect to 404 page
        }
      });
  
      const startEditing = () => {
        isEditing.value = true;
      };
  
      const updatePost = async () => {
        try {
          await api.put(`/posts/${post.value.id}`, {
            postContent: updatedPostContent.value,
          });
          post.value.postContent = updatedPostContent.value;
          isEditing.value = false;
        } catch (error) {
          console.error('Error updating post:', error);
        }
      };
  
      const deletePost = async () => {
        if (confirm('Are you sure you want to delete this post?')) {
          try {
            await api.delete(`/posts/${post.value.id}`);
            router.push('/');
          } catch (error) {
            console.error('Error deleting post:', error);
          }
        }
      };
  
      const formatDate = (dateString) => {
        if (!dateString) return ''; 
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
      };
  
      return {
        post,
        isEditing,
        updatedPostContent,
        startEditing,
        updatePost,
        deletePost,
        formatDate,
      };
    },
  };
  </script>