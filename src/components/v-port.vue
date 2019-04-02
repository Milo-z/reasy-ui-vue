<template>
    <div class="form-port-content form-group">
        <div class="form-port-list">
            <div class="form-port-group" v-for="item in portList" :key="item.index[0]">
                <span>{{item.index[0]}}</span>
                <div class="port-content" @click="clickPort(item.index[0])" :class='{"active": getChecked(item.index[0])}'>
                    <div class="form-port-top"></div>
                    <div class="form-port-body"></div>
                    
                </div>
                
                <div class="port-content" @click="clickPort(item.index[1])" :class='{"active": getChecked(item.index[1])}'>
                    <div class="form-port-top"></div>
                    <div class="form-port-body"></div>
                </div>
                <span>{{item.index[1]}}</span>
                
            </div>

            <div class="form-port-group" v-for="item in consoleList" :key="item.index">

                <div class="port-content" @click="clickPort(item.index)" :class='{"active": getChecked(item.index)}'>
                    <div class="form-port-body"></div>
                </div>
                <span>{{item.index}}</span>
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
    val: []
};
export default {
    name: "v-port",
    props: ["dataPort"],
    created() {
        this.dataPort = this.setOptions(this.dataPort, defaults);
        let portIndex = (this.dataPort.portNum - this.dataPort.consolePort) / 2;
        for(let i = 0; i < portIndex; i++) {
            this.portList.push({
                index: [String((i+1) * 2 - 1), String((i+1) * 2)]
            });
        } 

        for(let i = 0; i < this.dataPort.consolePort; i++) {
            this.consoleList.push({
                index: String(this.dataPort.portNum - this.dataPort.consolePort + i+1)    
            });
        }

    },
    data() {
        return {
            portList: [],
            consoleList: []
        };
    },
    methods: {
        getChecked(portIndex) {
            return this.dataPort.val.indexOf(portIndex) != -1;
        },
        clickPort(portIndex) {
            let index = this.dataPort.val.indexOf(portIndex);
            if(!this.singleVal) {
                if(index == -1) { //不存在
                    this.dataPort.val.push(portIndex);
                } else {
                    this.dataPort.val.splice(index, 1);
                }
            } else {
                if(index == -1) { //不存在
                    this.dataPort.val = [portIndex];
                } else {
                    this.dataPort.val = [];
                }
                
            }
        }
    }

};
</script>

<style lang="scss">
    .form-port-content {
        text-align: center;
    }
    .form-port-list {
        display: inline-block;
        padding: 10px 20px;
        border: 1px solid #ccc;
    }
    .form-port-group {
        margin: 6px 10px;
        text-align: center;
        display: inline-block;
        width: 30px;
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
                }
                
            }
        }
        
        .form-port-top {
            width: 22px;
            height: 6px;
            background: #000;
            display: inline-block;
            
        }
        .form-port-body {
            width: 30px;
            height: 20px;
            background: #000;
           
        }
    }
</style>