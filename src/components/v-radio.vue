<template>
    <div
        class="form-el-content"
        v-show="dataKey.show"
        :class="{'error-group': dataKey.error, [dataKey.css]: true}"
    >
        <template v-for="item in dataKey.sortArray">
            <label
                class="form-radio"
                @click.stop="changeRadio(item.value, item)"
                :key="item.value"
                :name="dataKey.name"
            >
                <span
                    class="raido-item"
                    :class="{
                        'v-icon-radio-checked': radioValue === item.value, 
                        'v-icon-radio-unchecked': radioValue !== item.value,
                        'disabled': item.disabled || dataKey.disabled
                        }"
                    :value="item.value"
                ></span>
                <span class="radio-text">{{item.title}}</span>
            </label>
        </template>
        <div class="error-bottom text-error" v-if="dataKey.error">{{dataKey.error}}</div>
    </div>
</template>

<script>
let defaults = {
    required: true,
    css: "", //样式
    show: true, //是否显示
    ignore: false, //是否忽略
    disabled: false, //是否禁用
    val: "", //组件id
    error: "",
    name: "",
    sortArray: [
        /*{
        value: xxx,
        disabled: true
        title: ""
    }*/
    ],
    changeCallBack: function() {}
};

export default {
    name: "v-radio",
    props: ["dataKey"],
    created() {
        this.dataKey = this.setOptions(this.dataKey, defaults);
    },
    data() {
        return {
            error: "",
            radioValue: ""
        };
    },
    methods: {
        changeRadio(value, item) {
            if (this.dataKey.disabled || item.disabled) {
                return;
            }
            this.dataKey.error = "";
            if (value === this.radioValue) {
                return;
            }
            this.dataKey.val = this.radioValue = value;
        }
    },
    watch: {
        "dataKey.val": {
            handler(newValue, oldValue) {
                if (newValue !== "" && newValue !== undefined) {
                    this.radioValue = newValue;
                }
            },
            //立即执行
            immediate: true
        },
        radioValue: {
            handler(newValue, oldValue) {
                this.dataKey.changeCallBack &&
                    this.dataKey.changeCallBack(newValue);
            },
            //立即执行
            immediate: true
        }
    }
};
</script>