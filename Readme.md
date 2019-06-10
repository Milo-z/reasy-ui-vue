### 数据验证

输入框和自定义下拉框可定义数据验证函数，内部已集成数据验证，但未定义数据验证的类型。

如需定义数据验证类型，需在`Vue.prototype`上定义`$valid`属性，
值为对象，如

	let valid = {
		num: {
			all: function(str, min, max) {

	            if (!(/^([-0-9])?([0-9]+)$/).test(str)) {
	                return "必须输入数字";
	            }

	            if (min && max) {
	                if (parseInt(str, 10) < min || parseInt(str, 10) > max) {
	                    return _("输入范围: %s - %s", [min, max]);
	                }
	            }
	        }
		}
	
	}
	Vue.prototype.$valid = valid;
	

	//or

	let valid = {

		num: function(str, min, max) {

            if (!(/^([-0-9])?([0-9]+)$/).test(str)) {
                return "必须输入数字";
            }
	
            if (min && max) {
                if (parseInt(str, 10) < min || parseInt(str, 10) > max) {
                    return _("输入范围: %s - %s", [min, max]);
                }
            }
		}
	
	}

	Vue.prototype.$valid = valid;

#### 单个数据的验证

调用Vue的全局函数 `$checkData`，参数为组件的对象

返回为当前数据是否正确，错误时返回false，并将组件对象的error属性修改为错误的信息。


示例：

	let dataKey = {
		error: "",
		required: true,
		val: "1a",
		maxlength: 3,
		valid: {
			type: "num",
			args: [1, 200]
		}
	}

	//Vue 组件内部调用
	let success = this.$checkData(dataKey);
	if(success) {
		//your code
	}

上述例子错误，dataKey.error会被赋值 自定义验证函数返回的值

#### 多组数据验证

调用Vue全局函数 `$checkAll`，

参数为多组单个组件的合集，当前仅支持对象方式，后续可以扩展成数组合集

返回值为Boolean， true表示验证通过； false表示验证错误

支持验证对象，key为数据字段，值为数据对象的配置，如：

	<template>
	    <div>  
	        <v-group title="发送间隔时间">
	            <v-input :data-key="formData.sendInterval"></v-input>
	            <span>s</span>
	            <span class="text-light">(范围：5-32768)</span>
	        </v-group>
	        <v-group title="TTL乘数">
	            <v-input :data-key="formData.ttlNum"></v-input>
	            <span>s</span>
	            <span class="text-light">(范围：2-10)</span>
	        </v-group>
	
	        <v-group title="发送延迟时间">
	            <v-input :data-key="formData.sendDelayTime"></v-input>
	            <span>s</span>
	            <span class="text-light">(范围：1-8192 , 发送延迟时间≤发送间隔时间/4)</span>
	        </v-group>
	        <v-group title="初始化延迟时间">
	            <v-input :data-key="formData.intDelayTime"></v-input>
	            <span>s</span>
	            <span class="text-light">(范围：1-10)</span>
	        </v-group>
	        
	        <v-group title=" ">
	            <v-button css="btn-primary" title="确定" :callback="submit"></v-button>
	        </v-group>
	
	    </div>
	</template>
	<script>
	export default {
	    data() {
	        return {
	            formData: {
	                sendInterval: {
	                    maxlength: 5,
	                    valid: {
	                        type: "num",
	                        args: [5, 32768]
	                    }
	                },
	                ttlNum: {
	                    maxlength: 2,
	                    valid: {
	                        type: "num",
	                        args: [2, 10]
	                    }
	                },
	                sendDelayTime: {
	                    maxlength: 4,
	                    valid: {
	                        type: "num",
	                        args: [1, 8192]
	                    }
	                },
	                intDelayTime: {
	                    maxlength: 2,
	                    valid: {
	                        type: "num",
	                        args: [1, 10]
	                    }
	                }
	            }
	        };
	    },

	    methods: {
	        submit() {
	            let checkSuccess = this.$checkAll(this.formData);
	
	            if(!checkSuccess) {
	                return;
	            }
	            //your code
	        }
	    }
	};
	</script>

 

### Table表格

配置属性

`<v-table :tableOptions="xxx" @on-custom-comp="xxxxx" :callback="xxxxxx">`

- tableOptions  Object 表格配置对象
- @on-custom-comp  Function 表格自定义数据
- callback Function 表格初始化后的回调，参数为当前页面的数据

tableOptions对象

