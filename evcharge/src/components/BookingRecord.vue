<template>
    <v-container v-if="has_upcoming_booking" class="booking_record_container"> 
        <v-row>
            <v-col cols="10">
                <table>
                    <thead class="bookings_record_headings">
                        <th>Location</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Charger Type</th>
                        <th>Service Provider</th>
                    </thead>
                    <tbody class="bookings_record_values">
                        <td v-text="location" class="loc_value"></td>
                        <td v-text="date"></td>
                        <td v-text="time"></td>
                        <td v-text="charger_type"></td>
                        <td v-text="svc_pdr" class="svc_pdr_value"></td>
                    </tbody>
                </table>
            </v-col>
            <v-col cols="2">
                <div class="delete_booking_div">
                    <button @click="deleteBooking" class="delete_booking_btn">Delete</button>
                </div>
            </v-col>
        </v-row>
    </v-container>
    <p v-else class="bookings_record_headings">You have no upcoming bookings</p>
</template>

<script>
export default {
    name: 'BookingRecord',
    created() {
        this.updateBookingRecord()
    },
    data() {
        return {
            has_upcoming_booking: false,
            location: "",
            date: "",
            time: "",
            charger_type: "",
            svc_pdr: ""
        }
    },
    methods: {
        updateBookingRecord() {
            let output = true;

            if (output == true) {
                this.has_upcoming_booking = true;

                // Update to fetch data from firebase"
                this.location = "Jalan Kayu URA Car Park",
                this.date = "23 Sep 2023",
                this.time = "09:30-10:30",
                this.charger_type = "CCS",
                this.svc_pdr = "TotalEnergies"
            } else {
                this.has_upcoming_booking = false;
            }
        },
        deleteBooking() {

        }
    }
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
  border-radius: 20px;
  max-width: 1200px;
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

.delete_booking_div {
    display: flex;
    justify-content: center;
    align-items: center;
}

.delete_booking_btn {
    background-color: #FF7575;
    color: #FFFFFF;
    font-family: 'Nunito', sans-serif;
    font-weight: bold;
    font-size: 22px;
    border-radius: 20px;
    width: 128px;
    height: 50px;
}
</style>