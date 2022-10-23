<template>
  <div class=Map>

    <!-- Specifying the Dimension/Specifications of the Google Map we using -->
    <!-- Check width and height for future deployment -->
    <GMapMap :center="center" :zoom="11.80" map-type-id="roadmap" style="width: 100vw; height: 35rem">

      <!--Creating available Markers -->
      <GMapMarker :key="index" v-for="(m, index) in Available_Markers" :position="m.position"
        :icon="require('@/assets/MapPage/availablePins.png')" @click="center = m.position" :clickable=true :draggable=false />

      <!--Creating unavailable Markers -->
      <!---->
      <GMapMarker :key="index" v-for="(m, index) in Unavailable_Markerss" :position="m.position"
        :icon="require('@/assets/MapPage/unavailablePins.png')" @click="center = m.position" :clickable=true :draggable=false />
    </GMapMap>


  </div>
  <div class="icon">
    <button class="dot circle link icon" @click="locatorButtonPressed"></button>
    <p>Count is: {{ count }}</p>
  </div>

</template>

<script >


export default {
  name: 'MapPage',
  data() {
    return {
      count: 0,

      //Deafult Center of the Map Once Loaded
      center: { lat: 1.352083, lng: 103.819839 },

      markers: [
        {
          id: "rdn",
          position: {
            lat: null, lng: null
          },
        }
      ],

      Unavailable_Markerss: [
        {
          id: "rdn",
          position: {
            lat: 1.352083, lng: 103.819839
          },
        },
        {
          id: "rdn1",
          position: {
            lat: 1.307191, lng: 103.782927
          },
        },
        {
          id: "rdn2",
          position: {
            lat: 1.311996, lng: 103.940961
          },
        }
      ],

      Available_Markers: [
        {
          id: "rdn",
          position: {
            lat: 1.300155, lng: 103.809850
          },
        },
        {
          id: "rdn1",
          position: {
            lat: 1.321435, lng: 103.772747
          },
        },
        {
          id: "rdn2",
          position: {
            lat: 1.365506, lng: 103.892679
          },
        }
      ]

    }
  },
  test() {
    window.location.reload()
  },
  created() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          console.log(position.coords.latitude);
          console.log(position.coords.longitude);
          this.markers[0].position.lat = position.coords.latitude;
          this.markers[0].position.lng = position.coords.longitude;

        },
        error => {
          console.log(error.message);
        }
      );
    } else {
      console.log("Browser Does not support Geo API")
    }
  }
}

</script>

<style>
body {
  margin: 0;
}
</style>
