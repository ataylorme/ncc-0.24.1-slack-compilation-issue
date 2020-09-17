import dotenv from 'dotenv'
dotenv.config()

type getSecretsType = {
  output: Promise<{
    slackToken: string
    slackChannelID: string
  }>
}

export default async function getSecrets(): getSecretsType['output'] {
  return Promise.resolve({
    slackToken: process.env.SLACK_TOKEN || 'xxxx-xxxxxxxxx-xxxx',
    slackChannelID: process.env.SLACK_CHANNEL_ID || 'C1H9RESGL',
  })
}
