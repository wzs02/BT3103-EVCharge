<template>
  <router-view/>
 </template>

<script>


export default {
  name: 'App',

  components: {
  },

  data: () => ({
    //
  }),
}
</script>

<style>


#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #761818;
}
</style>
