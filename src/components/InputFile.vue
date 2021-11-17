<template>
    <div class="form__group form__group--file">
        <label class="form__label" for="upload"><span>Upload Image</span></label>
        <input accept="image/png" class="form__input" id="upload" name="upload" type="file">
        <!--<label class="form__label" for="upload">JPG &amp; PNG Accepted</label>-->
    </div>
</template>

<script>
export default {
    name: "InputFile"
}
</script>

<style lang="scss" scoped>
    .form {
        $this: &;

        &__group {
            &--file {
                margin-top: 15px;
            }
        }

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
            text-transform: uppercase;
            width: 290px;

            &:hover {
                background-color: #2346d4;
            }
        }

        &__input {
            border: 0;
            height: 1px;
            overflow: hidden;
            padding: 0;
            white-space: nowrap;
            width: 1px;
        }
    }
</style>