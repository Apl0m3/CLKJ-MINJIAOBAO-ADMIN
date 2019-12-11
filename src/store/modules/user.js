export default {
  namespaced: true,
  state: {
    id: 0,
    name: '',
    remindCount: 0
  },
  mutations: {
    updateId(state, id) {
      state.id = id
    },
    updateName(state, name) {
      state.name = name
    },
    updateRemindCount(state, remindCount) {
      state.remindCount = remindCount
    }
  }
}
