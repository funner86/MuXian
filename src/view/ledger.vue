<template>
  <div class="map-wrapper">
    <input type="text" v-model="mapSearchConfig.keyword" />
    <baidu-map
      v-bind="mapConfig"
      v-on="bindMapEvent"
      :center="{ lng: 119.827561, lat: 32.267147 }"
    >
      <bm-local-search v-bind="mapSearchConfig"></bm-local-search>
      <bm-marker
        v-for="(item, index) of center"
        :key="index"
        :position="{ lng: item.lng, lat: item.lat }"
        :dragging="false"
        @click="lookDetail(item)"
        :title="item.name"
        :icon="{
          // url: 'http://developer.baidu.com/map/jsdemo/img/fox.gif',
         // url: require('.././assets/location.png'),
          // size: { width: 300, height: 157 }
          size: { width: 30, height: 30 }
        }"
      >
        <bm-info-window
          :position="{ lng: infoWindow.lng, lat: infoWindow.lat }"
          :show="item.showFlag"
          @close="infoWindowClose(item)"
          @open="infoWindowOpen(item)"
        >
          <p>公司名称:{{ item.name }}</p>
          <p>联系人:{{ item.contactName }}</p>
          <p>联系电话:{{ item.mobile }}</p>
          <p>DTU编号:{{ item.dtuId }}</p></bm-info-window
        >
      </bm-marker>
    </baidu-map>
    <div class="map-info">
      <div class="map-address">{{ markerPo.address }}</div>
      <div class="lng-lat" v-if="markerPo.lng">
        <div>经度：{{ markerPo.lng.toFixed(5) }}</div>
        <div>纬度：{{ markerPo.lat.toFixed(5) }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  name: "TheMap",
  data() {
    return {
      center: [],
      latitude: [],
      longitude: [],
      infoWindow: {},
      map: undefined, // map 实例
      mapConfig: {
        // center: { lng: 117.14807, lat: 39.06706 }, // 初始位置
        zoom: 5, // 缩放等级
        scrollWheelZoom: true, // 允许滚轮缩放地图
        style: "height:600px; width:1350px;",
      },
      /* v-on="{ }" 使用对象语法时不支持任何修饰器 */
      bindMapEvent: {
        rightclick: this.getClickInfo,
        ready: this.onBMapReady,
      },
      mapSearchConfig: {
        keyword: "",
        location: "天津理工", // 搜索范围
        panel: false, // 是否展开自带搜索结果面板
        autoViewport: true, // 搜索后自动跳转视角
      },
      markerPo: {
        address: "请于地图上右击鼠标选择具体位置获取经纬度！",
      },
      marker: null, // 标记点
    };
  },
  created() {
    this.getData();
  },
  props: {
    value: { type: String, default: "" }, // 获取后端数据中已存在的点位信息
  },
  watch: {
    value() {
      this.initData();
    },
  },
  methods: {
    ...mapMutations(["sendLat"]),
    initData() {
      if (!this.map || !this.value) {
        return;
      }
      const arr = this.value.split(",");
      if (arr.length === 3) {
        const [address, lng, lat] = arr;
        this.mapConfig.center = { lng, lat };
        this.markerPo = { address, lng, lat };

        this.addMarker(this.markerPo);
      }
    },
    onBMapReady({ map }) {
      this.map = map;
      this.initData();
    },
    getClickInfo(e) {
      // 反编码通过点击经纬度获取地名地址
      let geoCoder = new BMap.Geocoder();
      geoCoder.getLocation(e.point, (res) => {
        const { address, business, point } = res;
        this.markerPo = {
          address: `${address} ${business ? `(${business})` : ""}`,
          ...point,
        };
        console.log(this.markerPo);
        this.sendLat({ message: this.markerPo });
        this.addMarker(this.markerPo);
      });
    },
    addMarker(data) {
      // 移除地图上所有点
      this.marker && this.map.removeOverlay(this.marker);
      this.marker = new BMap.Marker(data); // 创建标注
      this.map.addOverlay(this.marker); // 将标注添加到地图中
    },
    getData() {
      this.$axios
        .get("http://39.100.106.64:8080/mxc/queryDtuLocation")
        .then((response) => {
          console.log(response);
          for (let i = 0; i < response.data.length; i++) {
            let arr = {
              lat: response.data[i].latitude,
              lng: response.data[i].longitude,
              name: response.data[i].location,
              contactName: response.data[i].contactName,
              mobile: response.data[i].mobile,
              showFlag: false,
              dtuId: response.data[i].dtuId,
            };
            this.center.push(arr);
          }
          // console.log(this.center);
        })
        .catch((error) => {
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
    },
  },
};
</script>
<style></style>
