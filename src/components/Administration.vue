<template>
  <div class="header-container">
    <div class="title-container">
      <text class="title-text">Административная страница</text>
    </div>
    <events-header-item/>
    <recommendations-header-item/>
    <profile-header-item/>
  </div>

  <div class="data-modification-forms-container">
    <div class="button-container">
      <button id="add-location-button" class="add-data-button">Добавить локацию</button>
    </div>
    <div class="button-container">
      <button id="add-concert-button" class="add-data-button">Добавить мероприятие</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Administration'
}
</script>

<style scoped>
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
