<template>
  <v-app>
    <NavBarLogin />
    <div class=Map>
      <!-- Specifying the Dimension/Specifications of the Google Map we using -->
      <!-- Check width and height for future deployment -->
      <GMapMap :center="center" :zoom="11.80" map-type-id="roadmap"
        style="width: 100vw; height: 790px; position: fixed;">

        <!--Creating available Markers -->
        <GMapMarker :key="index" v-for="(m, index) in Available_Markers.value" :position="m.position"
          @click="openMarkerInfoWindow(m.id)" :icon="require('@/assets/MapPage/availablePins.png')" :clickable=true
          :draggable=false>
          <MapPageOffcanvas :drawer="showWindow(m.id)" :stationName="m.id" @closeWindows="openMarkerInfoWindow(null)" />
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
        this.Available_Markers.value = Object.values(markerKeyValues)
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
    locatorButtonPressed() {
      console.log(this.Available_Markers.value);
    },
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
@import url('https://fonts.googleapis.com/css2?family=Nunito&family=Outfit:wght@300&display=swap');

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
  font-size: 12px;
  font-weight: 800px;
  color: #4285F4;
  text-decoration: underline;
}

.stationDetails {
  font-family: 'Outfit', 'sans-serif';
  font-size: 9px;
  text-align: center;
}
</style>
