<template>
  <form class="media-form" @submit.prevent="validateForm">
    <div class="media-form__wrap">
      <h3 class="media-form__title">Create A New Movie</h3>

      <div class="media-form__errors" v-if="errors.length">
        <h4 class="media-form__errors-title">Please correct the following error(s):</h4>
        <ul class="media-form__errors-list">
          <li class="media-form__errors-item" v-for="error in errors" :key="error">{{ error }}</li>
        </ul>
      </div>

      <div class="media-form__content">
        <div
            :class="[toggleFocus, isValid]"
            class="media-form__group media-form__group--input">
          <label class="media-form__label" for="title">Title</label>
          <input class="media-form__input" id="title" type="text" v-model.trim="title" @blur="handleFocus" @focus="handleFocus">
        </div>

        <div class="media-form__group media-form__group--dropdown">
          <label class="media-form__label" for="format">Format</label>
          <select class="media-form__select" name="format" id="format" v-model="format">
            <option class="media-form__option" value="null">Format</option>
            <option class="media-form__option" value="DVD">DVD</option>
            <option class="media-form__option" value="Blu-ray">Blu-ray</option>
            <option class="media-form__option" value="4K Blu-ray">4K Blu-ray</option>
          </select>
        </div>

        <div class="media-form__group media-form__group--dropdown">
          <label class="media-form__label" for="type">Type</label>
          <select class="media-form__select" name="type" id="type" v-model="type">
            <option value="null">Type</option>
            <option value="Movie">Movie</option>
            <option value="TV Show">TV Show</option>
          </select>
        </div>

        <div class="media-form__group media-form__group--dropdown">
          <label class="media-form__label" for="collection">Collection</label>
          <select class="media-form__select" name="collection" id="collection" v-model="collection">
            <option value="null">Collection</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        <div class="media-form__group media-form__group--dropdown">
          <label class="media-form__label" for="location">Location</label>
          <select class="media-form__select" name="location" id="location" v-model="location">
            <option value="null">Location</option>
            <option value="1st Floor">1st Floor</option>
            <option value="2nd Floor">2nd Floor</option>
          </select>
        </div>

        <div class="media-form__group media-form__group--dropdown">
          <label class="media-form__label" for="container">Container</label>
          <select class="media-form__select" name="container" id="container" v-model="container">
            <option value="null">Container</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>
      </div>

      <div class="media-form__group media-form__group--button">
        <button class="media-form__button">Submit</button>
      </div>

      <div class="media-form__group media-form__group--server" v-if="response">
        <p class="media-form__response">{{ response }}</p>
      </div>
    </div>
  </form>
</template>

<script>
  export default {
    // This is an interface
    // props: ['mediaDbData'],
    props: {
      mediaDBData: Object
    },
    emits: ['add-last-media'],
    /*emits: {
      'add-last-media': function(data){
        if (data) {
          return true;
        } else {
          console.warn('Data is missing!');
          return false;
        }
      }
    },*/
    data() {
      return {
        errors: [],
        collection: null,
        container: null,
        format: null,
        location: null,
        title: null,
        type: null,
        response: '',
        focused: false
      };
    },
    computed: {
      isValid() {
        return 'is-valid'; // is-invalid
      },
      toggleFocus() {
        return this.focused ? 'focused' : ''
      }
    },
    methods: {
      async submitNewMedia() {
        const newMovieData = {
          collection: (this.collection === 'yes'),
          container: this.container,
          format: this.format,
          location: this.location,
          title: this.title,
          type: this.type
        };

        console.log(`New Movie Data: ${JSON.stringify(newMovieData)}`);

        await fetch(process.env.VUE_APP_API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newMovieData)
        })
        .then(response => response.json())
        .then(json => {
          console.log(json);
          this.response = json;
          this.resetForm();
          this.addLastMedia();
        });
      },
      resetForm() {
        this.collection = null;
        this.container = null;
        this.format = null;
        this.location = null;
        this.title = '';
        this.type = null;
      },
      // Update media data when a new movie is added
      addLastMedia() {
        this.$emit('add-last-media', this.response.data); // @todo You'll need to update the API to send this back
      },
      validateForm() {
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

        if (!this.collection) {
          this.errors.push('Collection is required');
        }

        if (!this.location) {
          this.errors.push('Location is required');
        }

        if (!this.container) {
          this.errors.push('Container is required');
        }

        if (!this.errors.length) {
          this.submitNewMedia();
          return true;
        }
      },
      handleFocus(event) {
        this.focused = !this.focused;
        console.log(`Focus: ${event.target}`);
      }
    }
  }
