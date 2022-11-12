<template>
  <v-app>
    <NavBar />
    <v-container>

      <v-row class="header">
        <h1>Book a Charger: <span style="color: #4285f4">{{ this.selected_station_name }}</span></h1>
      </v-row>
      <v-row class="availablechargers" style="height: 10%">
        <h3>{{ this.numChargerAvailable }} Chargers Available:</h3>
      </v-row>
      <v-row style="height: 20%">
        <div v-for="charger in chargersMatching" :key="charger.id">
          <v-btn class="btncharger" rounded elevation="3" @click="displayMonth(charger.id)">EVC{{ charger.id }}</v-btn>
        </div>
      </v-row>

      <v-row style="height: 60%">
        <v-col cols=6>
          <BookingCalendar />
          <div class="legend">
            <div class="legendindiv">
              <span class="dot1"></span>
              <p class="legendtext">Available</p>
            </div>
            <div class="legendindiv">
              <span class="dot3"></span>
              <p class="legendtext">Unavailable</p>
            </div>
            <div class="legendindiv">
              <span class="dot4"></span>
              <p class="legendtext">Selected</p>
            </div>
          </div>
        </v-col>

        <v-col cols=6>
          <div class="dayview">
            <v-card height="600px" color="#F5F5F5">
              <BookingCalendarDay />
              <v-card-text>You are booking for <b>{{ this.selected_station_name }}</b></v-card-text>
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
      chargersMatching: [],
      uid: false,
      isBookingDisabled: true,
      selected_station_id: "",
      selected_station_name: "", 
      selected_station_provider: "",
      selected_station_charger_type: "", // TO LINK UP 
      selected_station_address: "",
    } 
  },
  methods: {
    async getStationData(station_id) {
      const docRef = doc(db, "MapPage", "chargerLocations");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const station_data = docSnap.data()[station_id][0];
        this.selected_station_id = station_id;
        this.selected_station_name = station_data.id;
        this.selected_station_provider = station_data.chargerDetails["provider"];
        this.selected_station_address = {"street": station_data.street, "postalCode": station_data.postalCode};
        const num_lots_list = station_data.chargerDetails["lots"];
        const charger_type_list = station_data.chargerDetails["type"];
        const type_num_lots_mapping = {};
        for (let i=0; i < Object.keys(charger_type_list).length; i++) {
          type_num_lots_mapping[charger_type_list[i]] = parseInt(num_lots_list[i]);
        }
        this.numChargerAvailable = Object.values(type_num_lots_mapping).reduce((a, b) => a + b, 0);
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
    async displayMonth(id) {
      // Display monthly calendar of selected EV charger
      // Retrieve availabilities from db
      const bookingsRef = collection(db, "testBookings")
      const q = query(bookingsRef, where("id", "==", id))
      const querySnapshot = await getDocs(q)
      querySnapshot.forEach((doc) => {
        console.log(doc)
        // For charger of that id, find availabilities of all days within the month
        // If a day has at least one free slot => avail
        // If a day has no free slot => not avail
        // Pass list of availabilities to child BookingCalendar component for colour coding
      })
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
  background-color: black;
  color: #FFFFFF;
  font-family: 'Outfit';
  font-weight: bold;
  font-size: 18px;
  border-radius: 15px;
}

.dot1 {
  background-color: #D9ED92;
  margin-right: 10px;
  height: 25px;
  width: 25px;
  border-radius: 50%;
  display: inline-block;
  float: left;
}

.dot2 {
  background-color: #FFE28C;
  margin-right: 10px;
  height: 25px;
  width: 25px;
  border-radius: 50%;
  display: inline-block;
  float: left;
}

.dot3 {
  background-color: #FF7575;
  margin-right: 10px;
  height: 25px;
  width: 25px;
  border-radius: 50%;
  display: inline-block;
  float: left;
}

.dot4 {
  background-color: #B1DCFF;
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