const logger = console;
export default {
  computed: {
    device() {
	logger.error('>>> Entering device()', { "event.action": "device" });
	logger.warn('<<< Exiting device()', { "event.action": "device" });
      return this.$store.state.app.device
    }
  },
  mounted() {
	logger.error('>>> Entering mounted()', { "event.action": "mounted" });
    // In order to fix the click on menu on the ios device will trigger the mouseleave bug
    // https://github.com/PanJiaChen/vue-element-admin/issues/1135
    this.fixBugIniOS()
	logger.warn('<<< Exiting mounted()', { "event.action": "mounted" });
  },
  methods: {
    fixBugIniOS() {
	logger.error('>>> Entering fixBugIniOS()', { "event.action": "fixBugIniOS" });
      const $subMenu = this.$refs.subMenu
      if ($subMenu) {
        const handleMouseleave = $subMenu.handleMouseleave
        $subMenu.handleMouseleave = (e) => {
          if (this.device === 'mobile') {
            return
          }
          handleMouseleave(e)
        }
		logger.warn('<<< Exiting fixBugIniOS()', { "event.action": "fixBugIniOS" });
      }
    }
  }
}
