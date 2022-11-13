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
                        <td class="loc_value">{{ bookingDetails.location }}</td>
                        <td>{{ bookingDetails.date }}</td>
                        <td>{{ bookingDetails.time }}</td>
                        <td>{{ bookingDetails.charger_type }}</td>
                        <td class="svc_pdr_value">{{ bookingDetails.svc_pdr}}</td>
                    </tbody>
                </table>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    name: 'PastPaymentRecord'
}
</script>

<style scoped>

</style>