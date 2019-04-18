import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    posts: [],
    comments: [],
  },
  mutations: {
    setUser(state, user) {
      console.log("store got new user");
      state.user = user;
    },
    setPosts(state, posts) {
      console.log("store got new posts");
      state.posts = posts;
    },
    setComments(state, comments) {
      console.log("store got new comments");
      state.comments = comments;
    },
  },
  actions: {
    //user actions
    async register(context, data) {
      try {
        let response = await axios.post("/api/users", data);
        context.commit('setUser', response.data);
        return "";
      } catch (error) {
        return error.response.data.message;
      }
    },
    async login(context, data) {
      try {
        let response = await axios.post("/api/users/login", data);
        context.commit('setUser', response.data);
        return "";
      } catch (error) {
        return error.response.data.message;
      }
    },
    async logout(context) {
      try {
        await axios.delete("/api/users");
        context.commit('setUser', null);
        return "";
      } catch (error) {
        return error.response.data.message;
      }
    },
    async getUser(context) {
      try {
        let response = await axios.get("/api/users");
        context.commit('setUser', response.data);
        return "";
      } catch (error) {
        return "";
      }
    },
    //post actions
    async createPost(context, data) {
      try {
        await axios.post('/api/posts', data);
        return "";
      } catch (error) {
        return error.response.data.message;
      }
    },
    async getMyPosts(context) {
      try {
        let response = await axios.get("/api/posts");
        context.commit('setPosts', response.data);
        return "";
      } catch (error) {
        return "";
      }
    },
    async getAllPosts(context) {
      try {
        let response = await axios.get("/api/posts/all");
        context.commit('setPosts', response.data);
        return "";
      } catch (error) {
        return "";
      }
    },
    async getPost(context, id) {
      //console.log("getphoto firing for ID " + id);
      try {
        let response = await axios.get("/api/posts/" + id);
        //console.log("getphoto return below");
        //console.log(response.data[0]);
        //context.commit('setPhoto', response.data[0]);
        context.commit('setPosts', response.data);
        return "";
      } catch (error) {
        console.log("getpost error");
        console.log(error);
        return "";
      }
    },
    async deletePost(context, id) {
      try {
        let response = axios.delete("/api/posts/" + id);
        return "";
      } catch (error) {
        console.log("post deletion error");
        return "";
      }
    },
    //need put action here
    //comment actions
    async getComments(context, id) {
      console.log("getcomments firing for ID" + id);
      try {
        let response = await axios.get("/api/comments/" + id);
        context.commit('setComments', response.data);
        return "";
      } catch (error) {
        console.log("getcomments error");
        return "";
      }
    },
    async postComment(context, data) {
      try {
        await axios.post('/api/comments', data);
        return "";
      } catch (error) {
        return error.response.data.message;
      }
    },
    async deletePostComments(context, id) {
      try {
        await axios.delete('/api/comments/' + id);
        return "";
      } catch (error) {
        return error.response.data.message;
      }
    },
    async deleteOneComment(context, id) {
      try {
        await axios.delete('/api/comments/one/' + id);
        return "";
      } catch (error) {
        return error.response.data.message;
      }
    },
    //maybe edit?
  },
})
