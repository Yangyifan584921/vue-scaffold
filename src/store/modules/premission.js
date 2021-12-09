const types = {
  SAVE_TAB_LIST: 'saveTabList'
}

const state = {
  tabList: sessionStorage.getItem('tabList') && sessionStorage.getItem('tabList').length 
          ? JSON.parse(sessionStorage.getItem('tabList')) 
          : []
}

const actions  = {
  saveTabList({ commit }, params) {
    sessionStorage.setItem('tabList', JSON.stringify(params))
    commit(types.SAVE_TAB_LIST, params)
  }
}

const mutations = {
  [types.SAVE_TAB_LIST](state, params) {
    state.tabList = params
  }
}

const getters = {
  getTabList: state => state.tabList
}

export default {
  state,
  actions,
  mutations,
  getters
}