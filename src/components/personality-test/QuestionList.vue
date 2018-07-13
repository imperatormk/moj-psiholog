<template lang="pug">
  .flex-row
    .flex-1
    .flex-1
      .p10
        .fs25 Personality test
      Question(@answerChanged="onAnswerChanged($event)" v-for="question in questions" :key="question.id" :question="question")
      .p10
        v-btn(outline @click="submitAnswers") Submit
    .flex-1
</template>
<script>
import Question from "./Question"
export default {
  components: {
    Question
  },  
  data() {
    return {
      questions: [{
        id: 1,
        title: 'How are you',
        selectedAnswerIndex: null,
        triggerError: false,
        answers: [{
          title: 'fine',
          points: 3
        }, {
          title: 'not good',
          points: 1
        }, {
          title: 'great',
          points: 5
        }]
      }, {
        id: 2,
        title: 'How are you tomorrow',
        selectedAnswerIndex: null,
        triggerError: false,
        answers: [{
          title: 'fine',
          points: 3
        }, {
          title: 'not good',
          points: 1
        }, {
          title: 'great',
          points: 5
        }]
      }]
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
        console.log(answersObj)
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
  }
}
</script>

