import {WebClient as SlackWebClient} from '@slack/web-api'

import getSecrets from './getSecrets'

export async function main(): Promise<any> {
  const {slackToken, slackChannelID} = await getSecrets()
  const slackClient = new SlackWebClient(slackToken)
  try {
    const response = await slackClient.chat.postMessage({
      channel: slackChannelID,
      text: `Test Slack message at ${Date.now()}.`,
    })
    const slackMessageID = response.ts
    console.log(`Slack message successfully sent to ${slackChannelID}: ${slackMessageID}`)
    return Promise.resolve(slackMessageID)
  } catch (err) {
    let errorMessage = 'Error posting a message to Slack'
    if (err.message) {
      errorMessage += `: "${err.message}"`
    }
    console.log(errorMessage)
    return Promise.reject(errorMessage)
  }
}
