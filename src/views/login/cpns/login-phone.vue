<template>
  <div class="login-phone">
    <el-form label-width="70px" :rules="rules2" :model="phone">
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
import { defineComponent, reactive } from 'vue'
import { rules2 } from './config/phone.config'
export default defineComponent({
  setup() {
    const phone = reactive({
      num: '',
      code: ''
    })

    return { phone, rules2 }
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
