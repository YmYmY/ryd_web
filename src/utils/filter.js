import Vue from 'vue'

Vue.filter('double', function(value) {
    let realVal = ''
    if (value) {
        realVal = parseFloat(value).toFixed(2)
    }else{
        realVal = 0.00
    }
    return realVal
})