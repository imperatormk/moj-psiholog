<template lang="pug">
  div
    Question(v-for="question in questions" :key="question.id" :question="question")
    p Current overall points: {{ getCurrentPoints }}
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
    }
  }
}
</script>

