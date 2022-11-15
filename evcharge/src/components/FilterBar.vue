<template>
    <v-container>
        <v-row>

            <v-col cols=6 class="filter">
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

            <v-col cols=6 class="filter">
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

    computed:{
        filterBarInput() {
            return [this.selected1,this.selected2]
        }
    },

    methods:{

        //Specify the events when we close the filter bar
        regionClose () {
            this.$emit("selectRegion",this.filterBarInput)
            //console.log(this.selected1[0]) 
            
        },
        chargerClose () {
            this.$emit("selectCharger",this.filterBarInput)
            console.log(this.selected1)
            console.log(this.selected2)
            console.log(this.filterBarInput[0][0])
            console.log(this.filterBarInput[1])
        },

        //Specify the events when we remove options in the filter bar
        regionRemove(name) {
            var index = this.selected1.findIndex(x=>x == name)
            var arr = structuredClone(this.selected1)
            arr.splice(index,1)
            this.selected1 = arr
            this.$emit('removeRegion',this.filterBarInput)
        }, 
        chargerRemove(name){
            var index = this.selected2.findIndex(x=>x == name)
            var arr = structuredClone(this.selected2)
            arr.splice(index,1)
            this.selected2 = arr
            this.$emit('removeCharger',this.filterBarInput)
        },

    }
}

</script>

<style src="vue-multiselect/dist/vue-multiselect.css">

</style>