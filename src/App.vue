<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  mounted() {
    // 关闭浏览器窗口的时候清空浏览器缓存在localStorage的数据
    window.onbeforeunload = function(e) {
      var storage = window.localStorage;
      storage.clear();
    };
  }
};
</script>

<style>
#app {
  height: 100vh;

  overflow-y: auto;
}
* {
  padding: 0;
  margin: 0;
}
body {
  font-family: "微软雅黑";
  margin: 0px auto; /* 去除上下的边距*/
}
html,
body,
#app {
  background-color: #e3f2fd;
}
</style>
