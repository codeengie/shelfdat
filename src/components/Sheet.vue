<template>
    <div class="sheet" :class="toggleAnimation">
        <div class="sheet__blackout"></div>
        <div class="sheet__wrap">
            <button class="sheet__button" @click="handleAnimation">
                <img class="sheet__icon" src="images/add_24dp.svg" alt="Add">
            </button>
            <div class="sheet__content">
                <form class="sheet__form" @submit.prevent="submitNewItemForm">
                    <h2 class="sheet__header">Create New Item</h2>
                    <nas-input-field
                        field-name="Title"
                        field-type="text"
                        v-model="titleInput"></nas-input-field>

                    <nas-input-radio
                        v-for="radio in radioSettings"
                        :key="radio"
                        :radioLabel="radio.label"
                        :radioOptions="radio.options"></nas-input-radio>

                    <nas-input-file></nas-input-file>

                    <button class="sheet__form-button">Create</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Sheet',
        data() {
            return {
                isSheetUp: null,
                radioSettings: [
                    {
                        label: 'Format',
                        options: ['4K', 'BRAY', 'DVD']
                    },
                    {
                        label: 'Type',
                        options: ['Movie', 'TV Show']
                    },
                    {
                        label: 'Collection',
                        options: ['No', 'Yes']
                    },
                    {
                        label: 'Location',
                        options: ['Cave', 'Junk', 'Garage']
                    },
                    {
                        label: 'Container',
                        options: ['1', '2', '3', '4']
                    }
                ],
                titleInput: null
            };
        },
        computed: {
            toggleAnimation() {
                return this.isSheetUp ? 'sheet--up' : '';
            }
        },
        methods: {
            handleAnimation() {
                this.isSheetUp = !this.isSheetUp;
            },
            submitNewItemForm() {
              console.log('Submitting new item form.');
            }
        }
    }
</script>

<style lang="scss" scoped>
    $content-height: 400px;
    $ease-in-back: cubic-bezier(.36, 0, .66, -.56);
    $ease-out-back: cubic-bezier(.34, 1.56, .64, 1);

    .sheet {
        $this: &;

        &__blackout {
            background-color: var(--black);
            height: 100%;
            left: 0;
            opacity: 0;
            position: fixed;
            top: 0;
            transition: all .35s ease-in;
            visibility: hidden;
            width: 100%;
        }

        &__button {
            background-color: var(--dodger-blue);
            border-radius: 50%;
            bottom: 15px;
            height: 48px;
            position: absolute;
            right: 15px;
            width: 48px;
            z-index: 5;
        }

        &__content {
            align-items: center;
            background-color: var(--white);
            display: flex;
            // height: 400px;
            justify-content: center;
            left: 0;
            overflow: hidden;
            opacity: 0;
            padding: 15px;
            position: absolute;
            top: -100px;
            transition: opacity .1s ease-out .1s, visibility 0s linear .15s;
            width: 100%;
            visibility: hidden;
            z-index: 4;
        }

        &__form-button {
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
            width: 290px;

            &:hover {
                background-color: #2346d4;
            }
        }

        &__header {
            text-align: center;
        }

        &__icon {
            height: 28px;
            width: 28px;
        }

        &__wrap {
            bottom: -10px; // Compensates for the bottom padding
            left: 0;
            padding-bottom: 10px;
            position: fixed;
            transition: bottom .25s $ease-out-back;
            width: 100%;
            z-index: 3;
        }

        &--up {
            #{$this} {
                &__blackout {
                    opacity: .4;
                    transition: opacity .2s ease-out;
                    visibility: visible;
                }

                &__button {
                    // bottom: $content-height - 24px; // Half the height of the button
                    // transition: bottom .4s cubic-bezier(.68, -.6, .32, 1.6);
                }

                &__content {
                    opacity: 1;
                    transition: opacity .1s ease-in .1s;
                    width: 100%;
                    visibility: visible;
                }

                &__wrap {
                    bottom: 543px;
                    transition: bottom .35s $ease-in-back;
                }
            }
        }
    }
</style>