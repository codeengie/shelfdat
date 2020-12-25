<template>
  <footer>
    <small>Copyright {{ setCurrentYear }} @ Ardent Forms</small>
  </footer>
</template>

<script>
  export default {
    data() {
      return {
        currentYear: null
      };
    },
    computed: {
      setCurrentYear() {
        const date = new Date();
        return date.getFullYear();
      }
    },
    methods: {}
  }
</script>