</script>

<style lang="scss">
  :root {
    --form-bg-color: #1d2227;
    --form-error-color: #c8373d;
    --form-input-border-color: #4a4a4a;
    --form-input-text-color: #fff;
    --form-select-arrow: var(--form-input-border-color);
    --form-text-color: #9b9b9b;
  }

  .media-form {
    $this: &; // Let's cache the root selector

    margin: 16px auto 0;
    padding: 0 15px;
    min-width: 290px;
    max-width: 450px;

    &__content {
      margin-top: 20px;
    }

    &__button {
      background-color: transparent;
      border: 2px solid #f0f0f0;
      color: #f0f0f0;
      letter-spacing: 2px;
      padding: 20px 75px;
      text-transform: uppercase;
      transition: all .4s;

      &:focus,
      &:hover {
        background-color: #fff;
        color: #333;
      }
    }

    &__errors {
      color: var(--form-error-color);
      font-size: 1.2rem;

      &-list {
        margin: {
          bottom: 0;
          top: 4px;
        }
        padding-left: 12px;
      }

      &-title {
        margin: {
          bottom: 0;
          top: 10px;
        }
      }
    }

    &__group {

      &:not(:first-child) {
        margin-top: 20px;
      }

      &--dropdown {
        #{$this}__label {
          display: none;
        }
      }

      &--input {
        &.focused {
          #{$this}__label {
            transform: translateY(0);
            transition: all .3s;
          }
        }

        #{$this}__label {
          transform: translateY(28px);
        }
      }

      &--server {
        color: #fff;
        //text-align: center;
      }
    }

    &__input,
    &__select {
      width: 100%;
    }

    &__input {
      background-color: transparent;
      border: 0 {
        bottom: 2px solid var(--form-input-border-color);
      }
      color: var(--form-input-text-color);
      font-size: 1.8rem;
      letter-spacing: 1px;
      outline: 0;
      padding: 5px 20px;
      position: relative;
      text-align: center;
      z-index: 1;
    }

    &__label {
      color: var(--form-text-color);
      display: inline-block;
      font-size: 1.4rem;
      letter-spacing: 2px;
      text-transform: uppercase;
      transition: all .2s;
    }

    &__select,
    &__select::after {
      grid-area: select;
    }

    &__select {
      align-items: center;
      appearance: none;
      background-color: transparent;
      border: 0 {
        bottom: 2px solid var(--form-input-border-color);
      }
      color: var(--form-text-color);
      cursor: pointer;
      display: grid;
      font-size: 1.4rem;
      grid-template-areas: 'select';
      letter-spacing: 2px;
      outline: 0;
      text: {
        align: center;
        transform: uppercase;
      }

      &::after {
        background-color: var(--form-select-arrow);
        content: '';
        clip-path: polygon(100% 0%, 0 0%, 50% 100%);
        height: .5em;
        justify-self: end;
        width: .8em;
      }
    }

    &__title {
      color: var(--form-text-color);
      font: {
        size: 1.8rem;
        weight: 500;
      }
      margin: 0;
    }

    &__wrap {
      background-color: var(--form-bg-color);
      border-radius: 6px;
      padding: 30px;
      text-align: center;
    }
  }
</style>