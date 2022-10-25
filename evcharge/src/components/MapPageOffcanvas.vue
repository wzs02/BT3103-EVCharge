<template>
    <!-- <button>{{localData}}</button> -->
    <v-card>
        <v-layout>
            <v-navigation-drawer v-model="showDrawer" temporary :width = "400">
                <v-list-item>{{stationName}}</v-list-item>
                <v-list-item prepend-avatar="https://randomuser.me/api/portraits/men/78.jpg">
                </v-list-item>
                <v-btn @click = "$emit('closeWindows')">Close</v-btn>
                <v-divider></v-divider>

                <v-list density="compact" nav>
                    <v-list-item prepend-icon="mdi-view-dashboard" title="Home" value="home"></v-list-item>
                    <v-list-item prepend-icon="mdi-forum" title="About" value="about"></v-list-item>
                </v-list>
            </v-navigation-drawer>
            <v-main style="height: 250px">
                <div class="d-flex justify-center align-center h-100">
                </div>
            </v-main>
        </v-layout>
    </v-card>
</template>

<script>
export default {
    name: 'MapPageOffcanvas',
    props: {
        drawer: Boolean,
        stationName:String
    },
    computed: {
        showDrawer() {
            return this.drawer
        }
    }
}
</script>


