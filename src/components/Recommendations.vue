<template>
  <div class="header-container">
    <div class="title-container">
      <text class="title-text">Рекомендации</text>
    </div>
    <events-header-item/>
    <profile-header-item/>
  </div>

  <div class="recommendations-container">
    <div id="recommendations-detail-concerts" class="recommendations-detail-container">
      <div class="recommendations-detail-container-title">
        Мероприятия, которые могут вас заинтересовать
      </div>
      <event-text-info v-for="event in recommendations.recommendedEvents" :event="event" :key="event.id" />
    </div>

    <div id="recommendations-detail-users" class="recommendations-detail-container">
      <div class="recommendations-detail-container-title">
        Возмножно, вы подружитесь
      </div>
      <recommended-user v-for="user in recommendations.recommendedUsers" :user="user" :key="user.id"
                        @sendFriendRequest="sendFriendRequest"
                        @cancelFriendRequest="cancelFriendRequest"/>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import EventTextInfo from '@/components/events/EventTextInfo.vue';
import RecommendedUser from '@/components/users/RecommendedUser.vue';
import {authHeader, handleAxiosError} from '@/util/authentication-helper';

export default {
  name: 'Recommendations',
  components: {
    EventTextInfo, RecommendedUser
  },
  data() {
    return {
      recommendations: {
        recommendedUsers: [],
        recommendedEvents: []
      }
    }
  },
  methods: {
    sendFriendRequest(userId) {
      axios
          .patch(`http://localhost:7010/api/users`, {userId, friendUser: true}, {headers: authHeader()})
          .then((response) => {})
          .catch((e) => {
            console.log(`Error: ${JSON.stringify(e)}`);
            handleAxiosError(e)
          });
    },
    cancelFriendRequest(userId) {
      axios
          .patch(`http://localhost:7010/api/users`, {userId, friendUser: false}, {headers: authHeader()})
          .then((response) => {})
          .catch(handleAxiosError);
    }
  },
  created() {
    axios
        .get(`http://localhost:7010/api/recommendations`, {headers: authHeader()})
        .then((response) => {
          this.recommendations = response.data;
        })
        .catch(handleAxiosError);
  }
}
</script>

<style scoped>
.recommendations-container {
  display: flex;
  flex-direction: row;
  height: 100%;
  width: 100%;
}

.recommendations-detail-container {
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(255, 255, 255, 0.5);
  margin-top: 40px;
  width: 40%;
  min-width: 40%;
  height: max-content;
  color: #FFFFFF;
}

.recommendations-detail-container-title {
  margin-bottom: 50px;
  font-weight: 900;
  font-style: normal;
}


/* concerts */

#recommendations-detail-concerts {
  font-family: 'Inter';
  font-style: italic;
  font-weight: 500;
  font-size: 40px;
  line-height: 48px;
  color: #FFFFFF;
  text-align: center;
}


/* users */

#recommendations-detail-users {
  margin-left: 20%;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  font-size: 40px;
  line-height: 40px;
  color: #FFFFFF;
  text-align: center;
}
</style>
