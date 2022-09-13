<template>
  <div>
    <baidu-map
      class="map"
      :center="{ lng: 119.827561, lat: 32.267147 }"
      :zoom="5"
      :scroll-wheel-zoom="true"
      style="transform:scale(0.99)"
    >
      <bm-marker
        v-for="(item, index) of center"
        :key="index"
        :position="{ lng: item.lng, lat: item.lat }"
        :dragging="false"
        @click="lookDetail(item)"
      >
        <bm-info-window
          :position="{ lng: infoWindow.lng, lat: infoWindow.lat }"
          :show="item.showFlag"
          @close="infoWindowClose(item)"
          @open="infoWindowOpen(item)"
        >
          <p>公司名称:{{ item.name }}</p>
          <p>联系人:{{ item.contactName }}</p>
          <p>联系电话:{{ item.mobile }}</p></bm-info-window
        >
      </bm-marker>
    </baidu-map>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // center: { lat: "", lng: "" },
      center: [],
      latitude: [],
      longitude: [],
      infoWindow: {}
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.$axios
        .get("http://39.100.106.64:8080/mxc/queryDtuLocation")
        .then(response => {
          console.log(response);
          for (let i = 0; i < response.data.length; i++) {
            let arr = {
              lat: response.data[i].latitude,
              lng: response.data[i].longitude,
              name: response.data[i].location,
              contactName: response.data[i].contactName,
              mobile: response.data[i].mobile,
              showFlag: false
            };
            this.center.push(arr);
          }
          // console.log(this.center);
        })
        .catch(error => {
          console.log(error);
        });
    },
    lookDetail(item) {
      item.showFlag = true;
      this.infoWindow = item;
    },
    infoWindowClose(item) {
      item.showFlag = false;
    },
    infoWindowOpen(item) {
      item.showFlag = true;
    }
  }
};
</script>

<style>
.map {
  width: 1350px;
  height: 800px;
}
</style>
