<template>
  <div class="header-container">
    <div class="title-container">
      <text id="profile-name" class="title-text">
        Профиль: {{userInfo.userName}}
      </text>
    </div>
    <div class="menu-container">
      <div class="header-item-text"><a href="../concerts-page/concerts.html">Концерты</a></div>
    </div>
    <div class="menu-container">
      <div class="header-item-text"><a href="../recommendations-page/recommendations.html">Рекомендации</a></div>
    </div>
  </div>

  <div class="profile-container">
    <div id="profile-detail-concerts" class="profile-detail-container">
      <div class="profile-detail-container-title">
        Мероприятия
      </div>
      <div class="concert-block" v-for="event in userInfo.userEvents">
        <div>{{event.eventName}} - {{event.city}}</div>
        <div>{{event.date}}</div>
      </div>
    </div>

    <div id="buttons" class="buttons-container">
      <div @click="onSendFriendRequest" class="user-request-block">
        {{userInfo.isUserFriend ? 'Убрать из друзей' : 'Отправить заявку'}}
      </div>
      <div class="user-request-block" v-if="userInfo.isUserFriend">Отправить сообщение</div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      userName: 'someOtherUser',
      isCurrentUsersPage: false,
      userInfo: {}
    }
  },
  methods: {
    onSendFriendRequest() {
      axios.patch(`http://localhost:9000/api/users`, {userName: this.userName});
      this.userInfo.isUserFriend = !this.userInfo.isUserFriend;
    }
  },
  created() {
    axios
        .get(`http://localhost:9000/api/users/${this.userName}`)
        .then((response) => {
          this.userInfo = response.data;
        })
        .catch((e) => {
          console.log(`Error: ${JSON.stringify(e)}`);
        });
  }
}
</script>

<style scoped>
.profile-container {
  display: flex;
  flex-direction: row;
  height: 100%;
  width: 100%;
}

.profile-detail-container {
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(255, 255, 255, 0.5);
  margin-top: 40px;
  width: 40%;
  min-width: 40%;
}

.profile-detail-container-title {
  margin-bottom: 50px;
  font-weight: 900;
  font-style: normal;
}

/* marked concerts */

#profile-detail-concerts {
  font-family: 'Inter';
  font-style: italic;
  font-weight: 500;
  font-size: 40px;
  line-height: 48px;
  color: #FFFFFF;
  text-align: center;
}

.concert-block {
  border: 1px solid rgba(255, 255, 255, 0.5);
  background: none;
  padding: 10px;
  margin: 10px;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  background: rgba(28, 28, 28, 0.5);
}

/* buttons */

#buttons {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  font-size: 40px;
  line-height: 40px;
  color: #FFFFFF;
  text-align: center;
  display: flex;
  flex-direction: row;
}

.buttons-container {
  display: flex;
  flex-direction: column;
  margin-top: 40px;
  width: 40%;
  min-width: 40%;
}

.user-request-block {
  margin-left: 50px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  padding: 5px;
  font-size: 30px;
  cursor: pointer;
  color: black;
  background: #FFFFFF;
  opacity: 80%;
  border-radius: 10px;
  line-height: 30px;
  align-self: self-end;
  white-space: nowrap;
}

html {
  height: 80%;
}

body {
  height: 100%;
}
</style>
