<!-- <template>
  <div class="login-container">
    <div class="tubiao">
      <img src="../assets/tubiao.png" alt="" />
    </div>
    <div class="login-info">
      <el-row>
        <el-col :xs="24" :sm="11" :md="8" :lg="9" :xl="8">
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="账号：" prop="account">
              <el-input
                v-model="ruleForm.account"
                autocomplete="off"
                placeholder="请输入账号"
                clearable
              >
              </el-input>
            </el-form-item>
            <el-form-item label="密码：" prop="password">
              <el-input
                @keyup.enter.native="submitForm('ruleForm')"
                type="password"
                v-model="ruleForm.password"
                autocomplete="off"
                show-password
                clearable
                placeholder="请输入密码"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')"
                >登录</el-button
              >
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  name: "login",
  data() {
    var validateAccount = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("账号不能为空"));
      } else {
        callback();
      }
    };
    var validatePassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        account: "",
        password: ""
      },
      rules: {
        account: [
          {
            validator: validateAccount,
            trigger: "blur"
          }
        ],
        password: [
          {
            validator: validatePassword,
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (
            this.ruleForm.account != "xiaosi" ||
            this.ruleForm.password != "123456"
          ) {
            //只是为了做登录效果，所以账号密码写的固定的。
            this.$message.error("账号或密码不正确");

            return false;
          } else {
            //真正项目中登录成功之后，就可以用路由跳转页面

            this.$router.push("container");
            this.$message({
              message: "登陆成功",
              type: "success"
            });
          }
        } else {
          this.$message.error("登录失败");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style scoped>
/* 背景 */
.login-container {
  position: absolute;
  width: 100%;
  height: 100%;
  background: url("../assets/1.png") no-repeat fixed;
  background-size: cover;
}

.tubiao img {
  width: 148px;
  height: 145px;
  float: left;
  margin: 90px;
}
.login-container .login-info {
  margin-top: 300px;
  margin-left: 550px;
}
</style> -->



<!-- 修改后代码 -->
<template>
  <div class="login-container">
    <div class="tubiao">
      <img src="../assets/tubiao.png" alt="" />
    </div>
    <div class="login-info">
      <el-row>
        <el-col :xs="24" :sm="11" :md="8" :lg="9" :xl="8">
          <el-form
            :model="loginForm"
            ref="loginForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="账号：" prop="account">
              <el-input
                v-model="loginForm.userName"
                autocomplete="off"
                placeholder="请输入账号"
                clearable
              >
              </el-input>
            </el-form-item>
            <el-form-item label="密码：" prop="password">
              <el-input
                @keyup.enter.native="login"
                type="password"
                v-model="loginForm.password"
                autocomplete="off"
                show-password
                clearable
                placeholder="请输入密码"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="login">登录</el-button>
              <el-button @click="resetForm('loginForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import { mapMutations } from "vuex";
export default {
  name: "login",
  data() {
    return {
      loginForm: {
        userName: "",
        password: ""
      },
      userToken: []
    };
  },
  methods: {
    ...mapMutations(["storeLogin"]),
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    login() {
      this.$axios
        .post("http://39.100.106.64:8080/mxc/login", {
          userName: this.loginForm.userName,
          password: this.loginForm.password
        })
        .then(res => {
          if (res.data.code == 200) {
            //成功返回200
            this.userToken = res.data.data.token;
            //拿到返回数据里的token
            this.storeLogin({ Authorization: this.userToken });
            this.$router.push("/container");
            this.$message({
              message: "登陆成功",
              type: "success"
            });
          } else {
            this.$toast(res.data.message); //提示错误信息
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>

<style scoped>
/* 背景 */
.login-container {
  position: absolute;
  width: 100%;
  height: 100%;
  background: url("../assets/1.png") no-repeat fixed;
  background-size: cover;
}

.tubiao img {
  width: 148px;
  height: 145px;
  float: left;
  margin: 90px;
}
.login-container .login-info {
  margin-top: 300px;
  margin-left: 550px;
}
</style>
