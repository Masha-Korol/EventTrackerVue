<template>
  <table>
    <caption>Исполнители</caption>
    <thead @click="isTableHidden = !isTableHidden">
    <tr>
      <th>Id</th>
      <th>Название</th>
      <th>Описание</th>
    </tr>
    </thead>
    <tbody v-if="!isTableHidden">
    <tr v-for="artist in artists">
      <td>{{ artist.id }}</td>
      <td>{{ artist.artistName }}</td>
      <td>{{ artist.artistDescription }}</td>
    </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'view-artists',
  props: {
    artists: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      isTableHidden: true
    }
  }
}
</script>

<style scoped>

table {
  margin: 0 auto;
  color: #333;
  background: white;
  border: 1px solid grey;
  font-size: 12pt;
  border-collapse: collapse;
}

table thead {
  cursor: pointer;
}

table thead th,
table tfoot th {
  color: #777;
  background: rgba(0,0,0,.1);
}

table caption {
  padding: .5em;
  color: white;
}

table th,
table td {
  padding: .5em;
  border: 1px solid lightgrey;
}
</style>
