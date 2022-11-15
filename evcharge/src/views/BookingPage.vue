<template>
  <v-app>
    <NavBar />
    <v-container>

      <v-row class="header">
        <h1>Book a Charger: <span style="color: #4285f4">{{ this.selected_station_name }}</span><span style="color: #7F8487">{{ this.selected_charger_display_num }}</span></h1>
      </v-row>
      <v-row class="availableChargers" style="height: 10%">
        <v-col cols=3>
          <h3 v-if="this.selected_station_name != 'No charging station selected'">Please select a charger</h3>
          <p v-else class="validationMsg">Please select a charging station</p>
        </v-col>
        <v-col>
          <div class="legendindiv" v-if="this.chargerTypes.includes('CCS/SAE')">
            <span class="dot" style="background-color: #0096c7"></span>
            <p class="legendtext">CCS/SAE</p>
          </div>
          <div class="legendindiv" v-if="this.chargerTypes.includes('Commando')">
            <span class="dot" style="background-color: #0077b6"></span>
            <p class="legendtext">Commando</p>
          </div>
          <div class="legendindiv" v-if="this.chargerTypes.includes('J-1772')">
            <span class="dot" style="background-color: #023e8a"></span>
            <p class="legendtext">J-1772</p>
          </div>
          <div class="legendindiv" v-if="this.chargerTypes.includes('Type 2')">
            <span class="dot" style="background-color: #03045e"></span>
            <p class="legendtext">Type 2</p>
          </div>
        </v-col>
      </v-row>
      <v-row style="height: 20%">
        <div v-for="charger in chargerList" :key="charger.id">
          <v-btn class="btncharger" rounded elevation="3" @click="selectCharger(charger.id, charger.display_num, charger.type)" :color="charger.display_col">{{ charger.display_num }}</v-btn>
        </div>
      </v-row>

      <v-row style="height: 60%">
        <v-col cols=6>
          <BookingCalendar @dateSelected="updateSelectedDate($event)"/>
          <div class="legend">
            <div class="legendindiv">
              <span class="dot" style="background-color: #46946e"></span>
              <p class="legendtext">Available</p>
            </div>
            <div class="legendindiv">
              <span class="dot" style="background-color: #d74749"></span>
              <p class="legendtext">Unavailable</p>
            </div>
            <div class="legendindiv">
              <span class="dot" style="background-color: #367ab8"></span>
              <p class="legendtext">Selected</p>
            </div>
          </div>
        </v-col>

        <v-col cols=6>
          <div class="dayview" v-if="this.selected_date_string != ''">
            <v-card height="650px" color="#F5F5F5">
              <BookingCalendarDay :key="this.dateSelectionTrigger" :selectedDateString="this.selected_date_string" :selectedChargerID="this.selected_charger_id" @timeSelected="updateSelectedTime($event)"/>
              <v-card-text class="bookingInfo">
                You are booking for <b>{{ this.selected_station_name }}{{ this.selected_charger_display_num }}</b><br><br>
                <p v-html="date_time_info_string"></p>
              </v-card-text>
              <v-btn class="btn" rounded elevation="3" @click="makeBooking" :disabled="isBookingDisabled">Book</v-btn>
            </v-card>
          </div>
          <p v-else class="validationMsg">Please select a date</p>
        </v-col>
      </v-row>
     
    </v-container>
  </v-app>
</template>

<script>
import firebaseApp from "../firebase.js"
import { getFirestore, getDoc, addDoc, doc, collection, query, where, getDocs } from "firebase/firestore"
import { getAuth, onAuthStateChanged } from '@firebase/auth';
import NavBar from "@/components/NavBar.vue";
import BookingCalendar from "@/components/BookingCalendar.vue"
import BookingCalendarDay from "@/components/BookingCalendarDay.vue"
//import moment from 'moment'
//import { bookingVar } from "@/assets/BookingPage/write_bookings.js"

const db = getFirestore(firebaseApp)