| 参数 | 类型 | 默认值 |意义
|---|----|----|----
|originData| Array | [] | 表格原始数据
|show |Boolean | true | 表格是否显示
|css | String | | 表格自定义样式
|key | String | | 表格数据的关键字，用于查找和匹配数据，每组数据的唯一标识符
|maxTableRow  | Number| 10 | 表格显示多少行，超过行数时显示滚动条
|showPage | Boolean | false | 是否支持分页显示
|pagePer | Number | 10 | 每页多少条
|search | Boolean | false | 是否支持搜索
|placeholder | String |  | 搜索框的占位符，为空时会取支持搜索列的title，再以 "/" 合并
|selectBox | Boolean | false | 第一列是否是复选框
|secondColumns | Array | | 表格第二个title
|columns | Array | | 表头信息


secondColumns

| 参数 | 类型 | 默认值 |意义
|---|----|----|----
|width | String   | | 宽度
|colspan | Number | | 占几列
|rowspan | Number | | 占几行
|title   | String | | 文字显示 

columns

| 参数 | 类型 | 默认值 |意义
|---|----|----|----
|title | String|  | 表头文字
|field | String | | 表格字段
|width | String | | 列宽度
|search | Boolean | | 此列是否支持搜索
|sort | Boolean | | 此列是否支持排序
|format | Function | | 数据转换函数，必须有返回值<br>第一参数为改字段的值<br>第二参数为此行的数据<br>返回值为当前显示
|parseHtml | Boolean | false | 是否显示以html显示
|componentName | String | | 自定义组件名称，必须为全局组件<br>其中事件处理必须触发`on-custom-comp`父组件的事件

自定义组件中可以从父组件获取到的值为

| 参数 | 类型 | 默认值 |意义
|---|----|----|----
|action | Any | | 自定义的字段，用于自定义组件传值
|rowData | Object | |当前行的数据
|originData | Object | |当前行的原始数据
|field | String | | 当前行列的字段
|keyword | String | | 关键字，等于表格插件的key
|index | Number | | 当前行数 

* 当selectBox为true时， 列表第一项为checkbox

* 点击事件必须执行表格的自定义事件 on-custom-comp，传参type值为checkbox，
事件处理都交付于父组件的`on-custom-comp`的事件处理，表格列中自定义组件示例如下


		表格中colums的配置
		colums: [{
			componentName: "table-operation"
		}]
		
		// 全局自定义列组件
		Vue.component('table-operation', {
		    template:`<div>
		    	<a href="" @click.stop.prevent="update(rowData,field)">编辑</a>&nbsp;
		    	<a href="" @click.stop.prevent="deleteRow(rowData,field)">删除</a>
		    </div>`,
		    props:["rowData", "field", "index", "tableData"],
		    methods:{
		        update(rowData, field){
		
		          console.log("xxxx");
		        },
		
		        deleteRow(){
		
		            // 参数根据业务场景随意构造
		            let params = {type:'delete',index: this.index};
		            this.$emit('on-custom-comp',params); //必须 触发表格的自定义事件
		
		        }
		    }
		});

callback 表格更新后的回调

* 如果表格某行需要禁用checkbox时，只需给此行数据增加 hasCheckbox

checkbox 中 on-custom-comp 事件中，参数为对象，其属性为

| 参数 | 类型 | 默认值 |意义
|---|----|----|----
|type | string | | 事件处理的标志，复选框时 值为checkbox，全选时为selectAll，其他需用户自定义
|index | Number | | 当前第几个
|rowData | Object | | 此行的数据（经过format转换后的数据）
|originData | Object | | 原始数据 


见下示例中的`customCompFunc`

使用示例：

	<template>
		<v-table ref="table" 
				:tableOptions="tableData" 
				@on-custom-comp="customCompFunc"
				:callback="afterUpdateTable">
		</v-table>
	</template>

	<script>
		export default {
		    data() {
		        return {
		            tableData: {
		                key: "vlanId",
		                css: "table-group",
		                selectBox: true,
		                columns: [
		                    {
		                        title: "VLAN ID",
		                        field: "vlanId"
		                    },
		                    {
		                        title: "服务器IP",
		                        field: "serverIp",
		                        format(data) {
		                            return data.join("/");
		                        }
		                    }
		                ]
		            }
				}
			},
			mounted() {
				//此处通过ajax获取数据，然后给 this.tableData.originData赋值
				//this.tableData.originData = your data list;
			},
			methods: {
				customCompFunc(options) {
		            switch (options.type) {
		                
		                //选中单个
		                case "checkbox":
		                    this.clickSelectBox(options);
		                    break;
		                //全选
		                case "selectAll":
		                    this.clickSelectedAll(options);
		                    break;
		            }
		        },
				clickSelectBox(options) {
					//your code
				},
				clickSelectedAll(options) {
					//your code
				},
				afterUpdateTable(pageData) { //当前页面的数据

					pageData.forEach(item => {
						if(item.vlanId == "0") {
							item.hasCheckbox = false;// 禁用checkbox
						}
					})
					//表格更新后的回调
				}
			}
		}
	</script>

