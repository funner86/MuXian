<template>
  <el-container>
    <el-header><top /> </el-header>
    <el-container>
      <el-aside width="250px"><side /> </el-aside>
      <el-main><router-view /> </el-main>
    </el-container>
  </el-container>
</template>
<script>
import side from "./side.vue";
import top from "./top.vue";

export default {
  components: { side, top }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
.el-header,
.el-footer {
  padding: 0;
}
</style>
