<template>
<div>
  <div class="post" v-for="post in posts" v-bind:key="post._id">
    <router-link :to="{ name: 'post', params: { id: post._id }}">
    <div class="postInner">
      <p class="postTitle">{{post.title}}</p>
      <p class="postName">Game: {{post.game}}</p>
      <p class="postNumber"># Needed: {{post.needed}}</p>
      <p class="postDescription">{{post.description}}</p>
      <p class="postDate">
        <span v-if="post.user.name">{{post.user.name}}, </span>
        {{formatDate(post.created)}}
      </p>
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

.post{
  width: 40%;
  /*width: fit-content;*/
  text-align: left;
  color: black;
  /*background-color: #008000;
  opacity: 0.3;*/
  background: rgba(0, 127, 0, 0.3);
  border-radius: 10px;
  padding: 10px;
  margin: auto;
  margin-top: 15px;
}

a {
  color:inherit;
  text-decoration: none;
 }

 .postTitle{
   text-align: center;
 }

</style>
