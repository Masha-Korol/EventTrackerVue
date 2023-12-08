<template>
  <div class="rate-container">
    <div class="rate">
      <input v-on:click="onMarkChange" type="radio" id="star5" name="rate" value="5" v-bind:checked="mark === 5" />
      <label for="star5" title="text">5 stars</label>
      <input v-on:click="onMarkChange" type="radio" id="star4" name="rate" value="4" v-bind:checked="mark === 4" />
      <label for="star4" title="text">4 stars</label>
      <input v-on:click="onMarkChange" type="radio" id="star3" name="rate" value="3" v-bind:checked="mark === 3" />
      <label for="star3" title="text">3 stars</label>
      <input v-on:click="onMarkChange" type="radio" id="star2" name="rate" value="2" v-bind:checked="mark === 2" />
      <label for="star2" title="text">2 stars</label>
      <input v-on:click="onMarkChange" type="radio" id="star1" name="rate" value="1" v-bind:checked="mark === 1" />
      <label for="star1" title="text">1 star</label>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    mark: {
      type: Object,
      required: true
    }
  },
  methods: {
    onMarkChange(event) {
      const newMark = event.target.value;
      this.$emit('onMarkChange', newMark);
    },
  }
}
</script>

<style scoped>
.rate-container {
  display: contents;
}

.rate {
  height: 46px;
  padding: 0 10px;
  margin-left: 180px;
  width: 200px;
}

.rate:not(:checked) > input {
  position: absolute;
  top: -9999px;
  display: none;
}

.rate:not(:checked) > label {
  float: right;
  width: 1em;
  overflow: hidden;
  white-space: nowrap;
  cursor: pointer;
  font-size: 30px;
  color :#ccc;
}

.rate:not(:checked) > label:before {
  content: '★ ';
}

.rate > input:checked ~ label {
  color: #ffc700;
}

.rate:not(:checked) > label:hover,
.rate:not(:checked) > label:hover ~ label {
  color: #deb217;
}
.rate > input:checked + label:hover,
.rate > input:checked + label:hover ~ label,
.rate > input:checked ~ label:hover,
.rate > input:checked ~ label:hover ~ label,
.rate > label:hover ~ input:checked ~ label {
  color: #c59b08;
}
</style>
