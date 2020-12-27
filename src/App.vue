<template>
  <nas-header></nas-header>
  <nas-newmedia></nas-newmedia><br>
  <input placeholder="Search media..." v-model.trim="searchKey">
  <section>
    <h3># of Movies in DB: {{ mediaCount }}</h3>
    <dl v-for="media in mediaSearch" :key="media">
      <dt>{{ media.title }}</dt>
      <dd>{{ media.format }}</dd>
      <dd>{{ media.type }}</dd>
      <dd>{{ media.location }}</dd>
    </dl>
  </section>
  <nas-footer></nas-footer>
</template>

<script>
  export default {
    data() {
      return {
        collection: [],
        searchKey: ''
      };
    },
    beforeMount() {
      this.getMedia()
    },
    computed: {
      mediaCount() {
        return this.collection.length;
      },
      mediaSearch() {
        return this.collection.filter(media => {
          return media.title.toLowerCase().includes(this.searchKey.toLowerCase());
        });
      }
    },
    methods: {
      async getMedia() {
        const res = await fetch(process.env.VUE_APP_API_URL, {
          method: 'GET'
        });
        console.log(res);
        this.collection = await res.json();
      }
    }
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap');
  * {
    box-sizing: border-box;
  }
  html {
    font-size: 62.5%;
  }
  body {
    background-color: #f0f0f0;
    font-family: Roboto, sans-serif;
    margin: 0 15px;
  }
  h1 {
    font-size: 3rem;
  }
  dl, p {
    font-size: 1.6rem;
  }
  dt {
    font-weight: 500;
  }
</style>