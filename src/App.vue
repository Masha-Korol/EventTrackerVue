<template>
  <router-view/>
</template>

<script>
import EventList from '@/components/EventList.vue';
import EventInfo from '@/components/EventInfo.vue';
import Profile from '@/components/Profile.vue';
import Recommendations from '@/components/Recommendations.vue';
import UserProfile from '@/components/UserProfile.vue';
import Chat from '@/components/Chat.vue';
import Administration from '@/components/Administration.vue';

export default {
  components: {
    EventList,
    EventInfo,
    Profile,
    Recommendations,
    UserProfile,
    Chat,
    Administration
  },
  data() {

  },
  methods: {

  }
}
</script>

<style scoped>

</style>
