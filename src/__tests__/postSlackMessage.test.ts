import nock from 'nock'

import {main as uncompiledMain} from '../index'
/* eslint-disable */
// @ts-ignore
import {main as compiledMain} from '../../dist/index'
/* eslint-enable */

import getSecrets from '../getSecrets'

let slackChannelID = 'G039VWPUVFC'

const slackMessageID = '1503435956.000247'

// const errorMessage = 'Attempt to inherit from WebClient methods without inheriting from WebClient'

beforeAll(async () => {
  const secrets = await getSecrets()
  slackChannelID = secrets.slackChannelID
})

describe('Posts a Slack message', () => {
  it(`Successfully sends a Slack message from the source code`, async () => {
    const slackResponse = {
      ok: true,
      channel: slackChannelID,
      ts: slackMessageID,
    }
    // Slack sends requests over port 443
    const scope = nock('https://slack.com:443')
      // You must match the POST body https://github.com/nock/nock#specifying-request-body
      // Match all requests with a matching Slack channel
      .post('/api/chat.postMessage', (body) => body.channel === slackChannelID)
      .reply(200, slackResponse)

    await expect(uncompiledMain()).resolves.toEqual(slackMessageID)

    scope.done()
  })

  it(`Successfully sends a Slack message from the NCC compiled code`, async () => {
    const slackResponse = {
      ok: true,
      channel: slackChannelID,
      ts: slackMessageID,
    }
    // Slack sends requests over port 443
    const scope = nock('https://slack.com:443')
      // You must match the POST body https://github.com/nock/nock#specifying-request-body
      // Match all requests with a matching Slack channel
      .post('/api/chat.postMessage', (body) => body.channel === slackChannelID)
      .reply(200, slackResponse)

    await expect(compiledMain()).resolves.toEqual(slackMessageID)
    // await expect(compiledMain()).rejects.toThrow(errorMessage)

    scope.done()
  })
})
