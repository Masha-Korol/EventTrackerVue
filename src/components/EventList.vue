<template>
  <div class="header-container">
    <div class="title-container">
      <text class="title-text">Мероприятия</text>
    </div>
    <recommendations-header-item/>
    <profile-header-item/>
  </div>

  <div id="concerts-container" class="concerts-container">
    <concert-preview v-for="event in events" :event="event" :key="event.id" />
  </div>
</template>

<script>
import ConcertPreview from '@/components/events/ConcertPreview.vue';
import axios from 'axios';
import {authHeader, handleAxiosError} from '@/util/authentication-helper';

export default {
  name: 'EventList',
  components: {
    ConcertPreview
  },
  data() {
    return {
      events: []
    }
  },
  methods: {

  },
  created() {
    axios
        .get(`http://localhost:7010/api/events`, {headers: authHeader()})
        .then((response) => {
          this.events = response.data;
        })
        .catch(handleAxiosError);
  }
}
</script>

<style scoped>
/* concerts list */

.concerts-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 20px;
}

.search-field {
  padding: 6px;
  border: none;
  margin-top: 8px;
  margin-right: 16px;
  font-size: 17px;
}

/* city select */

.select-city {
  position: relative;
  font-family: 'Inter';
  font-style: italic;
  font-weight: 300;
  font-size: 30px;
  text-wrap: nowrap;
}

.select-city select {
  display: none;
}

.select-selected:after {
  position: absolute;
  content: "";
  top: 50%;
  right: 0;
  width: 0;
  height: 0;
  border: 6px solid transparent;
  border-color: #fff transparent transparent transparent;
}

.select-selected.select-arrow-active:after {
  border-color: transparent transparent #fff transparent;
  top: 40%;
}

.select-items div,.select-selected {
  color: #ffffff;
  padding: 8px 16px;
  border: 1px solid transparent;
  border-color: transparent transparent rgba(0, 0, 0, 0.1) transparent;
  cursor: pointer;
}

.select-items {
  position: absolute;
  background-color: #ccc;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 99;
  min-width: max-content;
}

.select-hide {
  display: none;
}

.select-items div:hover, .same-as-selected {
  background-color: rgba(0, 0, 0, 0.1);
}
</style>
