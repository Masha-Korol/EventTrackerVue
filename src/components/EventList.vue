<template>
  <div class="header-container">
    <div class="title-container">
      <text class="title-text">Мероприятия: </text>
    </div>
    <div class="menu-container">
      <div class="select-city">
        <select>
          <option value="0">в любом городе</option>
          <option value="1">Москва</option>
          <option value="2">Воронеж</option>
          <option value="3">Владивосток</option>
          <option value="4">Сочи</option>
        </select>
      </div>
    </div>
    <div class="menu-container">
      <input type="text" id="search-field" class="search-field" placeholder="Введите название мероприятия...">
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
        .get(`http://localhost:9000/api/events`)
        .then((response) => {
          this.events = response.data;
        })
        .catch((e) => {
          console.log(`Error: ${JSON.stringify(e)}`);
        });
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
