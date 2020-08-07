<template>
  <div id="vouchRevokeCheckList" >
     <innerTab  :tabs="tabs" @selectCallback="selectCallback" ></innerTab>
     <component :is="componentName" @openTab="openTab" :revokeFlag="revokeFlag"></component>
  </div>
</template>

<script>
import vouchRevokeCheck from './vouchRevokeCheck.js'
export default vouchRevokeCheck
</script>
<style lang="scss">
</style>