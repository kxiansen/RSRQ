<template>
  <!-- <div class="login-bg"> -->
  <div>
    <el-form :model="form" :rules="rules" ref="form" label-position="left" label-width="0px" class="demo-ruleForm login-container" @keyup.enter.native="handleSubmit">
      <h3 class="title">运维平台登录</h3>
      <el-form-item prop="username">
        <el-input type="text" v-model="form.username" auto-complete="off" placeholder="请输入用户"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="form.password" auto-complete="off" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item style="width:100%;">
       <el-alert v-if="error" :title="error" type="error" style="margin-top: -10px; margin-bottom: 10px" show-icon></el-alert>
       <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit" :loading="loading">登录</el-button>
      </el-form-item>
    </el-form>
 </div>
</template>

<style>
.login-bg {
    background-image: url(../assets/login-bg.png), -webkit-radial-gradient(farthest-corner ellipse at 50% 75%, rgb(0, 198, 196), rgb(0, 161, 162));
    background-image: url(../assets/login-bg.png), radial-gradient(farthest-corner ellipse at 50% 75%, rgb(28, 206, 238), rgb(0, 125, 172));
    background-color: #14c3e3;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;
    overflow-x: hidden;
    color: #333;
    margin: 0;
    box-sizing: border-box;
    /*background-size: 100% 100%;*/
    width: 100%;
    height: 100%;
    position: fixed;
}

.login {
  background: url(../assets/login.jpg) no-repeat scroll center center / cover;
  background-size: 100% 100%;
  width: 100%;
  height: 100%;
  position: fixed;
}
.login-container {
  /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  margin: 180px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
  .title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }
  .remember {
    margin: 0px 0px 35px 0px;
  }
}

</style>
<script>
    export default {
        data() {
            return {
                loading: false,
                error: '',
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

