<template>
    <div class="row" v-bind:class="{ active: isActive}" style="width: 100%">
        <div class="type" v-html = "typeFormatter(item.type)"></div>
        <div class="data" v-on:click="sendDetail(item.data)">
            {{item.formatted_data}}
        </div>
        <div class="length">{{item.length}}</div>
        <div class="time">{{item.formatted_time}}</div>
    </div>
</template>

<script>
    export default {
        data: function () {
            return {
                isActive: false
            }
        },
        methods: {
            typeFormatter(type) {
                const types =
                    {
                        "from_websocket": "<span style = 'color:red'> ↓  </span>",
                        "to_websocket": "<span style = 'color:green'> ↑ </span>"
                    };

                return types[type];
            },
            sendDetail(data) {
                this.isActive = true;
                this.detail(data);
            }
        },
        props: {
            item: Object,
            detail: Function
        }
    }
</script>

<style scoped lang="less" src="@/components/ws_row/ws_row.less"/>