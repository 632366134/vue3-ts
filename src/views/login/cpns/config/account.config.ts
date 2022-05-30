export const rules = {
  name: [
    { required: true, message: 'Name is required', trigger: 'blur' },
    {
      pattern: /^[a-z0-9]{5,10}$/,
      message: '用户名必须五到十位字母或数字',
      trigger: 'blur'
    }
  ],
  password: [
    { required: true, message: 'Password is required', trigger: 'blur' },
    {
      pattern: /^[a-z0-9]{3,}$/,
      message: '用户名必须为三位及以上的字母或数字',
      trigger: 'blur'
    }
  ]
}
