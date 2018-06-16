<template>
  <div>
    Name: {{ name }}
    State: {{ isAvailable }}
  </div>
</template>

<script>

export default {
  props: {
    name: String,
    available: Boolean
  },
  methods: {
  },
  computed: {
    isAvailable() {
      return this.available ? 'Available' : 'Not available'
    }
  }
}
</script>