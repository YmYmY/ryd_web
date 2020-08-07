<template>
    <div id="stowageInfo"  class="stowageInfoPage">
        <table class="tableCommon" width="100%" border="0" cellspacing="0" cellpadding="0">
          <thead>
              <tr>
                  <th width="60">序号</th>
                  <th width="100">配载类型</th>
                  <th width="100">批次号</th>
                  <th width="100">配载件数</th>
                  <th width="100">配载时间</th>
                  <th width="300">配载信息</th>
                  <th width="100">发车区域</th>
                  <th width="200">目的区域</th>
                  <th width="100">费用（分摊运费）</th>
                  <th width="100">配载人</th>
              </tr>
          </thead>
          <tbody>
               <!-- v-for="(data,index) in tableData" :key="index" -->
              <tr>
                  <td width="60">1</td>
                  <td width="100">干线配载</td>
                  <td width="100">123</td>
                  <td width="100">166</td>
                  <td width="100"></td>
                  <td width="100">粤A12345（粤C1234挂），张三，13813801389</td>
                  <td width="100">广州区域</td>
                  <td width="100">东莞区域、厦门区域、杭州区域</td>
                  <td width="100">100</td>
                  <td width="100">张三</td>
              </tr>
          </tbody>
      </table>
    </div>
</template>

<script>
    export default {
        name: 'demo',
        data() {
            return {
                
            }
        },
        mounted() {
            
        },
        methods: {
            
        },
    }
</script>
<style lang="scss">
    .stowageInfoPage{
        overflow: auto;
        padding-bottom: 20px;
    }
</style>