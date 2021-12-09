<template>
  <div class="app-wrapper">
    <Sidebar class="sidebar-container"/>
    <div class="main-container">
      <Navbar/>
      <AppMain/>
    </div>
  </div>
</template>

<script>
import AppMain from '@/layout/components/AppMain'
import Navbar from '@/layout/components/Navbar'
import Sidebar from '@/layout/components/Sidebar'
export default {
  name: 'Layout',
  components: {
    AppMain,
    Navbar,
    Sidebar
  }
}
</script>

<style lang="less">
.app-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
}
.main-container {
  width: 100%;
}
</style>