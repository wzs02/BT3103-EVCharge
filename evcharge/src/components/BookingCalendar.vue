<template>
  <div>
  </div>
  <v-date-picker
    ref = "calendar"
    is-expanded
    :attributes="attr"
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
  },
  data () {
    return {
      attr: [
        {
          key: 'available',
          highlight: {
            color: 'green',
            fillMode: 'solid',
          },
          dates: [
            { start: new Date(2022, 10, 11), end: new Date(2022, 10, 15) },
            { start: new Date(2022, 10, 29), end: new Date(2022, 10, 30) },
          ],
        },
        {
          key: 'unavailable',
          highlight: {
            color: 'red',
            fillMode: 'solid',
          },
          dates: [],
        },
      ],
    }
  },
  computed: {
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
        this.attr.unavailable.dates = [{ start: new Date(2022,10,1), end: new Date(2022,10,2)}]
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