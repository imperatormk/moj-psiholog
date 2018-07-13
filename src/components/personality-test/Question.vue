<template lang="pug">
  div.tiny-border
    h3 {{ question.title }}
    v-radio-group(:value="question.selectedAnswerIndex" @change="question.selectedAnswerIndex = $event")
      v-radio(v-for="(answer, index) in question.answers" :label="answer.title" :value="index" :key="index") 
    p(v-if="question.selectedAnswerIndex !== null") Selected answer points is {{ getSelectedQuestion.points }}

    

</template>
<script>
export default {
  props: {
    question: Object
  },
  data() {
    return {
      // selectedAnswerIndex: null
    }
  },
  computed: {
    getSelectedQuestion() {
      return this.question.selectedAnswerIndex !== null ? this.question.answers[this.question.selectedAnswerIndex] : null
    }
  }
}
</script>
