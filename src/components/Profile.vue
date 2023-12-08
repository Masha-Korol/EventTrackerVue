<template>
  <link href="https://use.fontawesome.com/releases/v5.5.0/css/all.css" rel="stylesheet">

  <div class="header-container">
    <div class="title-container">
      <text id="profile-name" class="title-text">{{userInfo.userName}}</text>
    </div>
    <events-header-item/>
    <recommendations-header-item/>
    <administrationn-header-item/>
    <logout-header-item/>
  </div>

  <div class="profile-container">
    <div id="profile-detail-concerts" class="profile-detail-container">
      <div class="profile-detail-container-title">
        Мероприятия
      </div>
     <event-text-info v-for="event in userInfo.userEvents" :event="event" :key="event.id" />
    </div>

    <div id="profile-detail-chats" class="profile-detail-container" v-if="this.isChatsBlockVisible">
      <div class="profile-detail-container-title">
        Сообщения
      </div>
      <chat-preview v-for="message in userInfo.userMessages" :message="message" :key="message.id" />
      <div @click="this.isChatsBlockVisible = false" class="friends-icon-container"><i class="fas fa-user-friends"></i></div>
    </div>

    <div id="profile-detail-friends" class="profile-detail-container" v-if="!this.isChatsBlockVisible">
      <div class="profile-detail-container-title">
        Друзья
      </div>
      <friend v-for="friend in userInfo.userFriends" :friend="friend" :key="friend.id" />
      <div @click="this.isChatsBlockVisible = true" class="chats-icon-container"><i class="far fa-comments"></i></div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import EventTextInfo from '@/components/events/EventTextInfo.vue';
import ChatPreview from '@/components/users/ChatPreview.vue';
import Friend from '@/components/users/Friend.vue';

export default {
  name: 'Profile',
  components: {
    EventTextInfo, ChatPreview, Friend
  },
  data() {
    return {
      userName: 'Masha',
      userInfo: {
        userName: '',
        userEvents: [],
        userMessages: [],
        userFriends: []
      },
      isChatsBlockVisible: true
    }
  },
  methods: {

  },
  created() {
    axios
        .get(`http://localhost:9000/api/users`)
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
  height: max-content;
  color: #FFFFFF;
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
  text-align: center;
}


/* chats */

#profile-detail-chats {
  margin-left: 20%;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  font-size: 40px;
  line-height: 40px;
  text-align: center;
}

.friends-icon-container {
  align-self: end;
  margin-right: 10px;
  width: min-content;
}

.fa-user-friends {
  cursor: pointer;
  color: white;
}


/* friends */

#profile-detail-friends {
  margin-left: 20%;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  font-size: 40px;
  line-height: 40px;
  color: #FFFFFF;
  text-align: center;
}

.friend-block {
  border: 1px solid rgba(255, 255, 255, 0.5);
  padding: 10px;
  margin: 10px;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  background: rgba(28, 28, 28, 0.8);
}

.friend-block-username {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  font-size: 40px;
  line-height: 40px;
  color: #FFFFFF;
  text-align: left;
}

.chats-icon-container {
  align-self: end;
  margin-right: 10px;
  width: min-content;
}

.fa-comments {
  cursor: pointer;
  color: white;
}
</style>
