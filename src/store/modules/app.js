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
	logger.error(`>>> Entering toggleSideBar(commit=${commit})`, { "event.action": "toggleSideBar", "logrite.commit": commit });
    commit('TOGGLE_SIDEBAR')
	logger.warn(`<<< Exiting toggleSideBar(commit=${commit})`, { "event.action": "toggleSideBar", "logrite.commit": commit });
  },
  closeSideBar({ commit }, { withoutAnimation }) {
	logger.error(`>>> Entering closeSideBar(commit=${commit},withoutAnimation=${withoutAnimation})`, { "event.action": "closeSideBar", "logrite.commit": commit, "logrite.withoutAnimation": withoutAnimation });
    commit('CLOSE_SIDEBAR', withoutAnimation)
	logger.warn(`<<< Exiting closeSideBar(commit=${commit},withoutAnimation=${withoutAnimation})`, { "event.action": "closeSideBar", "logrite.commit": commit, "logrite.withoutAnimation": withoutAnimation });
  },
  toggleDevice({ commit }, device) {
	logger.error(`>>> Entering toggleDevice(commit=${commit},device=${device})`, { "event.action": "toggleDevice", "logrite.commit": commit, "logrite.device": device });
    commit('TOGGLE_DEVICE', device)
	logger.warn(`<<< Exiting toggleDevice(commit=${commit},device=${device})`, { "event.action": "toggleDevice", "logrite.commit": commit, "logrite.device": device });
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
