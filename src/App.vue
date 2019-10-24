<template>
  <div id="app">
    <Grid
      :ws-frames="wsFrames"
      @remove_all="remove_all"
      @ws_send="ws_send"></Grid>
  </div>
</template>

<script>
    import Grid from './components/Grid/grid';

    export default {
        name: 'Home',
        components:
            {
                Grid: Grid
            },
        data() {
            return {
                wsFrames: []
            };
        },
        methods: {
            remove_all() {
                this.wsFrames = [];
            },
            ws_send(item_data) {
                let d;
                try {
                    d = JSON.stringify(JSON.parse(item_data));
                } catch (e) {
                    d = item_data.toString();
                }

                this.wsFrames.push({
                    type: 'to',
                    data: d,
                    length: item_data.length,
                    from_devtools: true,
                    time: new Date()
                });
            }

        },
    };
</script>

<style>

    body {
        padding: 0;
        margin: 0;
        font-family: 'helvetica neue', helvetica, arial, 'lucida grande', sans-serif;
        font-size: 12px;
    }

    #app {
        display: flex;
        flex-flow: row wrap;
        /*align-items: center;*/
        align-content: center;
        justify-content: space-between;
    }

    .grid {
        width: inherit;
        display: flex
    }

    .frame {
        width: 35%;
        display: flex;
        align-items: baseline;
        margin-top: 10px;
        position: fixed;
        right: 0px;
        top: 40px;
        height: 100%;
    }


</style>
