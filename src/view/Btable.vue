<template>
  <div>
    <div style="font-weight: 800;font-size: 18px;" class="vLine">
      &nbsp;始端箱变量
    </div>
    <div style="box-shadow: 2px 2px 20px rgba(0, 0, 0, 0.164)">
      <div :class="{ firstpage: isfirstpage }">
        <el-table
          :data="Bdata"
          stripe
          border
          style="border:1px solid #b0bec5"
          :cell-style="{
            borderColor: '#b0bec5',
            'font-weight': 'bold',
            'font-size': '14px',
            color: 'black'
          }"
          :header-cell-style="{
            borderColor: '#b0bec5',
            color: '#263238',
            'font-size': '16px',
            backgroundColor: '#f5f5f5'
          }"
        >
          <el-table-column
            v-for="(col, idx) in Bigcols1"
            :prop="col.data"
            :label="col.label"
            :key="idx"
            align="center"
          >
          </el-table-column>
        </el-table>

        <el-table
          style="border:1px solid #b0bec5"
          :data="Bdata"
          stripe
          border
          :cell-style="{
            borderColor: '#b0bec5',
            'font-size': '14px',
            color: 'black',
            'font-weight': 'bold'
          }"
          :header-cell-style="{
            borderColor: '#b0bec5',
            color: '#263238',
            'font-size': '16px',

            backgroundColor: '#f5f5f5'
          }"
        >
          <el-table-column
            v-for="(col, idx) in Bigcols2"
            :prop="col.data"
            :label="col.label"
            :key="idx"
            align="center"
          >
          </el-table-column>
        </el-table>
        <el-table
          style="border:1px solid #b0bec5"
          :data="Bdata"
          stripe
          border
          :cell-style="{
            borderColor: '#b0bec5',
            'font-size': '14px',
            color: 'black',
            'font-weight': 'bold'
          }"
          :header-cell-style="{
            borderColor: '#b0bec5',
            color: '#263238',
            'font-size': '16px',

            backgroundColor: '#f5f5f5'
          }"
        >
          <el-table-column
            v-for="(col, idx) in Bigcols3"
            :prop="col.data"
            :label="col.label"
            :key="idx"
            align="center"
          >
          </el-table-column>
        </el-table>

        <!-- 这是新添加表格 -->
        <el-table
          style="border:1px solid #b0bec5"
          :data="Bdata"
          stripe
          border
          :cell-style="{
            borderColor: '#b0bec5',
            'font-size': '14px',
            color: 'black',
            'font-weight': 'bold'
          }"
          :header-cell-style="{
            borderColor: '#b0bec5',
            color: '#263238',
            'font-size': '16px',

            backgroundColor: '#f5f5f5'
          }"
        >
          <el-table-column
            v-for="(col, idx) in Bigcols4"
            :prop="col.data"
            :label="col.label"
            :key="idx"
            align="center"
          >
          </el-table-column>
        </el-table>
      </div>

      <div :class="{ nextpage: isnextpage }"></div>
      <!-- <el-pagination
        style="text-align: center"
        background
        layout=" prev, pager, next"
        :total="20"
        @current-change="current_change"
      >
      </el-pagination> -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentchange: 1,
      isfirstpage: false,
      isnextpage: true,

      Bdata: [],
      BigData: [
        {
          A相电压: "43",
          B相电压: "24",
          C相电压: "12",
          平均相电压: "15",
          AB线电压: "11",
          BC线电压: "2",
          CA线电压: "13",
          平均线电压: "12",

          A相电流: "11",
          B相电流: "22",
          C相电流: "13",
          平均相电流: "15",
          三相有功功率: "12",
          三相无功功率: "14",
          三相视在功率: "52",
          总功率因数: "12",

          剩余电流IR: "15",
          零地电压: "24",
          环境湿度: "86",
          环境温度: "86",
          温度1: "86",
          温度2: "86",
          温度3: "86",
          温度4: "86",
          频率: "22",
          总基波有功功率: "32",
          总谐波有功功率: "12"
        }
      ],
      Bigcols1: [
        { data: "ia", label: "A相电流" },
        { data: "ib", label: "B相电流" },
        { data: "ic", label: "c相电流" },
        { data: "iapc", label: "平均相电流" },
        { data: "inn", label: "平均线电流" },
        { data: "ir", label: "剩余电流" },
        { data: "pfw", label: "总基波有功功率" },
        { data: "ph", label: "总谐波有功功率" }
      ],
      Bigcols2: [
        { data: "ptp", label: "三相有功功率" },
        { data: "ptp", label: "三相无功功率" },
        { data: "ptp", label: "三相视在功率" },
        { data: "ua", label: "A相电压" },
        { data: "ub", label: "B相电压" },
        { data: "uc", label: "C相电压" },

        { data: "ualv", label: "平均线电压" },
        { data: "uapv", label: "平均相电压" },

        { data: "tem1", label: "第一路温度" },
        { data: "tem2", label: "第二路温度" }
      ],
      Bigcols3: [
        { data: "uab", label: "线电压Uab" },
        { data: "ubc", label: "线电压Ubc" },
        { data: "uca", label: "线电压Uca" },
        { data: "upen", label: "A相电流" },
        { data: "f", label: "频率" },
        { data: "dataId", label: "设备编号" },
        { data: "pfs", label: "总功率因数" },
        { data: "tem3", label: "第三路温度" },
        { data: "tem4", label: "第四路温度" },
        { data: "temCh", label: "机箱温度" }
      ],
      Bigcols4: [
        { data: "thdiA", label: "A相电流总畸变率" },
        { data: "thdiB", label: "B相电流总畸变率" },
        { data: "thdiC", label: "C相电流总畸变率" },
        { data: "thduA", label: "A相电压总畸变率" },
        { data: "thduB", label: "B相电压总畸变率" },
        { data: "thduC", label: "C相电压总畸变率" }
      ]
    };
  },
  mounted() {
    this.getdatas();
    setInterval(() => {
      this.getdatas();
    }, 30000);
  },
  methods: {
    current_change(currentchange) {
      console.log(currentchange);
      this.isfirstpage = !this.isfirstpage;
      this.isnextpage = !this.isnextpage;
    },
    getdatas() {
      this.$axios
        .post("http://39.100.106.64:8080/mxc/queryData?dtuId=1")
        .then(response => {
          let that = this;
          that.Bdata = response.data;
        
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>

<style scoped>
.firstpage {
  display: none;
}
.nextpage {
  display: none;
}
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
.vLine {
  border-left: 5px solid #304ffe;
}
</style>
