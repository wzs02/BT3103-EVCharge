<template>
    <v-container>
        <v-row>

            <v-col cols=4 class="filter">
                <h4>Filter by location</h4>
                <Multiselect
                    v-model="selected1"
                    :options="locations"
                    :multiple="true"
                    :close-on-select="false"
                    @remove =" regionRemove"
                    @close="regionClose"
                    placeholder="Enter Region">
                </Multiselect>
            </v-col>

            <v-col cols=4 class="filter">
                <h4>Filter by charger type</h4>
                <Multiselect
                    v-model="selected2"
                    :options="chargertype"
                    :multiple="true"
                    :close-on-select="false"
                    @remove ="chargerRemove"
                    @close="chargerClose"
                    placeholder="Enter Charger Type">
                </Multiselect>
            </v-col>

            <v-col cols=4 class="filter">
                <h4>Filter by timing</h4>
                <Multiselect
                    v-model="selected3"
                    :options="timing"
                    :multiple="true"
                    :close-on-select="false"
                    placeholder="Enter Timing">
                </Multiselect>
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
import Multiselect from 'vue-multiselect'

export default {
    name: "FilterBar",
    components: { Multiselect },
    emits:['selectRegion','selectCharger','removeRegion','removeCharger'],
    data () {
        return {
            selected1: [],
            selected2: [],
            selected3: [],
            locations: ["Ang Mo Kio","Bedok","Bishan","Bukit Batok","Bukit Merah","Bukit Timah","Changi","China Town","Choa Chu Kang","Clementi",
            "Fernvale","Hougang","Jurong","Kaki Bukit","Katong","Kent Ridge","Mandai","Nicoll Highway","Paya Lebar","Pioneer","Punggol","Serangoon","Simei","Tampines",
            "Tanah Merah","Thomson","Woodlands"],
            chargertype: ["Type 2","Commando", "CCS/SAE","J-1772"],
            timing: ['1pm', '2pm', '3pm']
        }
    },

    methods:{
        //Specify the event to happen when we close the first filter bar

        regionClose () {
            this.$emit('selectRegion',this.selected1)
            //console.log(this.selected1[0]) 
            
        },
        chargerClose () {
            this.$emit("selectCharger",this.selected2)
            //console.log(this.selected2)
        },
        regionRemove(name) {
            var arr = this.selected1.findIndex(x=>x == name)
            var removed = this.selected1.splice(arr,1)
            console.log(removed)
            this.$emit('removeRegion',this.selected1)
        },
        chargerRemove(name){
            var arr = this.selected2.findIndex(x=>x == name)
            var removed = this.selected2.splice(arr,1)
            console.log(removed)
            this.$emit('removeCharger',this.selected2)
        },

    }
}

</script>

<style src="vue-multiselect/dist/vue-multiselect.css">

</style>