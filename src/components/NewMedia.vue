<template>
  <form @submit.prevent="submitNewMedia">
    <input placeholder="Title" type="text"><br>

    <label for="format">Format</label>
    <select name="format" id="format">
      <option value="DVD">DVD</option>
      <option value="Blu-ray">Blu-ray</option>
      <option value="4K Blu-ray">4K Blu-ray</option>
    </select><br>

    <label for="type">Type</label>
    <select name="type" id="type">
      <option value="Movie">Movie</option>
      <option value="TV Show">TV Show</option>
    </select><br>

    <label for="location">Location</label>
    <select name="location" id="location">
      <option value="1st Floor">1st Floor</option>
      <option value="2nd Floor">2nd Floor</option>
    </select><br>

    <label for="container">Container</label>
    <select name="container" id="container">
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
    </select><br>

    <button>Submit</button>
  </form>
</template>

<script>
  export default {
    data() {
      return {

      };
    },
    methods: {
      submitNewMedia() {
        console.log('New media submitted');
      }
    }
  }
</script>