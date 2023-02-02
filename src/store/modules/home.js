import mockRequest from '@/utils/mockRequest.js'
const actions = {
  async getData({ commit }) {
    const result = await mockRequest('/home/list')
    if (result.code == 20000) {
      commit('SAVEDATA', result.data)
    }
  }
}
const mutations = {
  SAVEDATA(state, mockData) {
    state.mockData = mockData
  }
}
const getters = {}
const state = {
  mockData: {}
}

export default {
  actions,
  mutations,
  getters,
  state
}
