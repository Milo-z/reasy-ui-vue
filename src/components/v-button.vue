<template>
    <div class="button-item" v-if="show !== false">
        <button :name="name" class="btn" :class="{[css]: css, 'disabled': disabled}" @click.stop="clickCallBack()">{{title}}</button>
    </div>
</template>

<script>


export default {
    name: "v-button",
    props: ["title", "css", "callback", "show", "disabled", "name"],
    created() {

    },
    data() {
        return {

        };
    },
    methods: {
        clickCallBack() {
            if(this.disabled === true) {
                return;
            }
            if(typeof this.callback == "function") {
               this.callback(arguments);
            }
        }
    }

};
</script>

<style lang="scss">
    .button-item {
        display: inline-block;
        & + .button-item {
            margin-left: 20px;
        }
        .btn.disabled {
            background: $disabled-color !important;
            cursor: not-allowed;
            color: #aaa;
        }
    }
</style>