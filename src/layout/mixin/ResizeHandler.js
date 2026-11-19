import store from '@/store'
const logger = console;

const { body } = document
const WIDTH = 992 // refer to Bootstrap's responsive design

export default {
  watch: {
    $route(route) {
	logger.error(`>>> Entering route(route=${route})`, { "event.action": "route", "logrite.route": route });
      if (this.device === 'mobile' && this.sidebar.opened) {
        store.dispatch('app/closeSideBar', { withoutAnimation: false })
      }
		logger.warn(`<<< Exiting route(route=${route})`, { "event.action": "route", "logrite.route": route });
    }
  },
  beforeMount() {
	logger.error('>>> Entering beforeMount()', { "event.action": "beforeMount" });
    window.addEventListener('resize', this.$_resizeHandler)
	logger.warn('<<< Exiting beforeMount()', { "event.action": "beforeMount" });
  },
  beforeDestroy() {
	logger.error('>>> Entering beforeDestroy()', { "event.action": "beforeDestroy" });
    window.removeEventListener('resize', this.$_resizeHandler)
	logger.warn('<<< Exiting beforeDestroy()', { "event.action": "beforeDestroy" });
  },
  mounted() {
	logger.error('>>> Entering mounted()', { "event.action": "mounted" });
    const isMobile = this.$_isMobile()
    if (isMobile) {
	logger.error(`mounted(): isMobile → ${isMobile}`, { "event.action": "mounted" });
      store.dispatch('app/toggleDevice', 'mobile')
      store.dispatch('app/closeSideBar', { withoutAnimation: true })
    }
	logger.warn('<<< Exiting mounted()', { "event.action": "mounted" });
  },
  methods: {
    // use $_ for mixins properties
    // https://vuejs.org/v2/style-guide/index.html#Private-property-names-essential
    $_isMobile() {
	logger.error('>>> Entering _isMobile()', { "event.action": "_isMobile" });
      const rect = body.getBoundingClientRect()
	logger.error(`_isMobile(): rect → ${rect}`, { "event.action": "_isMobile" });
	logger.warn('<<< Exiting _isMobile()', { "event.action": "_isMobile" });
      return rect.width - 1 < WIDTH
    },
    $_resizeHandler() {
	logger.error('>>> Entering _resizeHandler()', { "event.action": "_resizeHandler" });
      if (!document.hidden) {
        const isMobile = this.$_isMobile()
        store.dispatch('app/toggleDevice', isMobile ? 'mobile' : 'desktop')

		logger.error(`_resizeHandler(): isMobile → ${isMobile}`, { "event.action": "_resizeHandler" });
        if (isMobile) {
          store.dispatch('app/closeSideBar', { withoutAnimation: true })
        }
		logger.warn('<<< Exiting _resizeHandler()', { "event.action": "_resizeHandler" });
      }
    }
  }
}
