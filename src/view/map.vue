<template>
  <div>
    <div style="font-weight: 700;font-size: 18px;" class="vLine">
      &nbsp;母线槽所在位置
    </div>
    <baidu-map
      class="mapp"
      :center="map.center"
      :zoom="map.zoom"
      @ready="handler"
      style="box-shadow: 2px 2px 20px rgba(0, 0, 0, 0.164)"
    >
      <!--缩放-->
      <bm-navigation anchor="BMAP_ANCHOR_TOP_LEFT"></bm-navigation>
      <!--定位-->
      <bm-geolocation
        anchor="BMAP_ANCHOR_BOTTOM_RIGHT"
        :showAddressBar="true"
        :autoLocation="true"
      ></bm-geolocation>
      <!--点-->
      <bm-marker
        :position="map.center"
        :dragging="map.dragging"
        animation="BMAP_ANIMATION_DROP"
      >
      </bm-marker>
    </baidu-map>
  </div>
</template>

<script>
export default {
  data: () => ({
    map: {
      center: { lat: 32.267147, lng: 119.827561 },
      zoom: 15,
      show: true,
      dragging: true
    }
  }),
  methods: {
    handler({ BMap, map }) {
      let me = this;
      // console.log(BMap, map);
      // 鼠标缩放
      map.enableScrollWheelZoom(true);
      // 点击事件获取经纬度
      map.addEventListener("click", function(e) {
        console.log(e.point.lng, e.point.lat);
      });
    }
  }
};
</script>

<style scoped>
.mapp {
  width: 100%;
  height: 380px;
}
.vLine {
  border-left: 5px solid #304ffe;
}
</style>
