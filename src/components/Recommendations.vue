<template>
  <div class="header-container">
    <div class="title-container">
      <text class="title-text">Рекомендации</text>
    </div>
    <div class="menu-container">
      <div class="header-item-text"><a href="../concerts-page/concerts.html">Мероприятия</a></div>
    </div>
    <div class="profile-menu-container">
      <text class="header-item-text profile-text"><a href="../profile-page/profile.html">Профиль</a></text>
    </div>
  </div>

  <div class="recommendations-container">
    <div id="recommendations-detail-concerts" class="recommendations-detail-container">
      <div class="recommendations-detail-container-title">
        Мероприятия, которые могут вас заинтересовать
      </div>
      <div class="concert-block" v-for="event in recommendations.recommendedEvents">
        <div>{{event.eventName}} - {{event.city}}</div>
        <div>{{event.date}}</div>
      </div>
    </div>

    <div id="recommendations-detail-users" class="recommendations-detail-container">
      <div class="recommendations-detail-container-title">
        Возмножно, вы подружитесь
      </div>
      <div class="user-block" v-for="user in recommendations.recommendedUsers">
        <div class="user-block-username">{{user.userName}}</div>
        <div class="user-request-block">Отправить заявку</div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      recommendations: {}
    }
  },
  created() {
    axios
        .get(`http://localhost:9000/api/recommendations`)
        .then((response) => {
          this.recommendations = response.data;
        })
        .catch((e) => {
          console.log(`Error: ${JSON.stringify(e)}`);
        });
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

.user-block {
  border: 1px solid rgba(255, 255, 255, 0.5);
  padding: 10px;
  margin: 10px;
  display: flex;
  flex-direction: row;
  background: rgba(28, 28, 28, 0.8);
}

.user-block-username {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  font-size: 40px;
  color: #FFFFFF;
  width: min-content;
  text-align: center;
  line-height: 50px;
  cursor: pointer;
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
}
</style>
