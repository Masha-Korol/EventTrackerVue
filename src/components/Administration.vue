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
      <div class="button-container">
        <button class="add-data-button" @click="showAddUserDialog = true">Добавить пользователя</button>
      </div>
    </div>

    <div class="data-view-container">
      <div>
        <view-cities :cities="cities"/>
      </div>
      <div>
        <view-venues :venues="venues"/>
      </div>
      <div>
        <view-artists :artists="artists"/>
      </div>
      <div>
        <view-events :events="events"/>
      </div>
      <div>
        <view-users :users="users"/>
      </div>
    </div>
  </div>

  <add-city-dialog v-model:show="showAddCityDialog" @createCity="createCity"/>
  <add-venue-dialog v-model:show="showAddVenueDialog" :cities="cities" @createVenue="createVenue"/>
  <add-artist-dialog v-model:show="showAddArtistDialog" @createArtist="createArtist"/>
  <add-event-dialog v-model:show="showAddEventDialog" :venues="venues" :artists="artists" @createEvent="createEvent"/>
  <add-user-dialog v-model:show="showAddUserDialog" @createUser="createUser"/>
</template>

<script>
import AddCityDialog from '@/components/dialogs/AddCityDialog.vue';
import AddVenueDialog from '@/components/dialogs/AddVenueDialog.vue';
import AddArtistDialog from '@/components/dialogs/AddArtistDialog.vue';
import AddEventDialog from '@/components/dialogs/AddEventDialog.vue';
import AddUserDialog from '@/components/dialogs/AddUserDialog.vue';
import ViewCities from '@/components/administration/ViewCities.vue';
import ViewVenues from '@/components/administration/ViewVenues.vue';
import ViewArtists from '@/components/administration/ViewArtists.vue';
import ViewEvents from '@/components/administration/ViewEvents.vue';
import ViewUsers from '@/components/administration/ViewUsers.vue';
import axios from 'axios';
import FormData from 'form-data';
import {authHeader, getAuthHeader, handleAxiosError} from '@/util/authentication-helper';
import {BACKEND_URL} from '@/config';

export default {
  name: 'Administration',
  components: {
    AddCityDialog, AddVenueDialog, AddArtistDialog, AddEventDialog, AddUserDialog,
    ViewCities, ViewVenues, ViewArtists, ViewEvents, ViewUsers
  },
  data() {
    return {
      cities: [],
      venues: [],
      artists: [],
      events: [],
      users: [],
      showAddCityDialog: false,
      showAddVenueDialog: false,
      showAddArtistDialog: false,
      showAddEventDialog: false,
      showAddUserDialog: false
    }
  },
  methods: {
    createCity(newCity) {
      axios.post(`${BACKEND_URL}/cities`,
          {
            cityName: newCity.cityName,
          },
          {headers: authHeader()})
          .then((response) => {
            this.cities.push(response.data);
          })
          .catch(handleAxiosError);
    },
    createVenue(newVenue) {
      axios.post(`${BACKEND_URL}/venues`,
          {
            venueName: newVenue.venueName,
            cityId: newVenue.cityId,
          },
          {headers: authHeader()})
          .then((response) => {
            this.venues.push(response.data);
          })
          .catch(handleAxiosError);
    },
    createArtist(newArtist) {
      axios.post(`${BACKEND_URL}/artists`,
          {
            artistName: newArtist.artistName,
            artistDescription: newArtist.artistDescription
          }, {headers: authHeader()})
          .then((response) => {
            this.artists.push(response.data);
          })
          .catch(handleAxiosError);
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

      axios.post(`${BACKEND_URL}/events/posters`, form, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': getAuthHeader()
        }
      }).then((response) => {
        const eventPosterFileName = response.data.fileName;

        axios.post(`${BACKEND_URL}/events`,
            {
              eventName: eventName,
              eventDescription: eventDescription,
              date: date,
              startTime: startTime,
              eventPosterFileName: eventPosterFileName,
              venueId: venueId,
              artistId: artistId
            },
            {headers: authHeader()})
            .then((response) => {
              this.events.push(response.data);
            })
            .catch(handleAxiosError);
      }).catch(handleAxiosError);
    },
    createUser(newUser) {
      axios.post(`${BACKEND_URL}/users`,
          {
            userName: newUser.userName,
            password: newUser.password,
            isAdmin: newUser.isAdmin
          },
          {headers: authHeader()})
          .then((response) => {
            this.users.push(response.data);
          })
          .catch(handleAxiosError);
    }
  },
  created() {
    axios
        .get(`${BACKEND_URL}/cities`, {headers: authHeader()})
        .then((response) => {
          this.cities = response.data;
        })
        .catch(handleAxiosError);
    axios
        .get(`${BACKEND_URL}/venues`, {headers: authHeader()})
        .then((response) => {
          this.venues = response.data;
        })
        .catch(handleAxiosError);
    axios
        .get(`${BACKEND_URL}/artists`, {headers: authHeader()})
        .then((response) => {
          this.artists = response.data;
        })
        .catch(handleAxiosError);
    axios
        .get(`${BACKEND_URL}/events/detailed`, {headers: authHeader()})
        .then((response) => {
          this.events = response.data;
        })
        .catch(handleAxiosError);
    axios
        .get(`${BACKEND_URL}/users/get/all`, {headers: authHeader()})
        .then((response) => {
          this.users = response.data;
        })
        .catch(handleAxiosError);
  }
}
</script>

<style scoped>

.administration-stuff-container {
  display: flex;
  flex-direction: row;
}

.data-view-container {
  display: flex;
  flex-direction: column;
  margin-left: 5%;
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
