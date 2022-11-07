<template>
  <div>
  </div>
  <v-calendar
    is-expanded
    :attributes="attr"
    :from-page="{ month: 11, year: 2022 }"
     />
  
</template>

<script>

export default {
  name: 'BookingCalendar',
  components: { },
  data () {
    const popup = [
      {
        description: "Available for booking",
        isComplete: false,
        dates: { weekdays:6 },
        color: 'green',
      }
    ];
    return {
      date: new Date(),
      attr: [
        {
          key: 'today',
          highlight: {
            color: 'blue',
            fillMode: 'solid',
          },
          dates: new Date(),
        },
        {
          key: 'available',
          highlight: {
            color: 'green',
            fillMode: 'solid',
          },
          dates: { start: new Date(2022, 10, 11), end: new Date(2022, 10, 15) },
        },
        {
          key: 'unavailable',
          highlight: {
            color: 'red',
            fillMode: 'solid',
          },
          dates: { start: new Date(2022, 10, 20), end: new Date(2022, 10, 24) },
        },
      ],
      incId: popup.length,
      popup,
    }
  },
  computed: {
    attributes() {
      return [
        this.popup.map(popupz => ({
          dates: popupz.dates,
          popover: {
            label: popupz.description,
          },
          customData: popupz,
        }))
      ]
    }
  }
};
</script>

<style>

</style>