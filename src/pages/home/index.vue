<template>
  <view class="index">
    <text>{{ msg }}</text>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const msg = ref('home')
</script>
