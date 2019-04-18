<template>
<div>
  <p>{{comments.length}} comments</p>
  <div class="aComment" v-for="comment in comments" v-bind:key="comment._id">
    <p class="commentBody">{{comment.body}}</p>
    <p class="commentDate">
      <span v-if="comment.user.name">{{comment.user.name}}, </span>
      {{formatDate(comment.created)}}
    </p>
  </div>
</div>
</template>

<script>
import moment from 'moment';

export default {
  name: 'CommentGallery',
  props: {
    comments: Array
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
.commentBody {
  font-size: 1.2em;
  margin-top: 10px;
  margin-bottom: 0px;
}

.commentDate {
  padding-top: 0px;
  margin-top: 0px;
  font-size: 0.9em;
  font-weight: normal;
  text-align: right;
}

.aComment{
  border-radius: 10px;
  background: rgba(155, 155, 155, 0.3);
  width: 45%;
  padding: 15px;
  margin: auto;
  margin-top: 10px;
}
</style>
