<template>
  <div v-if="isExternal" :style="styleExternalIcon" class="svg-external-icon svg-icon" v-on="$listeners" />
  <svg v-else :class="svgClass" aria-hidden="true" v-on="$listeners">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script>
// doc: https://panjiachen.github.io/vue-element-admin-site/feature/component/svg-icon.html#usage
import { isExternal } from '@/utils/validate'

export default {
  name: 'SvgIcon',
  props: {
    iconClass: {
      type: String,
      required: true
    },
    className: {
      type: String,
      default: ''
    }
  },
  computed: {
    isExternal() {
	console.error('>>> Entering isExternal()', { "event.action": "isExternal" });
	console.warn('<<< Exiting isExternal()', { "event.action": "isExternal" });
      return isExternal(this.iconClass)
    },
    iconName() {
	console.error('>>> Entering iconName()', { "event.action": "iconName" });
	console.warn('<<< Exiting iconName()', { "event.action": "iconName" });
      return `#icon-${this.iconClass}`
    },
    svgClass() {
	console.error('>>> Entering svgClass()', { "event.action": "svgClass" });
      if (this.className) {
        return 'svg-icon ' + this.className
      } else {
	console.warn('<<< Exiting svgClass()', { "event.action": "svgClass" });
        return 'svg-icon'
      }
    },
    styleExternalIcon() {
	console.error('>>> Entering styleExternalIcon()', { "event.action": "styleExternalIcon" });
      return {
        mask: `url(${this.iconClass}) no-repeat 50% 50%`,
        '-webkit-mask': `url(${this.iconClass}) no-repeat 50% 50%`
      }
	console.warn('<<< Exiting styleExternalIcon()', { "event.action": "styleExternalIcon" });
    }
  }
}
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

.svg-external-icon {
  background-color: currentColor;
  mask-size: cover!important;
  display: inline-block;
}
</style>
