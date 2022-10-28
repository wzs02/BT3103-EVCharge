<template>
    <v-container>
        <v-row>

            <v-col cols=4 class="filter">
                <h4>Filter by location</h4>
                <input v-model="searchQuery" placeholder="Filter by location">
                <div v-for="r of resultQuery" :key="r.id">{{ r.title }}</div>
            </v-col>

            <v-col cols=4 class="filter">
                <h4>Filter by charger type</h4>
            </v-col>

            <v-col cols=4 class="filter">
                <h4>Filter by availability</h4>
            </v-col>

        </v-row>

        <v-row>
            <div id="FilterBar">

            </div>
        </v-row>

    </v-container>
</template>

<script>
export default {
    name: "FilterBar",
    data() {
        return {
            searchQuery: null,
            resources: [
                { id: 1, title: "javascript for dummies" },
                { id: 2, title: "vue for dummies" },
                { id: 3, title: "dos for dummies" },
                { id: 4, title: "windows for dummies" },
                { id: 5, title: "html for dummies" }    
            ]
        }
    },
    computed: {
        resultQuery() {
            if (this.searchQuery) {
                return this.resources.filter(item => {
                    return this.searchQuery
                    .toLowerCase()
                    .split("")
                    .every(v => item.title.toLowerCase().includes(v))
                })
            } else {
                return 0
            }
        }
    }
}
</script>

<style>

.filter {
    font-family: "Outfit";
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    padding-top: 5%;
    padding-bottom: 5%
}

</style>