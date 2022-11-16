<template>
  <div>
    <vue-cal
      style="height: 500px"
      active-view="day"
      hide-view-selector
      :disable-views="['years', 'year', 'month', 'week']"
      :time-step="30"
      :selected-date="selectedDate"
      :events="allEvents"
      :on-event-create="onEventCreate"
      :editableEvents="{ title: false, drag: false, resize: true, delete: true, create: true}"
      :snapToTime="30"
      @event-drag-create="dragToBook"
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
    preexistingEvents: [],
    allEvents: [],
    currEvent: "",
    startTime: "",
    endTime: "",
  }),
  methods: {
    async fetchExistingBookings(id, dateString) {
      let year = dateString.substring(0,4);
      let month = parseInt(dateString.substring(5,7)) - 1; // get monthIndex
      let day = dateString.substring(8,10);
      let thisDateStart = new Date(year, month, day, 0);
      let thisDateEnd = new Date(year, month, day, 23, 30);
      const bookingsRef = collection(db, "bookings")
      const q = query(bookingsRef, where("charger_id", "==", id),
        where("start_timestamp", ">=", thisDateStart), where("start_timestamp", "<=", thisDateEnd));
      const querySnapshot = await getDocs(q)
      querySnapshot.forEach((doc) => {
        let data = doc.data()
        this.allEvents.push({
          start: data.start_timestamp.toDate(),
          end: data.end_timestamp.toDate(),
          class: 'unavailable',
          background: true,
          deletable: false,
          resizable: false,
        })
      });
      this.preexistingEvents = [...this.allEvents];
    },
    onEventCreate(event) {
      if (this.currEvent == "") {
        event.id = this.allEvents.length + 1
        this.allEvents.push(event);
        this.currEvent = event;
        return true
      }
      return false
    },
    dragToBook(event) {
      this.checkOverlappingEvents(event)
      this.startTime = event.start;
      this.endTime = event.end;
      this.$emit("timeSelected", {startTime: this.startTime, endTime: this.endTime});
    },
    resizeToBook(slot) {
      let eventToCheck = this.allEvents.find(ee => ee.id == slot.originalEvent.id);
      this.checkOverlappingEvents(eventToCheck)
      this.startTime = eventToCheck.start;
      this.endTime = eventToCheck.end;
      this.$emit("timeSelected", {startTime: this.startTime, endTime: this.endTime});
    },
    // dropToBook(slot) {
    //   if (slot.event != false) {
    //     slot.event = this.checkOverlappingEvents(slot.event);
    //     this.startTime = slot.event.start;
    //     this.endTime = slot.event.end;
    //     this.$emit("timeSelected", {startTime: this.startTime, endTime: this.endTime});
    //   }
    // },
    resetCurrEvent() {
      this.currEvent = "";
      this.startTime = "";
      this.endTime = "";
      this.allEvents.pop();
      this.$emit("timeSelected", {startTime: this.startTime, endTime: this.endTime});
    },
    checkOverlappingEvents(currEventInList) {
      let currEventStart = currEventInList.start;
      let currEventEnd = currEventInList.end;
      this.preexistingEvents.forEach(event => {
        if (currEventEnd > event.start && currEventStart < event.end) {
          currEventInList.start = "";
          currEventInList.end = "";
          this.allEvents.pop();
          this.currEvent = "";
          alert("Selected booking time slot cannot overlap existing bookings")
        //   if (currEventEnd < event.end && currEventStart < event.start) {
        //     currEvent.end = event.start;
        //   } else if (currEventStart >= event.start && currEventEnd <= event.end) {
        //     this.resetCurrEvent();
        //     currEvent = false;
        //   } else {
        //     currEvent.start = event.end;
        //   }
          return true;
        }});
      return false;
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
    this.fetchExistingBookings(this.selectedChargerID, this.selectedDateString)
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