<template>
    <div id="center-content">
        <div>
            <img :src="require(`@/assets/AboutPage/${imgSource}`)">
            <b><p id="name">{{memberName}}</p></b>
            <p id="position">Business Analyst</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'TeamProfile',
    props: {
        imgSource: String,
        memberName: String
    }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Nunito&family=Outfit:wght@300&display=swap');

#center-content {
    display: flex;
    justify-content: center;
}

#name {
    text-align: center;
    font-family: 'Outfit', 'sans-serif';
}

#position {
    text-align: center;
    font-weight: 400;
    font-family: 'Outfit', 'sans-serif';
}
</style>