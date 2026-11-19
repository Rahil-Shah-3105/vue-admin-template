<template>
  <component :is="type" v-bind="linkProps(to)">
    <slot />
  </component>
</template>

<script>
import { isExternal } from '@/utils/validate'

export default {
  props: {
    to: {
      type: String,
      required: true
    }
  },
  computed: {
    isExternal() {
	console.error('>>> Entering isExternal()', { "event.action": "isExternal" });
	console.warn('<<< Exiting isExternal()', { "event.action": "isExternal" });
      return isExternal(this.to)
    },
    type() {
	console.error('>>> Entering type()', { "event.action": "type" });
      if (this.isExternal) {
        return 'a'
      }
	console.warn('<<< Exiting type()', { "event.action": "type" });
      return 'router-link'
    }
  },
  methods: {
    linkProps(to) {
	console.error(`>>> Entering linkProps(to=${to})`, { "event.action": "linkProps", "logrite.to": to });
      if (this.isExternal) {
        return {
          href: to,
          target: '_blank',
          rel: 'noopener'
        }
      }
      return {
        to: to
      }
	console.warn(`<<< Exiting linkProps(to=${to})`, { "event.action": "linkProps", "logrite.to": to });
    }
  }
}
</script>
