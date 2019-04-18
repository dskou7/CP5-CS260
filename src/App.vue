<template>
  <div id="app">
    <div class="pure-menu pure-menu-horizontal">
    <router-link to="/" class="pure-menu-heading pure-menu-link">LFG</router-link>
    <ul class="pure-menu-list">
        <li class="pure-menu-item"><router-link to="/myposts" class="pure-menu-link">My Posts</router-link></li>
    </ul>
    </div>
    <router-view/>
  </div>
</template>

<script>

</script>

<style>

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.pure-menu-horizontal .pure-menu-link{
  background: aliceblue;
  color: #1b2631 !important;
}
</style>
