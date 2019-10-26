import Detail from "../../components/Detail/detail";
import Row from "../../components/Row/row";

export default {
    name: 'Grid',
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
    components: {Detail, Row},
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
            virtualData() {
                return this.wsFrames.filter(function (item) {
                    let regexp = RegExp(this.filterRegexp);

                    if ((this.filterRegexp.length > 0) && (!regexp.test(item.data) == true)) {
                        return;
                    }

                    if ((this.filterLength.length > 0) && (!filterByLength(item.length, this.filterLength))) {
                        return;
                    }

                    if (((this.filterType !== 'all') && (item.type !== this.filterType))) {
                        return;
                    }

                    item['formattedData'] = (item.data.length > 100) ? item.data.slice(0, 100) + '...' : item.data;


                    let format_min = (item.time.getMinutes().toString().length <= 1) ? "0" + item.time.getMinutes() : item.time.getMinutes();
                    let format_hour = (item.time.getHours().toString().length <= 1) ? "0" + item.time.getHours() : item.time.getHours();
                    let format_seconds = (item.time.getSeconds().toString().length <= 1) ? "0" + item.time.getSeconds() : item.time.getSeconds();

                    item['formattedTime'] = format_hour + ':' + format_min + ':' + format_seconds + '.' + item.time.getMilliseconds();
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
                const container = this.$el.querySelector("#websocket-log-table");
                if (this.autoScroll) {
                    window.scrollTo(0, container.scrollHeight);
                    return
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
            hashCompute(s) {
                let hash = 0, i, chr;
                if (s.length === 0) return hash;
                for (i = 0; i < s.length; i++) {
                    chr   = s.charCodeAt(i);
                    hash  = ((hash << 5) - hash) + chr;
                    hash |= 0; // Convert to 32bit integer
                }
                return hash;
            },
            uniqID(data) {
                let hash = 0, i, chr;
                if (this.length === 0) return hash;
                for (i = 0; i < this.length; i++) {
                    chr   = this.charCodeAt(i);
                    hash  = ((hash << 5) - hash) + chr;
                    hash |= 0; // Convert to 32bit integer
                }

                return this.hashCompute(data.time.getTime().toString()) + "_" + this.hashCompute(data.data);
            }
        }
};


function filterByLength(length, filter_value) {

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