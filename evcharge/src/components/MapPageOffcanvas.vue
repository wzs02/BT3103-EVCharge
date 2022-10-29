<template>
    <link href="https://cdn.jsdelivr.net/npm/@mdi/font@5.x/css/materialdesignicons.min.css" rel="stylesheet">
    <div v-if="showDrawer" id="div-style">
        <div style="height: 70px"></div>
        <v-card style="height: 750px">
            <div style="position: relative">
                <img :src="require(`@/assets/MapPage/${imgExtension}.jpeg`)" id="bg-ratio">
                <v-btn id="close-btn" @click="$emit('closeWindows')">
                    <v-icon>mdi-close-thick</v-icon>
                </v-btn>
            </div>
            <div id="details-grey-div">
                <v-list-item id="grey-div-title"><b>{{ stationName }}</b></v-list-item>
                <v-row style="display: flex; align-items: center;">
                    <v-col cols=8>
                        <v-list-item>
                            <p class="grey-div-type">{{chargerType}}</p>
                        </v-list-item>
                        <v-list-item>
                            <p class="grey-div-type" style="color: #4285F4">{{chargerSystem}}</p>
                        </v-list-item>
                    </v-col>

                    <v-col cols=4>
                        <v-btn id="book-btn">Book</v-btn>
                    </v-col>
                </v-row>
                <v-list-item><span id="service-provider-bold">Service-provider: </span><span
                        id="service-provider-grey">{{chargerProvider}}</span></v-list-item>
            </div>
            <div id = "charger-details">
                <v-list-item><v-icon>mdi-map-marker-radius</v-icon>Test second</v-list-item>
                <v-list-item><v-icon>mdi-clock-time-three-outline</v-icon>Test second</v-list-item>
                <v-list-item><v-icon>mdi-information</v-icon>Test second</v-list-item>
                <v-list-item><v-icon>mdi-currency-usd</v-icon>Test second</v-list-item>
            </div>
            <v-divider></v-divider>
        </v-card>
    </div>
</template>

<script>

export default {
    name: 'MapPageOffcanvas',
    props: {
        drawer: Boolean,
        stationName: String,
        imgExtension: String,
        chargerType: String,
        chargerSystem: String,
        chargerProvider: String
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
    width: 400px;
    height: 220px;
    margin-bottom: 0px;
    display: block;
}

#details-grey-div {
    background-color: #d9d9d9;
    width: 400px;
    margin-top: 0px;
    margin-bottom: 20px;
}

#grey-div-title {
    font-family: 'Outfit', 'sans-serif';
    font-size: 16px;
    font-weight: 700px;
}

.grey-div-type {
    font-family: 'Outfit', 'sans-serif';
    font-size: 14px;
    font-weight: 400px;
}

.v-list-item {
    margin-bottom: -20px !important;
}

#service-provider-bold {
    font-family: 'Outfit', 'sans-serif';
    font-weight: 400;
    font-size: 14px;
}

#service-provider-grey {
    font-weight: 'Outfit', 'sans-serif';
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
    border-bottom:#000000 solid 1px;
}
</style>


