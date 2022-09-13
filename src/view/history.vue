<template>
  <el-card>
    <div style="font-weight:700;border-left:6px solid blue;margin-bottom:10px">
      &nbsp;历史数据
    </div>
    <div>
      <el-row :gutter="20">
        <el-col :span="24">
          <div
            class="header"
            style="box-shadow: 2px 2px 20px rgba(0, 0, 0, 0.164)"
          >
            <div class="equipment">
              <p style="font-weight:700;font-size: 18px">设备名称</p>
              <p style="font-size: 16px;padding-top: 25px;">母线测温器</p>
            </div>
            <div class="dtuSelect">
              <el-select
                v-model="value"
                placeholder="请选择始端箱"
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
            <div class="datePick">
              <p style="font-weight:700;font-size: 18px">日期选择</p>
              <div>
                <el-date-picker
                  v-model="value1"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                >
                </el-date-picker>
                <div class="btncol">
                  <el-button
                    type="primary"
                    icon="el-icon-search"
                    @click="getdata()"
                    >查询</el-button
                  >
                </div>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
      <div
        class="dataBase"
        style="box-shadow: 2px 2px 20px rgba(0, 0, 0, 0.164);overflow:auto;"
      >
        <el-table
          :data="newData"
          border
          style="width: 100%"
          :row-style="tableRowClassName"
          :header-cell-style="{
            'text-align': 'center',
            color: '#fafafa',
            backgroundColor: '#a1887f',
            'font-size': '16px'
          }"
          :cell-style="{
            'text-align': 'center',
            'font-weight': 'bold',
            'font-size': '16px',
            color: '#37474f'
          }"
        >
          <el-table-column prop="datetime" label="日期" width="180">
          </el-table-column>
          <el-table-column prop="ia" label="A相电流"> </el-table-column>
          <el-table-column prop="ib" label="B相电流"> </el-table-column>
          <el-table-column prop="ic" label="C相电流"> </el-table-column>
          <el-table-column prop="iapc" label="平均相电流"> </el-table-column>
          <el-table-column prop="inn" label="平均线电流"> </el-table-column>
          <el-table-column prop="ir" label="剩余电流"> </el-table-column>
          <el-table-column prop="pfw" label="总基波有功功率"> </el-table-column>
          <el-table-column prop="ph" label="总谐波有功功率"> </el-table-column>
          <el-table-column prop="ptp" label="三相有功功率"> </el-table-column>
          <el-table-column prop="ptp" label="三相无功功率"> </el-table-column>
          <el-table-column prop="ptp" label="三相视在功率"> </el-table-column>
          <el-table-column prop="ua" label="A相电压"> </el-table-column>
          <el-table-column prop="ub" label="C相电压"> </el-table-column>
          <el-table-column prop="uc" label="C相电压"> </el-table-column>
          <el-table-column prop="ualv" label="平均线电压"> </el-table-column>
          <el-table-column prop="uapv" label="平均相电压"> </el-table-column>
          <el-table-column prop="tem1" label="第一路温度"> </el-table-column>
          <el-table-column prop="tem2" label="第二路温度"> </el-table-column>
          <el-table-column prop="uab" label="线电压Uab"> </el-table-column>
          <el-table-column prop="ubc" label="线电压Ubc"> </el-table-column>
          <el-table-column prop="uca" label="线电压Uca"> </el-table-column>
          <el-table-column prop="upen" label="A相电流"> </el-table-column>
          <el-table-column prop="f" label="频率"> </el-table-column>
          <el-table-column prop="pfs" label="总功率因数"> </el-table-column>
          <el-table-column prop="tem3" label="第三路温度"> </el-table-column>
          <el-table-column prop="tem4" label="第四路温度"> </el-table-column>
          <el-table-column prop="temCh" label="机箱温度"> </el-table-column>
          <el-table-column prop="thdiA" label="A相电流总畸变率">
          </el-table-column>
          <el-table-column prop="thdiB" label="B相电流总畸变率">
          </el-table-column>
          <el-table-column prop="thdiC" label="C相电流总畸变率">
          </el-table-column>
          <el-table-column prop="thduA" label="A相电压总畸变率">
          </el-table-column>
          <el-table-column prop="thduB" label="B相电压总畸变率">
          </el-table-column>
          <el-table-column prop="thduC" label="C相电压总畸变率">
          </el-table-column>
        </el-table>
        <!-- <el-row :gutter="20">
          <div>
            <el-col :span="4">
              <el-card>
                <el-table
                  :data="newData"
                  border
                  style="width: 100%"
                  :row-style="tableRowClassName"
                  :header-cell-style="{
                    color: '#fafafa',
                    backgroundColor: '#a1887f',
                    'font-size': '16px'
                  }"
                  :cell-style="{
                    'text-align': 'center',
                    'font-weight': 'bold',
                    'font-size': '16px',
                    color: '#37474f'
                  }"
                >
                  <el-table-column prop="datetime" label="日期" align="center">
                  </el-table-column>
                </el-table> </el-card
            ></el-col>
          </div>
          <div>
            <el-col :span="4">
              <el-card>
                <el-table
                  :data="newData"
                  border
                  style="width: 100%"
                  :row-style="tableRowClassName"
                  :header-cell-style="{
                    color: '#fafafa',
                    backgroundColor: '#2196f3',
                    'font-size': '16px'
                  }"
                  :cell-style="{
                    'text-align': 'center',
                    'font-weight': 'bold',
                    'font-size': '16px',
                    color: '#37474f'
                  }"
                >
                  <el-table-column
                    prop="stp"
                    label="三相视在功率"
                    align="center"
                  >
                  </el-table-column>
                </el-table> </el-card
            ></el-col>
          </div>
          <div>
            <el-col :span="4">
              <el-card>
                <el-table
                  :data="newData"
                  border
                  style="width: 100%"
                  :row-style="tableRowClassName"
                  :header-cell-style="{
                    color: '#fafafa',
                    backgroundColor: '#29b6f6',
                    'font-size': '16px'
                  }"
                  :cell-style="{
                    'text-align': 'center',
                    'font-weight': 'bold',
                    'font-size': '16px',
                    color: '#37474f'
                  }"
                >
                  <el-table-column
                    prop="qtp"
                    label="三相无功功率"
                    align="center"
                  >
                  </el-table-column>
                </el-table> </el-card
            ></el-col>
          </div>
          <div>
            <el-col :span="4">
              <el-card>
                <el-table
                  :data="newData"
                  border
                  style="width: 100%"
                  :row-style="tableRowClassName"
                  :header-cell-style="{
                    color: '#fafafa',
                    backgroundColor: '#0277bd',
                    'font-size': '16px'
                  }"
                  :cell-style="{
                    'text-align': 'center',
                    'font-weight': 'bold',
                    'font-size': '16px',
                    color: '#37474f'
                  }"
                >
                  <el-table-column
                    prop="ptp"
                    label="三相有功功率"
                    align="center"
                  >
                  </el-table-column>
                </el-table> </el-card
            ></el-col>
          </div>
          <div>
            <el-col :span="4">
              <el-card>
                <el-table
                  :data="newData"
                  border
                  style="width: 100%"
                  :row-style="tableRowClassName"
                  :header-cell-style="{
                    color: '#fafafa',
                    backgroundColor: '#26c6da',
                    'font-size': '16px'
                  }"
                  :cell-style="{
                    'text-align': 'center',
                    'font-weight': 'bold',
                    'font-size': '16px',
                    color: '#37474f'
                  }"
                >
                  <el-table-column
                    prop="ph"
                    label="总谐波有功功率"
                    align="center"
                  >
                  </el-table-column>
                </el-table> </el-card
            ></el-col>
          </div>
          <div>
            <el-col :span="4">
              <el-card>
                <el-table
                  :data="newData"
                  border
                  style="width: 100%"
                  :row-style="tableRowClassName"
                  :header-cell-style="{
                    color: '#fafafa',
                    backgroundColor: '#00838f',
                    'font-size': '16px'
                  }"
                  :cell-style="{
                    'text-align': 'center',
                    'font-weight': 'bold',
                    'font-size': '16px',
                    color: '#37474f'
                  }"
                >
                  <el-table-column prop="pfw" label="总功率因数" align="center">
                  </el-table-column>
                </el-table> </el-card
            ></el-col>
          </div>
        </el-row> -->
      </div>
    </div>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      options: [],
      item: {},
      value: "DTU1",
      value1: "",
      defaultStart: "",
      defaultEnd: "",
      same_week: [], //保存当前最新的时间
      same_day: "", //当天的时间
      totalDate: [],
      newData: [],
      nodeId: []
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

    for (let i = 0; i < this.same_week.length; i++) {
      this.totalDate.push(this.same_week[i].name);
    }
    this.defaultStart = this.totalDate[6];
    this.defaultEnd = this.totalDate[0];
  },
  mounted() {
    this.defaultDraw();
  },
  methods: {
    nodeSelect() {
      this.$axios
        .post("http://39.100.106.64:8080/mxc/queryMaxDtu")
        .then(response => {
          for (var i = 1; i <= response.data.length; i++) {
            this.options.push({
              index: i,
              label: "DTU" + i
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    select(label) {
      this.item = this.options.find(item => {
        return item.label === label;
      });

      this.nodeId = this.item.index;
      console.log("当前选择DTU:" + this.nodeId);
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 == 1) {
        let styleJson = {
          "background-color": "#e0e0e0"
        };
        return styleJson;
      } else {
        return "";
      }
    },
    getdata() {
      let time = this.value1;
      let startime = this.moment(time[0]).format("YYYY-MM-DD");
      let endtime = this.moment(time[1]).format("YYYY-MM-DD");
      // console.log(startime);
      // console.log(endtime);
      this.$axios
        .post(
          "http://39.100.106.64:8080/mxc/queryHisData?dtuId=" +
            this.item.index +
            "&start=" +
            startime +
            "&end=" +
            endtime
        )
        .then(response => {
          if (response.data.length) {
            this.newData = response.data;
            this.$message.success("查询成功");
          } else {
            this.$message.warning("抱歉，暂无数据");
          }
        })
        .catch(error => {
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
    defaultDraw() {
      this.$axios
        .post(
          "http://39.100.106.64:8080/mxc/queryHisData?dtuId=1&start=" +
            this.defaultStart +
            "&end=" +
            this.defaultEnd
        )
        .then(response => {
          if (response.data.length) {
            this.newData = response.data;
            this.$message.success("查询成功,当前显示为始端箱最近七天数据");
          } else {
            this.$message.warning("抱歉，暂无数据");
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>

<style lang="less" scoped>
.header {
  margin-top: 5px;
  position: relative;
  height: 160px;
  width: 100%;

  background-color: #f5f5f5;
  .equipment {
    line-height: 40px;
    top: 20px;
    left: 40px;
    position: absolute;
  }
  .dtuSelect {
    position: absolute;
    top: 84px;
    left: 350px;
    // right: 10px;
  }
  .datePick {
    width: 450px;
    top: 30px;
    right: 200px;
    position: absolute;
    p {
      padding: 10px 30px 20px 140px;
    }
    div {
      display: flex;
      justify-content: space-between;
    }
  }
}
.dataBase {
  margin-top: 20px;
  height: 500px;
}
</style>