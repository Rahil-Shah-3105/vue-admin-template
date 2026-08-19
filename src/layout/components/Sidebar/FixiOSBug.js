const logger = console;
export default {
  computed: {
    device() {
	logger.debug('>>> Entering device()');
	logger.debug('<<< Exiting device()');
      return this.$store.state.app.device
    }
  },
  mounted() {
	logger.debug('>>> Entering mounted()');
    // In order to fix the click on menu on the ios device will trigger the mouseleave bug
    // https://github.com/PanJiaChen/vue-element-admin/issues/1135
    this.fixBugIniOS()
	logger.debug('<<< Exiting mounted()');
  },
  methods: {
    fixBugIniOS() {
	logger.debug('>>> Entering fixBugIniOS()');
      const $subMenu = this.$refs.subMenu
      if ($subMenu) {
        const handleMouseleave = $subMenu.handleMouseleave
        $subMenu.handleMouseleave = (e) => {
          if (this.device === 'mobile') {
            return
          }
          handleMouseleave(e)
        }
		logger.debug('<<< Exiting fixBugIniOS()');
      }
    }
  }
}
