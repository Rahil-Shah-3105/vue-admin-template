import Cookies from 'js-cookie'
const logger = console;

const state = {
  sidebar: {
    opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
    withoutAnimation: false
  },
  device: 'desktop'
}

const mutations = {
  TOGGLE_SIDEBAR: state => {
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false
    if (state.sidebar.opened) {
      Cookies.set('sidebarStatus', 1)
    } else {
      Cookies.set('sidebarStatus', 0)
    }
  },
  CLOSE_SIDEBAR: (state, withoutAnimation) => {
    Cookies.set('sidebarStatus', 0)
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
  },
  TOGGLE_DEVICE: (state, device) => {
    state.device = device
  }
}

const actions = {
  toggleSideBar({ commit }) {
	logger.debug(`>>> Entering toggleSideBar(commit=${commit})`);
    commit('TOGGLE_SIDEBAR')
	logger.debug(`<<< Exiting toggleSideBar(commit=${commit})`);
  },
  closeSideBar({ commit }, { withoutAnimation }) {
	logger.debug(`>>> Entering closeSideBar(commit=${commit},withoutAnimation=${withoutAnimation})`);
    commit('CLOSE_SIDEBAR', withoutAnimation)
	logger.debug(`<<< Exiting closeSideBar(commit=${commit},withoutAnimation=${withoutAnimation})`);
  },
  toggleDevice({ commit }, device) {
	logger.debug(`>>> Entering toggleDevice(commit=${commit},device=${device})`);
    commit('TOGGLE_DEVICE', device)
	logger.debug(`<<< Exiting toggleDevice(commit=${commit},device=${device})`);
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
