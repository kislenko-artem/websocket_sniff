import ws_detail from "@/components/ws_detail/ws_detail.vue";
import ws_row from "@/components/ws_row/ws_row.vue";

export default {
    name: 'WebSocket_Grid',
    data: function () {


        return {
            filter_type: 'all',
            filter_regexp: '',
            filter_length: '',
            ui_detail: false,
            active: true,
            auto_scroll: true,
            auto_scroll_by_auto: false,
            ui_class: 'max',
            current_data: {}
        };
    },
    components: {ws_detail, ws_row},
    props:
        {
            ws_data:
                {
                    type: Array,
                    default: []
                },
        },
    computed:
        {
            virtual_data() {

                return this.ws_data.filter(function (item) {
                    let regexp = RegExp(this.filter_regexp);

                    if ((this.filter_regexp.length > 0) && (!regexp.test(item.data) == true)) {
                        return;
                    }

                    if ((this.filter_length.length > 0) && (!filter_by_length(item.length, this.filter_length))) {
                        return;
                    }
                    if (((this.filter_type !== 'all') && (item.type !== this.filter_type))) {
                        return;
                    }

                    item['formatted_data'] = (item.data.length > 100) ? item.data.slice(0, 100) + '...' : item.data;


                    let format_min = (item.time.getMinutes().length > 1) ? "0" + item.time.getMinutes() : item.time.getMinutes();
                    let format_hour = (item.time.getHours().length > 1) ? "0" + item.time.getHours() : item.time.getHours();
                    let format_seconds = (item.time.getSeconds().length > 1) ? "0" + item.time.getSeconds() : item.time.getSeconds();

                    item['formatted_time'] = format_hour + ':' + format_min + ':' + format_seconds + '.' + item.time.getMilliseconds();

                    item['class'] = (item.from_devtools) ? 'from_devtools' : '';
                    return item;

                }.bind(this));
            }


        },
    watch: {
        ui_detail(status) {
            this.ui_class = (status) ? 'min' : 'max';

        }
    },
    methods:
        {
            clear_all() {
                this.$emit('remove_all');
            },
            change_auto_scroll() {
                this.auto_scroll = !this.auto_scroll;
            },
            ws_send(data) {
                this.$emit('ws_send', data);
            },
            new_data_notify(data) {
                const container = this.$el.querySelector("#websocket_log_table");
                if (this.auto_scroll) {
                    window.scrollTo(0, container.scrollHeight);
                    return
                }
                const maxItems = this.$parent.$parent.maxItems;
                console.log(maxItems, this.virtual_data.length, window.scrollY);
                if (this.virtual_data.length >= maxItems) {
                    console.log("1", window.scrollY);
                    window.scrollTo(0, window.scrollY-30);
                    console.log("2", window.scrollY);
                }
            },


            show_edit_window(data) {
                console.log('data:');
                console.log(data);
            },
            clear_filters() {

                this.filter_type = 'all';
                this.filter_regexp = '';
                this.filter_length = '';
                this.ui_class = 'max';


            },

            detail(data) {
                if (this.auto_scroll) {
                    this.auto_scroll_by_auto = true;
                }
                this.auto_scroll = false;
                this.ui_detail = true;

                this.current_data = data;


            },

            hide_detail() {

                this.ui_detail = false;
                if (this.auto_scroll_by_auto) {
                    this.auto_scroll_by_auto = false;
                    this.auto_scroll = true;
                }
            },
            show_data() {
                console.log('show_data');
            }
        }
};


function filter_by_length(length, filter_value) {


    length = parseInt(length);


    if (parseInt(filter_value) === filter_value) {
        //it is number
        return parseInt(length) === parseInt(filter_value);

    } else {
        let sign = filter_value.substring(0, 1);

        let real_num = parseInt(filter_value.substring(1, filter_value.length));

        if (isNaN(real_num)) {

            switch (sign) {
                case '>':
                    return length > real_num;
                case '<':
                    return length < real_num;
                default:
                    return true;

            }
        } else {
            return true;
        }

    }
}