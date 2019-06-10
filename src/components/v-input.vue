<template>
    <div class="form-el-content form-input"  :class="{'error-group': dataKey.error, [dataKey.css]: true}">
        <input
            :type="dataKey.type"
            :maxlength="dataKey.maxlength"
            :placeholder="dataKey.placeholder"
            :disabled="dataKey.disabled"
            class="text"
            :name="dataKey.name"
            :class="{'text-password':dataKey.hasEye}"
            @input="changeValue()"
            v-model="dataKey.val"
            ref="input"
        >
        <div
            class="placeholder-text"
            v-if="!supportPlaceholder && !dataKey.val"
        >{{dataKey.placeholder}}</div>
        <div
            v-if="dataKey.hasEye"
            :class="dataKey.type == 'password'? 'v-icon-eye-close': 'v-icon-eye-open'"
            @click="changePlaceHolder()"
        ></div>
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
    maxlength: "",
    type: "text",
    placeholder: "",
    hasEye: "",
    name: "",
    val: "", //组件value
    error: "", //错误标志
    valid: [
        /*{
            type: "ssid",
            args: [1, 2]
        }*/
    ],
    changeCallBack: function() {}
};
export default {
    name: "v-input",
    props: ["data-key"],
    created() {
        //TODO: 数据转换
        this.dataKey = this.setOptions(this.dataKey, defaults);
    },
    mounted() {},
    data() {
        return {
            supportPlaceholder: this.hasPlaceholder()
        };
    },

    methods: {
        changePlaceHolder() {
            if (this.dataKey.type == "password") {
                this.dataKey.type = "text";
            } else {
                this.dataKey.type = "password";
            }
        },

        changeValue() {
            
            let isCheckTrue = this.check(this.dataKey);
            if(!isCheckTrue) {
                return;
            }
            
             
            this.dataKey.changeCallBack(this.dataKey.val);
            this.$emit("custom-event", this.dataKey.val);
        },
        hasPlaceholder() {
            var i = document.createElement("input");
            return "placeholder" in i;
        },
        check(dataObj) {

            //todo: 必须全局绑定 checkData
            if(typeof this.$checkData == "function") {
                return this.$checkData(dataObj);
            }

            return true;
            
        }
    },
    destroyed() {
        this.dataKey.error = "";
    }
};
</script>

<style lang="scss">
.form-el-content {
    position: relative;
    display: inline-block;
    
}
.form-input {
    width: $elem-width;
}
.text {
    line-height: $form-line-height;
    height: $form-line-height;
    border: 1px solid #ddd;
    width: 100%;
    padding: $input-padding;
    border-radius: 4px;
}
.text-password {
    padding-right: 30px;
}
.placeholder-text {
    position: absolute;
    top: 0;
    color: #999;
    padding: $input-padding;
}

.v-icon-eye-open,
.v-icon-eye-close {
    display: inline-block;
    position: absolute;
    width: 30px;
    line-height: $form-line-height;
    height: $form-line-height;
    right: 0;
    top: 0;
    font-size: 20px;
    text-align: center;
    color: #000;
    cursor: pointer;
}
.error-group {
    position: relative;
    .error-bottom {
        position: absolute;
        line-height: 1;
    }
    .text {
        border-color: $error-color;
    }
}
</style>