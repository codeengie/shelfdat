<template>
    <div class="textbox">
        <label class="textbox__label"></label>
        <textarea
            :cols="cols"
            :rows="rows"
            class="textbox__area"></textarea>
    </div>
</template>

<script>
export default {
    name: 'InputTextArea',
    props: {
        cols: String,
        rows: String
    }
}
</script>

<style lang="scss" scoped>

</style>