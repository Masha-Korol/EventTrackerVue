<template>
  <div class="user-block">
    <div class="user-block-username" @click="this.$router.push({name: 'UserProfile', params: { id: this.user.id}})">{{user.userName}}</div>
    <div class="user-request-block">Отправить заявку</div>
  </div>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.user-block {
  border: 1px solid rgba(255, 255, 255, 0.5);
  padding: 10px;
  margin: 10px;
  display: flex;
  flex-direction: row;
  background: rgba(28, 28, 28, 0.8);
}

.user-block-username {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  font-size: 40px;
  color: #FFFFFF;
  width: min-content;
  text-align: center;
  line-height: 50px;
  cursor: pointer;
}

.user-request-block {
  margin-left: 50px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  padding: 5px;
  font-size: 30px;
  cursor: pointer;
  color: black;
  background: #FFFFFF;
  opacity: 80%;
  border-radius: 10px;
}
</style>
