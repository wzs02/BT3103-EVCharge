<template>
  <div>
  </div>
  <v-calendar
    is-expanded
    :attributes="attributes"
     />
  
</template>

<script>

export default {
  name: 'BookingCalendar',
  components: { },
  data () {
    return {
      date: new Date(),
      attributes: [
        {
          key: 'today',
          highlight: 'blue',
          dates: new Date(),
        }
      ]
    }
  }
};
</script>

<style>

</style>