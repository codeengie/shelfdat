<template>
  <div class="skeleton">
    <div class="skeleton__square"></div>
    <div class="skeleton__square skeleton__square--right"></div>
    <div class="skeleton__headline"></div>
    <div class="skeleton__line"></div>
    <div class="skeleton__actions"></div>
  </div>
</template>

<style lang="scss">
  $skeleton-bg-color: #d0d0d0;
  $skeleton-fg-color: #969696;
  $skeleton-height: 164px;
  $skeleton-spacing: 10px;
  $skeleton-width: 290px;

  .skeleton {
    background-color: $skeleton-bg-color;
    display: flex;
    flex-flow: row wrap;
    height: $skeleton-height;
    margin-bottom: $skeleton-spacing;
    overflow: hidden;
    padding: 10px 15px;
    position: relative;
    width: $skeleton-width;

    &__actions,
    &__headline,
    &__line,
    &__square {
      background-color: $skeleton-fg-color;
      border-radius: 6px;
    }

    &__actions {
      align-self: end;
      height: 32px;
      margin-left: auto;
      width: 48px;
    }

    &__headline {
      height: 32px;
      width: 100%;
    }

    &__line {
      height: 26px;
      width: 50%;
    }

    &__square {
      height: 26px;
      width: 46px;

      &--right {
        margin-left: auto;
      }
    }

    &::before {
      animation: load 1s cubic-bezier(.4, 0, .2, 1) infinite;
      background: linear-gradient(to right, transparent 0%, #e8e8e8 50%, transparent 100%);
      content: '';
      display: block;
      height: $skeleton-height;
      left: -$skeleton-width;
      position: absolute;
      top: 0;
      width: $skeleton-width;
    }

    @keyframes load {
      from {
        left: -$skeleton-width;
      }
      to {
        left: 100%;
      }
    }
  }
</style>