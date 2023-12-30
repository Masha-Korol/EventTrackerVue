<template>
  <div class="header-container">
    <div class="title-container">
      <text class="title-text">Административная страница</text>
    </div>
    <events-header-item/>
    <recommendations-header-item/>
    <profile-header-item/>
  </div>

  <div class="administration-stuff-container">
    <div class="data-modification-forms-container">
      <div class="button-container">
        <button class="add-data-button" @click="showAddCityDialog = true">Добавить город</button>
      </div>
      <div class="button-container">
        <button class="add-data-button" @click="showAddVenueDialog = true">Добавить площадку</button>
      </div>
      <div class="button-container">
        <button class="add-data-button" @click="showAddArtistDialog = true">Добавить исполнителя</button>
      </div>
      <div class="button-container">
        <button class="add-data-button" @click="showAddEventDialog = true">Добавить мероприятие</button>
      </div>
    </div>

    <div class="data-view-container">
      <view-cities :cities="cities"/>
    </div>
  </div>

  <add-city-dialog v-model:show="showAddCityDialog" @createCity="createCity"/>
  <add-venue-dialog v-model:show="showAddVenueDialog" :cities="cities" @createVenue="createVenue"/>
  <add-artist-dialog v-model:show="showAddArtistDialog" @createArtist="createArtist"/>
  <add-event-dialog v-model:show="showAddEventDialog" :venues="venues" :artists="artists" @createEvent="createEvent"/>
</template>

<script>
import AddCityDialog from '@/components/dialogs/AddCityDialog.vue';
import AddVenueDialog from '@/components/dialogs/AddVenueDialog.vue';
import AddArtistDialog from '@/components/dialogs/AddArtistDialog.vue';
import AddEventDialog from '@/components/dialogs/AddEventDialog.vue';
import ViewCities from '@/components/administration/ViewCities.vue';
import axios from 'axios';
import FormData from 'form-data';

export default {
  name: 'Administration',
  components: {AddEventDialog, AddCityDialog, AddArtistDialog, AddVenueDialog, ViewCities},
  data() {
    return {
      cities: [],
      venues: [],
      artists: [],
      showAddCityDialog: false,
      showAddVenueDialog: false,
      showAddArtistDialog: false,
      showAddEventDialog: false,
      items: [
        { age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
        { age: 21, first_name: 'Larsen', last_name: 'Shaw' },
        { age: 89, first_name: 'Geneva', last_name: 'Wilson' },
        { age: 38, first_name: 'Jami', last_name: 'Carney' }
      ]
    }
  },
  methods: {
    createCity(newCity) {
      axios.post(`http://localhost:9000/api/cities`,
          {
            cityName: newCity.cityName,
          }).then((response) => {
        this.cities.push(response.data);
      });
    },
    createVenue(newVenue) {
      axios.post(`http://localhost:9000/api/venues`,
          {
            venueName: newVenue.venueName,
            cityId: newVenue.cityId,
          }).then((response) => {
        this.venues.push(response.data);
      });
    },
    createArtist(newArtist) {
      axios.post(`http://localhost:9000/api/artists`,
          {
            artistName: newArtist.artistName,
            artistDescription: newArtist.artistDescription
          }).then((response) => {
            this.artists.push(response.data);
      });
    },
    createEvent(newEvent) {
      const eventName = newEvent.eventName;
      const eventDescription = newEvent.eventDescription;
      const date = newEvent.date;
      const startTime = newEvent.startTime;
      const venueId = newEvent.venueId;
      const artistId = newEvent.artistId;

      const form = new FormData();
      form.append('file', newEvent.posterFile);

      axios.post('http://localhost:9000/api/events/posters', form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      }).then((response) => {
        const eventPosterFileName = response.data.fileName;

        axios.post(`http://localhost:9000/api/events`,
            {
              eventName: eventName,
              eventDescription: eventDescription,
              date: date,
              startTime: startTime,
              eventPosterFileName: eventPosterFileName,
              venueId: venueId,
              artistId: artistId
            }).then((response) => {});
      });
    }
  },
  created() {
    axios
        .get(`http://localhost:9000/api/cities`)
        .then((response) => {
          this.cities = response.data;
        })
        .catch((e) => {
          console.log(`Error: ${JSON.stringify(e)}`);
        });
    axios
        .get(`http://localhost:9000/api/venues`)
        .then((response) => {
          this.venues = response.data;
        })
        .catch((e) => {
          console.log(`Error: ${JSON.stringify(e)}`);
        });
    axios
        .get(`http://localhost:9000/api/artists`)
        .then((response) => {
          this.artists = response.data;
        })
        .catch((e) => {
          console.log(`Error: ${JSON.stringify(e)}`);
        });
  }
}
</script>

<style scoped>

.administration-stuff-container {
  display: flex;
  flex-direction: row;
}

/* buttons block */

.data-modification-forms-container {
  display: flex;
  flex-direction: column;
  height: 50px;
}

.button-container {
  margin: 10px;
}

.add-data-button {
  height: 50px;
  padding: 10px;
  font-size: 20px;
  min-width: 300px;
  cursor: pointer;
}

/* form popups */

.form-popup {
  display: none;
  position: fixed;
  border: 3px solid #f1f1f1;
  z-index: 9;
  overflow-y: auto;
  height: auto;
  max-height: 70%;
  left: 40%;
}

.form-container {
  max-width: 300px;
  padding: 10px;
  background-color: white;
}

.form-container input[type=text], .form-container input[type=password] {
  width: 90%;
  padding: 15px;
  margin: 5px 0 22px 0;
  border: none;
  background: #f1f1f1;
}

.form-container input[type=text]:focus, .form-container input[type=password]:focus {
  background-color: #ddd;
  outline: none;
}

.form-container .btn {
  background-color: #04AA6D;
  color: white;
  padding: 16px 20px;
  border: none;
  cursor: pointer;
  width: 100%;
  margin-bottom:10px;
  opacity: 0.8;
}

.form-container .cancel {
  background-color: red;
}

.form-container .btn:hover, .open-button:hover {
  opacity: 1;
}
</style>
