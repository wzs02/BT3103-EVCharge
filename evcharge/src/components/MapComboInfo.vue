<template>
    <link href="https://cdn.jsdelivr.net/npm/@mdi/font@5.x/css/materialdesignicons.min.css" rel="stylesheet">
    <v-row style="margin-top: 10px">
        <v-col cols=3 class="center-horizontally">
            <v-icon style="font-size:40px">mdi-ev-plug-ccs1</v-icon>
        </v-col>
        <v-col>
            <ul>
                <li>Uses Combo 1 or Combo 2 connectors</li>
                <li>Provides power at up to 350kW</li>
            </ul>
        </v-col>
    </v-row>
</template>

<script>
export default {
    name: "MapComboInfo"
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Nunito&family=Outfit:wght@400;700&display=swap');

.center-horizontally {
    display: flex;
    justify-content: center;
}

li {
    font-family: 'Nunito', 'sans-serif';
}
</style>