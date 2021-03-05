<template>
  <nas-header></nas-header>
  <div class="content">
    <nas-newmedia
        media-db-data
        @addLastMedia="updateMedia">
    </nas-newmedia>

    <nas-modwrap>
      <template #heading>Media</template>
      <template #default v-if="mediaDbData">
        <nas-stat
            v-for="stat in stats"
            :key="stat"
            :db-data="mediaDbData"
            :filter-by="stat.filterBy"
            :filter-key="stat.filterKey"
            :title="stat.title"></nas-stat>
      </template>
    </nas-modwrap>

    <nas-modwrap>
      <template #default>
        <nas-doughnut-chart></nas-doughnut-chart>
      </template>
    </nas-modwrap>

    <div class="search">
      <input class="search__media" placeholder="Search media..." v-model.trim="searchKey">
    </div>
    <!-- Redo this component to use Dynamic Props 93-->
    <section>
      <div v-if="isLoading">
        <nas-skeleton
            v-for="skeleton in skeletons"
            :key="skeleton"></nas-skeleton>
      </div>

      <div class="inventory">
        <div class="inventory__list">
          <div class="inventory__item" v-for="media in mediaSearch" :key="media">
            <h2 class="inventory__type">{{ media.type }}</h2>
            <h2 class="inventory__format">{{ media.format }}</h2>
            <h1 class="inventory__title">{{ media.title }}</h1>
            <p class="inventory__location">This movie is located on the {{ media.location }}.</p>
            <div class="inventory__actions">
              <button class="inventory__button inventory__button--edit" type="button">
                <img class="inventory__icon" src="images/edit-24px.svg" alt="Edit">
              </button>
              <button class="inventory__button inventory__button--delete" type="button">
                <img class="inventory__icon" src="images/delete-24px.svg" alt="Delete">
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
  <nas-footer></nas-footer>
</template>

<script>
  export default {
    data() {
      return {
        isLoading: true,
        skeletons: 6,
        mediaDbData: [],
        searchKey: '',
        stats: [
          {
            filterKey: '4K Blu-ray',
            filterBy: 'format',
            title: '4K'
          },
          {
            filterKey: 'Blu-ray',
            filterBy: 'format',
            title: 'BRay'
          },
          {
            filterKey: 'DVD',
            filterBy: 'format',
            title: 'DVD'
          },
          {
            filterKey: 'Movie',
            filterBy: 'type',
            title: 'Movies'
          },
          {
            filterKey: 'TV Show',
            filterBy: 'type',
            title: 'TV Shows'
          }
        ]
      };
    },
    beforeMount() {
      this.getMedia()
    },
    computed: {
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
        this.isLoading = false;
      },
      updateMedia(mediaRecord) {
        // this.mediaDbData.push(mediaRecord);
        console.log(`Added latest media record: ${mediaRecord}`);
      }
    }
  }
</script>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;900&display=swap');

  *,
  *::after,
  *::before {
    box-sizing: border-box;
  }

  html {
    font-size: 62.5%;
  }

  body, button, dl, h1, h2, h3, h4, p {
    margin: 0;
    padding: 0;
  }

  body {
    background-color: #f0f0f0;
    font-family: Roboto, sans-serif;
  }

  button {
    border-style: none;
    cursor: pointer;
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

  #app {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  .content {
    flex: 1 0 auto;

    &::after {
      content: '\00a0';
      display: block;
      margin-top: 5px;
      height: 0px;
      visibility: hidden;
    }
  }

  .inventory {
    display: grid;
    grid-template-columns: 145px 145px;
    grid-template-rows: auto;
    column-gap: 15px;
    row-gap: 20px;

    &__actions {
      align-self: end;
      margin-left: auto;
    }

    &__button {
      background-color: transparent;

      &:last-child {
        margin-left: 10px;
      }
    }

    &__format,
    &__type {
      color: #a8a8a8;
      font: {
        size: 1.2rem;
        weight: 500;
      }
      flex: 1;
      text-transform: uppercase;
    }

    &__format {
      text-align: right;
    }

    &__icon {
      height: auto;
      width: 20px;
    }

    &__item {
      align-items: stretch;
      background-color: #464646;
      display: flex;
      flex-flow: row wrap;
      height: 164px;
      padding: 10px 15px;
      width: 290px;

      &:not(:first-child) {
        margin-top: 4px;
      }
    }

    &__location {
      color: #a8a8a8;
      font: {
        size: 1.2rem;
        weight: 400;
      }
      margin-top: 12px;
      width: 100%;
    }

    &__title {
      color: #fff;
      font: {
        size: 1.8rem;
        weight: 900;
      }
      margin-top: 6px;
      text-transform: uppercase;
      width: 100%;
    }

    &__type {}
  }

  .search {
    margin: 15px 0;
    padding: 0 15px;

    &__media {
      width: 100%;
    }
  }

  /*.stats {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;

    &__title {
      font: {
        size: 1.8rem;
        weight: 500;
      }
      margin: 8px 0;
      padding: 0 15px;
      text-align: center;
      width: 100%;
    }
  }*/
</style>