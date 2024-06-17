
const routes = [
    {
        path: '/register',
        component: () => import('../pages/auth/AuthPage.vue'),
        children: [
            {
                path: '',
                name: 'register',
                component:()=>import('../pages/auth/RegisterPage.vue')
            },
            {
                path: '/login',
                name: 'login',
                component:()=>import('../pages/auth/LoginPage.vue')
            }
        ]
    },
    {
        path: '/admin',
        component: () => import('../pages/admin/AdminPage.vue'),
        children: [
            {
                path: '',
                name: 'admin',
                component:() => import('../pages/admin/dashboard/DashboardPage.vue')
            },
            {
                path: '/members',
                name: 'Members',
                component:() => import('../pages/admin/member/MemberPage.vue')
            },
            {
                path: '/create-members',
                name: 'CreateMembers',
                component:() => import('../pages/admin/member/CreateMember.vue')
            },
            {
                path: '/projects',
                name: 'Projects',
                component:() => import('../pages/admin/project/ProjectPage.vue')
            },
            {
                path: '/project-create',
                name: 'ProjectCreate',
                component:() => import('../pages/admin/project/CreateProject.vue')
            },
            {
                path: '/kaban',
                name: 'Kaban',
                component:() => import('../pages/admin/kabanboard/KabanBoard.vue')
            }
        ]
    }

]

export default routes
