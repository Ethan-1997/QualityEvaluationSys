
import question from './question'
import markdown from './markdownElement.vue'

export default {
  install: function(Vue) {
    Vue.component('question', question)
    Vue.component('ui-markdown', markdown)
  }
}
