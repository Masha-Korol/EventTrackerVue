<template>
  <div class="profile-menu-container">
    <text id="logout-button" class="header-item-text profile-text logout-button">
      <router-link to="/login" @click="logout">Выйти</router-link>
    </text>
  </div>
</template>

<script>
export default {
  name: 'logout-header-item',
  methods: {
    logout() {
      localStorage.removeItem('user');
    }
  }
}
</script>

<style scoped>
.logout-button {
  color: aliceblue;
  cursor: pointer;
}
</style>
