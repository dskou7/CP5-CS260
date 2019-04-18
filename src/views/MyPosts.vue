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
      show: false,
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

.header svg {
  margin-top: 12px;
}
</style>
