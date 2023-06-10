<template>
  <div class="hot-search">
    <div class="hot-search__header">
      <span>{{ t('home.seek') }}</span>
    </div>

    <div class="hot-search__container">
      <el-row class="hot-search__chart" :gutter="20">
        <el-col :md="12" :xs="24">
          <div class="block">
            <div class="count">
              <div class="number">
                <span>{{ t('home.searchUsers') }}</span>
                <span>1242</span>
              </div>
              <div class="rise">
                <i class="el-icon-top-right"></i>
                <span>+7%</span>
              </div>
            </div>

            <v-chart :option="chartOption" autoresize />
          </div>
        </el-col>

        <el-col :md="12" :xs="24">
          <div class="block is-last">
            <div class="count">
              <div class="number">
                <span>{{ t('home.followers') }}</span>
                <span>365</span>
              </div>
              <div class="rise">
                <i class="el-icon-top-right"></i>
                <span>+2%</span>
              </div>
            </div>

            <v-chart :option="chartOption" autoresize />
          </div>
        </el-col>
      </el-row>
      <div class="hot-search__table">
        <cl-crud ref="Crud" padding="0">
          <cl-row>
            <el-table :data="tableData">
              <el-table-column
                :label="t('home.rankNumber')"
                prop="index"
              ></el-table-column>
              <el-table-column
                :label="t('home.keyword')"
                prop="keyWord"
              ></el-table-column>
              <el-table-column
                :label="t('home.userNumber')"
                prop="users"
              ></el-table-column>
              <el-table-column
                :label="t('home.weeklyGrowth')"
                sortable
                prop="ud"
              ></el-table-column>
            </el-table>
          </cl-row>
        </cl-crud>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
//@ts-ignore
import { reactive } from 'vue'
//@ts-ignore
import * as echarts from 'echarts'
//@ts-ignore
import VChart from 'vue-echarts'
//@ts-ignore
import { useI18n } from 'vue-i18n'
const { t } = useI18n() // 引入国际化组件动态翻译方法

const tableData = [
  {
    index: 1,
    keyWord: '无线耳机',
    users: 983,
    ud: 5,
  },
  {
    index: 1,
    keyWord: '运动耳机',
    users: 763,
    ud: -3,
  },
  {
    index: 1,
    keyWord: '蓝牙音箱',
    users: 328,
    ud: 7,
  },
  {
    index: 1,
    keyWord: '4k显示屏',
    users: 144,
    ud: 4,
  },
  {
    index: 1,
    keyWord: '罗技 G530',
    users: 121,
    ud: -1,
  },
]

const chartOption = reactive({
  grid: {
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  },
  xAxis: {
    type: 'category',
    data: [
      '00:00',
      '2:00',
      '4:00',
      '6:00',
      '8:00',
      '10:00',
      '12:00',
      '14:00',
      '16:00',
      '18:00',
      '20:00',
      '22:00',
    ],
    boundaryGap: false,
  },
  yAxis: {
    type: 'value',
    splitLine: {
      show: false,
    },
    axisTick: {
      show: false,
    },
    axisLine: {
      show: false,
    },
    axisLabel: {
      show: false,
    },
  },
  series: [
    {
      name: '总访问量',
      type: 'line',
      smooth: true,
      showSymbol: false,
      symbol: 'circle',
      symbolSize: 6,
      data: [
        '1200',
        '1400',
        '1008',
        '1411',
        '1026',
        '1288',
        '1300',
        '800',
        '1100',
        '1000',
        '1118',
        '1322',
      ],
      areaStyle: {
        color: new echarts.graphic.LinearGradient(
          0,
          0,
          0,
          1,
          [
            {
              offset: 0,
              color: '#D1E5FF',
            },
            {
              offset: 1,
              color: '#FFFFFF',
            },
          ],
          false,
        ),
      },
      itemStyle: {
        color: '#4165d7',
      },
      lineStyle: {
        width: 2,
      },
    },
  ],
})
</script>
<script lang="ts">
export default {
  name: 'HotSearch',
}
</script>
<style lang="scss" scoped>
.hot-search {
  &__header {
    display: flex;
    align-items: center;
    height: 50px;
    font-size: 15px;
    font-weight: bold;
    padding: 0 20px;
  }

  &__container {
    padding-bottom: 10px;
  }

  &__chart {
    padding: 0 20px;

    .block {
      margin: 10px 0;

      .count {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 10px;
        height: 40px;

        .fall,
        .rise {
          display: flex;
          align-items: center;
          margin-left: 10px;
          font-size: 15px;
        }

        .fall {
          color: #13ae7c;
        }

        .rise {
          color: #f21e37;
        }

        .number {
          display: flex;
          align-items: center;

          span {
            font-size: 13px;

            &:last-child {
              margin-left: 10px;
              font-size: 15px;
              font-weight: bold;
            }
          }
        }
      }

      .echarts {
        height: 50px;
        width: 100%;
      }
    }
  }

  &__table {
    padding: 10px;
    margin: 0 10px;
    border-radius: 5px;
    background-color: var(--el-bg-color);
  }
}
</style>
