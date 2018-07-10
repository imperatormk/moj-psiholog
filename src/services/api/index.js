import doctorsApi from './doctors'
import videoChatTokensApi from './video-chat'
import accountsApi from './accounts'

export default function () {
  return {
    ...doctorsApi(),
    ...videoChatTokensApi(),
    ...accountsApi(),
  }
}