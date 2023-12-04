<template>
  <div class="header-container">
    <div class="title-container">
      <text class="title-text">EventTracker</text>
    </div>
    <div class="menu-container">
      <div class="header-item-text"><a href="../concerts-page/concerts.html">Мероприятия</a></div>
      <div class="header-item-text"><a href="../recommendations-page/recommendations.html">Рекомендации</a></div>
    </div>
    <div class="profile-menu-container">
      <text class="header-item-text profile-text"><a href="../profile-page/profile.html">Профиль</a></text>
    </div>
  </div>

  <div id="chat-container" class="chat-container">
    <div class="chat">
      <div class="messages-window">
        <div class="message-block" v-for="message in chat.messages"
             v-bind:class="isCurrentUserAuthor(message.userName) ? 'message-block-owner' : 'message-block-other'">
          <div class="message-text"
               v-bind:class="isCurrentUserAuthor(message.userName) ? 'message-text-owner' : 'message-text-other'">
            <div>{{message.text}}</div>
            <div class="author" v-if="!isCurrentUserAuthor(message.userName)">
              <p>{{message.userName}}</p>
            </div>
          </div>
          <div class="date"><p class="date-text">{{message.date}}</p></div>
        </div>
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
import axios from "axios";

export default {
  data() {
    return {
      chatId: 1,
      chat: {}
    }
  },
  methods: {
    isCurrentUserAuthor(userName) {
      return this.getCurrentUserName() === userName;
    },
    getCurrentUserName() {
      return 'Maria';
    }
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

/* messages window */

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
