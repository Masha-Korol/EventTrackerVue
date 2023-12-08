<template>
  <div class="header-container">
    <div class="title-container">
      <text class="title-text">EventTracker</text>
    </div>
    <events-header-item/>
    <recommendations-header-item/>
    <profile-header-item/>
  </div>

  <div id="chat-container" class="chat-container">
    <div class="chat">
      <div class="messages-window">
        <chat-message v-for="message in chat.messages" :message="message" :key="message.id" />
      </div>

      <div class="send-message-window">
        <div class="send-message-form-container">
          <form id="message-send-form">
            <div class="form-content">
              <div class="message-input-container">
                <textarea class="form-control" placeholder="Сообщение" name="newmessage"></textarea>
              </div>
              <div class="button-container">
                <button class="btn btn-primary">Отправить</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import ChatMessage from '@/components/users/ChatMessage.vue';

export default {
  name: 'Chat',
  components: {
    ChatMessage
  },
  computed: {
    chatId() {
      return this.$route.params.id
    },
  },
  data() {
    return {
      chat: {}
    }
  },
  methods: {
  },
  created() {
    axios
        .get(`http://localhost:9000/api/chats/${this.chatId}`)
        .then((response) => {
          this.chat = response.data;
        })
        .catch((e) => {
          console.log(`Error: ${JSON.stringify(e)}`);
        });
  }
}
</script>

<style scoped>

.chat-container {
  display: flex;
  justify-content: center;
  height: calc(100% - 131px);
}

.chat {
  align-self: center;
  background-color: #00000066;
  padding: 10px;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  height: 90%;
  width: 50%;
}

/* send message window */

.messages-window {
  /* overflow: scroll; */
  display: flex;
  flex-direction: column;
  height: 90%;
  width: 100%;
}

.send-message-window {
  align-self: center;
  width: 100%;
  height: 10%;
  display: flex;
  justify-content: center;
}

.send-message-form-container {
  align-self: center;
  width: 100%;
  height: 100%;
}

#message-send-form {
  height: 100%;
  width: 100%;
}

.form-control {
  background-color: black !important;
  color: #FFFFFF !important;
  width: 100%;
  height: 50%;
}

.form-content {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  height: 100%;
}

.button-container {
  display: flex;
  height: 50%;
  align-self: center;
}

.message-input-container {
  display: flex;
  width: 80%;
  align-self: center;
}
</style>
