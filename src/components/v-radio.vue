<template>
    <div class="form-el-content" v-show="dataKey.show" :class="{'error-group': dataKey.error, [dataKey.css]: true}">
        <template v-for="item in dataKey.sortArray">
            <label class="form-radio" @click.stop="changeRadio(item.value)" :key="item.value" :name="dataKey.name">
                <span class="raido-item"
                    :class='radioValue === item.value ? "v-icon-radio-checked" : "v-icon-radio-unchecked"'
                    :value="item.value" >
                </span>
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
    sortArray: [/*{
        value: xxx,
        title: ""
    }*/],
    options: {},
    changeCallBack: function() {}
};

export default {
    name: "v-radio",
    props: ["dataKey"],
    created() {
        this.dataKey = this.setOptions(this.dataKey, defaults);
        
        //sortArray为空时，默认以dataKey.options 对象属性排序
        if(this.dataKey.sortArray.length === 0) {
            for(let prop in this.dataKey.options) {
                this.dataKey.sortArray.push({
                    title: this.dataKey.options[prop],
                    value: prop
                });
            }
        }
    },
    data() {
        return {
            error: "",
            radioValue: ""
        };
    },
    methods: {
        changeRadio(value) {
            this.dataKey.error = "";
            if(value === this.radioValue) {
                return;
            }
            this.dataKey.val = this.radioValue = value;
        }
    },
    watch: {
        "dataKey.val": {
            //! TODO: 改变值 不执行watch？
            handler(newValue, oldValue) {
                if(newValue !== "" && newValue!== undefined ) {
                    this.radioValue = newValue;
                }
            },
            //立即执行
            immediate: true
        },
        "radioValue": {
            handler(newValue, oldValue) {
                this.dataKey.changeCallBack && this.dataKey.changeCallBack(newValue);

            },
            //立即执行
            immediate: true
        }
    }

};
</script>

<style lang="scss">
    .form-radio {
        display: inline-block;
        margin-right: 20px;
        cursor: pointer;
        .raido-item {
            vertical-align: middle;
            margin-right: 4px;
            font-size: 18px;
            color: $main-active-color;
        }
        .radio-text {
            display: inline-block;
            vertical-align: middle;
        }
    }
</style>