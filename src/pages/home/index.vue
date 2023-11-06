<template>
  <view class="index">
    <text>{{ msg }}</text>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
// 写一个点击事件

const msg = ref('home')
</script>
