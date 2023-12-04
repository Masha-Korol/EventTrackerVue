<template>
  <div class="friend-block">
    <div class="friend-block-username">{{friend.userName}}</div>
  </div>
</template>

<script>
export default {
  props: {
    friend: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>

</style>
