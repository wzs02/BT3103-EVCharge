<template>
    <v-container>
        <v-row>

            <v-col cols=4 class="filter">
                <h4>Filter By Region</h4>
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
                <h4>Filter By Charger Type</h4>
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
                <h4>Filter By Timing</h4>
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
        //Specify the event when we close the filter bar

        regionClose () {
            this.$emit('selectRegion',this.selected1)
            //console.log(this.selected1[0]) 
            
        },
        chargerClose () {
            this.$emit("selectCharger",this.selected2)
            //console.log(this.selected2)
        },

        //Specify the event when we remove options in the filter bar
        regionRemove(name) {
            var index = this.selected1.findIndex(x=>x == name)
            var arr = structuredClone(this.selected1)
            arr.splice(index,1)
            this.$emit('removeRegion',arr)
        }, 
        chargerRemove(name){
            var index = this.selected2.findIndex(x=>x == name)
            var arr = structuredClone(this.selected2)
            arr.splice(index,1)
            this.$emit('removeCharger',arr)
        },

    }
}

</script>

<style src="vue-multiselect/dist/vue-multiselect.css">

</style>