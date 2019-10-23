<div v-bind:class="ui_class">
    <div  class="grid" v-bind:class="ui_class" id="grid">

        <div class="tools" v-bind:class="ui_class">

            <div class="wrap">
                <div class="cell clear_all">
                    <button v-on:click="clear_all();">Clear All</button>
                </div>
                <div class="cell">
                <label for="auto_scroll" v-on:click="auto_scroll();">AutoScroll</label>
                <input v-model="auto_scroll" type="checkbox" id = "auto_scroll"  v-on:click="change_auto_scroll();"
                	:checked = "auto_scroll"/>

                </div>
                <div class="cell">

                    <select v-model="filter_type">
                        <option value='all'>All</option>
                        <option value="from">From</option>
                        <option value="to">To</option>

                    </select>
                </div>
                <div class="cell">
                    <input v-model="filter_regexp" style="width: 300px" type="text"
                           placeholder="Filter (you can use regex)">
                    &nbsp; &nbsp;
                    <input v-model="filter_length" style="width: 200px" type="text" placeholder="Length (<>)">


                    <button id="clear_filters" style="width: 100px" v-on:click="clear_filters();">Clear filters</button>
                </div>
            </div>
            <div class="row header">
                <div class="type">Type</div>
                <div class="data">Data</div>
                <div class="length">Length</div>
                <div class="time">Time</div>
            </div>
        </div>
        <div id="websocket_log_table">
        	<ws_row  v-for="(item, index) in virtual_data" :item="item" :detail="detail"/>
        </div>

    </div>

    <div  class="frame"  v-if = "ui_detail">
        <ws_detail  v-bind:item_data="current_data"
                    v-on:show_edit_window = "show_edit_window"
                    v-on:ws_send = "ws_send"
                    v-on:hide_detail = "hide_detail"
        />
    </div>

</div>
