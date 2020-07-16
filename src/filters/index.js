import Vue from 'vue'
import moment from 'moment'


Vue.filter('format-data',function(value){
  return moment(value).format('YYYY-MM--DD HH:mm:ss')
})