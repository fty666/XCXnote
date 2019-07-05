import Vue from 'vue'
import Router from 'vue-router'
import map from '@/pages/map/map'
import animated from 'animate.css'

Vue.use(animated)

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'map',
            component: map
        },
    ]
})
