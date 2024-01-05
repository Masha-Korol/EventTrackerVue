<template>
  <div class="header-container">
    <div class="title-container">
      <text class="title-text">Чат с {{chat.userName}}</text>
    </div>
    <events-header-item/>
    <recommendations-header-item/>
    <profile-header-item/>
  </div>

  <div id="chat-container" class="chat-container">
    <div class="chat">
      <div id="messages-window" class="messages-window">
        <chat-message v-for="message in chat.messages" :message="message" :key="message.id" />
      </div>

      <div class="send-message-window">
        <div class="send-message-form-container">
          <form id="message-send-form">
            <div class="form-content">
              <div class="message-input-container">
                <textarea id="message-text" class="form-control" placeholder="Сообщение" name="newmessage"></textarea>
              </div>
              <div class="button-container">
                <button class="btn btn-primary send-message-button" @click="sendMessage">Отправить</button>
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
import {authHeader, handleAxiosError} from '@/util/authentication-helper';
import {BACKEND_URL} from '@/config';

export default {
  name: 'Chat',
  components: {
    ChatMessage
  },
  computed: {
    userId() {
      return this.$route.params.userId
    },
  },
  data() {
    return {
      chat: {}
    }
  },
  methods: {
    sendMessage(event) {
      event.preventDefault();

      if (document.getElementById('message-text').value) {
        axios
            .post(`${BACKEND_URL}/chats/${this.userId}`,
                {text: document.getElementById('message-text').value},
                {headers: authHeader()})
            .then((response) => {
              this.chat.messages.push(response.data);
              document.getElementById('message-text').value = '';

              const messagesWindow = document.getElementById('messages-window');
              const lastMessage = messagesWindow.lastElementChild;
              if (lastMessage) {
                lastMessage.scrollIntoView({ behavior: 'smooth' });
              }
            })
            .catch(handleAxiosError);
      }
    }
  },
  created() {
    axios
        .get(`${BACKEND_URL}/chats/${this.userId}`, {headers: authHeader()})
        .then((response) => {
          this.chat = response.data;

          const messagesWindow = document.getElementById('messages-window');
          const lastMessage = messagesWindow.lastElementChild;
          lastMessage.scrollIntoView({ behavior: 'smooth' });
        })
        .catch(handleAxiosError);
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
  overflow: auto;
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

.send-message-button {
  cursor: pointer;
}
</style>
