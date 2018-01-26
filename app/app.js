import projectDashboard from './project-dashboard'
import Vue from 'vue'
import Clipboard from 'clipboard'

new Clipboard('.copy-btn');

const vm = new Vue(projectDashboard);

vm.$mount('#app');