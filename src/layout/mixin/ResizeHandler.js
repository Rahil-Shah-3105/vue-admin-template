import store from '@/store'
const logger = console;

const { body } = document
const WIDTH = 992 // refer to Bootstrap's responsive design

export default {
  watch: {
    $route(route) {
	logger.debug(`>>> Entering route(route=${route})`);
      if (this.device === 'mobile' && this.sidebar.opened) {
        store.dispatch('app/closeSideBar', { withoutAnimation: false })
      }
		logger.debug(`<<< Exiting route(route=${route})`);
    }
  },
  beforeMount() {
	logger.debug('>>> Entering beforeMount()');
    window.addEventListener('resize', this.$_resizeHandler)
	logger.debug('<<< Exiting beforeMount()');
  },
  beforeDestroy() {
	logger.debug('>>> Entering beforeDestroy()');
    window.removeEventListener('resize', this.$_resizeHandler)
	logger.debug('<<< Exiting beforeDestroy()');
  },
  mounted() {
	logger.debug('>>> Entering mounted()');
    const isMobile = this.$_isMobile()
    if (isMobile) {
	logger.debug(`mounted(): isMobile → ${isMobile}`);
      store.dispatch('app/toggleDevice', 'mobile')
      store.dispatch('app/closeSideBar', { withoutAnimation: true })
    }
	logger.debug('<<< Exiting mounted()');
  },
  methods: {
    // use $_ for mixins properties
    // https://vuejs.org/v2/style-guide/index.html#Private-property-names-essential
    $_isMobile() {
	logger.debug('>>> Entering _isMobile()');
      const rect = body.getBoundingClientRect()
	logger.debug(`_isMobile(): rect → ${rect}`);
      return rect.width - 1 < WIDTH
    },
    $_resizeHandler() {
	logger.debug('<<< Exiting _isMobile()');
      if (!document.hidden) {
        const isMobile = this.$_isMobile()
        store.dispatch('app/toggleDevice', isMobile ? 'mobile' : 'desktop')

		logger.debug(`_resizeHandler(): isMobile → ${isMobile}`);
        if (isMobile) {
          store.dispatch('app/closeSideBar', { withoutAnimation: true })
        }
		logger.debug('<<< Exiting _resizeHandler()');
      }
    }
  }
}
