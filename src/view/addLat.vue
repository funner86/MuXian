<template>
  <div>
    <p>添加经纬度界面</p>
    <div>
      <p>
        公司名称：<input
          type="text"
          name="company"
          id=""
          v-model="message.company"
          required
        />
      </p>
      <p>
        Dtu编号:<input
          type="number"
          name="dtu"
          id=""
          v-model="message.dtu"
          required
        />
      </p>
      <p>
        联系人:<input
          type="text"
          name="person"
          id=""
          v-model="message.person"
          required
        />
      </p>
      <p>
        电话:<input
          type="number"
          name="call"
          id=""
          v-model="message.call"
          required
        />
      </p>
      <p>
        经度:<input
          type="number"
          name="jd"
          id=""
          v-model="$store.state.message.lng"
          required
        />
      </p>
      <p>
        纬度:<input
          type="number"
          name="wd"
          id=""
          v-model="$store.state.message.lat"
          required
        />
      </p>
      <button @click="submitMessage">提交信息</button>
      <p>公司名称: {{ this.message.company }}</p>
      <p>Dtu编号: {{ this.message.dtu }}</p>
      <p>联系人:{{ this.message.person }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: { company: "", dtu: "", person: "", call: "", jd: "", wd: "" },
    };
  },
  methods: {
    submitMessage() {
      this.$axios
        .post("http://39.100.106.64:8080/mxc/addDtuLocation", {
          contactName: this.message.person,
          dtuId: this.message.dtu,
          latitude: this.$store.state.message.lat,
          location: this.message.company,
          longitude: this.$store.state.message.lng,
          mobile: this.message.call,
        })
        .then((res) => {
          console.log(res);
          alert(res.data.msg);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style></style>