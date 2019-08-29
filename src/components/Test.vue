<template>
  <div style="width: 560px; margin: 30vh auto auto;" >
    <el-card>
      <h1 style="width: 100%; text-align: center">登录平台</h1>
      <!-- <p style="width: 100%; text-align: center; color: #f56c6c">{{ error.non_field_errors}}</p> -->
      <el-form style="margin-right: 40px" :model="form" :rules="rules" ref="form" label-position="left" label-width="80px" class="demo-ruleForm login-container" @keyup.enter.native="handleSubmit">
        <el-form-item prop="username" :error="error.username">
          <el-input :autofocus="true" type="text" v-model="form.username" auto-complete="off" placeholder="请输入用户"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="form.password" auto-complete="off" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item style="width:100%;">
         <el-alert v-if="error" :title="error" type="error" style="margin-top: -10px; margin-bottom: 10px" show-icon></el-alert>
         <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit" :loading="loading">登录</el-button>
        </el-form-item>
      </el-form>
      <div>
        <el-popover ref="no_account" placement="top" width="160" v-model="visible">
          <p>请联系管理员创建</p>
          <div style="text-align: right; margin: 0">
            <el-button type="primary" size="mini" @click="visible=false">确定</el-button>
          </div>
        </el-popover>
        <el-button type="text" style="float: left" v-popover:no_account>没有账号</el-button>
        <el-button type="text" style="float: right" @click="">忘记密码</el-button>
      </div>
    </el-card>
  </div>
</template>

<style>
.login {
  background: url(../assets/login.jpg) no-repeat scroll center center / cover;
  background-size: 100% 100%;
  width: 100%;
  height: 100%;
  position: fixed;
}
</style>

<script>
    export default {
        data() {
            return {
                loading: false,
                error: '',
                visible: false,
                form: {
                    username: 'admin',
                    password: 'spug'
                },
                rules: {
                    username: [
                        {required: true, message: '请输入用户', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            handleSubmit() {
                this.error = '';
                this.$refs['form'].validate(pass => {
                    if (!pass) {
                        return false
                    }
                    this.loading = true;
                    this.$http.post('/api/account/users/login/', this.form).then(res => {
                        localStorage.setItem('token', res.result['token']);
                        localStorage.setItem('is_supper', res.result['is_supper']);
                        localStorage.setItem('permissions', res.result['permissions']);
                        localStorage.setItem('nickname', res.result['nickname']);
                        this.$router.push('/welcome');
                    }, response => {
                        this.error = response.result
                    }).finally(() => this.loading = false)
                })
            }
        },
        watch: {
            form: {
                handler: function () {
                    this.error = ''
                },
                deep: true
            }
        }
    }
</script>
