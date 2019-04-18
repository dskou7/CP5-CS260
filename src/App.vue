<template>
  <div id="app">
    <div class="pure-menu pure-menu-horizontal">
    <router-link to="/" class="pure-menu-heading pure-menu-link">LFG</router-link>
    <ul class="pure-menu-list">
        <li class="pure-menu-item"><router-link to="/myposts" class="pure-menu-link">My Posts</router-link></li>
    </ul>
    </div>
    <router-view/>
    <div class="footer">
      <a href = "https://github.com/dskou7/cp5-cs260">Source code here</a>
    </div>
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

.header{
  position: fixed;
  top: 0;
  right: 0;
  display: inline-block;
  padding: 10px;
}

.footer{
  position: fixed;;
  bottom: 0;
  left: 0;
  display: inline-block;
  background-color: grey;
  padding: 5px;
  height: 2em;
  border-radius: 5px;
  /*color: white !important;
  text-decoration: none !important;*/
}

a.footer{
  color:white !important;
  text-decoration: none !important;
}

</style>
