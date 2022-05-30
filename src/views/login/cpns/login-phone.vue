<template>
  <div class="login-phone">
    <el-form label-width="70px" :rules="rules2" :model="phone" ref="formRef">
      <el-form-item label="手机号" prop="num">
        <el-input v-model="phone.num" />
      </el-form-item>
      <el-form-item label="验证码" prop="code">
        <div class="get-code">
          <el-input v-model="phone.code" />
          <el-button class="codeBtn" type="primary">验证码</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, Ref, ref } from 'vue'
import { rules2 } from './config/phone.config'
import { ElForm } from 'element-plus'
import localCache from '@/untils/cache'
import { useStore } from 'vuex'
export default defineComponent({
  setup() {
    const store = useStore()
    const phone = reactive({
      num: '',
      code: ''
    })
    const formRef = ref<InstanceType<typeof ElForm>>()

    const loginPhone = (isKeepPassword: Ref<boolean>) => {
      formRef.value?.validate((valid) => {
        if (valid) {
          console.log('account开始登录')
          if (isKeepPassword) {
            localCache.setCache('name', phone.num)
            localCache.setCache('password', phone.code)
          } else {
            localCache.deleteCache('name')
            localCache.deleteCache('password')
          }
          store.dispatch('login/PhoneLoginAction', { ...phone })
        } else {
          console.log('object')
        }
      })
    }
    return { phone, rules2, formRef, loginPhone }
  }
})
</script>

<style scoped lang="less">
.get-code {
  display: flex;
  .codeBtn {
    margin-left: 10px;
  }
}
</style>