* 表格操作事件处理主要是执行表格的 on-custom-comp事件，通过参数类型（type）不同处理不同的事件

### 下拉框

支持下拉框自定义和手动输入


| 参数 | 类型 | 默认值 |意义
|---|----|----|----
|required | Boolean | true | 是否必须输入
|css | String | | 样式
|show | Boolean | true | 是否显示
|ignore | Boolean | false | 是否忽略验证，也可用于保存时不提交此项
|disabled | Boolean | false | 是否禁用
|hasManual | Boolean | false | 是否支持手动输入
|manualText | String | 自定义| 手动输入时，下拉列表手动输入的文字
|maxlength | Number | | 手动输入时最大输入长度
|error | String | | 错误信息
|name | String | | 下拉框的name，用于自动化
|defaultVal | String | | 下拉框的默认值
|immediate | Boolean | true | 是否立即执行回调函数
|sortArray | Array | | 下拉框列表
|val | String | | 下拉框值
|valid | Array | | 自定义数据时的验证类型（详情见输入框）
|changeCallBack | Function | | 值被修改后执行的回调，参数为下拉框的值
|beforeChange | Function | | 值修改之前执行的函数，返回false时不会执行changCallBack，其他则执行


sortArray的两种配置

- 当  显示的文字和值一致时，可以配置为 sortArray = ["option1", "option2"]

- 另一种为 对象配置 value：下拉选项的值   title：下拉选项的文字显示

如：sortArray = [{value: "1", title: "option1"},{value: "2", title: "option2"}]

示例

	<template>
		<v-select :data-key="select"></v-select>
	</template>
	<script>
	export default {
		data() {
			return {
				select: {
					val: "",
					hasManual: true,
					manualText: "手动设置",
					sortArray:[{
						title: "这是什么选项",
						value:  "1"
					},{
						title: "你在干吗",
						value:  "2"
					},{
						title: "option 3",
						value:  "3"
					}],
					valid: {
						type: "ascii"
					},
					changeCallBack: this.selectCallBack
				}
			}
		},
		methods: {
			selectCallBack(selectVal) {
		
			}
		}
	}
	</script>

* 注意： 当hasManual=true时，不会立即执行changeCallBack

* beforeChange： 当返回false时，不会执行changeCallBack

* 选择手动输入时，值为 -1，后续扩展成传参

### 复选框

支持单个复选框和多个复选框，使用属性为 :data-key="xxxx"


| 参数 | 类型 | 默认值 |意义
|---|----|----|----
|required | Boolean | false | 是否必须有值
|css | String | | 样式
|show | Boolean | true | 是否显示
|ignore | Boolean | false | 是否忽略验证，也可用于保存时不提交此项
|disabled | Boolean | false | 是否禁用，禁用所有
|val | String or Array | | 值
|name| String | | 组件名称
|values | Array | [true, false] | 选中或不选中的值  第一项为选中的值  第二项为不选中的值
|error | String | | 错误信息
|hasSelectAll | Boolean | false | 是否有全选，多项时有效
|sortArray | Array | | 选项列表
|changeCallBack | Function | | 修改数据后的函数，参数为复选框的值


sortArray数组字段

| 参数 | 类型 | 默认值 |意义
|---|----|----|----
|title | String | | 选项的文字
|value | String | | 选项的值
|disabled | Boolean | false | 是否禁用此项，当全局disabled时，全部禁用

* val 当选项只有一个时，值为String， 当选项多个时，返回的是选中后的值组成的数组
* hasSelectAll 是否有全选，适用于多个复选框



示例

	<template>
		<v-checkbox :data-key="checkbox"></v-checkbox>
	</template>
	<script>
	export default {
		data() {
			return {
				checkbox: {
					sortArray: [{
						value: "2",
						title: "label 2"
					},{
						value: "0",
						title: "label 0",
						disabled: true
					},{
						value: "1",
						title: "label 1"
					}],
					changeCallBack(value) {
						console.log("checkbox value ",value);
					}
				}
			}
		}
	}

	</script>
	


### 单选按钮

组件示例`<v-radio :data-key="xxx"></v-radio>`

配置属性字段如下


