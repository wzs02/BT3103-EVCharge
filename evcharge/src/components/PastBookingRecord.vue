<template>
    <v-container class="booking_record_container"> 
        <v-row>
            <v-col>
                <table>
                    <thead class="bookings_record_headings">
                        <th>Location</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Charger Type</th>
                        <th>Service Provider</th>
                    </thead>
                    <tbody class="bookings_record_values">
                        <td class="loc_value">{{bookingDetails.location}}</td>
                        <td>{{bookingDetails.date}}</td>
                        <td>{{bookingDetails.time}}</td>
                        <td>{{bookingDetails.charger_type}}</td>
                        <td class="svc_pdr_value">{{bookingDetails.svc_pdr}}</td>
                    </tbody>
                </table>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    name: 'PastBookingRecord',
    props: {
        bookingDetails: Object
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

td.loc_value {
    width: 32%;
}

td.svc_pdr_value {
    width: 18%;
}

.booking_record_container {
  background-color: #F5F5F5;
  margin-left: 0;
  margin-bottom: 20px;
  border-radius: 20px;
  max-width: 1000px;
}

.bookings_record_headings {
  font-family: 'Nunito', sans-serif;
  font-weight: 700;
  font-size: 22px;
  text-align: left;
}

.bookings_record_values {
  font-family: 'Nunito', sans-serif;
  font-weight: 400;
  font-size: 22px;
}
</style>