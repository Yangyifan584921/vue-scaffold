<template>
  <div class="nav-bar">
    <div class="nav-header">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item v-for="breadcrumb in data.breadcrumbs" :key="breadcrumb.title">
          {{breadcrumb}}
        </el-breadcrumb-item>
      </el-breadcrumb>
      <div class="user-info">
        <img :src="require('@/assets/home_user.png')" alt="">
      </div>
    </div>
    <div class="tag-container">
      <el-tag
       v-for="tag in tabList" 
       :key="tag.title" 
       :closable="tag.title === '首页' ? false : true"
       :type="tag.type" 
       @close="closeTag(tag)" 
       @click="pushRoute(tag)"
       class="item-tag">
        {{ tag.title }}
      </el-tag>
    </div>
  </div>
</template>

<script>
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { watch, reactive, onBeforeMount, computed } from 'vue'
export default {
  setup() {
    const currentRoute = useRoute()
    const router = useRouter()
    const data = reactive({
      breadcrumbs: []
    })

    const store = useStore()
    const tabList = computed(() => {
      return store.getters.getTabList
    })

    const getBreadcrumbs = () => {
      let breadcrumbs = []
      const hasBreadcrumb = currentRoute.matched.find(item => item.meta && item.meta.breadcrumb)
      if(Object.keys(hasBreadcrumb).length) {
        breadcrumbs = hasBreadcrumb.meta.breadcrumb
      }
      console.log('breadcrumbs', breadcrumbs)
      return breadcrumbs
    }

    const pushRoute = (tag) => {
      router.push({ path: tag.fullPath })
    }

    const closeTag = (tag) => {
      let leaveTabList = tabList.value.filter(item => item.title !== tag.title)
      if(tag.type === 'success') {
        console.log('leaveTabList', leaveTabList[leaveTabList.length - 1])
        leaveTabList[leaveTabList.length - 1].type = 'success'
        leaveTabList[leaveTabList.length - 1].show = 'true'
        pushRoute(leaveTabList[leaveTabList.length - 1])
      }
      console.log('leaveTabList', leaveTabList)
      store.dispatch('saveTabList', leaveTabList)
    }

    onBeforeMount(() => {
      data.breadcrumbs = getBreadcrumbs()
    })

    watch(() => currentRoute.path, () => {
      data.breadcrumbs = getBreadcrumbs()
    })

    return {
      data,
      tabList,
      closeTag,
      pushRoute
    }
  }
}
</script>

<style lang="less" scoped>
.nav-bar {
  width: 100%;
}
.nav-header {
  padding: 0 20px;
  height: 50px;
  width: calc(100% - 40px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
  img {
    width: 40px;
    height: 40px;
    
  }
}
.tag-container {
  padding: 0 20px;
  width: calc(100% - 40px);
  height: 34px;
  display: flex;
  align-items: center;
  margin-top: 5px;
  .item-tag {
    margin-right: 10px;
    cursor: pointer;
  }
}
</style>