| 参数 | 类型 | 默认值 |意义
|---|----|----|----
|required | Boolean | true | 是否必须有值
|css | String | | 样式
|show | Boolean | true | 是否显示
|ignore | Boolean | false | 是否忽略验证，也可用于保存时不提交此项
|disabled | Boolean | false | 是否禁用，禁用所有
|val | String or Array | | 值
|name| String | | 组件名称
|error | String | | 错误信息
|sortArray | Array | | radio选项
|changCallBack | Function | | 修改选项后的回调事件

sortArray 条目的对象如下

| 参数 | 类型 | 默认值 |意义
|---|----|----|----
|value  | String | | 选项的值
|title  | String | | 选项显示的文字
|disabled |Boolean | false | 是否禁用此项，不是必须配置



示例

	<template>
		<v-radio :dataKey="radio"></v-radio>
	</template>

	<script>
	
	export default {
		data() {
			return {
				radio: {
					sortArray: [{
						value: "2",
						title: "label 2"
					},{
						value: "0",
						title: "label 0",
						disabled: true
					},{
						value: "1",
						title: "label 1"
					}],
					changeCallBack(value) {
						console.log("radio value ",value);
					}
				}
			}
		}
	}	
	</script>
	

### 输入框

配置

	required: false,
    css: "", //样式
    show: true, //是否显示
    ignore: false, //是否忽略
    disabled: false, //是否禁用
    maxlength: "",
    type: "text",
    placeholder: "",
    hasEye: "",
    val: "", //组件value
    error: "", //错误标志
    valid: [ //
        /*{
            type: "ssid",
            args: [1, 2]
        }*/
    ]


valid 为单个验证时，可以为对象，如

	valid: {
		type: "num",
		args: [1,100]
	}


示例
	
	<v-input :dataKey="login"></v-input>

	login: {
		css: "input-small",
		title: _("Login"),
		placeholder: "Login Password",
		key: "",
		type: "password",
		valid: {
			type: "ascii"
		}
	},




### 开关

默认值

	css: "", //样式
    show: true, //是否显示
    ignore: true, //是否忽略
    disabled: false, //是否禁用
    val: "", //组件id
    values: [true, false],
    title: "", //描述
    changeCallBack: function() {}


示例
	
	<v-switch :dataKey="formData.switch" ></v-switch>

	switch: {
		val: false,
		changeCallBack(value) {
			console.log("开关 value ",value);
		}
	}

### 按钮

	开放接口：

	callback: 点击后执行事件 
	title： 按钮文字
	css： 按钮样式
	show： 是否显示，默认显示

	<v-button title="确定" :callback="showDialog" css="btn-primary" show="true"></v-button>

### 滑块
	
配置属性

	min： 最小值
	max： 最大值
	value： 当前值 
	
	<v-slider min="1" max="23" v-model="3"></v-slider>
	

### 组

	属性：

	title: 左边文字
	css: 样式

	<v-group title="复选框" class="xxxx">
		xxxxx
	</v-group>

### 提示信息
	
	指令：
	v-tooltip="xxxx" 
	xxxx: 显示的提示文字

### 弹出层

	
	<div>
		<v-dialog :dialog="dialog">
			<div>Login XXX1</div>
		</v-dialog>
	</div>

	配置

	required: false,
    css: "", //样式
    title: "",
    hasCancel: true, //是否有取消按钮
    okText: "确定",
    cancelText: "取消",
    show: true, //是否显示
    ignore: true, //是否忽略
    okCallBack: function() {},
    cancelCallBack: function() {}


### 消息提示

	1、确认框
	this.$confirm(msg).then(function() {
		//点击确定动作	
		}).catch(function() {
		//点击取消动作
		});
	2、警告框
	
	this.$confirm(msg).then(function() {
		//点击确定动作	
		})；
	
	msg: string or object

	object {
		css: "", //样式
	    title: "",
	    hasCancel: true, //是否有取消按钮
	    okText: "确定",
	    cancelText: "取消",
	    show: true, //是否显示
	    ignore: true, //是否忽略
	    okCallBack: function() {},
	    cancelCallBack: function() {}
	} 

	3、提示框

	this.$message(msg, time);

	msg: string or dom节点
	time: 显示时间

### 端口配置

	show: true, //是否显示
    singleVal: false, //是否只允许单个端口
    portNum: 28, //端口总数量
    consolePort: 4, //console 端口个数
    val: []，
	isClick: true, //是否支持点击
	disabled: [], //禁用的端口
	legend: false //是否支持图标类型显示

	<v-port :data-port="port"></v-port>

	port: {
		portNum: 28,
        consolePort: 4,
        val: ["3"]
	}


	 
