<template>
  <div class="login-account">
    <el-form label-width="60px" :rules="rules" :model="account">
      <el-form-item label="账户" prop="name">
        <el-input v-model="account.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { rules } from './config/account.config'
export default defineComponent({
  setup() {
    const account = reactive({
      name: '',
      password: ''
    })
    const loginAction = () => {
      console.log('account开始登录')
    }
    return { account, rules, loginAction }
  }
})
</script>

<style scoped></style>
