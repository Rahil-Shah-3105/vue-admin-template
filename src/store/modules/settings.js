import defaultSettings from '@/settings'
const logger = console;

const { showSettings, fixedHeader, sidebarLogo } = defaultSettings

const state = {
  showSettings: showSettings,
  fixedHeader: fixedHeader,
  sidebarLogo: sidebarLogo
}

const mutations = {
  CHANGE_SETTING: (state, { key, value }) => {
    // eslint-disable-next-line no-prototype-builtins
    if (state.hasOwnProperty(key)) {
      state[key] = value
    }
  }
}

const actions = {
  changeSetting({ commit }, data) {
	logger.debug(`>>> Entering changeSetting(commit=${commit},data=${data})`);
    commit('CHANGE_SETTING', data)
	logger.debug(`<<< Exiting changeSetting(commit=${commit},data=${data})`);
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

