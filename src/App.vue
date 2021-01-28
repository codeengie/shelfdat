<template>
  <nas-header></nas-header>
  <nas-newmedia
      media-db-data
      @addLastMedia="updateMedia"
  ></nas-newmedia><br>

  <div class="search">
    <input class="search__media" placeholder="Search media..." v-model.trim="searchKey">
  </div>

  <!-- Redo this component to use Dynamic Props 93-->
  <section>
    <h3># of Movies in DB: {{ mediaCount }}</h3>
    <div class="container">
      <dl v-for="media in mediaSearch" :key="media">
        <dt>{{ media.title }}</dt>
        <dd>{{ media.format }}</dd>
        <dd>{{ media.type }}</dd>
        <dd>{{ media.location }}</dd>
      </dl>
    </div>
  </section>
  <nas-footer></nas-footer>
</template>

<script>
  export default {
    data() {
      return {
        mediaDbData: [],
        searchKey: ''
      };
    },
    beforeMount() {
      this.getMedia()
    },
    computed: {
      mediaCount() {
        return this.mediaDbData.length;
      },
      mediaSearch() {
        return this.mediaDbData.filter(media => {
          return media.title.toLowerCase().includes(this.searchKey.toLowerCase());
        });
      }
    },
    methods: {
      async getMedia() {
        const response = await fetch(process.env.VUE_APP_API_URL);
        const media = await response.json();
        this.mediaDbData = media.data;
      },
      updateMedia(mediaRecord) {
        // this.mediaDbData.push(mediaRecord);
        console.log(`Added latest media record: ${mediaRecord}`);
      }
    }
  }
</script>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap');

  *,
  *::after,
  *::before {
    box-sizing: border-box;
  }

  html {
    font-size: 62.5%;
  }

  body, dl, h1, h2 {
    margin: 0;
    padding: 0;
  }

  body {
    background-color: #f0f0f0;
    font-family: Roboto, sans-serif;
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

  section {
    padding: 0 15px;
  }

  .container {
    display: grid;
    grid-template-columns: 145px 145px;
    grid-template-rows: auto;
    column-gap: 15px;
    row-gap: 20px;
  }

  .search {
    padding: 0 15px;

    &__media {
      width: 100%;
    }
  }
</style>