<template>
  <div :class="uiClass">
    <div
      id="grid"
      :class="uiClass"
      class="grid">
      <div
        :class="uiClass"
        class="tools">
        <div class="wrap">
          <div class="cell clear_all">
            <button @click="clearAll()">&#128465</button>
          </div>
          <div class="cell">
            <label
              for="auto-scroll"
              @click="autoScroll()">AutoScroll</label>
            <input
              id="auto-scroll"
              v-model="autoScroll"
              :checked="autoScroll"
              type="checkbox"
              @click="changeAutoScroll()">
          </div>
          <div class="cell">
            <select v-model="filterType">
              <option value="all">all types</option>
              <option value="from_websocket">only from</option>
              <option value="to_websocket">only to</option>
            </select>
          </div>
          <div class="cell">
            <input
              v-model="filterRegexp"
              style="width: 300px"
              type="text"
              placeholder="Filter (you can use regex)">
            &nbsp; &nbsp;
            <input
              v-model="filterLength"
              style="width: 200px"
              type="text"
              placeholder="Length (<>)">
            <button
              id="clear-filters"
              style="width: 100px"
              @click="clearFilters()">&#10060;</button>
          </div>
        </div>
        <div class="row header">
          <div class="type">Type</div>
          <div class="data">Data</div>
          <div class="length">Length</div>
          <div class="time">Time</div>
        </div>
      </div>
      <div id="websocket-log-table">
        <Row
          v-for="(item, index) in virtualData"
          :item="item"
          :detail="detail"
          class="rows"
          :key="uniqID(item)"
        />
      </div>
    </div>
    <div
      v-if="uiDetail"
      class="frame">
      <Detail
        :itemData="currentData"
        @showEditWindow="showEditWindow"
        @wsSend="wsSend"
        @hideDetail="hideDetail"
      />
    </div>
  </div>
</template>

<script src="./script.js"></script>

<style scoped lang="less" src="./style.less"></style>

