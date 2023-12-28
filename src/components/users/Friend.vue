<template>
  <div class="friend-block">
    <div class="friend-block-username" @click="this.$router.push({name: 'UserProfile', params: { id: friend.id}})">{{friend.userName}}</div>
    <div class="user-request-block" @click="modifyFriendState">{{friendRequestWasCanceled ? 'Добавить в друзья' : 'Убрать из друзей'}}</div>
  </div>
</template>

<script>
export default {
  props: {
    friend: {
      type: Object,
      required: true
    },
  },
  data() {
    return {
      friendRequestWasCanceled: false
    }
  },
  methods: {
    modifyFriendState() {
      if (this.friendRequestWasCanceled) {
        this.$emit('sendFriendRequest', this.friend.id);
        this.friendRequestWasCanceled = false;
      } else {
        this.$emit('cancelFriendRequest', this.friend.id);
        this.friendRequestWasCanceled = true;
      }
    }
  }
}
</script>

<style scoped>
.friend-block {
  border: 1px solid rgba(255, 255, 255, 0.5);
  padding: 10px;
  margin: 10px;
  display: flex;
  flex-direction: row;
  background: rgba(28, 28, 28, 0.8);
}

.friend-block-username {
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
