<template>
  <table>
    <caption>Мероприятия</caption>
    <thead @click="isTableHidden = !isTableHidden">
    <tr>
      <th>Id</th>
      <th>Название</th>
      <th>Описание</th>
      <th>Дата</th>
      <th>Время начала</th>
      <th>Постер</th>
      <th>Площадка - Город</th>
      <th>Исполнитель</th>
    </tr>
    </thead>
    <tbody v-if="!isTableHidden">
    <tr v-for="event in events">
      <td>{{ event.id }}</td>
      <td>{{ event.eventName }}</td>
      <td>{{ event.eventDescription }}</td>
      <td>{{ event.date }}</td>
      <td>{{ event.startTime }}</td>
      <td>{{ event.eventPosterFileName }}</td>
      <td>{{ event.venueName }} - {{event.cityName}}</td>
      <td>{{ event.artistName }}</td>
    </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'view-events',
  props: {
    events: {
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
