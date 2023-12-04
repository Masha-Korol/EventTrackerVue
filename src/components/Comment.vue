<template>
  <div class="comment text-justify darker mt-4'">
    <h4>{{comment.userName}}<br></h4>
    <span>{{comment.date}}<br><br></span>
    <p>{{comment.text}}</p>
  </div>
</template>

<script>
export default {
  components: {Comment},
  props: {
    comment: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>

</style>
