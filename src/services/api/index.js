import doctorsApi from './doctors'
import videoChatTokensApi from './video-chat'
import accountsApi from './accounts'
import paymentsApi from './payments'
import sessionsApi from './sessions'

export default function () {
  return {
    ...doctorsApi(),
    ...videoChatTokensApi(),
    ...accountsApi(),
    ...paymentsApi(),
    ...sessionsApi(),
  }
}