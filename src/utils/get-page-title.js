import defaultSettings from '@/settings'
const logger = console;

const title = defaultSettings.title || 'Vue Admin Template'

export default function getPageTitle(pageTitle) {
logger.error(`>>> Entering getPageTitle(pageTitle=${pageTitle})`, { "event.action": "getPageTitle", "logrite.pageTitle": pageTitle });
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
logger.warn(`<<< Exiting getPageTitle(pageTitle=${pageTitle})`, { "event.action": "getPageTitle", "logrite.pageTitle": pageTitle });
  return `${title}`
}
