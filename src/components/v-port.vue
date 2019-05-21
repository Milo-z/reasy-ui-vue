<template>
    <div class="form-port-content form-group" :class="dataPort.hasSelectAll ? 'bottm-50':''">
        <div class="form-port-list">
            <div class="form-port-group" v-for="item in portList" :key="item.index[0]" :name="dataPort.name">
                <span>{{item.index[0]}}</span>
                <div
                    class="port-content"
                    @click="clickPort(item.index[0])"
                    :class="{'active': getChecked(item.index[0]), 'disabled': getDisabled(item.index[0])}"
                >
                    <div class="form-port-top"></div>
                    <div class="form-port-body"></div>
                </div>

                <div
                    class="port-content"
                    @click="clickPort(item.index[1])"
                    :class="{'active': getChecked(item.index[1]), 'disabled': getDisabled(item.index[1])}"
                >
                    <div class="form-port-top"></div>
                    <div class="form-port-body"></div>
                </div>
                <span>{{item.index[1]}}</span>
            </div>
            <div class="form-console-group">
                <div class="port-legend" v-if="legend">
                    <div class="form-port-group">
                        <div class="port-content active">
                            <div class="form-port-top"></div>
                            <div class="form-port-body"></div>
                        </div>
                        <div class="port-text">Selected</div>
                    </div>
                    <div class="form-port-group">
                        <div class="port-content">
                            <div class="form-port-top"></div>
                            <div class="form-port-body"></div>
                        </div>
                        <div class="port-text">Not selected</div>
                    </div>
                    <div class="form-port-group" v-if="dataPort.disabled.length > 0">
                        <div class="port-content disabled">
                            <div class="form-port-top"></div>
                            <div class="form-port-body"></div>
                        </div>
                        <div class="port-text">Disabled</div>
                    </div>
                </div>

                <div class="form-port-group" v-for="item in consoleList" :key="item.index" :name="dataPort.name">
                    <div
                        class="port-content"
                        @click="clickPort(item.index)"
                        :class="{'active': getChecked(item.index), 'disabled': getDisabled(item.index)}"
                    >
                        <div class="form-port-body"></div>
                    </div>
                    <span>{{item.index}}</span>
                </div>
            </div>
            <div v-if="dataPort.hasSelectAll" class="select-all-group">
                <v-button  :title="isSelected ? '取消全选': '全选'" :callback="selectAllPort"></v-button>
            </div>
        </div>
    </div>
</template>
<script>
let defaults = {
    show: true,
    singleVal: false,
    portNum: 28,
    consolePort: 4,
    isClick: true,
    val: [],
    name: "",
    disabled: [],
    legend: false,
    hasSelectAll: true
};
export default {
    name: "v-port",
    props: ["dataPort"],
    created() {
        this.dataPort = this.setOptions(this.dataPort, defaults);
        let portIndex = (this.dataPort.portNum - this.dataPort.consolePort) / 2;
        for (let i = 0; i < portIndex; i++) {
            this.portList.push({
                index: [String((i + 1) * 2 - 1), String((i + 1) * 2)]
            });
        }

        for (let i = 0; i < this.dataPort.consolePort; i++) {
            this.consoleList.push({
                index: String(
                    this.dataPort.portNum - this.dataPort.consolePort + i + 1
                )
            });
        }

        if(this.singleVal) { //单选时，去掉全选按钮
            this.hasSelectAll = false;
        }
    },
    data() {
        return {
            legend: this.dataPort.legend,
            portList: [],
            consoleList: [],
            isSelected: false,
        };
    },
    methods: {
        getChecked(portIndex) {
            portIndex = String(portIndex);
            return this.dataPort.val.indexOf(portIndex) != -1;
        },
        getDisabled(portIndex) {
            return this.dataPort.disabled.indexOf(portIndex) != -1;
        },
        clickPort(portIndex) {

            //不允许点击
            if (!this.dataPort.isClick) {
                return;
            }

            //禁用
            if(this.getDisabled(portIndex)) {
                return;
            }

            let index = this.dataPort.val.indexOf(portIndex);
            if (!this.singleVal) {
                if (index == -1) {
                    //不存在
                    this.dataPort.val.push(portIndex);
                } else {
                    this.dataPort.val.splice(index, 1);
                    this.isSelected = false;
                }
            } else {
                if (index == -1) {
                    //不存在
                    this.dataPort.val = [portIndex];
                } else {
                    this.dataPort.val = [];
                }
            }
        },

        getAllPort() {
            let maxPort = this.dataPort.portNum,
                portArr = [];
            for(let i = 1; i <= maxPort; i++ ) {
                if(this.getDisabled(i)) {
                    continue;
                }
                portArr.push(String(i));
            }
            return portArr;
        },
        selectAllPort() {
            this.isSelected = !this.isSelected;

            if(this.isSelected) {
                this.dataPort.val = this.getAllPort();
            } else {
                this.dataPort.val = [];
            }
        }
    }
};
</script>

<style lang="scss">
.form-port-content {
    text-align: center;
    position: relative;
    &.bottm-50 {
        margin-bottom: 50px;
    }
}
.form-port-list {
    display: inline-block;
    padding: 10px 20px;
    border: 1px solid #ccc;
    position: relative;
    .select-all-group {
        position: absolute;
        top: 100%;
        margin: 10px 0;
        left: 0;
    }
}
.form-console-group {
    display: inline-block;
    position: relative;
    left: 14px;
    .port-legend {
        text-align: left;
        position: absolute;
        top: -60px;
        .form-port-group {
            width: auto;
            transform: scale(0.8);
        }
    }
    .port-text {
        font-size: 1.2rem;
    }
}
.form-port-group {
    margin: 6px 10px;
    text-align: center;
    display: inline-block;
    width: 30px;
    .form-port-list > &:nth-child(4n) + .form-port-group {
        margin-left: 24px;
    }
    .port-content {
        font-size: 0;
        cursor: pointer;
        & + .port-content {
            margin-top: 8px;
        }
        &.active {
            .form-port-top,
            .form-port-body {
                background: $success-color;
                border-color: $success-color;
            }
        }
        &.disabled {
            .form-port-top,
            .form-port-body {
                background: $light-color;
                border-color: $light-color;
            }
        }
    }

    .form-port-top {
        width: 22px;
        height: 6px;
        background: #000;
        display: inline-block;
        border: 1px solid #000;
    }
    .form-port-body {
        width: 30px;
        height: 20px;
        background: #000;
        margin: 0 auto;
        border: 1px solid #000;
    }
}
</style>