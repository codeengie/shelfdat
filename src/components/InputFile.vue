<template>
    <div class="uploader">
        <div class="uploader__default" v-if="!displayFile">
            <!-- You can also proxy the label to a button using Vue refs -->
            <label class="uploader__label" for="uploader">
                <span class="uploader__text">Add Poster</span>
                <!--<span class="uploader__subtext">Supports JPG, JPEG, PNG</span>-->
            </label>
            <!-- This input is hidden -->
            <input
                @change="fileSelected"
                accept="image/jpg, image/jpeg, image/png, image/webp"
                class="uploader__input"
                id="uploader"
                name="uploader"
                type="file">
        </div>
        <!-- Displays image to be uploaded and some information -->
        <div class="uploader__display" v-if="displayFile">
            <figure class="uploader__pic-wrap">
                <img
                    :src="displayFile"
                    alt="Uploaded image, no description available since image content can vary"
                    class="uploader__pic"
                    height="86"
                    width="158">
                <figcaption class="uploader__filename">{{ fileName }}<span class="uploader__filesize">{{ fileSize }}</span></figcaption>
            </figure>
            <button @click="deleteFile" class="uploader__button">
                <span class="uploader__button-icon"></span>
            </button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'InputFile',
    data() {
        return {
            displayFile: null,
            fileName: '',
            fileSize: '',
            isFile: true,
            selectedFile: null
        }
    },
    emits: ['update:modelValue'],
    computed: {
        file() {
            return this.isFile;
        }
    },
    methods: {
        fileSelected(event) {
            this.selectedFile = event.target.files[0];
            this.previewFile(this.selectedFile, this.selectedFile.name, this.selectedFile.size);
            this.$emit('update:modelValue', this.selectedFile);
        },
        // Credit to Stackoverflow @link https://stackoverflow.com/questions/15900485/correct-way-to-convert-size-in-bytes-to-kb-mb-gb-in-javascript
        formatBytes(bytes, decimals = 2) {
            if (!+bytes) return '0 Bytes';

            const k = 1024;
            const dm = decimals < 0 ? 0 : decimals;
            const sizes = ['bytes', 'kb', 'mb', 'gb', 'tb', 'pb', 'eb', 'zb', 'yb'];
            const i = Math.floor(Math.log(bytes) / Math.log(k));

            return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
        },
        deleteFile() {
            this.displayFile = '';
        },
        previewFile(data, name, size) {
            this.displayFile = URL.createObjectURL(data);
            this.fileName = name;
            this.fileSize = this.formatBytes(size, 0);
        }
    }
}
</script>

<style lang="scss" scoped>
.uploader {
    background-color: var(--shark);
    height: 86px;
    overflow: hidden;
    width: 372px;

    &__button {
        height: 14px;
        margin: 0 30px 0 auto;
        width: 14px;

        &-icon {
            background: transparent url('../assets/icons/close.svg') center center no-repeat;
            display: block;
            height: 14px;
            width: 14px;
        }
    }

    &__default,
    &__display {
        height: 86px;
    }

    &__display {
        align-items: center;
        display: flex;
    }

    &__filename {
        font-size: 1.4rem;
        margin-left: 24px;
        padding-right: 8px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    &__filesize {
        display: block;
        font-size: 1rem;
        margin-top: 4px;
    }

    &__input {
        border: 0;
        height: 1px;
        overflow: hidden;
        padding: 0;
        white-space: nowrap;
        width: 1px;
    }

    &__label {
        align-items: center;
        cursor: pointer;
        display: flex;
        flex-direction: column;
        height: 100%;
        justify-content: center;
    }

    &__pic {
        height: auto;

        &-wrap {
            align-items: center;
            display: flex;
        }
    }

    &__subtext {
        font-size: .8rem;
        margin-top: 8px;
    }

    &__text {
        align-items: center;
        font-size: 1.4rem;
        display: flex;
        position: relative;

        &::after {
            content: 'Supports: JPG, JPEG, PNG, WEBP';
            font-size: 1rem;
            left: 50%;
            position: absolute;
            text-align: center;
            top: 30px;
            transform: translateX(-50%);
            width: 168px;
        }

        &::before {
            background: transparent url('../assets/icons/upload_image.svg') center center no-repeat;
            content: '';
            display: block;
            height: 24px;
            margin-right: 14px;
            width: 24px;
        }
    }
}
</style>