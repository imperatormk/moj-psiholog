<template lang="pug">
  .p20.tiny-border.text-left
    .fs20 {{ question.title }}
    v-radio-group(:value="selectedAnswerIndex" @change="onChange($event)")
      v-radio(v-for="(answer, index) in question.answers" :disabled="preanswered" :label="answer.title" :value="index" :key="index") 
    span(v-if="question.triggerError" style="color:red") Please answer this question
</template>

<script>

export default {
  props: {
    question: {
      type: Object,
      required: true
    }
  },
  created() {
    const selectedAnswerIndex = this.question.selectedAnswerIndex
    if (selectedAnswerIndex != null) {
      this.preanswered = true
      this.selectedAnswerIndex = selectedAnswerIndex // not working
    }
    this.selectedAnswerIndex = 0
  },
  data() {
    return {
      preanswered: false,
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
