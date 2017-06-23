<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  import utilities from './common/utilities'

export default {
  name: 'app',
  created(){
    utilities.basicData().then(function (result) {
      var roles = {}, manager={};
      window.IGrow.user.roles && window.IGrow.user.roles.forEach(function(item){
        manager[item.code.replace('school.', '')] = true
        roles[item.code] = true;
      })
      window.IGrow.user.school.manager = manager;
      window.IGrow.user.roles = roles;
      IGrow = window.IGrow;
      app.init();
    });
  }
}
</script>

<style>
  body {
    font-size: 16px;
  }
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
