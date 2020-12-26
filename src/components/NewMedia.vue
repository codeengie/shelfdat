<template>
  <form class="media-form" @submit.prevent="submitNewMedia">
    <h3 class="media-form__title">Create A New Movie</h3>

    <div class="media-form__errors" v-if="errors.length">
      <h4>Please correct the following error(s):</h4>
      <ul>
        <li v-for="error in errors" :key="error">{{ error }}</li>
      </ul>
    </div>

    <div class="media-form__content">
      <div class="media-form__group media-form__group--input">
        <label class="media-form__label" for="title">Title</label>
        <input class="media-form__input" id="title" type="text" v-model="title">
      </div>

      <div class="media-form__group media-form__group--dropdown">
        <label class="media-form__label" for="format">Format</label>
        <select class="media-form__select" name="format" id="format">
          <option value="null">Format</option>
          <option value="DVD">DVD</option>
          <option value="Blu-ray">Blu-ray</option>
          <option value="4K Blu-ray">4K Blu-ray</option>
        </select>
      </div>

      <div class="media-form__group media-form__group--dropdown">
        <label class="media-form__label" for="type">Type</label>
        <select class="media-form__select" name="type" id="type">
          <option value="null">Type</option>
          <option value="Movie">Movie</option>
          <option value="TV Show">TV Show</option>
        </select>
      </div>

      <div class="media-form__group media-form__group--dropdown">
        <label class="media-form__label" for="location">Location</label>
        <select class="media-form__select" name="location" id="location">
          <option value="null">Location</option>
          <option value="1st Floor">1st Floor</option>
          <option value="2nd Floor">2nd Floor</option>
        </select>
      </div>

      <div class="media-form__group media-form__group--dropdown">
        <label class="media-form__label" for="container">Container</label>
        <select class="media-form__select" name="container" id="container">
          <option value="null">Container</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
      </div>
    </div>

    <div class="media-form__group media-form__group--button">
      <button>Submit</button>
    </div>
  </form>
</template>

<script>
  export default {
    data() {
      return {
        errors: [],
        title: null
      };
    },
    methods: {
      submitNewMedia() {
        this.errors = [];

        if (!this.title) {
          this.errors.push('Title is required');
        }

        if (!this.errors.length) {
          return true;
        }

        console.log('New media submitted');
      }
    }
  }
</script>

<style>
  .media-form {
    background-color: #111;
    border-radius: 6px;
    padding: 30px;
    width: 28%;
  }

  .media-form__content {
    margin-top: 20px;
  }

  .media-form__errors {
    color: #ff0000;
  }

  .media-form__label {
    color: #bebebe;
    display: inline-block;
    width: 20%;
  }

  .media-form__input,
  .media-form__select {
    width: 80%;
  }

  .media-form__title {
    color: #eee;
    font-size: 1.8rem;
    margin: 0;
    text-align: center;
  }
</style>