/**
 * Created by aka on 2017/5/22.
 */

import Redirect from './Redirect.vue';

export default [
    {
        path: 'redirect',
        component: Redirect,
        meta: {
            permission: 'job_task_view'
        }
    },
]
