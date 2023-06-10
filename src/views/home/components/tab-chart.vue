<template>
  <div class="tab-chart">
    <div class="tab-chart__header">
      <ul class="tab-chart__tab">
        <li class="active">{{ t('home.sales') }}</li>
        <li>{{ t('home.number') }}</li>
      </ul>

      <span class="tab-chart__year">2023</span>
    </div>

    <div class="tab-chart__container">
      <v-chart :option="chartOption" autoresize />
    </div>
  </div>
</template>

<script lang="ts" setup>
//@ts-ignore
import { reactive } from 'vue'
//@ts-ignore
import VChart from 'vue-echarts'
//@ts-ignore
import { useI18n } from 'vue-i18n'
const { t } = useI18n() // 引入国际化组件动态翻译方法

const barWidth = 15

const chartOption = reactive<any>({
  grid: {
    top: '20px',
    bottom: '30px',
    right: '10px',
    containLabel: true,
  },
  xAxis: {
    type: 'category',
    data: [],
    offset: 5,
    axisLine: {
      show: false,
    },
    axisTick: {
      show: false,
    },
  },
  yAxis: {
    type: 'value',
    offset: 20,
    splitLine: {
      show: false,
    },
    axisTick: {
      show: false,
    },
    axisLine: {
      show: false,
    },
  },
  tooltip: {
    trigger: 'axis',
    formatter: (comp: any) => {
      const [serie] = comp

      return `${serie.seriesName}：${serie.value}`
    },
    axisPointer: {
      show: true,
      status: 'shadow',
      z: -1,
      shadowStyle: {
        color: '#E6F7FF',
      },
      type: 'shadow',
    },
    extraCssText: 'width:120px; white-space:pre-wrap',
  },
  series: [
    {
      barWidth,
      name: '付款笔数',
      type: 'bar',
      data: [],
      itemStyle: {
        color: '#4165d7',
      },
    },
    {
      type: 'bar',
      barWidth,
      xAxisIndex: 0,
      barGap: '-100%',
      data: [],
      itemStyle: {
        color: '#f1f1f9',
      },
      zlevel: -1,
    },
  ],
})

chartOption.xAxis.data = new Array(12).fill(1).map((_e, i) => i + 1 + '月')
chartOption.series[0].data = new Array(12)
  .fill(1)
  .map(() => parseInt(String(Math.random() * 100)))
chartOption.series[1].data = new Array(12).fill(100)
</script>
<script lang="ts">
export default {
  name: 'TabChart',
}
</script>
<style lang="scss" scoped>
.tab-chart {
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 50px;
    padding: 0 20px;

    ul {
      li {
        list-style: none;
        float: left;
        margin-right: 20px;
        font-size: 15px;

        cursor: pointer;

        &.active {
          font-weight: bold;
        }
      }
    }
  }

  &__year {
    font-size: 14px;
    position: relative;

    &::before {
      display: block;
      content: '';
      height: 8px;
      width: 8px;
      border-radius: 8px;
      background-color: #000;
      position: absolute;
      left: -15px;
      top: 4px;
    }
  }

  &__container {
    height: 300px;
    padding: 0 15px;

    .echarts {
      height: 100%;
      width: 100%;
    }
  }
}
</style>
