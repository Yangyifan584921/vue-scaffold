<template>
  <div class="side-wrap">
    <el-scrollbar >
      <div class="item">
        <el-menu 
        :router="true"
        :unique-opened="true"
        background-color="#fff"
        :default-active="$route.path"
        menu-trigger="click">
          <div class="menu-list" v-for="route in routers" :key="route.path">
            <el-menu-item
              v-if="route.children && route.children.length < 2"
              :route="route.path"
              :index="route.path"
            >
              <template #title>
                <el-icon><takeaway-box /></el-icon>
                <span>{{route.meta.title}}</span>
              </template>
            </el-menu-item>
            <div class="has-children" v-if="route.children && !route.hidden && route.children.length > 1">
              <el-sub-menu
              :index="route.children[0].path">
              <template #title>
                <el-icon><takeaway-box /></el-icon>
                <span>{{route.meta.title}}</span>
              </template>
              <el-menu-item
                v-for="children in route.children"
                :key="children.path"
                :route="children.path"
                :index="children.path"
              >
                <template #title>{{children.meta.title}}</template>
              </el-menu-item>
              </el-sub-menu>
            </div>
          </div>
        </el-menu>
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
import router from '@/router/index.js'
import { onBeforeMount, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
export default {
  setup() {
    const routers = router.options.routes
    const store = useStore()
    const currentRoute = useRoute()

    onBeforeMount(() => {
      setTabList()
    })

    const setTabList = () => {
      const currentTabName = currentRoute.name
      const currentTabfullPath = currentRoute.fullPath
      const currentTitle = currentRoute.matched.find(item => item.name === currentTabName)
      // 当前点击的tab
      const currentTabInfo = {
        fullPath: currentTabfullPath,
        title: currentTitle.meta.title,
        show: true,
        type: 'success'
      }
      let currentTablList = store.getters.getTabList
      if(!currentTablList.length) {
        currentTablList.push(currentTabInfo)
      } else {
        for(let i = 0; i < currentTablList.length; i++) {
          if(currentTablList[i].title !== currentTitle.meta.title) {
            currentTablList[i].show = false
            currentTablList[i].type = 'info'
          } 
          if(currentTablList[i].title === currentTitle.meta.title) {
            currentTablList[i].show = true
            currentTablList[i].type = 'success'
          }
        }
        const exitTab = currentTablList.findIndex(item => item.title === currentTitle.meta.title)
        exitTab === -1 && currentTablList.push(currentTabInfo)
      }
      console.log('currentTablList', currentTablList)
      store.dispatch('saveTabList', currentTablList)
    }

    watch(() => currentRoute.path, () => {
      setTabList()
    })
    return {
      routers
    }
  }
}
</script>

<style lang="less">
.side-wrap {
  width: 15%;
  height: 100vh;
  color: #fff;
}
</style>