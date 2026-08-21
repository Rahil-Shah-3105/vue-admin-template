const logger = console;
import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
logger.debug('>>> Entering getDefaultState()');
  return {
    token: getToken(),
    name: '',
    avatar: ''
  }
logger.debug('<<< Exiting getDefaultState()');
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
	logger.debug(`>>> Entering login(commit=${commit},userInfo=${userInfo})`);
    const { username, password } = userInfo
	logger.debug(`<<< Exiting login(commit=${commit},userInfo=${userInfo})`);
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve()
      }).catch(error => {
		logger.error(`Exception in login(commit=${commit},userInfo=${userInfo}): (no error binding)`);
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
	logger.debug(`>>> Entering getInfo(commit=${commit},state=${state})`);
	logger.debug(`<<< Exiting getInfo(commit=${commit},state=${state})`);
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
		logger.error(`Exception in getInfo(commit=${commit},state=${state}): (no error binding)`);
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
	logger.debug(`>>> Entering logout(commit=${commit},state=${state})`);
	logger.debug(`<<< Exiting logout(commit=${commit},state=${state})`);
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
		logger.error(`Exception in logout(commit=${commit},state=${state}): (no error binding)`);
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
	logger.debug(`>>> Entering resetToken(commit=${commit})`);
	logger.debug(`<<< Exiting resetToken(commit=${commit})`);
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

