<template>
  <table>
    <caption>Пользователи</caption>
    <thead @click="isTableHidden = !isTableHidden">
    <tr>
      <th>Id</th>
      <th>Имя</th>
      <th>Админ</th>
    </tr>
    </thead>
    <tbody v-if="!isTableHidden">
    <tr v-for="user in users">
      <td>{{ user.id }}</td>
      <td>{{ user.userName }}</td>
      <td>{{ user.isAdmin ? 'админ' : '' }}</td>
    </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'view-users',
  props: {
    users: {
      type: Array,
      required: true
    },
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
