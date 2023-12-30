<template>
  <div class="header-container">
    <div class="title-container">
      <text id="profile-name" class="title-text">
        Профиль: {{userInfo.userName}}
      </text>
    </div>
    <events-header-item/>
    <recommendations-header-item/>
    <profile-header-item/>
  </div>

  <div class="profile-container">
    <div id="profile-detail-concerts" class="profile-detail-container">
      <div class="profile-detail-container-title">
        Мероприятия
      </div>
      <event-text-info v-for="event in userInfo.userEvents" :event="event" :key="event.id"/>
    </div>

    <div id="buttons" class="buttons-container">
      <div @click="sendFriendRequest" class="user-request-block">
        {{userInfo.isUserFriend ? 'Убрать из друзей' : 'Добавить в друзья'}}
      </div>
      <div class="user-request-block" v-if="userInfo.isUserFriend" @click="openChat">Отправить сообщение</div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import EventTextInfo from '@/components/events/EventTextInfo.vue';
import {authHeader, handleAxiosError} from '@/util/authentication-helper';

export default {
  components: {
    EventTextInfo
  },
  computed: {
    userId() {
      return this.$route.params.id
    },
  },
  data() {
    return {
      isCurrentUsersPage: false,
      userInfo: {}
    }
  },
  methods: {
    sendFriendRequest() {
      axios.patch(`http://localhost:9000/api/users`, {userId: this.userId, friendUser: !this.userInfo.isUserFriend},
          {headers: authHeader()})
          .catch(handleAxiosError);
      this.userInfo.isUserFriend = !this.userInfo.isUserFriend;
    },
    openChat() {
      this.$router.push({name: 'Chat', params: {userId: this.userId}})
    }
  },
  created() {
    axios
        .get(`http://localhost:9000/api/users/${this.userId}`, {headers: authHeader()})
        .then((response) => {
          this.userInfo = response.data;
        })
        .catch(handleAxiosError);
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
