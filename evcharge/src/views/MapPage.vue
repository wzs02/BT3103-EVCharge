<template>
  <div class=Map>

    <!-- Specifying the Dimension/Specifications of the Google Map we using -->
    <!-- Check width and height for future deployment -->
    <GMapMap :center="center" :zoom="11.80" map-type-id="roadmap" style="width: 100vw; height: 35rem">

      <!--Creating available Markers -->
      <GMapMarker :key="index" v-for="(m, index) in Available_Markers.value" :position="m.position"
        :icon="require('@/assets/MapPage/availablePins.png')" @click="center = m.position" :clickable=true
        :draggable=false>
        <GMapInfoWindow :opened="true" :options=" {
               pixelOffset: {
                 width: 10, height: 0
               },
               maxWidth: 320,
               maxHeight: 320,
        }">
          <div>
            <h5 id="stationName">{{m.id}}</h5>
            <h6 class="stationDetails">{{m.street}},</h6>
            <h6 class="stationDetails">{{m.postalCode}}</h6>
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
  <div class="icon">
    <button style="background-color:red" @click="locatorButtonPressed">Check</button>
    <p>Count is: {{ count }}</p>
  </div>

</template>

<script>
/* eslint-disable */
import { locationVar } from "@/assets/MapPage/Locations.js"
import firebaseApp from "../firebase.js"
import { getFirestore, getDoc, setDoc, doc } from "firebase/firestore"
import { ref } from 'vue'

const db = getFirestore(firebaseApp)

export default {
  name: "MapPage",
  data() {
    return {
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
    locatorButtonPressed() {
      console.log(this.Available_Markers.value);
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
