<template lang="pug">
  .p10.text-left
    .italic "{{ review.comment }}"
</template>

<script>
export default {
  props: {
    review: {}
  },
}
</script>

