import { createStore  } from 'vuex'
import premission from './modules/premission'

const store = createStore({
  modules: {
    premission
  }
})

export default store