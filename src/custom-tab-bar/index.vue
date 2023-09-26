<template>
  <view :class="['tab-bar', visible ? '' : 'hidden']">
    <view
      v-for="(item, index) in tabList"
      :key="index"
      class="tab-bar-item"
      :class="{ reddot: item.isRedDot }"
      @tap="toPage(index, item.pagePath)"
    >
      <image :src="selected === index ? item.selectedIconPath : item.iconPath" class="item-icon" />
      <view :style="{ color: selected === index ? selectedColor : color }" class="item-text">{{ item.text }}</view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { switchTab } from '@tarojs/taro'
import { useTabbarStore } from '@/store'

const tabbarStore = useTabbarStore()

const visible = computed(() => tabbarStore.tabVisible)
const tabList = computed(() => tabbarStore.tabList)
const selected = computed(() => tabbarStore.activeTab)
const color = '#B4B5B7'
const selectedColor = '#FB750D'

const toPage = (index, url) => {
  if (index === 1) {
    wx.showToast({
      title: '正在开发中，敬请等待',
      icon: 'none',
    })
    return
  }
  setSelected(index)
  switchTab({ url })
}

const setSelected = (index) => {
  tabbarStore.setActiveTab(index)
}
</script>

<style lang="less">
.tab-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  box-shadow: 0 0 36px var(--color-black-3);
  display: flex;
  align-items: flex-end;
  padding-top: 13px;
  padding-bottom: var(--safe-area-inset-bottom);
  transition: transform 0.3s ease, opacity 0.3s ease;
  &.hidden {
    transform: translate3d(0, 100%, 0);
    transition: transform 0.3s ease, opacity 0.3s ease;
    opacity: 0;
  }
}

.tab-bar-item {
  flex: 1;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  &.reddot {
    position: relative;
    &::after {
      content: '';
      position: absolute;
      top: 2px;
      right: calc(50% - 14px);
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: #ff4a3b;
      box-shadow: 0px 1px 2px 0px rgba(255, 74, 59, 0.2);
      z-index: 9;
    }
  }
}

.tab-bar-item .item-icon {
  width: 47px;
  height: 47px;
  margin-bottom: 12.7px;
}

.tab-bar-item .item-text {
  font-family: PingFang SC;
  font-size: 21.74px;
  font-weight: normal;
  text-align: center;
  letter-spacing: 0em;
}
</style>
