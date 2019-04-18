<template>
<div>
  <div class="header" v-if="user">
    <div>
      <h1>{{user.name}}</h1>
    </div>
    <div>
      <p>
        <a href="#" @click="logout">Logout</a>
      </p>
    </div>
  </div>
  <div class="header" v-else>
    <router-link to="/register" class="pure-button">Register</router-link> or
    <router-link to="/login" class="pure-button">Login</router-link>
  </div>
  <div class="create" v-if="user">
    <form @submit.prevent="createPost">
      <p>Create a Looking for Group post:</p>
      <input v-model="title" placeholder="Title"> Title of post<br/>
      <input v-model="game" placeholder="Game"> Name of Game<br/>
      <input v-model="playersNeeded" placeholder="1"> Number of players needed <br/>
      <textarea v-model="description" placeholder="Details..."></textarea>
      <p></p>
      <button type="submit" class="pure-button pure-button-secondary">Submit</button>
      </form>
  </div>
  <post-gallery :posts="posts" />

</div>
</template>

<script>
import PostGallery from '@/components/PostGallery.vue'
export default {
  name: 'mypage',
  components: {
    PostGallery,
  },
  data() {
    return {
      title: '',
      game: '',
      description: '',
      playersNeeded: '',
      error: '',
    }
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    posts() {
      return this.$store.state.posts;
    },
  },
  async created() {
    await this.$store.dispatch("getUser");
    await this.$store.dispatch("getMyPosts");
  },
  methods: {
    async logout() {
      try {
        this.error = await this.$store.dispatch("logout");
      } catch (error) {
        console.log(error);
      }
    },
    async createPost() {
      console.log("sending comment");
      try {
        this.error = await this.$store.dispatch("createPost",
          {title: this.title, game: this.game, description: this.description, needed: this.playersNeeded});
        if (!this.error) {
          this.title = '';
          this.game = '';
          this.description = '';
          this.playersNeeded = '';
          this.$emit('uploadFinished');
        }
      } catch (error) {
        console.log(error);
      }
      await this.$store.dispatch("getComments", this.$route.params.id);
    },
  }
}
</script>

<style scoped>
.header {
  display: flex;
}

.header a {
  padding-left: 50px;
  color: #222;
  font-size: 2em;
}

.create {
  text-align: left;
  color: black;
  background-color: #737373;
  border-radius: 10px;
  width: 50%;
  margin-left: 10%;
  padding: 10px;
}
</style>
