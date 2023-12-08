<template>
  <div class="message-block"
       v-bind:class="message.isCurrentUserAuthor ? 'message-block-owner' : 'message-block-other'">
    <div class="message-text"
         v-bind:class="message.isCurrentUserAuthor ? 'message-text-owner' : 'message-text-other'">
      <div>{{message.text}}</div>
      <div class="author" v-if="!message.isCurrentUserAuthor">
        <p>{{message.userName}}</p>
      </div>
    </div>
    <div class="date"><p class="date-text">{{message.date}}</p></div>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.message-block {
  display: flex;
  flex-direction: column;
  width: 40%;
}

.message-block-other {
  align-self: flex-start;
}

.message-block-owner {
  align-self: flex-end;
}

.message-text {
  display: flex;
  flex-direction: column;
  margin: 2px;
  padding: 15px;
  border-radius: 5px;
  font-size: 20px;
}

.message-text-other {
  background-color: deepskyblue;
}

.message-text-owner {
  background-color: #e9e9e9;
}

.date {
  align-self: flex-end;
}

.date-text {
  font-size: 10px;
  color: white;
  font-size: 15px;
}

.author {
  align-self: flex-start;
  height: 12px;
  margin: 2px;
  font-size: 14px;
}

.author-text {
  font-size: 13px;
}
</style>
