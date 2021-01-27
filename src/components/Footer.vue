<template>
  <footer>
    <small>Copyright {{ setCurrentYear }} @ Ardent Forms. All Rights Reserved.</small>
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

<style>
  footer {
    font-size: 1.2rem;
    font-weight: 400;
    text-align: center;
  }
</style>