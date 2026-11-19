const logger = console;
import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
logger.error('>>> Entering getDefaultState()', { "event.action": "getDefaultState" });
  return {
    token: getToken(),
    name: '',
    avatar: ''
  }
logger.warn('<<< Exiting getDefaultState()', { "event.action": "getDefaultState" });
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
	logger.error(`>>> Entering login(commit=${commit},userInfo=${userInfo})`, { "event.action": "login", "logrite.commit": commit, "logrite.userInfo": userInfo });
    const { username, password } = userInfo
	logger.warn(`<<< Exiting login(commit=${commit},userInfo=${userInfo})`, { "event.action": "login", "logrite.commit": commit, "logrite.userInfo": userInfo });
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve()
      }).catch(error => {
		logger.error(`Exception in login(commit=${commit},userInfo=${userInfo}): (no error binding)`, { "event.action": "login", "event.category": "process", "logrite.commit": commit, "logrite.userInfo": userInfo });
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
	logger.error(`>>> Entering getInfo(commit=${commit},state=${state})`, { "event.action": "getInfo", "logrite.commit": commit, "logrite.state": state });
	logger.warn(`<<< Exiting getInfo(commit=${commit},state=${state})`, { "event.action": "getInfo", "logrite.commit": commit, "logrite.state": state });
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response

        if (!data) {
          return reject('Verification failed, please Login again.')
        }

        const { name, avatar } = data

        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        resolve(data)
      }).catch(error => {
		logger.error(`Exception in getInfo(commit=${commit},state=${state}): (no error binding)`, { "event.action": "getInfo", "event.category": "process", "logrite.commit": commit, "logrite.state": state });
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
	logger.error(`>>> Entering logout(commit=${commit},state=${state})`, { "event.action": "logout", "logrite.commit": commit, "logrite.state": state });
	logger.warn(`<<< Exiting logout(commit=${commit},state=${state})`, { "event.action": "logout", "logrite.commit": commit, "logrite.state": state });
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
		logger.error(`Exception in logout(commit=${commit},state=${state}): (no error binding)`, { "event.action": "logout", "event.category": "process", "logrite.commit": commit, "logrite.state": state });
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
	logger.error(`>>> Entering resetToken(commit=${commit})`, { "event.action": "resetToken", "logrite.commit": commit });
	logger.warn(`<<< Exiting resetToken(commit=${commit})`, { "event.action": "resetToken", "logrite.commit": commit });
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

