<template>
  <div class="map-view">
    <div class="left">
      <b-map-scatter />
    </div>
    <div class="right">
      <el-card shadow="hover">
        <template v-slot:header>
          <div class="title">用户月同比增长</div>
        </template>
        <template>
          <div class="chart-wrapper">
            <liquid-fill />
          </div>
        </template>
      </el-card>
      <el-card shadow="hover">
        <template v-slot:header>
          <div class="title">热门搜索</div>
        </template>
        <template>
          <div class="chart-wrapper">
            <word-cloud />
          </div>
        </template>
      </el-card>
    </div>
  </div>
</template>

<script>
import BMapScatter from '@/components/BMapScatter'
import LiquidFill from '@/components/LiquidFill'
import WordCloud from '@/components/WordCloud'

export default {
  components: {
    BMapScatter,
    LiquidFill,
    WordCloud
  }
}
</script>

<style lang="scss" scoped>
.map-view {
  display: flex;
  margin-top: 20px;
  .left {
    flex: 0 0 80%;
    width: 80%;
    height: 600px;
  }

  .right {
    flex: 1;
    margin-left: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .title {
      height: 60px;
      line-height: 60px;
      padding-left: 20px;
      font-size: 14px;
      font-weight: 500;
      border-bottom: 1px solid #eee;
      box-sizing: border-box;
    }
    .chart-wrapper {
      width: 100%;
      height: 190px;
    }
  }
}
</style>
