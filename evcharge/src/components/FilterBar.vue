<template>
    <v-container>
        <v-row>

            <v-col cols=4 class="filter">
                <h4>Filter by location</h4>
                <VueMultiselect
                    v-model="selected"
                    :options="options"
                    :multiple="true">
                </VueMultiselect>
            </v-col>

            <v-col cols=4 class="filter">
                <h4>Filter by charger type</h4>
                <VueMultiselect
                    v-model="selected"
                    :options="options"
                    :multiple="true">
                </VueMultiselect>
            </v-col>

            <v-col cols=4 class="filter">
                <h4>Filter by availability</h4>
                <VueMultiselect
                    v-model="selected"
                    :options="options"
                    :multiple="true">
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
import VueMultiselect from 'vue-multiselect'

export default {
    name: "FilterBar",
    components: { VueMultiselect },
    data () {
        return {
            selected: null,
            options: ['Changi', 'Buona Vista', 'Kent Ridge']
        }
    }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.css">

</style>