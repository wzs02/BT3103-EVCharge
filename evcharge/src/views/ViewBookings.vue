<template>
  <v-app>
    <NavBar />
    <div class="view_bookings">
      <h1 class="view_bookings_header">My Bookings</h1>
      <div v-if="uid">
        <p class="view_bookings_subheadings">Upcoming</p>
        <br>
        <div>
          <BookingRecord v-if="hasUpcomingBooking" :bookingDetails="upcomingBookingDetails"/>
          <p v-else class="bookings_record_headings">You have no upcoming bookings</p>
        </div>
        <p class="view_bookings_subheadings">Past</p>
        <br>
        <div>
          <div v-if="hasPastBooking" class="past_booking_records">
            <div  v-for="record in pastBookingDetailsList" :key="record.id">
              <PastBookingRecord :bookingDetails="record"/>
            </div>
          </div>
          <p v-else class="bookings_record_headings">You have no past bookings</p>
        </div>
      </div>
      <div v-else>
        <p class="view_bookings_subheadings">
          You are not logged in. Please proceeed to log in.
        </p>
      </div>
    </div>
  </v-app>
</template>

<script>
import firebaseApp from '../firebase.js';
import { getFirestore , collection,  getDocs, query, orderBy } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from '@firebase/auth';
import NavBar from "../components/NavBar.vue";
import BookingRecord from "../components/BookingRecord.vue";
import PastBookingRecord from "../components/PastBookingRecord.vue";

export default {
    created() {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.uid = user.uid;
          this.getBookingData(this.uid)
        }
      })
    },
    data() {
      return {
        uid: false,
        hasUpcomingBooking: false,
        upcomingBookingDetails: {},
        hasPastBooking: false,
        pastBookingDetailsList: [],
      }
    },
    components: { NavBar, BookingRecord, PastBookingRecord },
    methods: {
      async getBookingData(uid) {
        const db = getFirestore(firebaseApp);
        const userBookingRef = collection(db, "users", uid, "bookings")
        // Cut-off time for booking deletion. 15 min before booking start time. 
        let cutOffTimestamp = new Date(Date.now() - 15 * 60000); 
        // Get all booking records for the user
        let z = await getDocs(query(userBookingRef, orderBy("date", "desc")));
        z.forEach((docs) => {
            let data = docs.data();
            // Process time display
            let startTimestamp = data.date.toDate()
            let duration = data.duration; // booking duration in minutes
            let endTimestamp = new Date(startTimestamp.getTime() + duration * 60000)
            let timeString = startTimestamp.toTimeString().slice(0, 5) + "-" + endTimestamp.toTimeString().slice(0, 5)
            // Update bookingDetails object containing booking record information
            let bookingDetails = {};
            bookingDetails.id = docs.id;
            bookingDetails.location = data.location;
            bookingDetails.date = data.date.toDate().toLocaleDateString('en-GB');
            bookingDetails.time = timeString;
            bookingDetails.charger_type = data.charger_type;
            bookingDetails.svc_pdr = data.svc_pdr;
            // Check if it is an upcoming booking
            if (startTimestamp > cutOffTimestamp) {
              // Only 1 upcoming booking is permitted per user to prevent slot hogging.
              this.upcomingBookingDetails = bookingDetails;
            } else {
              this.pastBookingDetailsList.push(bookingDetails);
            }
        });
        // Update booking display booleans
        this.hasUpcomingBooking = Object.keys(this.upcomingBookingDetails).length > 0;
        this.hasPastBooking = this.pastBookingDetailsList.length > 0;
      }
    }
}
</script>

<style scoped>
.view_bookings {
  margin-top: 140px;
  margin-left: 130px;
}

.view_bookings_header {
  font-family: 'Outfit', sans-serif;
  font-weight: bold;
  font-size: 55px;
  margin-bottom: 20px;
}

.view_bookings_subheadings {
  margin-top: 40px;
  font-family: 'Outfit', sans-serif;
  font-weight: 400;
  font-size: 35px;
}

.view_bookings_past {
  margin-top: 40px;
  font-family: 'Outfit', sans-serif;
  font-weight: 400;
  font-size: 35px;
}

.bookings_record_headings {
  font-family: 'Nunito', sans-serif;
  font-weight: 700;
  font-size: 22px;
  text-align: left;
}

.past_booking_records {
  overflow-y: scroll;
  max-height: 450px;
  max-width: 1050px;
}

::-webkit-scrollbar {
  width: 7px;
}

::-webkit-scrollbar-track {
  background: #fff;
}

::-webkit-scrollbar-thumb {
  background: #d9d9d9; 
}

::-webkit-scrollbar-thumb:hover {
  background: #777; 
}

</style>