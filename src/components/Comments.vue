<template>
  <div class="comments-container">
    <div id="comments-section" class="comments-section col-sm-5 col-md-6 col-12 pb-4">
      <div class="comments-title">
        <h1>Комментарии</h1>
      </div>
      <comment v-for="comment in eventComments" :comment="comment"/>
    </div>

    <div class="send-comment-form col-lg-4 col-md-5 col-sm-4 offset-md-1 offset-sm-1 col-12 mt-4">
      <form id="algin-form">
        <div class="form-group">
          <h4 class="leave-comment-h4">Оставьте коментарий</h4>
          <textarea v-model="newComment.commentText" name="msg" ref="commentTexterea" cols="30" rows="5" class="form-control" required></textarea>
        </div>
        <div class="form-group">
          <div class="comment-form-button-container">
            <button @click="onCommentCreate" id="post" class="btn-comment-form">Отправить</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Comment from '@/components/Comment.vue';
export default {
  components: {
    Comment
  },
  props: {
    eventComments: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      newComment: {
        commentText: ''
      }
    }
  },
  methods: {
    onCommentCreate(event) {
      event.preventDefault();
      this.$emit('createComment', this.newComment);
      this.newComment.commentText = '';
    }
  }
}
</script>

<style scoped>
/* comments section */

.comments-container {
  display: flex;
  flex-direction: row;
  color: aliceblue;
  margin-top: 50px;
}

.comments-title {
  align-self: center;
  margin-bottom: 20px;
}

.comments-section {
  display: flex;
  flex-direction: column;
  margin-right: 100px;
}

.send-comment-form {
  margin-top: 98px;
}

#post {
  margin: 10px;
  padding: 6px;
  padding-top: 2px;
  padding-bottom: 2px;
  text-align: center;
  background-color: #ecb21f;
  border-color: #a88734 #9c7e31 #846a29;
  color: black;
  border-width: 1px;
  border-style: solid;
  border-radius: 13px;
}

.darker {
  border: 1px solid #ecb21f;
  background-color: rgb(40 51 51 / 24%);
  float: right;
  border-radius: 5px;
  padding-left: 40px;
  padding-right: 30px;
  padding-top: 10px;
}

.comment {
  word-wrap: break-word;
  width: 100%;
  margin-top: 5%;
}

.comment h4, .comment span, .darker h4, .darker span {
  display: inline;
}

.comment p, .comment span, .darker p, .darker span {
  color: rgb(184, 183, 183);
}

.leave-comment-h4 {
  text-align: center;
}

.form-group {
  text-align: center;
}

.form-group input, .form-group textarea {
  background-color: black;
  border: 1px solid rgba(16, 46, 46, 1);
  border-radius: 12px;
}

form {
  border: 1px solid rgba(16, 46, 46, 1);
  background-color: rgb(199 208 208 / 24%);
  border-radius: 5px;
  padding: 20px;
}

#algin-form {
  width: 300px;
}

.btn-comment-form {
  border: 2px solid black;
  background-color: white;
  color: black;
  padding: 14px 28px;
  cursor: pointer;
  font-family: 'Inter';
  font-style: italic;
  font-weight: 300;
  font-size: 20px;
  background: none;
}

.comment-form-button-container {
  display: flex;
  justify-content: center;
}

.form-control {
  background-color: black !important;
  color: #FFFFFF !important;
}

textarea:invalid {
  border: 2px white;
}

textarea:valid {
  border: 2px solid black;
}
</style>
