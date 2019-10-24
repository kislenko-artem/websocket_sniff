<template>
  <div class="ws_detail">
    <div 
      v-if="editMode == false" 
      class="ws_detail_show">
      <div class="detail_header">
        Data
        <div class="collapse">
          <button @click="hide">»</button>
        </div>
      </div>
      <div 
        v-if="isJson == true" 
        class="detail_center">
        <vue-json-pretty
          :deep="4"
          :data="itemVirtualData"/>
      </div>
      <div 
        v-else 
        class="detail_center">
        <textarea 
          v-model="tempData" 
          style="width: 100%; height: 100%"/>
      </div>
      <div class="detail_footer">
        <!--  <button v-on:click="edit()">Edit and Send</button> !-->
      </div>
    </div>
    <div 
      v-else 
      class="ws_detail_show">
      <div class="detail_header">
        Data
        <div class="collapse">
          <button @click="editMode = false">x</button>
        </div>
      </div>
      <div class="detail_center">
        <textarea 
          v-model="tempData" 
          style="width: 100%; height: 100%"/>
      </div>
      <div class="detail_footer">
        <button @click="send()">Send (new session)</button>
      </div>
    </div>
  </div>
</template>

<script src="./detail.js"></script>

<style scoped lang="less" src="./detail.less"></style>


