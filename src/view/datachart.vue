<template>
  <div class="box">
    <el-card style="transform:scale(0.998)">
      <div class="header">
        <p
          class="nodeTem"
          style="border-left:6px solid blue;margin-bottom:10px"
        >
          &nbsp;节点温度
        </p>
       
        <div class="datePick">
          <div class="nodeSelect">
            <el-select
              v-model="valuename"
              value-key=""
              placeholder="选择节点"
              clearable
              filterable
              @change="select"
              @click.native.once="nodeSelect()"
            >
              <el-option
                v-for="item in options"
                :key="item.label"
                :label="item.label"
                :value="item.label"
              >
              </el-option>
            </el-select>
          </div>
          <div class="dateSelect">
            <el-date-picker
              v-model="value1"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            >
            </el-date-picker>
          </div>
          <div class="enquiry">
            <el-button type="primary" icon="el-icon-search" @click="getData()"
              >查询</el-button
            >
          </div>
        </div>
      </div>
      <div
        class="mainBody"
        id="chartline"
        style="margin: 30px auto 0; width: 100%; height: 75vh"
      ></div>
    </el-card></div
></template>
<script>
import echarts from "echarts";
export default {
  name: "datachart",
  data() {
    return {
      defaultStart: "",
      defaultEnd: "",
      same_week: [], //保存当前最新的时间
      same_day: "", //当天的时间
      totalDate: [],
      nodeId: ["01"],
      totalNode: [],
      nodePoint: [],
      value1: "",
      chartline: null,
      options: [],
      valuename: "节点1",
      item: {},
      nodearr: [
        [100, 50, 90, 10, 49, 24, 53, 35],
        [90, 60, 80, 35, 70, 63, 23, 46],
        [80, 70, 100, 41, 80, 34, 53, 24],
      ],
      nodearr2: [142, 564, 165, 4156, 8654, 864, 864],

      xdata: [], //横轴日期坐标
      adata: [],
      bdata: [],
      cdata: [],
      ddata: [],
    };
  },
  created() {
    this.totalDate = [];
    let data = [];
    for (let i = 6; i >= 0; i--) {
      data.push(this.getDay(-i)); // 前
      // data.push(this.getDay(+i)); // 后
    }
    let date = data.reverse(); //得出一周的日期进行排序
    let pkc = []; /* 用于存储展示的日期数据 */

    date.forEach((item, index) => {
      //循坏日期

      let str1 = item.split("-");
      let y = str1[0];
      let m = str1[1].length > 1 ? str1[1] : "0" + str1[1];
      let d = str1[2].length > 1 ? str1[2] : "0" + str1[2];
      let strs = y + "-" + m + "-" + d;

      let s = {}; //用于存储每个日期对象

      s.name = strs;

      pkc.push(s);
    });

    this.same_week = pkc;

    this.same_day = pkc[0].date; //今天的数据
    // console.log(this.same_week);
    for (let i = 0; i < this.same_week.length; i++) {
      this.totalDate.push(this.same_week[i].name);
    }
    this.defaultStart = this.totalDate[6];
    this.defaultEnd = this.totalDate[0];
  },
  mounted() {
    this.defaultDrawShape(this.xdata);
  },
  methods: {
    nodeSelect() {
      this.$axios
        .post("http://39.100.106.64:8080/mxc/queryMaxNode")
        .then((response) => {
          // this.totalNode = response.data[0].nodeId;
          // for (var i = 1; i <= this.totalNode; i++) {
          //   this.options.push({
          //     index: i,
          //     label: "节点" + i
          //   });
          // }
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    select(label) {
      //判断当前选择的是哪一个选项
      this.item = this.options.find((item) => {
        return item.label === label;
      });
      this.nodePoint = this.item.index;
      this.nodeId =
        this.item.index >= 10 ? this.item.index : "0" + this.item.index;
      console.log("当前选择是节点：" + this.nodeId);
    },
    selectvalue() {
      // this.valuename = this.$refs.select.value;
      this.drawShape(this.valuename);
    },
    drawShape() {
      this.chartline = echarts.init(document.getElementById("chartline"));
      this.chartline.setOption({
        title: {
          text: `节点${this.nodeId}温度`,
          x: 90,
        },
        tooltip: {
          show: true, // 是否显示
          trigger: "axis", // 触发类型，默认数据触发，见下图，可选为：'item' | 'axis'
        },
        legend: {
          data: ["温度A", "温度B", "温度C", "温度D"], //图例
        },

        xAxis: {
          name: "日期",
          type: "category",
          boundaryGap: false,
          data: this.xdata,
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "温度A",
            type: "line",
            data: this.adata,
          },
          {
            name: "温度B",
            type: "line",
            data: this.bdata,
          },
          {
            name: "温度C",
            type: "line",
            data: this.cdata,
          },
          {
            name: "温度D",
            type: "line",
            data: this.ddata,
          },
        ],
      });
    },
    defaultDrawShape() {
      this.xdata = this.totalDate.reverse();
      this.$axios
        .post(
          "http://39.100.106.64:8080/mxc/queryHisNode?dtuId=1&nodeId=1&start=" +
            this.defaultStart +
            "&end=" +
            this.defaultEnd
        )
        .then((response) => {
          // console.log(response.data);
          for (var i = 0; i < response.data.length; i++) {
            this.adata.push(response.data[i].tem_A);
            this.bdata.push(response.data[i].tem_B);
            this.cdata.push(response.data[i].tem_C);
            this.ddata.push(response.data[i].tem_N);
          }
          if (response.data.length) {
            this.$message.success("查询成功,当前显示节点1最近七天数据");
            this.drawShape();
          } else {
            return this.$message.warning("抱歉，暂无数据");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getData() {
      var moment = require("moment");
      let time = this.value1;
      let startime = this.moment(time[0]).format("YYYY-MM-DD").trim();
      let endtime = this.moment(time[1]).format("YYYY-MM-DD").trim();
      const startDate = moment(startime);
      const endDate = moment(endtime);
      const allYearMonth = []; // 接收所有年份和月份的数组
      while (endDate + 1 > startDate) {
        allYearMonth.push(startDate.format("YYYY-MM-DD"));
        startDate.add(1, "day");
      }
      // console.log("所有年份和月份------>", allYearMonth);
      this.xdata = [];
      this.adata = [];
      this.bdata = [];
      this.cdata = [];
      this.ddata = [];
      for (var i = 0; i < allYearMonth.length; i++) {
        this.xdata.push(allYearMonth[i]);
      }
      this.$axios
        .post(
          "http://39.100.106.64:8080/mxc/queryHisNode?dtuId=1&" +
            "nodeId=" +
            this.nodeId +
            "&start=" +
            startime +
            "&end=" +
            endtime
        )
        .then((response) => {
          for (var i = 0; i < response.data.length; i++) {
            this.adata.push(response.data[i].tem_A);
            this.bdata.push(response.data[i].tem_B);
            this.cdata.push(response.data[i].tem_C);
            this.ddata.push(response.data[i].tem_N);
          }
          // console.log(response.data);
          if (response.data.length) {
            this.$message.success("查询成功");
            this.drawShape();
          } else {
            return this.$message.warning("抱歉，暂无数据");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getDay(day) {
      let today = new Date();
      let targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day;
      today.setTime(targetday_milliseconds); //注意，这行是关键代码
      let tYear = today.getFullYear();
      let tMonth = today.getMonth();
      let tDate = today.getDate();
      tMonth = this.doHandleMonth(tMonth + 1);
      tDate = this.doHandleMonth(tDate);
      return tYear + "-" + tMonth + "-" + tDate;
    },
    doHandleMonth(month) {
      let m = month;
      if (month.toString().length == 1) {
        m = month;
      }
      return m;
    },
  },
};
</script>

<style lang="less" scoped>
.header {
  width: 100%;
  height: 80px;
  border-bottom: 2px solid #9e9e9e;
  position: relative;
  .nodeTem {
    position: absolute;
    left: 100px;
    top: 20px;
    color: #212121;
    font-weight: 700;
    font-size: 18px;
  }
  .datePick {
    position: absolute;
    height: 50px;
    top: 11px;
    right: 100px;
    display: flex;
    justify-content: space-around;
    .nodeSelect,
    .dateSelect {
      padding-right: 10px;
    }
  }
}
</style>
