<template>
  <div class="concert-block" @click="this.$router.push({name: 'EventInfo', params: { id: this.event.id}})">
    <div>{{event.eventName}} - {{event.city}}</div>
    <div>{{event.date}}</div>
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
  border: 1px solid rgba(255, 255, 255, 0.5);
  background: none;
  padding: 10px;
  margin: 10px;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  background: rgba(28, 28, 28, 0.5);
}
</style>
