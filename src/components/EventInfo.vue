<template>
  <div class="header-container">
    <div class="title-container">
      <text id="band-name" class="title-text">{{event.eventName}}</text>
    </div>
    <events-header-item/>
    <recommendations-header-item/>
    <profile-header-item/>
  </div>

  <div class="concert-container">
    <div class="concert-poster-container">
      <div>
        <img id="concert-poster" :src="`data:image/png;base64,${event.posterFile}`">
      </div>

      <rating :mark="event.mark" @onMarkChange="onMarkChange"/>

      <comments :event-comments="event.eventComments" @createComment="createComment"/>
    </div>

    <div class="concert-description">
      <div id="concert-date" class="concert-info-big">{{event.date}}</div>
      <div id="concert-city" class="concert-info-big">{{event.city}}</div>
      <div id="concert-venue" class="concert-info-small">Площадка: {{event.venue}}</div>
      <div id="concert-start" class="concert-info-small">Время начала: {{event.start}}</div>
      <div class="ill-go-container">
        <button id="ill-go-button" class="btn-ill-go default"
                @click="onIllGoChange" v-bind:class="event.willGo ? 'button-pressed' : 'button-not-pressed'">
          {{event.willGo ? 'Я не пойду' : 'Я пойду'}}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Rating from '@/components/ui-components/Rating.vue';
import Comments from '@/components/ui-components/Comments.vue';
import axios from 'axios';
import {authHeader, handleAxiosError} from '@/util/authentication-helper';
import {BACKEND_URL} from '@/config';

export default {
  name: 'EventInfo',
  components: {
    Comments, Rating
  },
  computed: {
    eventId() {
      return this.$route.params.id
    },
  },
  data() {
    return {
      event: {
        eventName: '',
        date: '',
        start: '',
        city: '',
        venue: '',
        posterFile: '',
        mark: 1,
        willGo: '',
        eventComments: []
      },
      commentText: ''
    }
  },
  methods: {
    onMarkChange(newMark) {
      axios.patch(`${BACKEND_URL}/events/${this.eventId}/mark`, {newMark: newMark},
          {headers: authHeader()})
          .catch(handleAxiosError);
    },
    onIllGoChange() {
      this.event.willGo = !this.event.willGo;
      axios.get(`${BACKEND_URL}/events/${this.eventId}/state`, {headers: authHeader()})
          .catch(handleAxiosError);
    },
    createComment(newComment) {
      axios.post(`${BACKEND_URL}/comments`, {text: newComment.commentText, eventId: this.eventId},
          {headers: authHeader()})
          .then((response) => {
            this.event.eventComments.push(response.data);
          }).catch(handleAxiosError);
    }
  },
  created() {
    axios
        .get(`${BACKEND_URL}/events/${this.eventId}`, {headers: authHeader()})
        .then((response) => {
          this.event = response.data;
        })
        .catch(handleAxiosError);
  }
}
</script>

<style scoped>
/* concert info */

.concert-container {
  display: flex;
  flex-direction: row;
  padding: 30px;
}

.concert-description {
  flex: 1;
  margin-left: 200px;
}

.concert-info-big {
  font-family: 'Inter';
  font-style: italic;
  font-weight: 300;
  font-size: 60px;
  line-height: 90px;
  color: #FFFFFF;
}

.concert-info-small {
  font-family: 'Inter';
  font-style: italic;
  font-weight: 300;
  font-size: 30px;
  line-height: 48px;
  color: #FFFFFF;
}

#concert-venue {
  margin-top: 30px;
}

img {
  width: 608px;
  height: 608px;
}

.concert-poster-container {
  display: flex;
  flex-direction: column;
}


/* button 'I will/won't go' */

.ill-go-container {
  margin-top: 100px;
}

.btn-ill-go {
  border: 2px solid black;
  background-color: white;
  color: black;
  padding: 14px 28px;
  font-size: 16px;
  cursor: pointer;
  font-family: 'Inter';
  font-style: italic;
  font-weight: 300;
  font-size: 40px;
  background: none;
}

.button-not-pressed {
  border-color: #FFFFFF;
  color: #FFFFFF;
  border-radius: 10px;
}

.button-not-pressed:hover {
  color: black;
  background: #FFFFFF;
  opacity: 80%;
  border-radius: 10px;
}

.button-pressed {
  color: black;
  background: #FFFFFF;
  opacity: 80%;
  border-radius: 10px;
}

.button-pressed:hover {
  color: #FFFFFF;
  background: none;
  border-color: #FFFFFF;
  border-radius: 10px;
}
</style>
