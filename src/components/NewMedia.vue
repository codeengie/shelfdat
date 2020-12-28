<template>
  <form class="media-form" @submit.prevent="submitNewMedia">
    <h3 class="media-form__title">Create A New Movie</h3>

    <div class="media-form__errors" v-if="errors.length">
      <h4 class="media-form__errors-title">Please correct the following error(s):</h4>
      <ul class="media-form__errors-list">
        <li class="media-form__errors-item" v-for="error in errors" :key="error">{{ error }}</li>
      </ul>
    </div>

    <div class="media-form__content">
      <div class="media-form__group media-form__group--input">
        <label class="media-form__label" for="title">Title</label>
        <input class="media-form__input" id="title" type="text" v-model="title">
      </div>

      <div class="media-form__group media-form__group--dropdown">
        <label class="media-form__label" for="format">Format</label>
        <select class="media-form__select" name="format" id="format" v-model="format">
          <option value="null">Choose option</option>
          <option value="DVD">DVD</option>
          <option value="Blu-ray">Blu-ray</option>
          <option value="4K Blu-ray">4K Blu-ray</option>
        </select>
      </div>

      <div class="media-form__group media-form__group--dropdown">
        <label class="media-form__label" for="type">Type</label>
        <select class="media-form__select" name="type" id="type" v-model="type">
          <option value="null">Choose option</option>
          <option value="Movie">Movie</option>
          <option value="TV Show">TV Show</option>
        </select>
      </div>

      <div class="media-form__group media-form__group--dropdown">
        <label class="media-form__label" for="location">Location</label>
        <select class="media-form__select" name="location" id="location" v-model="location">
          <option value="null">Choose option</option>
          <option value="1st Floor">1st Floor</option>
          <option value="2nd Floor">2nd Floor</option>
        </select>
      </div>

      <div class="media-form__group media-form__group--dropdown">
        <label class="media-form__label" for="container">Container</label>
        <select class="media-form__select" name="container" id="container" v-model="container">
          <option value="null">Choose option</option>
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
        container: null,
        format: null,
        location: null,
        title: null,
        type: null
      };
    },
    methods: {
      submitNewMedia() {
        this.errors = [];

        if (!this.title) {
          this.errors.push('Title is required');
        }

        if (!this.format) {
          this.errors.push('Format is required');
        }

        if (!this.type) {
          this.errors.push('Type is required');
        }

        if (!this.location) {
          this.errors.push('Location is required');
        }

        if (!this.container) {
          this.errors.push('Container is required');
        }

        if (!this.errors.length) {
          // Puf your function here to send the data
          return true;
        }
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
    font-size: 1.2rem;
  }

  .media-form__errors-list {
    margin-bottom: 0;
    margin-top: 4px;
    padding-left: 12px;
  }

  .media-form__errors-title {
    margin-bottom: 0;
    margin-top: 10px;
  }

  .media-form__group:not(:first-child) {
    margin-top: 10px;
  }

  .media-form__label {
    color: #bebebe;
    display: inline-block;
    font-size: 1.4rem;
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

  /* Modifiers */
  .media-form__group--button {
    text-align: center;
  }
</style>