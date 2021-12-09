<template>
  <div class="conatiner">
    <p class="title">soit系统</p>
    <div class="login-container">
      <!-- 登录/注册 -->
      <el-form
        label-position="right"
        label-width="100px"
        :model="form"
      >
        <el-form-item label="用户名">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.pwd"></el-input>
        </el-form-item>
      </el-form>
      <el-button @click="login">登录</el-button>
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue'
import { Encrypt } from '@/common/crypto.js'
import { Login } from '@/api/user.js'
export default {
  setup() {
    const form = reactive({
      username: '',
      pwd: ''
    })
    const login = async () => {
      console.log('data', form)
      const username = Encrypt(form.userName)
      const pwd = Encrypt(form.password)
      const data = await Login({
        username,
        pwd
      })
      console.log(data)
    }
    return {
      form,
      login
    }
  }
}
</script>

<style lang="less">
@deep: ~'>>>';
.conatiner {
  width: 100%;
  height: 100%;
  position: relative;
  background: #333;
}
.title {
  font-size: 28px;
  color: #fff;
  text-align: center;
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.login-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40%;
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid #444;
  color: #fff;
}
::v-deep .el-form {
  width: 100%;
  .el-input__inner {
    width: 100%;
  }
}
</style>