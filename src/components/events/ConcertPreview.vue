<template>
  <div class="concert-block" @click="this.$router.push({name: 'EventInfo', params: { id: this.event.id}})">
    <img :src="require(`@/../images/posters/${event.posterFile}`)">
  </div>
</template>

<script>
export default {
  props: {
    event: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.concert-block {
  padding: 10px;
  cursor: pointer;
}

img {
  width: 400px;
  height: 400px;
}
</style>
