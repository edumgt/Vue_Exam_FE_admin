import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/layout/index.vue'

const routes = [
  {
    path: '/login',
    name: 'Login',
    hidden: true,
    component: () => import('@/views/login/index.vue'),
    meta: { title: '로그인' }
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        name: 'Dashboard',
        meta: { title: 'DashBoard', icon: 'home', affix: true }
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    name: 'UserPage',
    meta: { title: '회원관리', icon: 'people' },
    children: [
      {
        path: 'student/list',
        component: () => import('@/views/user/student/list.vue'),
        name: 'UserStudentPageList',
        meta: { title: '학생목록', noCache: true }
      },
      {
        path: 'student/edit',
        component: () => import('@/views/user/student/edit.vue'),
        name: 'UserStudentEdit',
        meta: { title: '학생수정', noCache: true, activeMenu: '/user/student/list' },
        hidden: true
      },
      {
        path: 'teacher/list',
        component: () => import('@/views/user/teacher/list.vue'),
        name: 'UserTeacherPageList',
        meta: { title: '강사목록', noCache: true }
      },
      {
        path: 'teacher/edit',
        component: () => import('@/views/user/teacher/edit.vue'),
        name: 'UserTeacherEdit',
        meta: { title: '강사수정', noCache: true, activeMenu: '/user/teacher/list' },
        hidden: true
      },
      {
        path: 'admin/list',
        component: () => import('@/views/user/admin/list.vue'),
        name: 'UserAdminPageList',
        meta: { title: '관리자목록', noCache: true }
      },
      {
        path: 'admin/edit',
        component: () => import('@/views/user/admin/edit.vue'),
        name: 'UserAdminEdit',
        meta: { title: '관리자수정', noCache: true, activeMenu: '/user/admin/list' },
        hidden: true
      }
    ]
  },
  {
    path: '/exam',
    component: Layout,
    name: 'ExamPage',
    meta: { title: '시험관리', icon: 'assignment' },
    children: [
      {
        path: 'paper/list',
        component: () => import('@/views/exam/paper/list.vue'),
        name: 'ExamPaperPageList',
        meta: { title: '시험지목록', noCache: true }
      },
      {
        path: 'paper/edit',
        component: () => import('@/views/exam/paper/edit.vue'),
        name: 'ExamPaperEdit',
        meta: { title: '시험지수정', noCache: true, activeMenu: '/exam/paper/list' },
        hidden: true
      },
      {
        path: 'question/list',
        component: () => import('@/views/exam/question/list.vue'),
        name: 'ExamQuestionPageList',
        meta: { title: '문항목록', noCache: true }
      },
      {
        path: 'question/edit/singleChoice',
        component: () => import('@/views/exam/question/edit/single-choice.vue'),
        name: 'singleChoicePage',
        meta: { title: '단일 선택문항수정', noCache: true, activeMenu: '/exam/question/list' },
        hidden: true
      },
      {
        path: 'question/edit/multipleChoice',
        component: () => import('@/views/exam/question/edit/multiple-choice.vue'),
        name: 'multipleChoicePage',
        meta: { title: '다중선택 객관식수정', noCache: true, activeMenu: '/exam/question/list' },
        hidden: true
      },
      {
        path: 'question/edit/trueFalse',
        component: () => import('@/views/exam/question/edit/true-false.vue'),
        name: 'trueFalsePage',
        meta: { title: '참 또는 거짓수정', noCache: true, activeMenu: '/exam/question/list' },
        hidden: true
      },
      {
        path: 'question/edit/gapFilling',
        component: () => import('@/views/exam/question/edit/gap-filling.vue'),
        name: 'gapFillingPage',
        meta: { title: '빈칸채우기수정', noCache: true, activeMenu: '/exam/question/list' },
        hidden: true
      },
      {
        path: 'question/edit/shortAnswer',
        component: () => import('@/views/exam/question/edit/short-answer.vue'),
        name: 'shortAnswerPage',
        meta: { title: '단답형수정', noCache: true, activeMenu: '/exam/question/list' },
        hidden: true
      }
    ]
  },
  {
    path: '/education',
    component: Layout,
    name: 'EducationPage',
    meta: { title: '과정관리', icon: 'school' },
    children: [
      {
        path: 'subject/list',
        component: () => import('@/views/education/subject/list.vue'),
        name: 'EducationSubjectPage',
        meta: { title: '과목목록', noCache: true }
      },
      {
        path: 'subject/edit',
        component: () => import('@/views/education/subject/edit.vue'),
        name: 'EducationSubjectEditPage',
        meta: { title: '과목수정', noCache: true },
        hidden: true
      }
    ]
  },
  {
    path: '/profile',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index.vue'),
        name: 'Profile',
        meta: { title: '개인정보', noCache: true }
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    hidden: true,
    component: () => import('@/views/error-page/404.vue'),
    meta: { title: '404', noCache: true }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export { routes, router }
