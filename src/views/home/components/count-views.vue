<template>
  <div class="count-views">
    <div class="card">
      <div class="card__header">
        <span class="label">{{ t('home.totalVisits') }}</span>
        <span class="value">8846</span>
      </div>

      <div class="card__container">
        <v-chart :option="chartOption" autoresize />
      </div>

      <div class="card__footer">
        <span class="label">{{ t('home.dayVisits') }}</span>
        <span class="value">1351</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
//@ts-ignore
import * as echarts from 'echarts'
//@ts-ignore
import { reactive } from 'vue'
//@ts-ignore
import VChart from 'vue-echarts'
//@ts-ignore
import { useI18n } from 'vue-i18n'
const { t } = useI18n() // 引入国际化组件动态翻译方法

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
  name: 'CountViews',
}
</script>
<style lang="scss" scoped>
.count-views {
  .card {
    .echarts {
      height: 50px;
      width: 100%;
    }

    &__container {
      padding: 0;
    }

    &__footer {
      border-top: 0;
    }
  }
}
</style>
