<template>
  <div
    id="chartline"
    style="margin: 30px auto 0; width: 100%; height: 80vh"
  ></div>
</template>

<script>
import echarts from "echarts";
export default {
  created() {
    this.getData();
  },
  data() {
    return {
      chartline: null,
      xdata: [],
      adata: [],
      bdata: [],
      cdata: [],
      ndata: []
    };
  },
  methods: {
    drawShape() {
      this.chartline = echarts.init(document.getElementById("chartline"));
      this.chartline.setOption({
        title: {
          text: `节点温度`,
          x: 90
        },
        tooltip: {
          show: true, // 是否显示
          trigger: "axis" // 触发类型，默认数据触发，见下图，可选为：'item' | 'axis'
        },
        legend: {
          data: ["A相温度", "B相温度", "C相温度", "零线温度"] //图例
        },

        xAxis: {
          name: "节点",
          type: "category",
          boundaryGap: false,
          data: this.xdata
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "A相温度",
            type: "line",
            data: this.adata
          },
          {
            name: "B相温度",
            type: "line",
            data: this.bdata
          },
          {
            name: "C相温度",
            type: "line",
            data: this.cdata
          },
          {
            name: "零线温度",
            type: "line",
            data: this.ndata
          }
        ]
      });
    },
    getData() {
      this.$axios
        .get("http://39.100.106.64:8080/mxc/queryNode?dtuId=1")
        .then(response => {
          for (let i = 0; i < response.data.length; i++) {
            this.xdata.push(response.data[i].node_id);
            this.adata.push(response.data[i].tem_A);
            this.bdata.push(response.data[i].tem_B);
            this.cdata.push(response.data[i].tem_C);
            this.ndata.push(response.data[i].tem_N);
          }
          this.drawShape();
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>

<style></style>
