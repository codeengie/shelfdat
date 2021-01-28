<template>
  <header class="header">
    <div class="brand">
      <img class="brand__logo" src="images/notashelfie_logo.svg" alt="NotAShelf Logo" width="24" height="24">
      <div class="brand__wrap">
        <h1 class="brand__header">NotAShelfie</h1>
        <h2 class="brand__subheader">Helping you keep track of your media</h2>
      </div>
    </div>
  </header>
</template>

<style lang="scss">
  :root {
    --header-height: 46px;
  }

  .brand {
    align-items: center;
    display: flex;
    height: var(--header-height);
  }

  .brand__header {
    font: {
      size: 2rem;
      weight: 500;
    }
  }

  .brand__subheader {
    font: {
      size: 1.2rem;
      weight: 400;
    }
    margin-top: -4px;
  }

  .brand__wrap {
    margin-left: 6px;
  }

  .header {
    height: var(--header-height);
    padding: 0 15px;
  }
</style>