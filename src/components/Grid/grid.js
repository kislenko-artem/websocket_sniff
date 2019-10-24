import wsDetail from "../../components/Detail/detail";
import wsRow from "../../components/Row/row";

export default {
    name: 'WebSocket_Grid',
    data: function () {
        return {
            filterType: 'all',
            filterRegexp: '',
            filterLength: '',
            uiDetail: false,
            active: true,
            autoScroll: true,
            autoScrollByAuto: false,
            uiClass: 'max',
            currentData: {}
        };
    },
    components: {wsDetail, wsRow},
    props:
        {
            wsFrames:
                {
                    type: Array,
                    default: []
                },
        },
    computed:
        {
            virtual_data() {

                return this.wsFrames.filter(function (item) {
                    let regexp = RegExp(this.filterRegexp);

                    if ((this.filterRegexp.length > 0) && (!regexp.test(item.data) == true)) {
                        return;
                    }

                    if ((this.filterLength.length > 0) && (!filter_by_length(item.length, this.filterLength))) {
                        return;
                    }
                    if (((this.filterType !== 'all') && (item.type !== this.filterType))) {
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
        uiDetail(status) {
            this.uiClass = (status) ? 'min' : 'max';

        }
    },
    methods:
        {
            clearAll() {
                this.$emit('remove_all');
            },
            changeAutoScroll() {
                this.autoScroll = !this.autoScroll;
            },
            wsSend(data) {
                this.$emit('ws_send', data);
            },
            newDataNotify(data) {
                const container = this.$el.querySelector("#websocket_log_table");
                if (this.autoScroll) {
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
            showEditWindow(data) {
                console.log('data:');
                console.log(data);
            },
            clearFilters() {
                this.filterType = 'all';
                this.filterRegexp = '';
                this.filterLength = '';
                this.uiClass = 'max';
            },
            detail(data) {
                if (this.autoScroll) {
                    this.autoScrollByAuto = true;
                }
                this.autoScroll = false;
                this.uiDetail = true;

                this.currentData = data;


            },
            hideDetail() {
                this.uiDetail = false;
                if (this.autoScrollByAuto) {
                    this.autoScrollByAuto = false;
                    this.autoScroll = true;
                }
            },
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