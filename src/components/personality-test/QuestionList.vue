<template lang="pug">
  div
    .flex-row(v-if="loaded")
      .flex-1
      .flex-1
        .p10
        Question(@answerChanged="onAnswerChanged($event)" v-for="question in questions" :key="question.id" :question="question")
        .p10(v-if="!result")
          v-btn(outline @click="submitAnswers") Submit
        .p10(v-else)
          span Criteria result here...
      .flex-1
    div(v-else)
      Loading   
</template>
<script>
import Question from "./Question"
import Loading from '@/components/common/Loading'

export default {
  created() {
    this.$api.getTest().then((res) => {
      const questionList = res.questions.map((question) => {
        return {
          ...question,
          selectedAnswerIndex: null,
          triggerError: false
        }
      })

      this.questions = questionList
      this.$api.getTestResults(this.userId, this.userType)
        .then((res) => {
          if (res.id) {
            this.result = res
          }
          this.loaded = true
        })
    })
  },  
  data() {
    return {
      questions: [],
      result: null,
      loaded: false
    }
  },
  methods: {
    onAnswerChanged(newAnswerData) {
      const answeredQuestion = this.questions.find(question => question.id === newAnswerData.questionId)
      answeredQuestion.selectedAnswerIndex = newAnswerData.newAnswerIndex
      answeredQuestion.triggerError = false
    },
    submitAnswers() {
      const isComplete = this.isComplete

      if (isComplete) {
        const answersObj = this.questions.map(question => ({
          questionId: question.id,
          answerIndex: question.selectedAnswerIndex
        }))

        this.emitAndSub('submitTest', answersObj, (resp) => {
          const successMsg = 'Test submited succsesfully.'
          const failureMsg = 'Oops! Something went wrong... please try again or contact support.'

          this.$messageBus.$emit('alert', {
            message: resp.success ? successMsg : failureMsg,
            duration: 2500
          })
        })
      } else {
        this.questions
          .filter(question => question.selectedAnswerIndex === null)
          .forEach(question => question.triggerError = true)
      } 
    }
  },
  computed: {
    getCurrentPoints() {
      let points = 0
      this.questions.forEach(question => {
        if (question.selectedAnswerIndex !== null) {
          const questionPoints = question.answers[question.selectedAnswerIndex].points
          points += questionPoints
        }
      })
      return points
    },
    isComplete() {
      return !this.questions.find(question => question.selectedAnswerIndex === null)
    }
  },
  components: {
    Question,
    Loading
  }
}
</script>

