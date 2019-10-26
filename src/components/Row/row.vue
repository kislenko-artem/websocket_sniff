<template>
    <div
            :class="{ active: isActive}"
            class="row"
            style="width: 100%">
        <div
                class="type"
                v-html="typeFormatter(item.type)">
        </div>
        <div
                class="data"
                @click="sendDetail(item.data)">
            {{ item.formattedData }}
        </div>
        <div class="length">{{ item.length }}</div>
        <div class="time">{{ item.formattedTime }}</div>
    </div>
</template>

<script>
    export default {
        props: {
            item: {
                type: Object,
                required: true
            },
            detail: {
                type: Function,
                required: true
            }
        },
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

                // demarked active row
                for (let key in this.$parent.$children) {
                    const el = this.$parent.$children[key];
                    if (el.$data.isActive === undefined) {
                        continue
                    }
                    el.$data.isActive = false;
                }

                // marked active row
                this.isActive = true;

                // show detailed
                this.detail(data);
            }
        },
    };
</script>

<style scoped lang="less" src="./style.less"></style>