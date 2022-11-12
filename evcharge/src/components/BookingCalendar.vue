<template>
  <div>
  </div>
  <v-date-picker
    ref = "calendar"
    is-expanded
    :attributes="attributes"
    :min-date="new Date()"
     />
  
</template>

<script>
import firebaseApp from "../firebase.js";
import { getFirestore, getDoc, doc } from "firebase/firestore";
//import { getAuth, onAuthStateChanged } from '@firebase/auth';

const db = getFirestore(firebaseApp)

export default {
  name: 'BookingCalendar',
  components: { },
  props: {
    monthlyAvailabilities: Array,
  },
  data () {
    return {
      bookings: [
        {
          id: 1,
          date: new Date(),
          isAvailable: true,
        },
        {
          id: 2,
          date: new Date(2022, 10, 11),
          isAvailable: false,
        },
      ],
      // attr: [
      //   {
      //     key: 'available',
      //     highlight: {
      //       color: 'green',
      //       fillMode: 'solid',
      //     },
      //     dates: [
      //       { start: new Date(2022, 10, 11), end: new Date(2022, 10, 15) },
      //       { start: new Date(2022, 10, 29), end: new Date(2022, 10, 30) },
      //     ],
      //   },
      //   {
      //     key: 'unavailable',
      //     highlight: {
      //       color: 'red',
      //       fillMode: 'solid',
      //     },
      //     dates: [],
      //   },
      // ],
    }
  },
  computed: {
    attributes() {
      const unavail = this.bookings.filter(x => !x.isAvailable).map(x => ({
        key: `booking.${x.id},`,
        highlight: {
          color: 'red',
          fillMode: 'solid',
        },
        dates: x.date,
        customData: x,
      }))
      const avail = this.bookings.filter(x => x.isAvailable).map(x => ({
        key: `booking.${x.id},`,
        highlight: {
          color: 'green',
          fillMode: 'solid',
        },
        dates: x.date,
        customData: x,
      }))
      const arrayOfBookings = []
      for (var i = 0; i <unavail.length; i++) {
        arrayOfBookings.push(unavail[i])
      }
      for (var j = 0; j <avail.length; j++) {
        arrayOfBookings.push(avail[j])
      }
      return arrayOfBookings
    }
  },
  methods: {
    async getBookings() {
      const docRef = doc(db, "testCal", "evc1");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const bookingKeyValues = docSnap.data();
        let bookingAttributes = Object.keys(bookingKeyValues)
        let bookingValues = Object.values(bookingKeyValues)
        console.log(bookingAttributes)
        console.log(bookingValues)
        this.attr.unavailable.dates = [{ start: new Date(2022,10,1), end: new Date(2022,10,2) }]
      }
    }
  },
  created() {
    this.getBookings();
  },
};
</script>

<style>

</style>