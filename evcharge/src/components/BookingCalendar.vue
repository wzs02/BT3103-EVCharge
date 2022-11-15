<template>
  <div>
    <v-date-picker
    ref = "calendar"
    v-model="attributes"
    is-expanded
    :attributes="attributes"
    :min-date="new Date()"
    @dayclick="onDayClickHandler"
    />
  </div>
  
</template>

<script>
//import firebaseApp from "../firebase.js";
//import { getFirestore, getDoc, doc } from "firebase/firestore";
//import { getAuth, onAuthStateChanged } from '@firebase/auth';

//const db = getFirestore(firebaseApp)

export default {
  name: 'BookingCalendar',
  emits: ["dateSelected"],
  // props: {
  //   monthlyInfo: {
  //     type: Object,
  //     default() {         
  //       return { "today": [{ end: new Date(2022, 0, 1), start: new Date(2022, 0, 1) }] }
  //     },
  //   },
  // },
  // data () {
  //   return {
  //     date: new Date(),
  //     bookings: [],
  //     selectedDay: "",
  //   }
  // },
  // computed: {
  //   attributes() {
  //     const unavail = this.bookings.filter(x => !x.isAvailable).map(x => ({
  //       key: `booking.${x.id},`,
  //       highlight: {
  //         color: 'red',
  //         fillMode: 'solid',
  //       },
  //       dates: x.date,
  //       customData: x,
  //     }))
  //     const avail = this.bookings.filter(x => x.isAvailable).map(x => ({
  //       key: `booking.${x.id},`,
  //       highlight: {
  //         color: 'green',
  //         fillMode: 'solid',
  //       },
  //       dates: x.date,
  //       customData: x,
  //     }))
  //     const arrayOfBookings = []
  //     for (var i = 0; i <unavail.length; i++) {
  //       arrayOfBookings.push(unavail[i])
  //     }
  //     for (var j = 0; j <avail.length; j++) {
  //       arrayOfBookings.push(avail[j])
  //     }
  //     return arrayOfBookings
  //   }
  // },
  methods: {
    // async getBookings() {
    //   const docRef = doc(db, "testCal", "evc1");
    //   const docSnap = await getDoc(docRef);
    //   if (docSnap.exists()) {
    //     const bookingKeyValues = docSnap.data();
    //     let bookingAttributes = Object.keys(bookingKeyValues)
    //     let bookingValues = Object.values(bookingKeyValues)
    //     console.log(bookingAttributes)
    //     console.log(bookingValues)
    //     this.attr.unavailable.dates = [{ start: new Date(2022,10,1), end: new Date(2022,10,2) }]
    //   }
    // },
    onDayClickHandler(day) {
      this.selectedDay = day.id
      this.$emit("dateSelected", day.id)
    },
  }
    // displayMonthInfo(obj) {
    //   var minGap = 30
    //   var prev = obj[Object.keys(obj)[0]][0]["end"]
    //   var firstGap = null

    //   for(var day = 0; day < Object.keys(obj).length; day++) { // Iterate days
    //     for(var time = 0; time < obj[Object.keys(obj)[day]].length; time++) { // Iterate booked slots within day
          
    //       var curr = obj[Object.keys(obj)[day]][time]["start"]
    //       var diff = curr - prev

    //       if(diff >= minGap) {
    //         firstGap = {
    //           start: prev,
    //           end: curr,
    //         }
    //         break
    //       }

    //       prev = curr
    //     }
    //   }

    //   if(firstGap != null) {
    //     console.log("First gap at: " + firstGap.start)
    //     //this.bookings.push({ date: firstGap.start, isAvailable: true })
    //   } else {
    //     console.log("No gaps available")
    //     this.bookings.push({ date: new Date(), isAvailable: false })
    //   }

      // const daysRemaining = arr.length
      // const now = new Date()
      // var currDate = now.getDate()
      // const currMonth = now.getMonth()
      // const currYear = now.getFullYear()

      // for(var days = 0; days < daysRemaining; days++) {
      //   var availability = arr[days]
      //   if(availability) {
      //     this.bookings.push({ date: new Date(currYear, currMonth, currDate), isAvailable: true })
      //   } else {
      //     this.bookings.push({ date: new Date(currYear, currMonth, currDate), isAvailable: false })
      //   }
      //   currDate = currDate + 1
      // }
  //   },
  // },
  // created() {
  //   if(Object.keys(this.monthlyInfo).length == 0) {
  //     console.log("empty proxy")
  //   } else {
  //     this.displayMonthInfo(this.monthlyInfo)
  //     console.log(this.monthlyInfo)
  //   }
    
  // },
  // mounted() {
  // },
};
</script>

<style>

</style>