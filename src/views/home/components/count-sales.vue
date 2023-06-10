<template>
  <div class="count-sales">
    <div class="card">
      <div class="card__header">
        <span class="label">{{ t('home.total') }}</span>
        <span class="value">￥15920</span>
      </div>

      <div class="card__container">
        <ul class="count-sales__cop">
          <li>
            <span>{{ t('home.week') }}</span>

            <div class="fall">
              <i class="el-icon-bottom-right"></i>
              <span>-4%</span>
            </div>
          </li>

          <li>
            <span>{{ t('home.day') }}</span>

            <div class="rise">
              <i class="el-icon-top-right"></i>
              <span>+7%</span>
            </div>
          </li>
        </ul>
      </div>

      <div class="card__footer">
        <span class="label">{{ t('home.daily') }}</span>
        <span class="value">￥1298.01</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
//@ts-ignore
import { useI18n } from 'vue-i18n'
const { t } = useI18n() // 引入国际化组件动态翻译方法
</script>
<script lang="ts">
export default {
  name: 'CountSales',
}
</script>
<style lang="scss" scoped>
.count-sales {
  &__cop {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;

    li {
      display: flex;
      list-style: none;
      flex: 1;
      color: #d8d8d8;

      .fall,
      .rise {
        display: flex;
        align-items: center;
        margin-left: 10px;
      }

      .fall {
        color: #13ae7c;
      }

      .rise {
        color: #f21e37;
      }
    }
  }
}
</style>
