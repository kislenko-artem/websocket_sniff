import VueJsonPretty from 'vue-json-pretty';


export default {
    name: "Detail",
    components: {
        VueJsonPretty
    },

    data() {
        return {
            editMode: false,
            tempData: String,
            isJson: false
        };
    },
    props:
        {
            itemData: {
                type: String,
                default: {}
            },
        },
    computed: {
        itemVirtualData() {
            return JSON.parse(this.itemData);
        },

    },
    watch: {
        itemData() {
            try {
                let t = JSON.parse(this.itemData);
                this.tempData = JSON.stringify(t, null, 4);
                this.isJson = true;
            } catch (e) {
                this.tempData = this.itemData;
                this.isJson = false;
            }
        }

    },
    created() {
        try {
            let t = JSON.parse(this.itemData);
            this.tempData = JSON.stringify(t, null, 4);
            this.isJson = true;
        } catch (e) {
            console.log('error');
            this.tempData = this.itemData;
            this.isJson = false;
        }
    },

    methods: {
        edit() {
            this.editMode = true;
        },
        send() {
            this.$emit('ws_send', this.tempData);
        },
        hide() {
            this.$emit('hide_detail');
        }
    },


};

