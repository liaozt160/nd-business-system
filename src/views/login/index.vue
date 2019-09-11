<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on"
             label-position="left">

      <div class="title-container">
        <h3 class="title">
          {{ $t('login.title') }}
        </h3>
        <lang-select class="set-language"/>
      </div>

      <el-form-item prop="email">
        <span class="svg-container">
          <svg-icon icon-class="user"/>
        </span>
        <el-input
          ref="email"
          v-model="loginForm.email"
          :placeholder="$t('login.account')"
          name="email"
          type="text"
          tabindex="1"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
      </el-form-item>

      <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password"/>
          </span>
          <el-input
            :key="passwordType"
            ref="password"
            v-model="loginForm.password"
            :type="passwordType"
            :placeholder="$t('login.password')"
            name="password"
            tabindex="2"
            maxlength="15"
            auto-complete="on"
            @keyup.native="checkCapslock"
            @blur="capsTooltip = false"
            @keyup.enter.native="handleLogin"
          />
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"/>
          </span>
        </el-form-item>
      </el-tooltip>

      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;"
                 @click.native.prevent="handleLogin">{{ $t('login.logIn') }}
      </el-button>
    </el-form>


    <!--上下滚动-->
    <div class="beijing">
      <p style="color: #d9d9d9;font-size: 18px;text-align: center;">{{$t('panelGroup.newEnterprises')}}</p>
      <ul>
        <li class="tableH">
          <!--编号-->
          <span>{{$t('employeeEdit.Listing')}}</span>
          <!--企业分类-->
          <span>{{$t('employeeEdit.business_category')}}</span>
          <!--标题-->
          <span>{{$t('employeeEdit.title')}}</span>
          <!--标价-->
          <span>{{$t('table.price')+'($)'}}</span>
          <!--状态-->
          <span>{{$t('table.status')}}</span>
        </li>
      </ul>
      <div v-if="slideData.length==0" style="color:#d9d9d9;text-align: center;line-height: 80px;">{{$t('NoData')}}</div>
      <ul id="slide" v-else>
        <li class="tableB" id="slide1" v-for="item in slideData" @click="itemClick(item.id)">
            <span>{{item.listing}}</span>
            <span>{{item.category}}</span>
            <span>{{item.title}}</span>
            <span>$ {{item.price}}</span>
            <span>{{item.status==1?$t('table.forSale'):item.status==2?$t('table.soldOut'):item.status==3?$t('employeeEdit.noVerified'):''}}</span>
        </li>
        <li class="tableB" id="slide2" v-for="item in slideData" @click="itemClick(item.id)">
            <span>{{item.listing}}</span>
            <span>{{item.category}}</span>
            <span>{{item.title}}</span>
            <span>$ {{item.price}}</span>
            <span>{{item.status==1?$t('table.forSale'):item.status==2?$t('table.soldOut'):item.status==3?$t('employeeEdit.noVerified'):''}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import LangSelect from '@/components/LangSelect'
  import {getLandingPageData} from '@/api/landingPage'

  export default {
    name: 'Login',
    components: {LangSelect},
    data() {
      let passwordReg = new RegExp("^([a-zA-Z0-9]+|[~!@#$%^&*()_+\-=]+){6,15}$");
      const validatePassword = (rule, value, callback) => {
        if (!passwordReg.test(value)) {
          callback(new Error(this.$t('login.pwdError')));
        } else {
          callback()
        }
      };
      return {
        locationOrigin: window.location.origin,
        loginForm: {
          email: '',
          password: ''
        },
        loginRules: {
          email: [{required: true, message: this.$t('empty')}, {
            type: 'email',
            message: this.$t('userEdit.inputEmail')
          }],
          password: [{required: true, trigger: 'blur', validator: validatePassword}]
        },
        passwordType: 'password',
        capsTooltip: false,
        loading: false,
        showDialog: false,
        redirect: undefined,
        otherQuery: {},

        slideData: [],
      }
    },
    watch: {
      $route: {
        handler: function (route) {
          const query = route.query
          if (query) {
            this.redirect = query.redirect
            this.otherQuery = this.getOtherQuery(query)
          }
        },
        immediate: true
      }
    },
    mounted() {
      if (this.loginForm.email === '') {
        this.$refs.email.focus()
      } else if (this.loginForm.password === '') {
        this.$refs.password.focus()
      }
      this.getList();
    },
    methods: {
      // 获取登录页展示企业列表
      getList() {
        let that = this;
        getLandingPageData().then(response => {
          // console.log('getLandingPageData', response);
          that.slideData = response.data.data;
          if(that.slideData.length!==0){
            setTimeout(function () {
              that.slideFun();
            }, 500);
          }
        }).catch(err => {
          console.log(err);
        })
      },

      slideFun() {
        var speed = 60;
        var slide = document.getElementById("slide");
        var slide2 = document.getElementById("slide2");
        var slide1 = document.getElementById("slide1");
          // slide2.innerHTML = slide1.innerHTML;

        function Marquee() {
          if (slide2.offsetTop - slide.scrollTop <= 0) {
            // slide.scrollTop -= slide1.offsetHeight+5;
            slide.scrollTop = 0;
          } else {
            slide.scrollTop++
          }
        }

        var MyMar = setInterval(Marquee, speed);
        slide.onmouseover = function () {
          clearInterval(MyMar)
        };
        slide.onmouseout = function () {
          MyMar = setInterval(Marquee, speed)
        }
      },
      itemClick(id) {
        console.log(id);
      },

      checkCapslock({shiftKey, key} = {}) {
        if (key && key.length === 1) {
          if (shiftKey && (key >= 'a' && key <= 'z') || !shiftKey && (key >= 'A' && key <= 'Z')) {
            this.capsTooltip = true
          } else {
            this.capsTooltip = false
          }
        }
        if (key === 'CapsLock' && this.capsTooltip === true) {
          this.capsTooltip = false
        }
      },
      showPwd() {
        if (this.passwordType === 'password') {
          this.passwordType = ''
        } else {
          this.passwordType = 'password'
        }
        this.$nextTick(() => {
          this.$refs.password.focus()
        })
      },
      handleLogin() {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.loading = true;
            this.$store.dispatch('user/login', this.loginForm).then((res) => {
              // console.log(123123,res);
              this.$router.push({path: '/', query: this.otherQuery});
              this.loading = false
            }).catch(() => {
              this.loading = false
            })
          } else {
            console.log('error submit!!');
            return false
          }
        })
      },
      getOtherQuery(query) {
        return Object.keys(query).reduce((acc, cur) => {
          if (cur !== 'redirect') {
            acc[cur] = query[cur]
          }
          return acc
        }, {})
      }
    }
  }
