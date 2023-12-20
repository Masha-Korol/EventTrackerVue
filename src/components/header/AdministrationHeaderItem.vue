<template>
  <div id="admin-page-link-container" class="admin-page-link-container">
    <text class="header-item-text profile-text">
      <router-link to="/administration">Административная страница</router-link>
    </text>
  </div>
</template>

<script>
export default {
  name: 'administration-header-item'
}
</script>

<style scoped>
.admin-page-link-container {
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 80px 44px 60px;
  margin-left: auto;
}
</style>
