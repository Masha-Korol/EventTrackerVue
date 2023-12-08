<template>
  <div class="chat-block" @click="this.$router.push({name: 'Chat', params: { id: this.message.chatId}})">
    <div class="chat-block-username">{{message.userName}}</div>
    <div class="chat-block-message">{{message.lastMessage}}</div>
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
.chat-block {
  border: 1px solid rgba(255, 255, 255, 0.5);
  padding: 10px;
  margin: 10px;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  background: rgba(28, 28, 28, 0.8);
}

.chat-block-username {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  font-size: 40px;
  line-height: 40px;
  color: #FFFFFF;
  text-align: left;
}

.chat-block-message {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 100;
  font-size: 20px;
  line-height: 40px;
  color: #FFFFFF;
  text-align: left;
}
</style>
