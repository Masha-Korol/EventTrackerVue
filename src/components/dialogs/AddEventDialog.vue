<template>
  <div class="modal" v-if="show">
    <div class="modal-content">
      <div class="modal-header">
        <span class="close" @click="this.$emit('update:show', false)">&times;</span>
        <h2>Добавить мероприятие</h2>
      </div>
      <div class="modal-body">
        <div class="form-body">
          <form>
            <label for="event-name">Название</label>
            <input type="text" id="event-name" name="eventName" placeholder="" v-model="newEvent.eventName">

            <label for="event-description">Описание</label>
            <input type="text" id="event-description" name="eventDescription" placeholder="" v-model="newEvent.eventDescription">

            <label for="date">Дата</label>
            <input type="text" id="date" name="date" placeholder="" v-model="newEvent.date">

            <label for="start-time">Время начала</label>
            <input type="text" id="start-time" name="startTime" placeholder="" v-model="newEvent.startTime">

            <label for="artist-name">Исполнитель</label>
            <select id="artist-name" name="artistName" v-model="newEvent.artistId">
              <option v-for="artist in artists" :value="artist.id">{{artist.artistName}}</option>
            </select>

            <label for="venue-name">Площадка</label>
            <select id="venue-name" name="venueName" v-model="newEvent.venueId">
              <option v-for="venue in venues" :value="venue.id">{{venue.venueName}} - {{venue.cityName}}</option>
            </select>

            <input type="submit" value="Отправить" @click="createEvent">
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'add-event-dialog',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    venues: {
      type: Array,
      required: true
    },
    artists: {
      type: Array,
      required: true
    },
  },
  data() {
    return {
      newEvent: {
        eventName: '',
        eventDescription: '',
        date: '',
        startTime: '',
        artistId: '',
        venueId: ''
      }
    }
  },
  methods: {
    createEvent(event) {
      event.preventDefault();
      this.$emit('createEvent', this.newEvent);
      this.newEvent.eventName = '';
      this.newEvent.eventDescription = '';
      this.newEvent.date = '';
      this.newEvent.startTime = '';
      this.newEvent.artistId = '';
      this.newEvent.venueId = '';
      this.$emit('update:show', false);
    }
  }
}
</script>

<style scoped>
/* Modal Header */
.modal-header {
  padding: 2px 16px;
  background-color: #424542;
  color: white;
}

/* Modal Body */
.modal-body {
  padding: 2px 16px;
  background-color: #f2f2f2;
}

/* Modal Content */
.modal-content {
  position: relative;
  background-color: #fefefe;
  margin: auto;
  padding: 0;
  border: 1px solid #888;
  width: 80%;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);
  animation-name: animatetop;
  animation-duration: 0.4s
}

/* Add Animation */
@keyframes animatetop {
  from {top: -300px; opacity: 0}
  to {top: 0; opacity: 1}
}

/* The Close Button */
.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

/* Form */
input[type=text], select {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

input[type=submit] {
  width: 100%;
  background-color: #424542;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

input[type=submit]:hover {
  background-color: #45a049;
}

.form-body {
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 20px;
}
</style>
