import { createRouter, createWebHistory } from 'vue-router'
import TodoListPage from '../views/TodoListPage.vue'
import TodoDetailPage from '../views/TodoDetailPage.vue'
import NotFoundPage from '../views/NotFoundPage.vue'

const routes = [
    { path: '/', name: 'list', component: TodoListPage },
    { path: '/todos/:id', name: 'detail', component: TodoDetailPage },
    { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFoundPage },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router