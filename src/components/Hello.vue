<template>
  <div class="hello">
    <div class="block">
      <p> this is block</p>
    </div>
  </div>
</template>

<script>
  import '../lib/weui/dist/style/weui.min.css'
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods:{
    setRem(){
      var deviceWidth=$(window).outerWidth();
      if(deviceWidth>640){
        $("html").css("font-size","100px");
      }else{
        $("html").css("font-size",deviceWidth/640*100+'px');
      }
    }
  },
  created(){
    this.setRem();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style rel="stylesheet/scss" lang="scss">
  .block {
    p {
      color: red;
      font-size: 20px;
    }
    width: 1rem;
    height: 1rem;
    background: lightgrey;
  }
h1, h2 {
  font-weight: normal;
  font-size: 16px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
