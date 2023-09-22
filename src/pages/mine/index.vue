<template>
  <view class="index">
    <text>{{ msg }}</text>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import './index.less'

const msg = ref('mine')
</script>
