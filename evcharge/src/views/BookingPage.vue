<template>
  <v-app>
    <NavBar />
    <v-container>

      <v-row class="header">
        <h1>Book a Charger: <span style="color: #4285f4">{{ this.selected_station_name }}{{ this.selected_charger_display_num }}</span></h1>
      </v-row>
      <v-row class="availablechargers" style="height: 10%">
        <v-col cols=2>
          <h3>{{ this.numChargerAvailable }} Chargers Available:</h3>
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
          <v-btn class="btncharger" rounded elevation="3" @click="displayMonth(charger.id, charger.display_num)" :color="charger.display_col">{{ charger.display_num }}</v-btn>
        </div>
      </v-row>

      <v-row style="height: 60%">
        <v-col cols=6>
          <BookingCalendar v-if="Object.keys(monthlyAvailability).length > 0" :monthlyInfo="this.monthlyAvailability" />
          <BookingCalendar v-else />
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
          <div class="dayview">
            <v-card height="600px" color="#F5F5F5">
              <BookingCalendarDay />
              <v-card-text>You are booking for <b>{{ this.selected_station_name }}{{ this.selected_charger_display_num }}</b></v-card-text>
              <v-btn class="btn" rounded elevation="3" @click="makeBooking" :disabled="isBookingDisabled">Book</v-btn>
            </v-card>
          </div>
        </v-col>
      </v-row>
     
    </v-container>
  </v-app>
</template>

