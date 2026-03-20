<template>
  <div class="lowin lowin-blue">
    <div class="lowin-brand">
      <img src="@/assets/logo.png" alt="logo" style="margin-top: 12px">
    </div>
    <div class="lowin-wrapper">
      <div class="lowin-box lowin-login">
        <div class="lowin-box-inner">
          <q-form @submit="handleLogin" ref="loginForm">
            <p>시험모듈 관리자</p>
            <div class="lowin-group">
              <label>아이디</label>
              <q-input
                v-model="loginForm.userName"
                class="lowin-input"
                placeholder="아이디"
                name="userName"
                type="text"
                dense
                borderless
                :rules="[val => val && val.length >= 5 || '아이디 5글자 이상 입력해 주세요']"
              />
            </div>
            <div class="lowin-group password-group">
              <label>비번</label>
              <q-input
                v-model="loginForm.password"
                class="lowin-input"
                :type="showPassword ? 'text' : 'password'"
                placeholder="비번"
                name="password"
                dense
                borderless
                :rules="[val => val && val.length >= 5 || '비번 5글자 이상 입력해 주세요']"
              >
                <template v-slot:append>
                  <q-icon
                    :name="showPassword ? 'visibility' : 'visibility_off'"
                    class="cursor-pointer"
                    @click="showPassword = !showPassword"
                  />
                </template>
              </q-input>
            </div>
            <q-btn
              :loading="loading"
              type="submit"
              flat
              class="lowin-btn login-btn full-width"
              label="로그인"
            />
          </q-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useUserStore } from '@/stores/user'
import loginApi from '@/api/login'
import { Notify } from 'quasar'

export default {
  name: 'Login',
  setup () {
    const userStore = useUserStore()
    return { userStore }
  },
  data () {
    return {
      loginForm: { userName: 'admin', password: '123456' },
      showPassword: false,
      loading: false
    }
  },
  methods: {
    handleLogin () {
      this.loading = true
      loginApi.login(this.loginForm).then(result => {
        if (result && result.code === 1) {
          this.userStore.setUserName(this.loginForm.userName)
          this.$router.push({ path: '/' })
        } else {
          this.loading = false
          Notify.create({ type: 'negative', message: result.message })
        }
      }).catch(() => {
        this.loading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.lowin {
  --color-primary: #44a0b3;
  --color-grey: rgba(68, 160, 179, .06);
  --color-dark: rgba(68, 160, 179, .5);
  --color-semidark: rgba(68, 160, 179, .5);
  text-align: center;
  margin: 60px 0 0 0;
  font-family: 'Segoe UI';
  font-size: 14px;

  &.lowin-blue {
    --color-primary: #0081C6;
    --color-grey: rgba(0, 129, 198, .05);
    --color-dark: rgba(0, 129, 198, .7);
    --color-semidark: rgba(0, 129, 198, .45);
  }

  .lowin-wrapper {
    position: relative;
    width: 360px;
    margin: 0 auto;
  }

  .lowin-brand {
    overflow: hidden;
    width: 100px;
    height: 100px;
    margin: 0 auto -50px auto;
    border-radius: 50%;
    box-shadow: 0 4px 40px rgba(0,0,0,.07);
    padding: 10px;
    background-color: #fff;
    z-index: 1;
    position: relative;
    img { width: 100%; }
  }

  .lowin-box {
    width: 100%;
    position: absolute;
    left: 0;
  }

  .lowin-box-inner {
    background-color: #fff;
    box-shadow: 0 7px 25px rgba(0,0,0,.08);
    padding: 60px 25px 25px 25px;
    text-align: left;
    border-radius: 3px;
  }

  .lowin-box p {
    color: var(--color-semidark);
    font-weight: 700;
    margin-bottom: 20px;
    text-align: center;
  }

  .lowin-group {
    margin-bottom: 30px;
    label {
      margin-bottom: 5px;
      display: inline-block;
      width: 100%;
      color: var(--color-semidark);
      font-weight: 700;
    }
  }

  .lowin-input {
    background-color: var(--color-grey);
    border-radius: 3px;
    padding: 0 20px;
    width: 100%;
  }

  .lowin-btn {
    display: block;
    width: 100%;
    color: #fff !important;
    padding: 15px;
    border-radius: 3px;
    background-color: var(--color-primary) !important;
    box-shadow: 0 2px 7px var(--color-semidark);
    font-weight: 700;
    cursor: pointer;
  }
}
</style>
