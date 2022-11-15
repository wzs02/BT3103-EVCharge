<template>
  <div>
    <vue-cal
      style="height: 500px"
      active-view="day"
      hide-view-selector
      :disable-views="['years', 'year', 'month', 'week']"
      :time-step="30"
      :selected-date="selectedDate"
      :events="existingEvents"
      :on-event-create="onEventCreate"
      :editableEvents="{ title: false, drag: true, resize: true, delete: true, create: true}"
      :snapToTime="30"
      @event-drag-create="dragToBook"
      @event-drop="dropToBook"
      @event-duration-change="resizeToBook"
      @event-delete="resetCurrEvent">
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
    selectedDateString: String,
    selectedChargerID: String
  },
  emits: ["timeSelected"],
  data: () => ({
    selectedDate: new Date(), // Day view displays this date
    existingEvents: [],
    currEvent: "",
    startTime: "",
    endTime: "",
    bookingDuration: 0,
  }),
  methods: {
    async fetchData(id) {
      console.log(id)
      const bookingsRef = collection(db, "testBookings")
      const q = query(bookingsRef, where("chargerID", "==", id))
      const querySnapshot = await getDocs(q)
      querySnapshot.forEach((doc) => {
        this.existingEvents.push({
          start: doc.data()["startTime"].toDate(),
          end: doc.data()["endTime"].toDate(),
          title: 'Unavailable',
          class: 'unavailable',
          content: '',
          // NO DELETE OR MOVING
        })
      })
    },
    onEventCreate(event) {
      if (this.currEvent == "") {
        this.currEvent = event;
        return true
      } else {
        return false
      }
    },
    dragToBook(slot) {
      this.startTime = slot.start
      this.endTime = slot.end
      this.bookingDuration = slot.endTimeMinutes - slot.startTimeMinutes;
      this.$emit("timeSelected", {startTime: this.startTime, endTime: this.endTime, duration: this.bookingDuration});
    },
    resizeToBook(slot) {
      this.startTime = slot.event.start
      this.endTime = slot.event.end
      this.bookingDuration = slot.event.endTimeMinutes - slot.event.startTimeMinutes;
      this.$emit("timeSelected", {startTime: this.startTime, endTime: this.endTime, duration: this.bookingDuration});
    },
    dropToBook(slot) {
      this.startTime = slot.event.start
      this.endTime = slot.event.end
      this.bookingDuration = slot.event.endTimeMinutes - slot.event.startTimeMinutes;
      this.$emit("timeSelected", {startTime: this.startTime, endTime: this.endTime, duration: this.bookingDuration});
    },
    resetCurrEvent() {
      this.currEvent = "";
    },
    getSelectedDate(dateString) {
      if (dateString == "") {
        return new Date();
      } else {
        let year = dateString.substring(0,4);
        let month = parseInt(dateString.substring(5,7)) - 1; // get monthIndex
        let day = dateString.substring(8,10);
        return new Date(year, month, day);
      }
    }
  },
  created() {
    this.selectedDate = this.getSelectedDate(this.selectedDateString)
    this.fetchData(this.selectedChargerID)
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

.vuecal__event-time {
  display: inline-block;
  font-size: 18px;
  color: black;
}

.vuecal__event.unavailable {
  display: inline-block;
  justify-content: center;
  align-items: center;
  background-color: #FF7575;
  color: #FF7575;
  border-radius: 10px;
}

.vuecal__now-line {
  color: #4285f4;
}
</style>