<script>
import firebaseApp from "../firebase.js"
import { getFirestore, getDoc, getDocs, addDoc, doc, collection, query, where, orderBy } from "firebase/firestore"
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
      }
    })
    this.matchingChargers(this.chargerFromMap)
    //this.createCollection()
  },
  mounted() {
    this.isBookingDisabled = this.checkBookingFields();
  },
  updated() {
    this.isBookingDisabled = this.checkBookingFields();
  },
  data() {
    return {
      //chargerFromMap: this.$router.params.charger,
      chargerFromMap: ["Jalan Kayu", "DC50"],
      numChargerAvailable: 0,
      chargerTypes: [],
      chargerList: [],
      chargersMatching: [],
      monthlyAvailability: {},
      uid: false,
      isBookingDisabled: true,
      selected_station_id: "",
      selected_station_name: "No charging station selected", 
      selected_station_provider: "",
      selected_station_charger_type: "", // TO LINK UP 
      selected_station_address: "",
      selected_charger_display_num: "",
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
        this.selected_station_id = station_id;
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
    async matchingChargers(chargerFromMap) {
      const chargerLocation = chargerFromMap[0]
      const chargerType = chargerFromMap[1]

      const chargersRef = collection(db, "testCal")
      const q = query(chargersRef, where("location", "==", chargerLocation), where("type", "==", chargerType), orderBy("id"))
      const querySnapshot = await getDocs(q)
      querySnapshot.forEach((doc) => {
        this.chargersMatching.push({ id: doc.data()["id"], location: doc.data()["location"], type: doc.data()["type"] })
      })
      //this.numChargerAvailable = this.chargersMatching.length
    },
    async displayMonth(id, display_num) {
      console.log(id) // sg_zoo_1
      console.log(display_num) // 1

      var availabilityFromID = []
      this.selected_charger_display_num = "-" + display_num.toString();

      const bookingsRef = collection(db, "testBookings")
      const q = query(bookingsRef, where("chargerID", "==", id), orderBy("bookingDate"))
      const querySnapshot = await getDocs(q)
      querySnapshot.forEach((doc) => {
        const fullDate = doc.data()["bookingDate"].toDate()
        const currDate = fullDate.getDate()
        const currMonth = fullDate.getMonth()
        const currYear = fullDate.getFullYear() 
        availabilityFromID.push({ 
          date: String(new Date(currYear, currMonth, currDate, 0, 0, 0, 0)), 
          start: doc.data()["startTime"],
          end: doc.data()["endTime"],
        })
      })

      var dateAndTime = {}
      for(var i = 0; i < availabilityFromID.length; i++) {
        const date = availabilityFromID[i].date
        const start = availabilityFromID[i].start
        const end = availabilityFromID[i].end
        if(date in dateAndTime) {
          dateAndTime[date].push({start: start, end: end})
        } else {
          dateAndTime[date] = [{start: start, end: end}]
        }
      }

      this.monthlyAvailability = dateAndTime
      console.log(this.monthlyAvailability)
      console.log(availabilityFromID)

      // const now = new Date()
      // var currDate = now.getDate()
      // const currMonth = now.getMonth()
      // const currYear = now.getFullYear()
      //const firstDateNextMonth = new Date(currYear, currMonth + 1, 1) 
      
      // function daysInMonth (month, year) {
      //   return new Date(year, month, 0).getDate();
      // }

      //const numDaysLeft = daysInMonth(currMonth, currYear) - currDate

      // for(var i = 0; i < numDaysLeft; i++) { // Iterate dates from now to last date of month, both inclusive
      //   var arrOfTimings = bookingSnapshot.data()[String(currDate)]
      //   var numBooked = arrOfTimings.length
      //   var arrOfDateObj = []
      //   for(var j = 0; j < numBooked; j++) {
      //     arrOfDateObj.push(String(arrOfTimings[j].toDate()))
      //   }
      //   if (numBooked == 0) { // No booked timings -> Available
      //     availabilityFromID.push(true)
      //   } else {
      //     for(var timeslot = 0; timeslot < numBooked; timeslot++) {
      //       var endOfBooking = moment(arrOfTimings[timeslot].toDate()).add(30, 'm').toDate()
      //       if (arrOfDateObj.includes(String(endOfBooking))) {
      //         // Earliest available timeslot is booked -> Unavailable
      //         // Continue iterating through remaining timeslots
      //       } else {
      //         if (String(endOfBooking) == String(firstDateNextMonth)) {
      //           availabilityFromID.push(false)
      //           break
      //         }
      //         // There is at least 1 free timeslot -> Available
      //         availabilityFromID.push(true)
      //         break
      //       }
      //       if(timeslot == numBooked - 1) { // Have gone through all booked timings
      //         availabilityFromID.push(false)
      //       }
      //     } 
      //   }
      //   currDate = currDate + 1
      // }
      // this.monthlyAvailability = availabilityFromID
    },
    checkBookingFields() {
      // TO EDIT bookingFieldValues
      //let bookingFieldValues = [this.selected_station_id, this.selected_station_name, this.selected_station_charger_type, this.selected_station_provider, this.selected_station_address];
      //return bookingFieldValues.some((x) => x == "");
      return false;
    },
    async makeBooking() {
      if (this.uid) {
        const booking_rec = {
          user_id: this.uid,
          station_id: this.selected_station_id,
          location: this.selected_station_name,
          charger_type: this.selected_station_charger_type,
          provider: this.selected_station_provider,
          date: new Date('November 1, 2022 09:30:00'), // TO EDIT
          duration: 60,
          street: this.selected_station_address["street"],
          postal_code: this.selected_station_address["postalCode"],
        }
        await addDoc(collection(db, "bookings"), booking_rec);
        alert("Booking Success. Please view under My Bookings.")
      } else {
        this.$router.push('/login');
      }
    },
    // async createCollection() {
    //   await addDoc(collection(db, "testBookings"), bookingVar);
    //   console.log("hello")
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

.availablechargers {
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

.dayview {
  margin: auto;
  text-align: center;
  font-family: "Nunito";
  font-style: normal;
  font-weight: 100;
  font-size: 15px;
  height: 50px;
}

.btn {
  width: 40%;
  background-color: #4285f4;
  color: #FFFFFF;
  font-family: 'Outfit';
  font-weight: bold;
  font-size: 10px;
  border-radius: 15px;
}

</style>