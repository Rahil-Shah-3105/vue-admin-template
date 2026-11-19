<template>
  <div :class="classObj" class="app-wrapper">
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
    <sidebar class="sidebar-container" />
    <div class="main-container">
      <div :class="{'fixed-header':fixedHeader}">
        <navbar />
      </div>
      <app-main />
    </div>
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain } from './components'
import ResizeMixin from './mixin/ResizeHandler'

export default {
  name: 'Layout',
  components: {
    Navbar,
    Sidebar,
    AppMain
  },
  mixins: [ResizeMixin],
  computed: {
    sidebar() {
	console.error('>>> Entering sidebar()', { "event.action": "sidebar" });
	console.warn('<<< Exiting sidebar()', { "event.action": "sidebar" });
      return this.$store.state.app.sidebar
    },
    device() {
	console.error('>>> Entering device()', { "event.action": "device" });
	console.warn('<<< Exiting device()', { "event.action": "device" });
      return this.$store.state.app.device
    },
    fixedHeader() {
	console.error('>>> Entering fixedHeader()', { "event.action": "fixedHeader" });
	console.warn('<<< Exiting fixedHeader()', { "event.action": "fixedHeader" });
      return this.$store.state.settings.fixedHeader
    },
    classObj() {
	console.error('>>> Entering classObj()', { "event.action": "classObj" });
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
	console.warn('<<< Exiting classObj()', { "event.action": "classObj" });
    }
  },
  methods: {
    handleClickOutside() {
	console.error('>>> Entering handleClickOutside()', { "event.action": "handleClickOutside" });
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
	console.warn('<<< Exiting handleClickOutside()', { "event.action": "handleClickOutside" });
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/styles/mixin.scss";
  @import "~@/styles/variables.scss";

  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
    &.mobile.openSidebar{
      position: fixed;
      top: 0;
    }
  }
  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }

  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100% - #{$sideBarWidth});
    transition: width 0.28s;
  }

  .hideSidebar .fixed-header {
    width: calc(100% - 54px)
  }

  .mobile .fixed-header {
    width: 100%;
  }
</style>
