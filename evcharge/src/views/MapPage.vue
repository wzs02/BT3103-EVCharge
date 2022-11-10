<template>
  <v-app>
    <NavBarLogin />
    <v-container>
      <v-row class="filterbar">
        <FilterBar @selectRegion = "locationFilter($event)" @selectCharger="chargerFilter($event)" 
        @removeRegion = "locationFilter($event)" @removeCharger =  "chargerFilter($event)"/>
      </v-row>
    
    
    <div class=Map>
      <!-- Specifying the Dimension/Specifications of the Google Map we using -->
      <!-- Check width and height for future deployment -->
      <GMapMap :center="center" :zoom="11.80" map-type-id="roadmap"
        style="position: fixed;top: 10;left: 0;min-width: 100%; min-height: 100%;">

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
  </v-container>
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
import FilterBar from "@/components/FilterBar.vue";

const db = getFirestore(firebaseApp)
export default {
  name: "MapPage",
  components: { FilterBar,MapPageOffcanvas, NavBarLogin },
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
          console.log(station_values[i][0]["station_id"])
        }
        this.Available_Markers.value = Object.values(station_values)
          .map(x => Object.assign({}, x[0]));
        console.log(this.Available_Markers.value)
      }
      else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    },


    async locationFilter(region) {
      console.log("Search Bar closed")
      const docRef = doc(db, "MapPage", "chargerLocations");
      const docSnap = await getDoc(docRef);
      
      //When there is more than one field in the seach bar
      if (docSnap.exists() && region.length > 0) {
        const markerKeyValues = docSnap.data();
        let station_id_list = Object.keys(markerKeyValues) // list of station ids (field names)
        let station_values = Object.values(markerKeyValues) 
        //console.log(station_id_list);
        // ['bluecharge_lot1', 'ascent_building_sp_group', 'charge_plus_fernvale', 'the_concourse', 'ura_centre_east_wing', 'cdg_engie_bukit_batok', 'westpark_biz_central', 'shell_serangoon_garden', 'tamp_plaza', 'blue_sg_simei_s1', 'amk_charge_plus', 'shell_punggol', 'jurong_point', 'shell_dunearn_uni', 'shell_pl', 'hedges_solacharge', 'boathouse_residence_solacharge', 'blue_sg_hougang', 'ent_biz_center', 'i12_katong', 'tanah_merah_ft', 'juice_plus_bishan', 'ikea_tampines', 'sg_zoo', 'cdg_energie_clementi_ave4', 'sp_group_jewel', 'lhn_energy_btsc', 'shell_thomson', 'one_at_redhill_centre', 'bedok_south']
        console.log(station_values);
        let result = []
        for (let i = 0; i < station_id_list.length; ++i) {
          console.log("Here")
          //console.log(station_values[i][0]["region"])
          if(region.includes(station_values[i][0]["region"])){
            console.log(station_values[i][0]["region"])
            console.log(station_values[i])
            result.push(station_values[i])
            result[result.length - 1][0]["station_id"] = station_id_list[i];
          }
        }
        console.log("The result is")
        console.log(result.length)
        this.Available_Markers.value = Object.values(result)
        .map(x => Object.assign({}, x[0]));
      }

      //When there is no field in the search bar return map with all markers
      else if (docSnap.exists() && region.length == 0) {
        const markerKeyValues = docSnap.data();
        let station_id_list = Object.keys(markerKeyValues) // list of station ids (field names)
        let station_values = Object.values(markerKeyValues) 
        for (let i = 0; i < station_id_list.length; ++i) {
          // add station_id as an attribute of the station object
          station_values[i][0]["station_id"] = station_id_list[i];
          console.log(station_values[i][0]["station_id"])
        }
        this.Available_Markers.value = Object.values(station_values)
          .map(x => Object.assign({}, x[0]));
        console.log(this.Available_Markers.value)
      } 
      else{
        console.log("No such document!");
      }
      
    },

    async chargerFilter (charger) {
      console.log("Charger Bar closed")
      console.log(charger)
      const docRef = doc(db, "MapPage", "chargerLocations");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists() && charger.length > 0) {
        const markerKeyValues = docSnap.data();
        let station_id_list = Object.keys(markerKeyValues) // list of station ids (field names)
        let station_values = Object.values(markerKeyValues)
        let result = []
        console.log(station_values[0][0]["chargerDetails"]["type"])
        for (let i = 0; i < station_id_list.length; ++i) {
          console.log("filtering charger")
          console.log(station_values[i][0]["chargerDetails"]["type"])

          for (let j = 0; j < station_values[i][0]["chargerDetails"]["type"].length; ++j)
            //console.log(station_values[i][0]["chargerDetails"]["type"][j])
            if(charger.includes(station_values[i][0]["chargerDetails"]["type"][j])) {
              console.log("Include Charger")
              result.push(station_values[i])
              result[result.length - 1][0]["station_id"] = station_id_list[i]
              break
          }
        }
        console.log("The result is")
        console.log(result.length)
        this.Available_Markers.value = Object.values(result)
        .map(x => Object.assign({}, x[0]));
      } 

            //When there is no field in the search bar return map with all markers
      else if (docSnap.exists() && charger.length == 0) {
        const markerKeyValues = docSnap.data();
        let station_id_list = Object.keys(markerKeyValues) // list of station ids (field names)
        let station_values = Object.values(markerKeyValues) 
        for (let i = 0; i < station_id_list.length; ++i) {
          // add station_id as an attribute of the station object
          station_values[i][0]["station_id"] = station_id_list[i];
          console.log(station_values[i][0]["station_id"])
        }
        this.Available_Markers.value = Object.values(station_values)
          .map(x => Object.assign({}, x[0]));
        console.log(this.Available_Markers.value)
      } 
      else{
        console.log("No such document!");
      }
      
    },

    async createCollection() {
      await setDoc(doc(db, "MapPage", "chargerLocations"), locationVar);
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

.filterbar {
  margin: auto;
  margin-top:35px; 
  font-family: "Outfit";
  font-style: normal;
  font-weight: 100;
  font-size: 18px;
  z-index: -1;
  
}

</style>
