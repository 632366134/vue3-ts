export const rules2 = {
  num: [
    { required: true, message: 'Phone is required', trigger: 'blur' },
    {
      pattern: /^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/,
      message: '手机号不正确',
      trigger: 'blur'
    }
  ],
  code: [
    { required: true, message: 'code is required', trigger: 'blur' },
    {
      type: 'string',
      len: 6,
      message: '验证码不正确',
      trigger: 'blur'
    }
  ]
}
