import doctorsApi from './doctors'
import videoChatTokensApi from './video-chat'
import accountsApi from './accounts'
import paymentsApi from './payments'
import sessionsApi from './sessions'
import tokensApi from './tokens'
import blogsApi from './blogs'

export default function () { // sort alphabetically
  return {
    ...doctorsApi(),
    ...videoChatTokensApi(),
    ...accountsApi(),
    ...paymentsApi(),
    ...sessionsApi(),
    ...tokensApi(),
    ...blogsApi(),
  }
}