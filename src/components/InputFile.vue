<template>
    <div class="form__group form__group--file">
        <figure class="form__figure">
            <img
                v-if="selectedFile"
                :src="displayFile"
                alt=""
                class="form__img"
                height="120"
                width="100">
        </figure>
        <!-- You can also proxy the label to a button using Vue refs -->
        <label class="form__label" for="upload"><span>Select Image</span></label>
        <input accept="image/png" class="form__input" id="upload" name="upload" type="file" @change="fileSelected">
    </div>
</template>

<script>
export default {
    name: 'InputFile',
    data() {
      return {
          selectedFile: null,
          displayFile: null
      }
    },
    emits: ['update:modelValue'],
    methods: {
        fileSelected(event) {
            this.selectedFile = event.target.files[0];
            this.previewFile(this.selectedFile);
            this.$emit('update:modelValue', this.selectedFile);
        },
        previewFile(file) {
            this.displayFile = URL.createObjectURL(file);
        }
    }
}
</script>

<style lang="scss" scoped>
    .form {
        $this: &;

        &__figure {
            background: #707070 url('/images/image_white.svg') center center no-repeat {
                size: 32px
            }
            border-radius: 4px;
            height: 120px;
            width: 100px;
        }

        &__group {
            &--file {
                align-items: center;
                border: 2px dashed var(--dove-gray) {
                    radius: 14px;
                };
                display: flex;
                flex-flow: column;
                margin-top: 15px;
                padding: 10px;
            }
        }

        &__img {
            border-radius: 4px;
            outline: 2px solid var(--dove-gray);
        }

        &__input {
            border: 0;
            height: 1px;
            overflow: hidden;
            padding: 0;
            white-space: nowrap;
            width: 1px;
        }

        // Faux upload button
        &__label {
            align-items: center;
            background-color: #36a2eb;
            border-radius: 4px;
            color: #ffffff;
            cursor: pointer;
            display: flex;
            font: {
                size: 1.6rem;
                weight: var(--weight-medium);
            }
            justify-content: center;
            height: 40px;
            margin-top: 15px;
            text-transform: uppercase;
            width: 140px;

            &:hover {
                background-color: #2346d4;
            }
        }
    }
</style>