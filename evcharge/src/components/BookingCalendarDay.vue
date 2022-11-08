<template>
  <div>
    <vue-cal
      style="height: 500px"
      :disable-views="['years', 'year', 'month', 'week']"
      :time-from="0 * 60"
      :time-to="24 * 60"
      :time-step="30">
    </vue-cal>
  </div>
</template>

<script>
import VueCal from 'vue-cal'
import 'vue-cal/dist/vuecal.css'

export default {
  components: { VueCal },
}
</script>

<style>

</style>