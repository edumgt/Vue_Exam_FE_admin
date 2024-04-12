import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/layout'

Vue.use(Router)

const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    hidden: true,
    component: () => import('@/views/login/index'),
    meta: { title: '登录' }
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'DashBoard', icon: 'home', affix: true }
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    name: 'UserPage',
    meta: {
      title: '회원관리',
      icon: 'users'
    },
    children: [
      {
        path: 'student/list',
        component: () => import('@/views/user/student/list'),
        name: 'UserStudentPageList',
        meta: { title: '학생목록', noCache: true }
      },
      {
        path: 'student/edit',
        component: () => import('@/views/user/student/edit'),
        name: 'UserStudentEdit',
        meta: { title: '학생수정', noCache: true, activeMenu: '/user/student/list' },
        hidden: true
      },
      {
        path: 'teacher/list',
        component: () => import('@/views/user/teacher/list'),
        name: 'UserTeacherPageList',
        meta: { title: '강사목록', noCache: true }
      },
      {
        path: 'teacher/edit',
        component: () => import('@/views/user/teacher/edit'),
        name: 'UserTeacherEdit',
        meta: { title: '강사수정', noCache: true, activeMenu: '/user/teacher/list' },
        hidden: true
      },
      {
        path: 'admin/list',
        component: () => import('@/views/user/admin/list'),
        name: 'UserAdminPageList',
        meta: { title: '관리자목록', noCache: true }
      },
      {
        path: 'admin/edit',
        component: () => import('@/views/user/admin/edit'),
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
    meta: {
      title: '시험관리',
      icon: 'exam'
    },
    children: [
      {
        path: 'paper/list',
        component: () => import('@/views/exam/paper/list'),
        name: 'ExamPaperPageList',
        meta: { title: '시험지목록', noCache: true }
      },
      {
        path: 'paper/edit',
        component: () => import('@/views/exam/paper/edit'),
        name: 'ExamPaperEdit',
        meta: { title: '시험지수정', noCache: true, activeMenu: '/exam/paper/list' },
        hidden: true
      },
      {
        path: 'question/list',
        component: () => import('@/views/exam/question/list'),
        name: 'ExamQuestionPageList',
        meta: { title: '문항목록', noCache: true }
      },
      {
        path: 'question/edit/singleChoice',
        component: () => import('@/views/exam/question/edit/single-choice'),
        name: 'singleChoicePage',
        meta: { title: '单选문항수정', noCache: true, activeMenu: '/exam/question/list' },
        hidden: true
      },
      {
        path: 'question/edit/multipleChoice',
        component: () => import('@/views/exam/question/edit/multiple-choice'),
        name: 'multipleChoicePage',
        meta: { title: '다중선택 객관식수정', noCache: true, activeMenu: '/exam/question/list' },
        hidden: true
      },
      {
        path: 'question/edit/trueFalse',
        component: () => import('@/views/exam/question/edit/true-false'),
        name: 'trueFalsePage',
        meta: { title: '참 또는 거짓수정', noCache: true, activeMenu: '/exam/question/list' },
        hidden: true
      },
      {
        path: 'question/edit/gapFilling',
        component: () => import('@/views/exam/question/edit/gap-filling'),
        name: 'gapFillingPage',
        meta: { title: '빈칸채우기수정', noCache: true, activeMenu: '/exam/question/list' },
        hidden: true
      },
      {
        path: 'question/edit/shortAnswer',
        component: () => import('@/views/exam/question/edit/short-answer'),
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
    meta: {
      title: '과정관리',
      icon: 'education'
    },
    alwaysShow: true,
    children: [
      {
        path: 'subject/list',
        component: () => import('@/views/education/subject/list'),
        name: 'EducationSubjectPage',
        meta: { title: '과목목록', noCache: true }
      },
      {
        path: 'subject/edit',
        component: () => import('@/views/education/subject/edit'),
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
        component: () => import('@/views/profile/index'),
        name: 'Profile',
        meta: { title: '个人简介', icon: 'user', noCache: true }
      }
    ]
  },
  { path: '*',
    hidden: true,
    component: () => import('@/views/error-page/404'),
    meta: { title: '404', noCache: true }
  }
]

const router = new Router({
  routes: constantRoutes
})

export {
  constantRoutes,
  router
}
