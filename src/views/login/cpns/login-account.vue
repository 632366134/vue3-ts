<template>
  <div class="login-account">
    <el-form label-width="60px" :rules="rules" :model="account" ref="formRef">
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
import { useStore } from 'vuex'
import { ElForm } from 'element-plus'
import { defineComponent, reactive, ref, Ref } from 'vue'
import { rules } from './config/account.config'
import localCache from '@/untils/cache'
export default defineComponent({
  setup() {
    const store = useStore()
    const account = reactive({
      name: localCache.getCache('name') ?? '',
      password: localCache.getCache('password') ?? ''
    })
    const formRef = ref<InstanceType<typeof ElForm>>()
    const loginAction = (isKeepPassword: Ref<boolean>) => {
      formRef.value?.validate((valid) => {
        if (valid) {
          console.log('account开始登录')
          if (isKeepPassword) {
            localCache.setCache('name', account.name)
            localCache.setCache('password', account.password)
          } else {
            localCache.deleteCache('name')
            localCache.deleteCache('password')
          }
          store.dispatch('login/accountLoginAction', { ...account })
        } else {
          console.log('object')
        }
      })
    }
    return { account, rules, loginAction, formRef }
  }
})
</script>

<style scoped></style>
