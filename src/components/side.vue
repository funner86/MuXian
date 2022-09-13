<template>
  <!-- 侧边栏菜单 -->
  <el-menu
    :default-active="$router.path"
    :router="true"
    text-color="#000000"
    active-text-color="#fafafa"
    class="el-menu-side"
    style="background-color:#f5f5f5;font-weight: 700;"
  >
    <el-menu-item index="/container">
      <template slot="title">
        <i class="el-icon-s-home"></i>
        <span>首页</span>
      </template>
    </el-menu-item>

    <el-menu-item index="/realtime">
      <template slot="title">
        <i class="el-icon-data-analysis"></i>
        <span>各节点温度</span>
      </template>
    </el-menu-item>

    <el-menu-item index="/history">
      <i class="el-icon-date"></i>
      <span>始端箱历史数据</span>
    </el-menu-item>

    <el-menu-item index="/datachart">
      <i class="el-icon-data-line"></i>
      <span slot="title">节点温度历史数据</span>
    </el-menu-item>

    <el-menu-item index="/train">
      <i class="el-icon-map-location"></i>
      <span slot="title">地图显示</span>
    </el-menu-item>

    <el-menu-item index="/ledger">
      <i class="el-icon-thumb"></i>
      <span slot="title">坐标获取</span>
    </el-menu-item>

    <el-menu-item index="/addlat">
      <i class="el-icon-thumb"></i>
      <span slot="title">添加经纬度</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  created() {
    this.$router.path = "/container";
  },
  name: "side"
};
</script>

<style>
.el-main {
  padding: 0;
}

.el-menu-side {
  width: 99%;
  padding-top: 20px;
  height: calc(93vh);
  /* height: 91vh; */
  border-top: 1px solid #fff;
}
.el-menu-item.is-active {
  /* border-left: solid 3px #26a1fa; */
  background-color: #304ffe;
}
.el-menu-item:hover {
  border-left: #0d47a1 solid 6px !important;
  background-color: #4dd0e1 !important;
}
</style>
