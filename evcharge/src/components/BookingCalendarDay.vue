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
      :selected-date="selectedDate"
      :events="events"
      :on-event-create="onEventCreate"
      editableEvents=true
      snapToTime="30"
      @event-drag-create="dragToBook"
      @event-drop="dropToBook"
      @event-duration-change="resizeToBook">
    </vue-cal>
  </div>
</template>

<script>
import VueCal from 'vue-cal'
import 'vue-cal/dist/vuecal.css'
import firebaseApp from "../firebase.js";
import { getFirestore, getDocs, collection, query, where} from "firebase/firestore";

const db = getFirestore(firebaseApp)

export default {
  components: { VueCal },
  props: {
    chargerInfo: String,
  },
  data: () => ({
    selectedDate: new Date(), // Day view displays this date
    events: [],
  }),
  methods: {
    async fetchData(id) {
      console.log(id)
      const bookingsRef = collection(db, "testBookings")
      const q = query(bookingsRef, where("chargerID", "==", id))
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
    onEventCreate(event) {
      console.log(event)

      return true
    },
    dragToBook(slot) {
      console.log(slot.start)
      console.log(slot.end)
    },
    dropToBook(slot) {
      console.log(slot.event.start)
      console.log(slot.event.end)
    },
    resizeToBook(slot) {
      console.log(slot.event.start)
      console.log(slot.event.end)
    },
  },
  created() {
    this.fetchData(this.chargerInfo)
  },
  computed: {
    test() {
      return this.chargerInfo
    }
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

.vuecal__event {
  display: inline-block;
  justify-content: center;
  align-items: center;
  background-color: #B1DCFF;
  color: black;
  border-radius: 10px;
}

.vuecal__event.unavailable {
  display: inline-block;
  justify-content: center;
  align-items: center;
  background-color: #FF7575;
  color: #FF7575;
  border-radius: 10px;
}

/* .vuecal__event-time {
  color: #FF7575;
} */

.vuecal__now-line {
  color: #4285f4;
}
</style>