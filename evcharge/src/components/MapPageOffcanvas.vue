<template>
    <link href="https://cdn.jsdelivr.net/npm/@mdi/font@5.x/css/materialdesignicons.min.css" rel="stylesheet">
    <div v-if="showDrawer" id="div-style">
        <div style="height: 70px"></div>
        <v-card id="card-dimensions">
            <div style="position: relative">
                <img :src="require(`@/assets/MapPage/${imgExtension}.jpeg`)" id="bg-ratio">
                <v-btn id="close-btn" @click="$emit('closeWindows')">
                    <v-icon>mdi-close-thick</v-icon>
                </v-btn>
            </div>
            <div id="details-grey-div">
                <v-list-item id="grey-div-title"><b>{{ stationName }}</b></v-list-item>
                <v-row class="center-content-horizontally">
                    <v-col cols=8>
                        <v-list-item>
                            <p class="grey-div-type">{{ chargerType }}</p>
                        </v-list-item>
                        <v-list-item>
                            <p class="grey-div-type" style="color: #4285F4">{{ chargerSystem }}</p>
                        </v-list-item>
                    </v-col>

                    <v-col cols=4>
                        <v-btn id="book-btn" @click="handleBookClick">Book</v-btn>
                    </v-col>
                </v-row>
                <v-list-item><span id="service-provider-bold">Service-provider: </span><span
                        id="service-provider-grey">{{ chargerProvider }}</span></v-list-item>
            </div>
            <div id="charger-details">
                <div style="height: 10px"></div>
                <v-list-item>
                    <v-row>
                        <v-col cols=1>
                            <v-icon>mdi-map-marker-radius-outline</v-icon>
                        </v-col>
                        <v-col style="margin-right: 5px">
                            {{ chargerAddress }}
                        </v-col>
                    </v-row>
                </v-list-item>
                <v-list-item>
                    <v-row>
                        <v-col cols=1>
                            <v-icon>mdi-clock-time-three-outline</v-icon>
                        </v-col>
                        <v-col style="margin-right: 5px">
                            {{ chargerHours }}
                        </v-col>
                    </v-row>
                </v-list-item>
                <v-list-item>
                    <v-row>
                        <v-col cols=1>
                            <v-icon>mdi-information-outline</v-icon>
                        </v-col>
                        <v-col style="margin-right: 5px">
                            Number of chargers: {{ chargerLots }}
                        </v-col>
                    </v-row>
                </v-list-item>
                <v-list-item>
                    <v-row>
                        <v-col cols=1>
                            <v-icon>mdi-currency-usd</v-icon>
                        </v-col>
                        <v-col style="margin-right: 5px">
                            {{ chargerCost }}
                        </v-col>
                    </v-row>
                </v-list-item>
                <div style="height: 10px"></div>
            </div>
            <div id="charger-details-div">
                <v-list-item>
                    <p id="charger-details-header">Charger Details</p>
                </v-list-item>
                <v-list-item v-show="T2">
                    <MapType2Info />
                </v-list-item>
                <v-list-item v-show="commando">
                    <MapCommandoInfo />
                </v-list-item>
                <v-list-item v-show="combo">
                    <MapComboInfo />
                </v-list-item>
                <v-list-item v-show="J1772">
                    <MapJ1772Info />
                </v-list-item>
                <div style="height: 30px"></div>
            </div>
        </v-card>
    </div>
</template>

<script>
import MapType2Info from '@/components/MapType2Info.vue'
import MapCommandoInfo from '@/components/MapCommandoInfo.vue'
import MapComboInfo from '@/components/MapComboInfo.vue'
import MapJ1772Info from '@/components/MapJ1772Info.vue'

export default {
    name: 'MapPageOffcanvas',
    components: { MapType2Info, MapCommandoInfo, MapComboInfo, MapJ1772Info },
    props: {
        drawer: Boolean,
        stationID: String,
        stationName: String,
        imgExtension: String,
        chargerType: String,
        chargerSystem: String,
        chargerProvider: String,
        chargerAddress: String,
        chargerHours: String,
        chargerLots: String,
        chargerCost: String,
        hasT2: Boolean,
        hasCommando: Boolean,
        hasCombo: Boolean,
        hasJ1772: Boolean
    },
    data() {
        return {
            T2: this.hasT2,
            commando: this.hasCommando,
            combo: this.hasCombo,
            J1772: this.hasJ1772
        }
    },
    methods:{
        handleBookClick() {
            // store the stationID for retrieval in the booking page
            localStorage.setItem("stationID", this.stationID)
            this.$router.push('/Book')
        }
    },
    computed: {
        showDrawer() {
            return this.drawer
        }
    }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Nunito&family=Outfit:wght@400;700&display=swap');

#div-style {
    width: 400px;
    height: 700px;
}

#bg-ratio {
    right: 0;
    min-width: 100%;
    height: 260px;
    margin-bottom: 0px;
    display: block;
}

#card-dimensions {
    position: fixed;
    top: 70px;
    bottom: 0;
    min-height: 100%;
}

#details-grey-div {
    background-color: #d9d9d9;
    width: 400px;
    margin-top: 0px;
    margin-bottom: 20px;
    min-width: 100%;
    right: 0;
}

#grey-div-title {
    font-family: 'Outfit', 'sans-serif';
    font-size: 16px;
    font-weight: 700px;
}

.grey-div-type {
    font-family: 'Nunito', 'sans-serif';
    font-size: 14px;
    font-weight: 400px;
}

.v-list-item {
    margin-bottom: -20px !important;
}

#service-provider-bold {
    font-family: 'Nunito', 'sans-serif';
    font-weight: 400;
    font-size: 14px;
}

#service-provider-grey {
    font-weight: 'Nunito', 'sans-serif';
    font-weight: 400px;
    font-size: 14px;
    color: #808080;
}

#book-btn {
    background: #000000;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 15px;
    width: 80px;
    height: 30px;
    color: white;
    text-transform: none;
    font-family: 'Outfit', 'sans-serif';
    font-size: 14px;
    margin-top: 10px;
}

#close-btn {
    background: white;
    position: absolute;
    top: 0;
    right: 0;
    outline: none;
    box-shadow: none;
}

#charger-details {
    background: #F2F2F2;
    border-bottom: #000000 solid 1px;
}

#charger-details .v-list-item {
    padding-bottom: 20px;
    font-family: 'Nunito', 'sans-serif';
}

#charger-details-header {
    font-family: 'Nunito', 'sans-serif';
    font-size: 18px;
    margin-top: 5px;
}

#charger-details-div {
    background: #F2F2F2;
    min-width: 100%;
}

.center-content-horizontally {
    display: flex;
    justify-content: center;
}
</style>


