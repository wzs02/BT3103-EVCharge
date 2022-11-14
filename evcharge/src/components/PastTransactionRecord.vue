<template>
    <v-container class="transactions_record_container"> 
        <v-row>
            <v-col>
                <table>
                    <thead class="transactions_record_headings">
                        <th>Date</th>
                        <th>Time</th>
                        <th>Amount</th>
                        <th>Type</th>
                    </thead>
                    <tbody class="transactions_record_values">
                        <td>{{transDetails.date}}</td>
                        <td>{{transDetails.time}}</td>
                        <td>{{transDetails.amount}}</td>
                        <td>{{transDetails.type}}</td>
                    </tbody>
                </table>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    name: 'PastTransactionRecord',
    props: {
        transDetails: Object
    },
}
</script>

<style scoped>
table {
    table-layout: fixed;
}

td {
    word-wrap: break-word;
    width: 16%;
}

.transactions_record_container {
  background-color: #F5F5F5;
  margin-left: 0;
  margin-bottom: 20px;
  border-radius: 20px;
  max-width: 1000px;
  margin-left: 100px;
}

.transactions_record_headings {
  font-family: 'Nunito', sans-serif;
  font-weight: 700;
  font-size: 22px;
  text-align: left;
}

.transactions_record_values {
  font-family: 'Nunito', sans-serif;
  font-weight: 400;
  font-size: 22px;
}
</style>