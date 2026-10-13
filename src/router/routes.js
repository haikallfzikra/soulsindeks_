import Layout from '@/layouts/MainLayout.vue'
import HomeView from '@/views/HomeView.vue'
import ProjectListView from '@/views/ProjectListView.vue'
import ProjectDetailView from '@/views/ProjectDetailView.vue'

const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '',
        name: 'Home',
        component: HomeView,
      },
      {
        path: 'proyek',
        children: [
          {
            path: '',
            name: 'Projects',
            component: ProjectListView,
          },
          {
            path: ':slug',
            name: 'Project',
            component: ProjectDetailView,
          },
        ],
      },
    ],
  },
]

export default routes
