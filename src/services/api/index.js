import doctorsApi from './doctors'
import videoChatTokensApi from './video-chat'

export default function () {
  return {
    ...doctorsApi(),
  	...videoChatTokensApi(),
  }
}