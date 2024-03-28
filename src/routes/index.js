import { createRouter, createWebHistory } from 'vue-router'
import LogToSql from '../views/mybatis-tools/LogToSql.vue';
import Home from '../views/Home.vue'
const routes = [
    { path: '/', component: Home },
    { path: '/mybatis-log-convert-sql', component: LogToSql }
]
const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router