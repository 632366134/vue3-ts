<template>
  <div class="login-panel">
    <h1>后台管理系统</h1>
    <el-tabs
      v-model="currentTab"
      type="border-card"
      class="demo-tabs"
      :stretch="true"
    >
      <el-tab-pane name="account">
        <template #label>
          <span class="custom-tabs-label">
            <el-icon><UserFilled /></el-icon>
            <span>账号登录</span>
          </span>
        </template>
        <loginAccount ref="accountRef"></loginAccount>
      </el-tab-pane>
      <el-tab-pane name="phone">
        <template #label>
          <span class="custom-tabs-label">
            <el-icon><Iphone /></el-icon>
            <span>密码登录</span>
          </span>
        </template>
        <login-phone ref="phonetRef"></login-phone>
      </el-tab-pane>
    </el-tabs>
    <div class="account-control">
      <el-checkbox v-model="isKeepPassword">记住密码</el-checkbox>
      <el-link type="primary">忘记密码</el-link>
    </div>
    <el-button type="primary" @click="handleLoginClick" class="loginBtn"
      >立即登录</el-button
    >
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { UserFilled, Iphone } from '@element-plus/icons-vue'
import loginAccount from './login-account.vue'
import loginPhone from './login-phone.vue'
export default defineComponent({
  components: { UserFilled, Iphone, loginAccount, loginPhone },
  setup() {
    const currentTab = ref('account')
    const isKeepPassword = ref(true)
    const accountRef = ref<InstanceType<typeof loginAccount>>()
    const phonetRef = ref<InstanceType<typeof loginPhone>>()

    const handleLoginClick = () => {
      if (currentTab.value === 'account') {
        accountRef.value?.loginAction(isKeepPassword)
      } else {
        phonetRef.value?.loginPhone(isKeepPassword)
      }
    }
    return {
      isKeepPassword,
      handleLoginClick,
      accountRef,
      currentTab,
      phonetRef
    }
  }
})
</script>

<style scoped lang="less">
h1 {
  text-align: center;
}
.login-panel {
  width: 320px;
}
.demo-tabs {
  box-shadow: 0px 1px 2px 2px rgba(0, 0, 0, 0.2);
}
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
.demo-tabs .custom-tabs-label .el-icon {
  vertical-align: middle;
}
.demo-tabs .custom-tabs-label span {
  vertical-align: middle;
  margin-left: 4px;
}
.account-control {
  display: flex;
  justify-content: space-between;
}
.loginBtn {
  width: 100%;
  margin-top: 10px;
}
</style>
