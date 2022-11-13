<template>
  <div>
    <vue-cal
      style="height: 500px"
      active-view="day"
      hide-view-selector
      :disable-views="['years', 'year', 'month', 'week']"
      :time-from="0 * 60"
      :time-to="24 * 60"
      :time-step="30"
      :events="events"
      editableEvents=true
      snapToTime="30">
    </vue-cal>
  </div>
</template>

<script>
import VueCal from 'vue-cal'
import 'vue-cal/dist/vuecal.css'
import firebaseApp from "../firebase.js";
import { getFirestore, getDocs, collection, query } from "firebase/firestore";

const db = getFirestore(firebaseApp)

export default {
  components: { VueCal },
  data: () => ({
    events: []
  }),
  methods: {
    async fetchData() {
      const bookingsRef = collection(db, "testBookings")
      const q = query(bookingsRef)
      const querySnapshot = await getDocs(q)
      querySnapshot.forEach((doc) => {
        this.events.push({
          start: doc.data()["startTime"].toDate(),
          end: doc.data()["endTime"].toDate(),
          title: 'Unavailable',
          class: 'unavailable',
        })
      })
    },
  },
  created() {
    this.fetchData()
  },
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Nunito&family=Outfit:wght@300&display=swap');

.vuecal__title-bar {
  background-color: #4285f4;
  color: white;
  font-family: 'Outfit';
}

.vuecal__event.unavailable {
  display: inline-block;
  justify-content: center;
  align-items: center;
  background-color: #FF7575;
  color: white;
  border-radius: 10px;
}

.vuecal__event-time {
  color: #FF7575;
}

.vuecal__now-line {
  color: #4285f4;
}
</style>