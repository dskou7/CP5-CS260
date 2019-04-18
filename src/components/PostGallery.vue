<template>
<div>
  <div class="post" v-for="post in posts" v-bind:key="post._id">
    <router-link :to="{ name: 'post', params: { id: post._id }}">
    <div class="postInner">
      <p class="photoTitle">{{photo.title}}</p>
      <p class="photoDate">
        <span v-if="photo.user.name">{{photo.user.name}}, </span>
        {{formatDate(photo.created)}}
      </p>
      <p>{{photo.description}}</p>
    </div>
    </router-link>

  </div>
</div>
</template>

<script>
import moment from 'moment';

export default {
  name: 'PostGallery',
  props: {
    posts: Array
  },
  methods: {
   formatDate(date) {
     if (moment(date).diff(Date.now(), 'days') < 15)
       return moment(date).fromNow();
     else
       return moment(date).format('d MMMM YYYY');
   }
 },
}
</script>

<style scoped>
.postTitle {
  margin: 0px;
  font-size: 1.2em;
}

.postDate {
  margin: 0px;
  font-size: 0.9em;
  font-weight: normal;
}

p {
  margin: 0px;
}

</style>
