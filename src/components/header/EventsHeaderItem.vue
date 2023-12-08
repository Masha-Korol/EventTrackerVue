<template>
  <div class="menu-container">
    <div class="header-item-text">
      <router-link to="/">Мероприятия</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'events-header-item'
}
</script>

<style scoped>

</style>
