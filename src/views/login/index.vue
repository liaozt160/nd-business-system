<template>
  <div class="allbox">
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

        <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:20px;"
                   @click.native.prevent="handleLogin">{{ $t('login.logIn') }}
        </el-button>
        <div class="contactUsBtn" @click="contactUs">{{$t('contactUs')}}</div>
      </el-form>
      <!--上下滚动-->
      <div class="beijing">
        <p style="color: #595959;font-size: 18px;text-align: center;">{{$t('panelGroup.newEnterprises')}}</p>
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
          <li class="tableB" id="slide1" v-for="item in slideData" @click="itemClick">
            <span>{{item.listing}}</span>
            <span>{{item.category}}</span>
            <span>{{item.title}}</span>
            <span>$ {{item.price}}</span>
            <span>{{item.status==1?$t('table.forSale'):item.status==2?$t('table.soldOut'):item.status==3?$t('employeeEdit.noVerified'):''}}</span>
          </li>
          <li class="tableB" id="slide2" v-for="item in slideData" @click="itemClick">
            <span>{{item.listing}}</span>
            <span>{{item.category}}</span>
            <span>{{item.title}}</span>
            <span>$ {{item.price}}</span>
            <span>{{item.status==1?$t('table.forSale'):item.status==2?$t('table.soldOut'):item.status==3?$t('employeeEdit.noVerified'):''}}</span>
          </li>
        </ul>
      </div>
    </div>
    <!--联系我们填写信息弹窗-->
    <el-dialog :title="$t('contactUs')" center :visible.sync="dialogFormVisible" v-if='dialogFormVisible'
               width="650px" :before-close="dialogClose" :close-on-click-modal="false">

      <el-form ref="dataForm" :model="userEdit" label-position="left" label-width="110px" style="width: 400px; margin-left:40px;"  class="demo-ruleForm">
        <el-form-item :label="$t('table.name')" prop="name" :rules="[ { required: true, message: $t('empty')}]">
          <el-input v-model="userEdit.name" :placeholder="$t('table.name')" style="width:410px;"
                    class="filter-item"/>
        </el-form-item>
        <el-form-item :label="$t('table.email')" prop="email" :rules="[{ required: true, message: $t('empty')},{ type: 'email', message: $t('userEdit.inputEmail')}]">
          <el-input v-model="userEdit.email" :placeholder="$t('table.email')" style="width:410px;"
                    class="filter-item"/>
        </el-form-item>
        <el-form-item :label="$t('table.phone')" prop="phone" :rules="[{ required: true, message: $t('empty')},{ type: 'number', message: $t('userEdit.inputPhoneNumber')}]">
          <el-input v-model.number="userEdit.phone" :placeholder="$t('table.phone')" style="width:410px;" class="filter-item"/>
        </el-form-item>
        <el-form-item :label="$t('Identity')" :rules="[ { required: true, message: $t('empty')}]">
          <el-select v-model="userEdit.role" prop="level" :placeholder="$t('Identity')" clearable class="filter-item" style="width:410px;">
            <el-option :label="$t('intentionBuyer')" :value="1" />
            <el-option :label="$t('buyerAdvisor')" :value="2" />
            <el-option :label="$t('sellerIntermediary')" :value="3" />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('userEdit.UserNotes')">
          <el-input style="width:410px;" type="textarea" :autosize="{ minRows: 2}" :placeholder="$t('userEdit.UserNotes')" v-model="userEdit.remark"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{ $t('table.cancel') }}</el-button>
        <el-button type="primary" @click="userEditSave()">{{ $t('submit') }}</el-button>
      </div>
    </el-dialog>
    <canvas id="canvas" style="position:absolute;top:0px;left:0px;z-index:1;"></canvas>
  </div>
</template>

