<template>
    <div class="form__group form__group--radio">
        <!-- @todo Let's keep this simple and use label to create id and group-->
        <fieldset>
            <legend>Foobar</legend>
            <template v-for="(radioOption, index) in radioOptions" :key="radioOption">
                <input
                    :id="`${radioId}${index}`"
                    :name="radioGroup"
                    type="radio"
                    :value="radioOption">
                <label :for="`${radioId}${index}`">{{ radioOption }}</label>
            </template>
        </fieldset>
    </div>
</template>

<script>
    export default {
        name: 'InputRadio',
        props: {
            radioId: String,
            radioGroup: String,
            radioLabel: String,
            radioOptions: [Array, String]
        },
        data() {
            return {
                focused: false
            }
        }
    }
</script>