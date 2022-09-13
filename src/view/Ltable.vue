<template>
  <div class="ltable">
    <div style="font-weight: 800;font-size:18px;" class="vLine">
      &nbsp;各节点温度
    </div>
    <el-table
      :row-style="tableRowClassName"
      :header-cell-style="{
        borderColor: '#90caf9',
        'text-align': 'center',
        'font-size': '16px',
        color: '#304ffe',
        backgroundColor: '#f5f5f5'
      }"
      :cell-style="{
        borderColor: '#90caf9',
        'text-align': 'center',
        color: 'black',
        'font-weight': 'bold'
      }"
      :data="LittleDates"
      height="380"
      border
      style="box-shadow: 2px 2px 20px rgba(0, 0, 0, 0.164);"
    >
      <el-table-column label="ID" prop="node_id">
        <template slot-scope="scope">
          <div
            :style="{
              fontWeight: 'bold'
            }"
          >
            <!-- {{
              scope.row.node_id > 8 ? scope.row.node_id - 1 : scope.row.node_id
            }} -->
            {{ scope.row.node_id }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="A相温度" prop="tem_A">
        <template slot-scope="scope">
          <div
            :style="{
              width: '100%',
              height: '100%',
              color: getColorA(scope),
              fontWeight: 'bold'
            }"
          >
            {{ scope.row.tem_A }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="B相温度" prop="tem_B">
        <template slot-scope="scope">
          <div
            :style="{
              color: getColorB(scope),
              fontWeight: 'bold'
            }"
          >
            {{ scope.row.tem_B }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="C相温度" prop="tem_C">
        <template slot-scope="scope">
          <div
            :style="{
              color: getColorC(scope),
              fontWeight: 'bold'
            }"
          >
            {{ scope.row.tem_C }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="零线温度" prop="tem_N">
        <template slot-scope="scope">
          <div
            :style="{
              color: getColorN(scope),
              fontWeight: 'bold'
            }"
          >
            {{ scope.row.tem_N }}
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "demo",
  data() {
    return {
      LittleDates: [
        // {
        //   node_id: "1",
        //   tem_A: "75",
        //   tem_B: "28.6",
        //   tem_C: "26.1",
        //   tem_N: "55"
        // },
        // {
        //   node_id: "2",
        //   tem_A: "26.2",
        //   tem_B: "65",
        //   tem_C: "26.2",
        //   tem_N: "26.5"
        // },
        // {
        //   node_id: "2",
        //   tem_A: "26.2",
        //   tem_B: "65",
        //   tem_C: "26.2",
        //   tem_N: "26.5"
        // },
        // {
        //   node_id: "2",
        //   tem_A: "26.2",
        //   tem_B: "65",
        //   tem_C: "130",
        //   tem_N: "26.5"
        // },
        // {
        //   node_id: "2",
        //   tem_A: "26.2",
        //   tem_B: "65",
        //   tem_C: "100",
        //   tem_N: "26.5"
        // }
      ]
    };
  },
  mounted() {
    this.getdata();
    setInterval(() => {
      this.getdata();
    }, 30000);
  },
  methods: {
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
      this.$axios
        .get("http://39.100.106.64:8080/mxc/queryNode?dtuId=1")
        .then(response => {
          this.LittleDates = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    getColorA(scope) {
      if ((scope.row.tem_A >= 50) & (scope.row.tem_A <= 70)) {
        return "orange";
      } else if ((scope.row.tem_A > 70) & (scope.row.tem_A < 150)) {
        return "red";
      } else {
        return "";
      }
    },
    getColorB(scope) {
      if ((scope.row.tem_B >= 50) & (scope.row.tem_B <= 70)) {
        return "orange";
      } else if ((scope.row.tem_B > 70) & (scope.row.tem_B < 150)) {
        return "red";
      } else {
        return "";
      }
    },
    getColorC(scope) {
      if ((scope.row.tem_C >= 50) & (scope.row.tem_C <= 70)) {
        return "orange";
      } else if ((scope.row.tem_C > 70) & (scope.row.tem_C < 150)) {
        return "red";
      } else {
        return "";
      }
    },
    getColorN(scope) {
      if ((scope.row.tem_N >= 50) & (scope.row.tem_N <= 70)) {
        return "orange";
      } else if ((scope.row.tem_N > 70) & (scope.row.tem_N < 150)) {
        return "red";
      } else {
        return "";
      }
    }
  }
};
</script>

<style scoped>
.vLine {
  border-left: 5px solid #304ffe;
}
.el-table {
  border: 1px solid #90caf9;
}
.even-row {
  background-color: red;
}
</style>
