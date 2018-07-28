<template lang="pug">
  .p20.tiny-border.text-left
    .fs20 {{ question.title }}
    v-radio-group(:value="selectedAnswerIndex" @change="onChange($event)")
      v-radio(v-for="(answer, index) in question.answers" :label="answer.title" :value="index" :key="index") 
    span(v-if="question.triggerError" style="color:red") Please answer this question
</template>
<script>
export default {
  props: {
    question: Object
  },
  data() {
    return {
      selectedAnswerIndex: null
    }
  },
  methods: {
    onChange(selectedIndex) {
      this.$emit('answerChanged', {
        questionId: this.question.id,
        newAnswerIndex: selectedIndex
      })
      this.selectedAnswerIndex = selectedIndex
    }
  },
  computed: {
    getSelectedQuestion() {
      return this.selectedAnswerIndex !== null ? this.question.answers[this.selectedAnswerIndex] : null
    }
  }
}
</script>
