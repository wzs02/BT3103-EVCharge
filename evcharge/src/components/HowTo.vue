<template>
    <div style="margin-bottom: 50px;">
        <div class="how-to-section">
            <img class="ellipse-bg" v-bind:src="bg_ellipse">
            <div class="how-to-content">
                <h1>{{header}}</h1>
                <p class="para">{{para}}</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'HowTo',
    props: {
        header: String,
        para: String
    },
    data() {
        return {
            bg_ellipse: require('../assets/AboutPage/About_Ellipse.png')
        }
    }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Nunito&family=Outfit:wght@300&display=swap');

.how-to-section {
    position: relative;
    display: inline-block;
}

.ellipse-bg {
    height: 150px;
    width: 150px;
    display: block
}

.how-to-content {
    font-family: Outfit;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(5%, -5%);
    text-align: start;
    color: black;
    font-weight: bold;
    width: 600px;
}

.para {
    font-family: Outfit;
    font-weight: 200;

}
</style>