</script>

<style scoped>
  .beijing > ul {
    font-size: 15px;
    color: #d9d9d9;
    margin: 0;
    padding: 0;
  }
  .beijing{
    position: relative;
    max-width: 1000px;
    height: 270px;
    margin: 0 auto;
    border: 1px solid #898989;
  }

  .tableH {
    display: flex;
    justify-content: center;

  }

  .tableH  span:nth-child(1) {
    /*border-left: 1px solid #898989;*/
  }

  .tableH   span:nth-child(2) {
    border-left: 1px solid #898989;
  }
  .tableH   span:nth-child(3) {
    border-left: 1px solid #898989;
  }

  .tableH   span:nth-child(4) {
    border-left: 1px solid #898989;
    border-right: 1px solid #898989;
  }
  .tableH   span:nth-child(5) {
    /*border-right: 1px solid #898989;*/
  }

  .tableH span {
    display: inline-block;
    border-top: 1px solid #898989;
    border-bottom: 1px solid #898989;
    width: 50%;
    text-align: center;
    line-height: 40px;
  }
  .tableB {
    display: flex;
    justify-content: center;
    cursor: pointer;

  }

  .tableB  span:nth-child(1) {
    /*border-left: 1px solid #898989;*/
  }

  .tableB   span:nth-child(2) {
    border-left: 1px solid #898989;
  }
  .tableB   span:nth-child(3) {
    border-left: 1px solid #898989;
  }

  .tableB   span:nth-child(4) {
    border-left: 1px solid #898989;
    border-right: 1px solid #898989;
  }
  .tableB   span:nth-child(5) {
    /*border-right: 1px solid #898989;*/
  }

  .tableB span {
    display: inline-block;
    border-top: 1px solid #898989;
    width: 50%;
    text-align: center;
    padding: 10px 0;
  }
  .tableB:hover{
    color: #ff6537;
  }

  #slide {
    position: absolute;
    height: 170px;
    width: 100%;
    overflow: hidden;
    margin: 0 auto;
    color: #d9d9d9;
    text-align: center;
  }


  #slide1, #slide2 {
    width: 100%;
    margin: 0 auto;
  }


</style>

<style lang="scss">
  /* 修复input 背景不协调 和光标变色 */
  /* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

  $bg: #283443;
  $light_gray: #fff;
  $cursor: #fff;

  @supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
    .login-container .el-input input {
      color: $cursor;
    }
  }

  /* reset element-ui css */
  .login-container {
    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;

      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        height: 47px;
        caret-color: $cursor;

        &:-webkit-autofill {
          box-shadow: 0 0 0px 1000px $bg inset !important;
          -webkit-text-fill-color: $cursor !important;
        }
      }
    }

    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
      margin-bottom: 35px;
    }
  }
</style>

<style lang="scss" scoped>
  $bg: #2d3a4b;
  $dark_gray: #889aa4;
  $light_gray: #eee;

  .login-container {
    min-height: 100%;
    width: 100%;
    background-color: $bg;
    overflow: hidden;

    .login-form {
      position: relative;
      width: 520px;
      max-width: 100%;
      padding: 200px 35px 0;
      margin: 0 auto;
      overflow: hidden;
    }

    .tips {
      font-size: 14px;
      color: #fff;
      margin-bottom: 10px;

      span {
        &:first-of-type {
          margin-right: 16px;
        }
      }
    }

    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
    }

    .title-container {
      position: relative;

      .title {
        font-size: 26px;
        color: $light_gray;
        margin: 0px auto 40px auto;
        text-align: center;
        font-weight: bold;
      }

      .set-language {
        color: #fff;
        position: absolute;
        top: 3px;
        font-size: 18px;
        right: 0px;
        cursor: pointer;
      }
    }

    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select: none;
    }

    .thirdparty-button {
      position: absolute;
      right: 0;
      bottom: 6px;
    }

    @media only screen and (max-width: 470px) {
      .thirdparty-button {
        display: none;
      }
    }
  }
</style>
