<template>
  <el-row class="container">
    <div class="topimg" style="font-weight: 700">
      <a href="/"
        ><img src="../assets/tubiao.png" 
      /></a>
      江苏全东信息科技有限公司
    </div>

    <div class="topbar">
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo eltopbar"
        mode="horizontal"
        @select="handleSelect"
        background-color="#333744"
        text-color="#fff"
        active-text-color="yellow"
      >
        <!-- <el-menu-item class="topflex" style="margin-left: 32%" index="1"
          >功能留白1</el-menu-item
        >
        <el-menu-item class="topflex" index="2">功能留白2</el-menu-item>
        <el-menu-item class="topflex" index="3">功能留白3</el-menu-item> -->
        <div class="topbar-account topbar-btn">
          <el-dropdown trigger="click">
            <span class="el-dropdown-link userinfo-inner">
              <i class="iconfont el-icon-user-solid" style="font-size:16px"
                >用户名</i
              >
              <i class="el-icon-caret-bottom"></i
            ></span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <div @click="jumpTo('/')">
                  <span style="color: #555; font-size: 14px">个人信息</span>
                </div>
              </el-dropdown-item>
              <el-dropdown-item>
                <div @click="jumpTo('/')">
                  <span style="color: #555; font-size: 14px">修改密码</span>
                </div>
              </el-dropdown-item>
              <el-dropdown-item divided @click.native="logout"
                >退出登录</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-menu>
    </div>
  </el-row>
</template>

<script>
import "element-ui/lib/theme-chalk/display.css";
import { road } from "../utils/road.js";
export default {
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "1"
    };
  },
  created() {
    road.$on("goto", url => {
      if (url === "/") {
        this.$router.push(url);
      }
    });
  },
  methods: {
    jumpTo(url) {
      this.$router.push(url); //用go刷新
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    logout() {
      //logout
      this.$confirm("确认退出吗?", "提示", {
        confirmButtonClass: "el-button--warning"
      })
        .then(() => {
          road.$emit("goto", "/");
        })
        .catch(() => {});
    }
  }
};
</script>

<style scoped>
.container {
  z-index: 1000;
  overflow: auto;
}
.topimg {
  float: left;
  width: 285px;
  height: 60px;
  line-height: 60px;
  text-align: center;
  color: #fff;
  background-color: #333744;
}
.topimg img {
  width: 42px;
  height: 42px;
  border: 1px solid #504d4d;
  -webkit-border-radius: 20%;
  -moz-border-radius: 20%;
  border-radius: 20%;
  vertical-align: middle;
  margin-right: 5px;
}
.topbar {
  overflow: hidden;
}
.topbar-account {
  float: right;
  height: 60px;
  line-height: 53px;
  margin-right: 5px;
  color: red;
}
.topbar-account .iconfont {
  width: 70px;
  font-size: 18px;
  color: #fff;
}
.topbar-account .iconfont ~ i {
  font-size: 18px;
  color: #fff;
}
</style>
