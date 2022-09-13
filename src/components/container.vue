<template>
  <div class="box" style="height: 100%">
    <div class="min">
      <div class="left">
        <el-card><mapp /></el-card>
      </div>
      <div class="right">
        <el-card><Ltable /></el-card>
      </div>
    </div>

    <div class="bottom">
      <el-card><Btable /></el-card>
    </div>
  </div>
</template>
<script>
import mapp from "../view/map.vue";
import Btable from "../view/Btable.vue";
import Ltable from "../view/Ltable.vue";

export default {
  components: { mapp, Btable, Ltable }
};
</script>
<style scoped>
.box {
  padding: 0 2px;
  display: flex;
  flex-direction: column;
}
.min {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.left {
  width: 50%;
  margin-right: 30px;
  /* line-height: 30px; */
}
.right {
  width: 50%;
  /* line-height: 40px; */
}
.box .bottom {
  width: 100%;
}
</style>