export default {
  name: 'BookingPage',
  components: { NavBar, BookingCalendar, BookingCalendarDay },
  created(){
    let station_id = localStorage.getItem("stationID");
    if (station_id != null) {
     this.getStationData(station_id);
     localStorage.removeItem("stationID")
    }
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.uid = user.uid;
        this.checkIfInsufficientDeposit(this.uid);
        this.checkIfExistingUpcomingBooking(this.uid);
      }
    })
  },
  updated() {
    this.isBookingDisabled = this.checkBookingFields();
  },
  data() {
    return {
      numChargerAvailable: 0,
      chargerTypes: [],
      chargerList: [],
      // monthlyAvailability: {},
      uid: false,
      isBookingDisabled: true,
      selected_charger_id: "",
      selected_station_name: "No charging station selected", 
      selected_station_provider: "",
      selected_station_charger_type: "",
      selected_station_address: "",
      selected_charger_display_num: "",
      selected_date_string: "",
      selected_start_time: "",
      selected_end_time:"",
      booking_duration: "",
      date_time_info_string: "",
      hasInsufficientDeposit: true,
      hasExistingUpcomingBooking: true,
      dateSelectionTrigger: 0,
      chargerTypeColourMap: {"Type 2": "#03045e", "CCS/SAE": "#0096c7", "Commando": "#0077b6", "J-1772": "#023e8a"}
    } 
  },
  methods: {
    async getStationData(station_id) {
      const docRef = doc(db, "MapPage", "chargerLocations");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const station_data = docSnap.data()[station_id][0];
        // Store station info
        this.selected_station_name = station_data.id;
        this.selected_station_provider = station_data.chargerDetails["provider"];
        this.selected_station_address = {"street": station_data.street, "postalCode": station_data.postalCode};
        // Store charger number and type info
        const num_lots_list = station_data.chargerDetails["lots"];
        const charger_type_list = station_data.chargerDetails["type"];
        this.chargerTypes = charger_type_list;
        const type_num_lots_mapping = {};
        const num_charger_types = Object.keys(charger_type_list).length
        for (let i=0; i < num_charger_types; i++) {
          type_num_lots_mapping[charger_type_list[i]] = parseInt(num_lots_list[i]);
        }
        const total_num_chargers = Object.values(type_num_lots_mapping).reduce((a, b) => a + b, 0);
        this.numChargerAvailable = total_num_chargers;
        // Create list of chargers for the selected charging station
        const chargers_list = [];
        let charger_num_counter = 1;
        for (const [type, num] of Object.entries(type_num_lots_mapping).sort()) { // sort output to maintain fixed order
          for (let i=0; i < num; i++) {
            let charger_info = {id: station_id.concat("_", charger_num_counter.toString()), type: type,
              display_num: charger_num_counter.toString(), display_col: this.chargerTypeColourMap[type]}
            chargers_list.push(charger_info);
            charger_num_counter++;
          }
        }
        this.chargerList = chargers_list;
      }
    },
    async selectCharger(id, display_num, charger_type) {
      this.selected_charger_id = id;
      this.selected_charger_display_num = "-" + display_num.toString();
      this.selected_station_charger_type = charger_type;
      this.dateSelectionTrigger++;
    },
    updateSelectedDate(dateString) {
      this.selected_date_string = dateString;
      this.dateSelectionTrigger++;
      this.selected_start_time = "";
      this.selected_end_time = "";
      this.booking_duration = "";
      this.date_time_info_string = "";
      this.isBookingDisabled = this.checkBookingFields();
    },
    updateSelectedTime(timeDetails) {
      this.selected_start_time = timeDetails.startTime;
      this.selected_end_time = timeDetails.endTime;
      this.booking_duration = timeDetails.duration;
      if (this.selected_start_time  && this.selected_end_time) {
        let time_info_string = this.selected_start_time.toTimeString().slice(0, 5) + "-" + this.selected_end_time.toTimeString().slice(0, 5)
        let date_info_string = this.selected_start_time.toLocaleDateString('en-GB');
        this.date_time_info_string = `on <b>${date_info_string}</b>, <b>${time_info_string}</b>`
      } else {
        this.date_time_info_string = ""
      }
      this.isBookingDisabled = this.checkBookingFields();
    },
    async checkIfInsufficientDeposit(uid) {
      const db = getFirestore(firebaseApp);
      const userHistory = doc(db, "Transactions", uid)
      const historySnap = await getDoc(userHistory);
      var depositAmt = 0;
      for (const [key, value] of Object.entries(historySnap.data())) {
          console.log(key);
          if (value.type == "Top Up") {
            depositAmt += 30;
          } else {
            depositAmt -= 30;
          }    
      }
      this.hasInsufficientDeposit = depositAmt < 30;
    },
    async checkIfExistingUpcomingBooking(uid) {
      const db = getFirestore(firebaseApp);
      const bookingsRef = collection(db, "bookings");
      let now = new Date(Date.now());
      const q = query(bookingsRef, where("user_id", "==", uid), where("start_timestamp", ">=", now));
      const querySnapshot = await getDocs(q);
      if (querySnapshot.docs.length > 0) {
        this.hasExistingUpcomingBooking = true;
      } else {
        this.hasExistingUpcomingBooking = false;
      }
    },
    checkBookingFields() {
      let bookingFieldValues = [this.selected_charger_id, this.selected_station_name, this.selected_station_charger_type, this.selected_station_provider, this.selected_station_address, 
        this.selected_start_time, this.selected_end_time, this.booking_duration];
      return bookingFieldValues.some((x) => x == "") && (this.selected_end_time <= this.selected_start_time);
    },
    async makeBooking() {
      if (this.uid == false) {
        alert("You are not logged in. Please proceeed to log in.");
        this.$router.push('/login');
      } else if (this.hasInsufficientDeposit) {
        alert("Insufficient deposit amount in account. A $30 deposit amount is required for booking. Please top up.");
        this.$router.push('/account-balance');
      } else if (this.hasExistingUpcomingBooking) {
        alert("You have an existing booking. Please delete your existing booking before making a new booking.");
        this.$router.push('/view_bookings');
      } else {
        const booking_rec = {
          user_id: this.uid,
          charger_id: this.selected_charger_id,
          location: this.selected_station_name,
          charger_type: this.selected_station_charger_type,
          provider: this.selected_station_provider,
          start_timestamp: this.selected_start_time,
          end_timestamp: this.selected_end_time,
          duration: this.booking_duration,
          street: this.selected_station_address["street"],
          postal_code: this.selected_station_address["postalCode"],
        }
        await addDoc(collection(db, "bookings"), booking_rec);
        alert("Booking success. View your booking under My Bookings.");
        this.$router.push('/view_bookings');
      }
    },
    // async displayMonth(id, display_num, charger_type) {
    //   var availabilityFromID = []
    //   this.selected_charger_id = id;
    //   this.selected_charger_display_num = "-" + display_num.toString();
    //   this.selected_station_charger_type = charger_type;

    //   const bookingsRef = collection(db, "testBookings")
    //   const q = query(bookingsRef, where("chargerID", "==", id), orderBy("bookingDate"))
    //   const querySnapshot = await getDocs(q)
    //   querySnapshot.forEach((doc) => {
    //     const fullDate = doc.data()["bookingDate"].toDate()
    //     const currDate = fullDate.getDate()
    //     const currMonth = fullDate.getMonth()
    //     const currYear = fullDate.getFullYear() 
    //     availabilityFromID.push({ 
    //       date: String(new Date(currYear, currMonth, currDate, 0, 0, 0, 0)), 
    //       start: doc.data()["startTime"],
    //       end: doc.data()["endTime"],
    //     })
    //   })

    //   var dateAndTime = {}
    //   for(var i = 0; i < availabilityFromID.length; i++) {
    //     const date = availabilityFromID[i].date
    //     const start = availabilityFromID[i].start
    //     const end = availabilityFromID[i].end
    //     if(date in dateAndTime) {
    //       dateAndTime[date].push({start: start, end: end})
    //     } else {
    //       dateAndTime[date] = [{start: start, end: end}]
    //     }
    //   }

    //   this.monthlyAvailability = dateAndTime
    //   console.log(this.monthlyAvailability)
    //   console.log(availabilityFromID)

      // const now = new Date()
      // var currDate = now.getDate()
      // const currMonth = now.getMonth()
      // const currYear = now.getFullYear()
      //const firstDateNextMonth = new Date(currYear, currMonth + 1, 1) 
      
    //   function daysInMonth (month, year) {
    //     return new Date(year, month, 0).getDate();
    //   }

    //   const numDaysLeft = daysInMonth(currMonth, currYear) - currDate

    //   for(var i = 0; i < numDaysLeft; i++) { // Iterate dates from now to last date of month, both inclusive
    //     var arrOfTimings = bookingSnapshot.data()[String(currDate)]
    //     var numBooked = arrOfTimings.length
    //     var arrOfDateObj = []
    //     for(var j = 0; j < numBooked; j++) {
    //       arrOfDateObj.push(String(arrOfTimings[j].toDate()))
    //     }
    //     if (numBooked == 0) { // No booked timings -> Available
    //       availabilityFromID.push(true)
    //     } else {
    //       for(var timeslot = 0; timeslot < numBooked; timeslot++) {
    //         var endOfBooking = moment(arrOfTimings[timeslot].toDate()).add(30, 'm').toDate()
    //         if (arrOfDateObj.includes(String(endOfBooking))) {
    //           // Earliest available timeslot is booked -> Unavailable
    //           // Continue iterating through remaining timeslots
    //         } else {
    //           if (String(endOfBooking) == String(firstDateNextMonth)) {
    //             availabilityFromID.push(false)
    //             break
    //           }
    //           // There is at least 1 free timeslot -> Available
    //           availabilityFromID.push(true)
    //           break
    //         }
    //         if(timeslot == numBooked - 1) { // Have gone through all booked timings
    //           availabilityFromID.push(false)
    //         }
    //       } 
    //     }
    //     currDate = currDate + 1
    //   }
    //   this.monthlyAvailability = availabilityFromID
    // },
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Nunito&family=Outfit:wght@300&display=swap');

