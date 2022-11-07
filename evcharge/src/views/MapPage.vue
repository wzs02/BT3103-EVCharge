<template>
  <v-app>
    <NavBarLogin />
    <div class=Map>
      <!-- Specifying the Dimension/Specifications of the Google Map we using -->
      <!-- Check width and height for future deployment -->
      <GMapMap :center="center" :zoom="11.80" map-type-id="roadmap"
        style="position: fixed;top: 0;left: 0;min-width: 100%; min-height: 100%;">

        <!--Creating available Markers -->
        <GMapMarker :key="index" v-for="(m, index) in Available_Markers.value" :position="m.position"
          @click="logInput(m.id)" :icon="require('@/assets/MapPage/availablePins.png')" :clickable=true
          :draggable=false>
          <MapPageOffcanvas :drawer="showWindow(m.id)" :stationID="m.station_id" :stationName="m.id" :imgExtension="m.imgName"
            :chargerType="parseChargerType(Object.values({ ...m.chargerDetails.type }))"
            :chargerSystem="m.chargerDetails.system" :chargerProvider="m.chargerDetails.provider"
            :chargerAddress="getFullChargerAddress(m.street, m.postalCode)" :chargerHours="m.chargerDetails.hours"
            :chargerLots="getChargerLots(Object.values({ ...m.chargerDetails.type }), Object.values({ ...m.chargerDetails.lots }))"
            :chargerCost="m.chargerDetails.cost" :hasT2="checkT2(Object.values({ ...m.chargerDetails.type }))"
            :hasCommando="checkCommando(Object.values({ ...m.chargerDetails.type }))"
            :hasCombo="checkCombo(Object.values({ ...m.chargerDetails.type }))"
            :hasJ1772="checkJ1772(Object.values({ ...m.chargerDetails.type }))"
            @closeWindows="openMarkerInfoWindow(null)" />
          <GMapInfoWindow :opened="showWindow(m.id)" @closeWindows="openMarkerInfoWindow(null)" :options="{
            pixelOffset: {
              width: -1, height: 0
            },
            maxWidth: 320,
            maxHeight: 320,
          }" @closeclick="openMarkerInfoWindow(null)">
            <div>
              <h5 id="stationName">{{ m.id }}</h5>
              <h6 class="stationDetails">{{ m.street }},</h6>
              <h6 class="stationDetails">{{ m.postalCode }}</h6>
            </div>
          </GMapInfoWindow>
        </GMapMarker>

        <!--Creating unavailable Markers -->
        <!---->
        <GMapMarker :key="index" v-for="(m, index) in Unavailable_Markers" :position="m.position"
          :icon="require('@/assets/MapPage/unavailablePins.png')" @click="center = m.position" :clickable=true
          :draggable=false>
        </GMapMarker>
      </GMapMap>

    </div>
  </v-app>
  <!-- <div class="icon">
    <button style="background-color:red" @click="locatorButtonPressed">Check</button>
    <p>Count is: {{ count }}</p>
  </div> -->

</template>

<script>
/* eslint-disable */
import NavBarLogin from "@/components/NavBarLogin.vue"
import { locationVar } from "@/assets/MapPage/Locations.js"
import MapPageOffcanvas from "@/components/MapPageOffcanvas.vue"
import firebaseApp from "../firebase.js"
import { getFirestore, getDoc, setDoc, doc } from "firebase/firestore"
import { ref } from 'vue'

const db = getFirestore(firebaseApp)

