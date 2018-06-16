import doctorsApi from './doctors'

export default function () {
  return {
    ...doctorsApi(),
  }
}