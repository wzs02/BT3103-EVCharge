<template>
  <v-app>
    <NavBar />
    <div>
        <h1>Book a Charger</h1>
    </div>

  </v-app>
</template>

<script>
import NavBar from "@/components/NavBar.vue";

export default {
    name: 'BookingPage',
    components: { NavBar },
    data() {
        return {

        }
    }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Nunito&family=Outfit:wght@300&display=swap');
</style>