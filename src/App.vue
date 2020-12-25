<template>
  <nas-header></nas-header>
  <section>
    <dl v-for="media in collection" :key="media">
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
        collection: [
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "6398f7cc-4835-4798-ab26-5f8cfef354f9",
            "format": "Blu-ray",
            "title": "Hulk VS",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "2e4733e6-e8ca-4d25-837d-672061460d09",
            "format": "Blu-ray",
            "title": "The Flash (2014) Season 5",
            "type": "TV Show"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "bc2ef08d-11e6-4196-a7e1-798571a85458",
            "format": "Blu-ray",
            "title": "Silver Bullet",
            "type": "Movie"
          }
        ]
      };
    },
    methods: {}
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
    margin: 0;
  }
  h1 {
    font-size: 3rem;
  }
  p {
    font-size: 1.8rem;
  }
</style>