export default {
  name: "MapPage",
  components: { MapPageOffcanvas, NavBarLogin },
  data() {
    return {
      markerToOpen: null,
      count: 0,
      //Defult Center of the Map Once Loaded
      center: { lat: 1.352083, lng: 103.819839 },
      markers: [
        {
          id: "rdn",
          position: {
            lat: null,
            lng: null
          },
        }
      ],
      Unavailable_Markers: [
        {
          id: "rdn",
          position: {
            lat: 1.352083,
            lng: 103.819839
          },
        },
        {
          id: "rdn1",
          position: {
            lat: 1.307191,
            lng: 103.782927
          },
        },
        {
          id: "rdn2",
          position: {
            lat: 1.311996,
            lng: 103.940961
          },
        }
      ],
      Available_Markers: ref([]),
    };
  },
  computed: {
    showWindow() {
      return (inputId) => {
        return this.markerToOpen == inputId
      }
    }
  },
  methods: {
    async createCollection() {
      await setDoc(doc(db, "MapPage", "chargerLocations"), locationVar);
    },
    async getData() {
      const docRef = doc(db, "MapPage", "chargerLocations");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const markerKeyValues = docSnap.data();
        let station_id_list = Object.keys(markerKeyValues) // list of station ids (field names)
        let station_values = Object.values(markerKeyValues) 
        for (let i = 0; i < station_id_list.length; ++i) {
          // add station_id as an attribute of the station object
          station_values[i][0]["station_id"] = station_id_list[i];
        }
        this.Available_Markers.value = Object.values(station_values)
          .map(x => Object.assign({}, x[0]));
      }
      else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    },
    openMarkerInfoWindow(markerId) {
      this.markerToOpen = markerId
    },
    parseChargerType(typeArray) {
      if (typeArray.length == 1) {
        return typeArray[0]
      } else {
        return typeArray.join(", ")
      }
    },
    getFullChargerAddress(street, postalCode) {
      return street + ', ' + postalCode
    },
    getChargerLots(plugObj, plugNumObj) {
      let finalString = ""
      let keyLength = Object.keys(plugObj).length
      let plugArray = Object.values(plugObj)
      let plugNumArray = Object.values(plugNumObj)
      if (keyLength == 1) {
        return plugNumArray[0]
      } else {
        for (let i = 0; i < keyLength; i++) {
          if (i < keyLength - 1) {
            finalString += plugNumArray[i] + " for " + plugArray[i] + ", "
          } else {
            finalString += plugNumArray[i] + " for " + plugArray[i]
          }
        }
        return finalString
      }
    },
    checkT2(typeObj) {
      let typeArray = Object.values(typeObj)
      return typeArray.includes("Type 2")
    },
    checkCommando(typeObj) {
      let typeArray = Object.values(typeObj)
      return typeArray.includes("Commando")
    },
    checkCombo(typeObj) {
      let typeArray = Object.values(typeObj)
      return typeArray.includes("CCS/SAE")
    },
    checkJ1772(typeObj) {
      let typeArray = Object.values(typeObj)
      return typeArray.includes("J-1772")
    },
    locatorButtonPressed() {
      console.log(this.Available_Markers.value);
    },
    logInput(id) {
      console.log(id)
      this.openMarkerInfoWindow(id)
    }
  },
  test() {
    window.location.reload();
  },
  created() {
    this.createCollection();
    this.getData();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        console.log(position.coords.latitude);
        console.log(position.coords.longitude);
        this.markers[0].position.lat = position.coords.latitude;
        this.markers[0].position.lng = position.coords.longitude;
      }, error => {
        console.log(error.message);
      });
    }
    else {
      console.log("Browser Does not support Geo API");
    }
  },
}

</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Nunito&family=Outfit:wght@400;700&display=swap');

body {
  margin: 0;
}

.gm-style .gm-style-iw-d::-webkit-scrollbar-track,
.gm-style .gm-style-iw-d::-webkit-scrollbar-track-piece,
.gm-style .gm-style-iw-c,
.gm-style .gm-style-iw-t::after {
  border-radius: 20px;
}

#stationName {
  text-align: center;
  font-family: 'Outfit', 'sans-serif';
  font-size: 16px;
  font-weight: 700;
  color: #4285F4;
  text-decoration: underline;
}

.stationDetails {
  font-family: 'Outfit', 'sans-serif';
  font-size: 13px;
  text-align: center;
  font-weight: 400;
}
</style>
