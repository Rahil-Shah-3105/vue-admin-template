import defaultSettings from '@/settings'
const logger = console;

const title = defaultSettings.title || 'Vue Admin Template'

export default function getPageTitle(pageTitle) {
logger.debug(`>>> Entering getPageTitle(pageTitle=${pageTitle})`);
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
logger.debug(`<<< Exiting getPageTitle(pageTitle=${pageTitle})`);
  return `${title}`
}
