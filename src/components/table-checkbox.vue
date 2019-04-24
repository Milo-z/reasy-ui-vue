<template>
    <div class="select-box">
        <div class="form-el-content form-el-checkbox">
            <label class="form-checkbox">
                <span class="checkbox-item" @click.stop="changeBack" :class="rowData.selected == '1' ? 'v-icon-checkbox-checked': 'v-icon-checkbox-unchecked'"></span> 
                <span class="checkbox-text"></span>
            </label>
        </div>
    </div>
</template>
<script>
export default {
    name: "table-checkbox",
    props: ["rowData", "field", "index", "tableData", "originData"],
    data() {
        return {
            selected: this.rowData.selected == "1"
        }
    },
    methods: {
        changeBack() {
            let selected = this.rowData.selected == "1" ? "0" : "1";
            this.$set(this.rowData, this.field, selected); 
                let params = {
                    type: "checkbox",
                    index: this.index,
                    rowData: this.rowData
                };
                this.$emit("on-custom-comp", params);
        }
    }
}
</script>
<style lang="scss">
    .select-box {
        .form-checkbox {
            margin-right: 0;
        }
    }
</style>


