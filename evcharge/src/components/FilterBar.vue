<template>
    <v-container>
        <v-row>

            <v-col cols=4 class="filter">
                <h4>Filter by location</h4>
                <VueMultiselect
                    v-model="selected1"
                    :options="locations"
                    :multiple="true"
                    :close-on-select="false">
                </VueMultiselect>
            </v-col>

            <v-col cols=4 class="filter">
                <h4>Filter by charger type</h4>
                <VueMultiselect
                    v-model="selected2"
                    :options="chargertype"
                    :multiple="true"
                    :close-on-select="false">
                </VueMultiselect>
            </v-col>

            <v-col cols=4 class="filter">
                <h4>Filter by timing</h4>
                <VueMultiselect
                    v-model="selected3"
                    :options="timing"
                    :multiple="true"
                    :close-on-select="false">
                </VueMultiselect>
            </v-col>

        </v-row>

        <v-row>
            <div id="FilterBar">

            </div>
        </v-row>

    </v-container>
</template>

<script>
// https://github.com/shentao/vue-multiselect/tree/next
// https://vue-multiselect.js.org/#sub-getting-started
import VueMultiselect from 'vue-multiselect'

export default {
    name: "FilterBar",
    components: { VueMultiselect },
    data () {
        return {
            selected1: null,
            selected2: null,
            selected3: null,
            locations: ['Changi', 'Buona Vista', 'Kent Ridge'],
            chargertype: ['A', 'B', 'C'],
            timing: ['1pm', '2pm', '3pm']
        }
    }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.css">

</style>