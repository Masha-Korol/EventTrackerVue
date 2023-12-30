<template>
  <v-table>
    <thead slot="head">
    <th>Id</th>
    <th>Name</th>
    </thead>
    <tbody slot="body" slot-scope="{cities}">
    <tr v-for="city in cities" :key="city.id">
      <td>{{ city.id }}</td>
      <td>{{ city.cityName }}</td>
    </tr>
    </tbody>
  </v-table>
</template>

<script>
export default {
  name: 'view-cities',
  props: {
    cities: {
      type: Array,
      required: true
    },
  },
}
</script>

<style scoped>

</style>