.header {
  margin-top: 8%;
  height: 20%;
  font-family: "Outfit";
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
}

.availableChargers {
  font-family: "Outfit";
  font-style: normal;
  font-weight: 100;
  font-size: 18px;
}

.btncharger {
  height: 50%;
  width: 200px;
  margin-right: 50px;
  margin-bottom: 20px;
  color: #FFFFFF;
  font-family: 'Outfit';
  font-weight: bold;
  font-size: 18px;
  border-radius: 15px;
}

.dot {
  margin-right: 10px;
  height: 25px;
  width: 25px;
  border-radius: 50%;
  display: inline-block;
  float: left;
}

.legend {
  margin-top: 10%;
}

.legendindiv {
  vertical-align: middle;
  float: left;
}

.legendtext {
  margin-right: 25px;
  font-family: "Nunito";
  font-style: normal;
  font-weight: 100;
  font-size: 15px;
  float: left;
}

.validationMsg {
  font-family: 'Nunito', sans-serif;
  font-weight: 400;
  font-size: 20px;
  text-align: left;
}

.dayview {
  margin: auto;
  text-align: center;
  font-family: "Nunito";
  font-style: normal;
  font-weight: 100;
  font-size: 15px;
  height: 50px;
}

.bookingInfo {
  font-size: 18px;
}

.btn {
  width: 40%;
  background-color: #4285f4;
  color: #FFFFFF;
  font-family: 'Outfit';
  font-weight: bold;
  font-size: 20px;
  border-radius: 15px;
}

</style>