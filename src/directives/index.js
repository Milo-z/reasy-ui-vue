import Tooltip from '../components/v-tooltip';
const install = function (Vue) {
    const TooltipBox = Vue.extend(Tooltip);
    let tooltipBox = new TooltipBox(),
        msgBoxEl = tooltipBox.$mount().$el;

    document.body.appendChild(msgBoxEl);
    let directiveConfig = {
        // 注册一个局部的自定义指令 v-focus
        focus: {
            // 指令的定义
            inserted: function (el) {
                // 聚焦元素
                el.focus();
            }
        },
        tooltip: {
            bind(el, binding, vnode) {

            },
            inserted(el, binding, vnode) {
                el.addEventListener("mouseenter", function (event) {

                    tooltipBox.parseHtml = !!this.getAttribute("parse-html");
                    if(binding.value) {
                        tooltipBox.content = binding.value;
                    } else {
                        if(this.querySelector("[v-tooltip]")) {
                            tooltipBox.content = this.querySelector("[v-tooltip]").getAttribute("v-tooltip");
                        } else {
                            tooltipBox.content = "";
                        }
                    }
                    
                    tooltipBox.left = event.pageX;
                    tooltipBox.top = event.pageY; //当前位置 - 目标高度
                    tooltipBox.relativeWidth = event.target.offsetWidth;
                    tooltipBox.relativeHeight = event.target.offsetHeight;
                    tooltipBox.show = true;
                    tooltipBox.updatePosition();
                    //console.log("event.relatedTarget", vnode.context);
                    //vnode.context[binding.expression](event);

                });
                el.addEventListener("mouseleave", function (event) {
                    tooltipBox.show = false;
                });


            }
        }
    };

    for (let Vname in directiveConfig) {
        Vue.directive(Vname, directiveConfig[Vname]);
    }


    //过滤器
    Vue.filter('upperCase', function (value) {
        if (!value) return '';
        return value.toUpperCase();
    });
};

export default {
    install
};