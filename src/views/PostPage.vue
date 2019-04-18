<template>
<div>
<post-gallery :posts="posts" />
<comment-gallery :comments="comments" />
<div v-if="user">
<form @submit.prevent="sendComment">
  <p>Add a comment:</p>
  <textarea v-model="comment" placeholder="comment"></textarea>
  <p></p>
  <button type="submit" class="pure-button pure-button-secondary">Submit</button>
</form>
</div>
</div>
</template>


<script>
import PostGallery from '@/components/PostGallery.vue'
import CommentGallery from '@/components/CommentGallery.vue'

export default {
  name: 'PostPage',
  components: {
    PostGallery,
    CommentGallery,
  },
  data() {
    return {
      comment: '',
      error: '',
    }
  },
  props: {
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    photos() {
      return this.$store.state.photos;
    },
    comments() {
      return this.$store.state.comments;
    },
  },
  async created() {
    await this.$store.dispatch("getUser");
    await this.$store.dispatch("getPhoto", this.$route.params.id);
    await this.$store.dispatch("getComments", this.$route.params.id);
  },
  methods: {
  async sendComment() {
    try {
      //const formData = new FormData();
      //formData.append('body', this.comment);
      //formData.append('photo', this.$route.params.id);
      this.error = await this.$store.dispatch("postComment", {body: this.comment, photo: this.$route.params.id});
      if (!this.error) {
        this.comment = '';
        this.$emit('uploadFinished');
      }
    } catch (error) {
      console.log(error);
    }
    await this.$store.dispatch("getComments", this.$route.params.id);
  },
 },
}
</script>

<style scoped>

textarea {
  width: 100%;
  height: 100px
}

.pure-button-secondary {
  float: right;
}
</style>
