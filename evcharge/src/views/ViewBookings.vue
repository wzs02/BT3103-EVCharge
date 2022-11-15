<template>
  <v-app>
    <div class="view_bookings" v-if="showDisplay">
      <NavBarLogin :key="notifStatusTrigger" />
      <h1 class="view_bookings_header">My Bookings</h1>
      <div v-if="uid">
        <p class="view_bookings_subheadings">Upcoming</p>
        <br>
        <div>
          <BookingRecord v-if="hasUpcomingBooking" :bookingDetails="upcomingBookingDetails"
            @deleteBooking="deleteBooking($event)" />
          <p v-else class="bookings_record_headings">You have no upcoming bookings</p>
        </div>
        <p class="view_bookings_subheadings">Past</p>
        <br>
        <div>
          <div v-if="hasPastBooking" class="past_booking_records">
            <div v-for="record in pastBookingDetailsList" :key="record.id">
              <PastBookingRecord :bookingDetails="record" />
            </div>
          </div>
          <p v-else class="bookings_record_headings">You have no past bookings</p>
        </div>
      </div>
    </div>
    <div v-else>
      <SignInToAccess />
    </div>
  </v-app>
</template>

<script>
import firebaseApp from '../firebase.js';
import { getFirestore, doc, collection, getDocs, deleteDoc, query, where, orderBy, getDoc, updateDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from '@firebase/auth';
import NavBarLogin from "../components/NavBarLogin.vue";
import BookingRecord from "../components/BookingRecord.vue";
import PastBookingRecord from "../components/PastBookingRecord.vue";
import SignInToAccess from '@/components/SignInToAccess.vue';

export default {
  created() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.showDisplay = true;
        this.uid = user.uid;
        this.getBookingData(this.uid)
      }
    })
  },
  data() {
    return {
      uid: false,
      showDisplay: false,
      hasUpcomingBooking: false,
      upcomingBookingDetails: {},
      hasPastBooking: false,
      pastBookingDetailsList: [],
      notifStatusTrigger: 0,
    }
  },
  components: { NavBarLogin, BookingRecord, PastBookingRecord, SignInToAccess },
  methods: {
    async getBookingData(uid) {
      const db = getFirestore(firebaseApp);
      const userBookingRef = collection(db, "bookings") 
      let currentTimestamp = new Date(Date.now());
      // Get all booking records for the user
      let z = await getDocs(query(userBookingRef, where("user_id", "==", uid), orderBy("start_timestamp", "desc")));
      z.forEach((docs) => {
        let data = docs.data();
        // Process time display
        let startTimestamp = data.start_timestamp.toDate();
        let endTimestamp = data.end_timestamp.toDate();
        let timeString = startTimestamp.toTimeString().slice(0, 5) + "-" + endTimestamp.toTimeString().slice(0, 5)
        // Update bookingDetails object containing booking record information
        let bookingDetails = {};
        bookingDetails.id = docs.id;
        bookingDetails.location = data.location;
        bookingDetails.date = startTimestamp.toLocaleDateString('en-GB');
        bookingDetails.time = timeString;
        bookingDetails.charger_type = data.charger_type;
        bookingDetails.svc_pdr = data.provider;
        // Check if it is an upcoming booking
        if (startTimestamp > currentTimestamp ) {
          // Only 1 upcoming booking is permitted per user to prevent slot hogging.
          this.upcomingBookingDetails = bookingDetails;
        } else {
          this.pastBookingDetailsList.push(bookingDetails);
        }
      });
      // Update booking display booleans
      this.hasUpcomingBooking = Object.keys(this.upcomingBookingDetails).length > 0;
      this.hasPastBooking = this.pastBookingDetailsList.length > 0;
    },

    async deleteBooking(bookingId) {
      const db = getFirestore(firebaseApp);
      const docRef = doc(db, "bookings", bookingId);
      const docSnap = await getDoc(docRef);
      let startTimestamp = docSnap.data().start_timestamp;
      // Cut-off time for booking deletion without penalty. 15 min before booking start time.
      let cutOffTimestamp = new Date(startTimestamp.toDate() - 15 * 60000);
      let currentTimestamp = new Date(Date.now());
      if (currentTimestamp > cutOffTimestamp) {
        alert("You are going to delete your upcoming booking. A $30 penalty will be incurred.")
        await deleteDoc(doc(db, "bookings", bookingId));
        const timer = this.today
        await updateDoc(doc(db, "Transactions", this.uid),
          {
              [timer]: {
                  date: new Date(Date.now()).toLocaleDateString('en-GB'),
                  time: this.currentTime(),
                  uid: this.uid,
                  type: "No-show Penalty"
              }
          });
        alert("$30 deposit deducted as penalty");
        alert("Booking successfully deleted");
        this.hasUpcomingBooking = false;
        this.notifStatusTrigger++;
      } else {
        alert("You are going to delete your upcoming booking")
        await deleteDoc(doc(db, "bookings", bookingId));
        alert("Booking successfully deleted");
        this.hasUpcomingBooking = false;
        this.notifStatusTrigger++;
      }
    },
    currentTime() {
      const today = new Date();
      if (today.getHours() > 12) {
          var hour = today.getHours() - 12
          var pmAM = 'PM'
      } else {
          hour = today.getHours()
          pmAM = 'AM'
      }
      var minutes = today.getMinutes().toString()

      var now_time = (hour + ":" + minutes + " " + pmAM).toString()
      return now_time;
    },
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