<template>
  <div class="modal" v-if="show">
    <div class="modal-content">
      <div class="modal-header">
        <span class="close" @click="this.$emit('update:show', false)">&times;</span>
        <h2>Добавить город</h2>
      </div>
      <div class="modal-body">
        <div class="form-body">
          <form>
            <label for="city-name">Название</label>
            <input type="text" id="city-name" name="cityName" placeholder="" v-model="newCity.cityName">

            <input type="submit" value="Отправить" @click="createCity">

            <p v-if="errors.length">
              <ul>
                <li v-for="error in errors" class="error-text">{{ error }}</li>
              </ul>
            </p>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'add-city-dialog',
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      newCity: {
        cityName: ''
      },
      errors: []
    }
  },
  methods: {
    createCity(event) {
      event.preventDefault();

      this.validateForm();

      if (this.errors.length === 0) {
        this.$emit('createCity', this.newCity);
        this.newCity.cityName = '';
        this.$emit('update:show', false);
      }
    },
    validateForm() {
      this.errors = [];

      if (!this.newCity.cityName) {
        this.errors.push('Необходимо указать название города.');
      }
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

.error-text {
  color: red;
}
</style>