<script>
  import LangSelect from '@/components/LangSelect'
  import {getLandingPageData} from '@/api/landingPage'
  import { contactUsApi } from '@/api/account'
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
        dialogFormVisible: false,
        userEdit: {
          name: '',
          email: '',
          phone: '',
          role: 1,
          remark: '',
        },


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
      this.canvasDrw();
    },
    methods: {
      canvasDrw(){
        var canvas = document.getElementById('canvas');
        var ctx = canvas.getContext('2d');
        canvas.width = canvas.parentNode.offsetWidth;
        canvas.height = canvas.parentNode.offsetHeight;
        //如果浏览器支持requestAnimFrame则使用requestAnimFrame否则使用setTimeout
        window.requestAnimFrame = (function(){
          return window.requestAnimationFrame  ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            function( callback ){
              window.setTimeout(callback, 1000 / 60);
            };
        })();
        // 波浪大小
        var boHeight = canvas.height / 18;
        var posHeight = canvas.height / 1.2;
        //初始角度为0
        var step = 0;
        //定义三条不同波浪的颜色
        var lines = ["rgba(0,222,255, 0.2)", "rgba(157,192,249, 0.2)", "rgba(0,168,255, 0.2)"];
        function loop(){
          ctx.clearRect(0,0,canvas.width,canvas.height);
          step++;
          //画3个不同颜色的矩形
          for(var j = lines.length - 1; j >= 0; j--) {
            ctx.fillStyle = lines[j];
            //每个矩形的角度都不同，每个之间相差45度
            var angle = (step+j*150)*Math.PI/180;
            var deltaHeight = Math.sin(angle) * boHeight;
            var deltaHeightRight = Math.cos(angle) * boHeight;
            ctx.beginPath();
            ctx.moveTo(0, posHeight+deltaHeight);
            ctx.bezierCurveTo(canvas.width/2, posHeight+deltaHeight-boHeight, canvas.width / 2, posHeight+deltaHeightRight-boHeight, canvas.width, posHeight+deltaHeightRight);
            ctx.lineTo(canvas.width, canvas.height);
            ctx.lineTo(0, canvas.height);
            ctx.lineTo(0, posHeight+deltaHeight);
            ctx.closePath();
            ctx.fill();
          }
          requestAnimFrame(loop);
        }
        loop();
      },
      // 弹出框关闭前
      dialogClose(done) {
        this.userEdit = {};
        done();
      },
      // 弹出框保存 // 添加用户
      userEditSave(){
        let that=this;
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            contactUsApi (that.userEdit).then(response => {
                console.log('submit',response);
                that.dialogFormVisible=false;
                that.userEdit = {};
                that.$notify({
                  showClose: true,
                  message: that.$t('Successful'),
                  type: 'success'
                });
              }).catch(err => {
                console.log(err);
              })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },


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
      itemClick() {
        // this.dialogFormVisible=true;
        this.$router.push({path: '/showBusinessForSales'})
      },
      contactUs() {
        this.dialogFormVisible=true;
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
  .contactUsBtn{
    font-size: 14px;
    text-align: center;
    cursor: pointer;
  }
  .contactUsBtn:hover{
    color: #1890ff;
  }

  .allbox{
    min-height: 100%;
    width: 100%;
    /*background-image: url("../../assets/bgp.png");*/
    /*background-position: center;*/
    overflow: hidden;
    background-color: #eceff1;
  }
  .beijing > ul {
    font-size: 15px;
    color: #595959;
    margin: 0;
    padding: 0;
  }
  .beijing{
    position: relative;
    max-width: 1100px;
    height: 316px;
    margin: 0 auto;
    border: 1px solid transparent;
    background-color: #fff;
    border-radius:5px;
    box-shadow: 0 0 10px #ccc;
    z-index: 999;
  }

  .tableH {
    display: flex;
    justify-content: center;
    background-color: #f1f1f1;

  }

  .tableH   span:nth-child(2) {
    /*border-left: 1px solid #595959;*/
  }
  .tableH   span:nth-child(3) {
    /*border-left: 1px solid #595959;*/
  }

  .tableH   span:nth-child(4) {
    /*border-left: 1px solid #595959;*/
    /*border-right: 1px solid #595959;*/
  }

  .tableH span {
    display: inline-block;
    /*border-top: 1px solid #595959;*/
    /*border-bottom: 1px solid #595959;*/
    width: 50%;
    text-align: center;
    line-height: 40px;
  }
  .tableB {
    display: flex;
    justify-content: center;
    cursor: pointer;

  }

  #slide li:nth-child(2n) {
    background: #f0f9eb;
  }
  .tableB span:nth-child(2) {
    /*border-left: 1px solid #595959;*/
  }
  .tableB   span:nth-child(3) {
    /*border-left: 1px solid #595959;*/
  }

  .tableB span:nth-child(4) {
    /*border-left: 1px solid #595959;*/
    /*border-right: 1px solid #595959;*/
  }

  .tableB span {
    display: inline-block;
    /*border-top: 1px solid #595959;*/
    width: 50%;
    text-align: center;
    padding: 15px 0;
  }
  .tableB:hover{
    color: #ff6537;
  }

  #slide {
    position: absolute;
    height: 218px;
    width: 100%;
    overflow: hidden;
    margin: 0 auto;
    color: #898989;
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
    .login-container .el-input {
      height: 35px!important;
    }
    .login-container .el-input input {
      padding: 5px 5px 5px 15px!important;
      height: 30px!important;
    }
  }
  .login-container .el-form-item__content{
    line-height: 25px!important;
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
        height: 47px;

        &:-webkit-autofill {
          box-shadow: 0 0 0px 1000px #e5e5e5 inset !important;
        }
      }
    }

    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
      margin-bottom: 30px;
    }
  }
</style>

<style lang="scss" scoped>
  $bg: #2d3a4b;
  $dark_gray: #889aa4;
  $light_gray: #eee;

  .login-container {
    .login-form {
      position: relative;
      width: 450px;
      max-width: 100%;
      overflow: hidden;
      background-color: #fff;
      padding: 20px 30px;
      border-radius: 10px;
      margin: 30px auto 30px auto;
      box-shadow: 0 0 10px #ccc;
      z-index: 999;
    }

    .tips {
      font-size: 14px;
      margin-bottom: 10px;

      span {
        &:first-of-type {
          margin-right: 16px;
        }
      }
    }

    .svg-container {
      padding: 6px 5px 6px 15px;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
    }

    .title-container {
      position: relative;

      .title {
        font-size: 21px;
        margin: 0px auto 40px auto;
        text-align: center;
        font-weight: bold;
      }

      .set-language {
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
