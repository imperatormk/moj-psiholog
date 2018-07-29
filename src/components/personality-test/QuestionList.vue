<template lang="pug">
  div
    .flex-row(v-if="loaded")
      .flex-1
      .flex-1
        .p10
        .p10.flex-col.text-left(v-if="result")
          span.fs16 Points: {{ result.points }}
          span.fs16 Your result: {{ result.result }}
        Question(@answerChanged="onAnswerChanged($event)" v-for="question in questions" :key="question.id" :question="question")
        .p10(v-if="!result")
          v-btn(outline @click="submitAnswers") Submit
      .flex-1
    div(v-else)
      Loading   
</template>
<script>
import Question from "./Question"
import Loading from '@/components/common/Loading'

export default {
  created() {
    this.initTest()
  },  
  data() {
    return {
      questions: [],
      result: null,
      loaded: false
    }
  },
  methods: {
    initTest() {
      this.loaded = false
      this.$api.getTest().then((testRes) => {
        let questionList = []

        this.getTestResults()
          .then((resultRes) => {
            if (resultRes.id) {
              const resultData = resultRes.data
              this.result = resultData.criteriaResult

              const answers = resultData.answers
              questionList = testRes.map((question) => {
                return {
                  ...question,
                  selectedAnswerIndex: answers.find(answer => answer.questionId === question.id).answerIndex,
                }
              })
            } else {
              questionList = testRes.map((question) => {
                return {
                  ...question,
                  selectedAnswerIndex: null,
                  triggerError: false
                }
              })
            }

            this.questions = questionList
            this.loaded = true
          })
      })
    },
    getTestResults() { // hah whatever
      return Promise.resolve(this.testResults)
    },
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
          const successMsg = 'Test submitted succsesfully.'
          const failureMsg = 'Oops! Something went wrong... please try again or contact support.'

          if (resp.success) { // ugh maybe take this outta here
            this.$api.getTestResults(this.userId, this.userType)
              .then(res => {
                if (res.id) {
                  this.$store.dispatch('saveTestResults', res)
                    .then(() => this.initTest())
                }
              })
          }

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

