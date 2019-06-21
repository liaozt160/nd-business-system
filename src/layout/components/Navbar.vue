<template>
  <div class="navbar">
    <hamburger id="hamburger-container" :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />

    <div class="right-menu" style="display: flex;">
      <template v-if="device!=='mobile'">

        <error-log class="errLog-container right-menu-item hover-effect" />

        <screenfull id="screenfull" class="right-menu-item hover-effect" />

        <!--<el-tooltip :content="$t('navbar.size')" effect="dark" placement="bottom">-->
        <!--<size-select id="size-select" class="right-menu-item hover-effect" />-->
        <!--</el-tooltip>-->

        <lang-select class="right-menu-item hover-effect" />
        <el-tag style="margin-top: 11px;margin-right: 10px" type="primary">
          {{ roles=='buyer_broker'?$t('userEdit.buyerBroker'):roles=='business_broker'?$t('userEdit.businessBroker'):roles=='admin'?$t('userEdit.admin'):'null' }}
        </el-tag>

      </template>

      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
        <div class="avatar-wrapper">
          <!--<img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar">-->
          <span style="">{{name}}</span>
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown">
          <a @click="toProfile">
            <el-dropdown-item>
              {{ $t('navbar.profile') }}
            </el-dropdown-item>
          </a>
          <router-link to="/">
            <el-dropdown-item>
              {{ $t('navbar.dashboard') }}
            </el-dropdown-item>
          </router-link>
          <!--<a target="_blank" href="https://github.com/PanJiaChen/vue-element-admin/">-->
          <!--<el-dropdown-item>-->
          <!--{{ $t('navbar.github') }}-->
          <!--</el-dropdown-item>-->
          <!--</a>-->
          <!--<a target="_blank" href="https://panjiachen.github.io/vue-element-admin-site/#/">-->
          <!--<el-dropdown-item>Docs</el-dropdown-item>-->
          <!--</a>-->
          <el-dropdown-item divided>
            <span style="display:block;" @click="logout">{{ $t('navbar.logOut') }}</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>


    <!--用户信息编辑弹窗-->
    <el-dialog :title="$t('userEdit.userEdit')" :visible.sync="dialogFormVisible1" width="650px" center>

      <el-form ref="dataForm" :model="userEdit" label-position="left" label-width="110px" style="width: 550px; margin-left:50px;"  class="demo-ruleForm">
        <el-form-item :label="$t('table.name')" prop="name" :rules="[ { required: true, message: $t('empty')}]">
          <el-input v-model="userEdit.name" :placeholder="$t('table.name')" style="width:365px;"
                    class="filter-item"/>
        </el-form-item>
        <el-form-item :label="$t('table.email')" prop="email" :rules="[{ required: true, message: $t('empty')},{ type: 'email', message: $t('userEdit.inputEmail')}]">
          <el-input v-model="userEdit.email" :placeholder="$t('table.email')" style="width:365px;"
                    class="filter-item"/>
        </el-form-item>
        <el-form-item :label="$t('table.phone')" prop="phone" :rules="[{ required: true, message: $t('empty')},{ type: 'number', message: $t('userEdit.inputPhoneNumber')}]">
          <el-input v-model.number="userEdit.phone" :placeholder="$t('table.phone')" style="width:365px;" class="filter-item"/>
        </el-form-item>
        <el-form-item :label="$t('userEdit.password')" prop="password">
          <el-input disabled :placeholder="$t('table.phone')" style="width:200px;" class="filter-item" value="******"/>
          <el-button style="" size="medium" type="primary" @click="passwordBox = true">{{$t('changePassword')}}</el-button>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible1 = false">{{ $t('table.cancel') }}</el-button>
        <el-button type="primary" @click="userEditSave">{{ $t('table.confirm') }}</el-button>
      </div>



    </el-dialog>
    <!--修改用户密码弹窗-->
    <el-dialog :title="$t('changePassword')" :visible.sync="passwordBox" width="550px" center>

      <el-form ref="passwordForm" :model="passwordEdit" :rules="passwordRules" label-position="left" label-width="150px" style="width: 550px; margin-left:50px;"  class="demo-ruleForm">
        <el-form-item :label="$t('old_password')" prop="old_password">
          <el-input v-model="passwordEdit.old_password" :placeholder="$t('old_password')" style="width:250px;" class="filter-item"/>
        </el-form-item>
        <el-form-item :label="$t('new_password')" prop="new_password">
          <el-input v-model="passwordEdit.new_password" :placeholder="$t('new_password')" style="width:250px;" class="filter-item"/>
        </el-form-item>
        <el-form-item :label="$t('repeat_password')" prop="repeat_password" >
          <el-input v-model.number="passwordEdit.repeat_password" :placeholder="$t('repeat_password')" style="width:250px;" class="filter-item"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="passwordBox = false">{{ $t('table.cancel') }}</el-button>
        <el-button type="primary" @click="changePassword">{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Breadcrumb from '@/components/Breadcrumb'
  import Hamburger from '@/components/Hamburger'
  import ErrorLog from '@/components/ErrorLog'
  import Screenfull from '@/components/Screenfull'
  import SizeSelect from '@/components/SizeSelect'
  import LangSelect from '@/components/LangSelect'

  import { getAccount,changeAccount,changeAccountPassword } from '@/api/account'

  export default {
    components: {
      Breadcrumb,
      Hamburger,
      ErrorLog,
      Screenfull,
      SizeSelect,
      LangSelect
    },
    data(){
      let passwordReg = new RegExp("^[a-zA-Z0-9]{6,15}$");
      var validateOld_password = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('empty')));
        } else if(!passwordReg.test(value)){
          callback(new Error(this.$t('passwordRule')));
        }
        callback();
      };
      let validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('empty')));
        } else if(!passwordReg.test(value)){
          callback(new Error(this.$t('passwordRule')));
        }else {
          if (this.passwordEdit.repeat_password !== '') {
            this.$refs.passwordForm.validateField('repeat_password');
          }
          callback();
        }
      };
      let validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('empty')));
        }else if(!passwordReg.test(value)){
          callback(new Error(this.$t('passwordRule')));
        } else if (value != this.passwordEdit.new_password) {
          callback(new Error(this.$t('passwordRepeat')));
        } else {
          callback();
        }
      };
      return{
        dialogFormVisible1: false,
        passwordBox: false,
        userEdit: {
          email: '',
          name: '',
          phone: '',
        },
        passwordEdit: {
          old_password: '',
          new_password: '',
          repeat_password:'',
        },

        passwordRules: {
          old_password: [{ validator: validateOld_password, trigger: 'blur' }],
          new_password: [{ validator: validatePass, trigger: 'blur' }],
          repeat_password: [{ validator: validatePass2, trigger: 'blur' }],
        },

      }
    },
    computed: {
      visitedViews() {
        return this.$store.state.tagsView.visitedViews
      },
      name() {
        return this.$store.getters.name
      },
      roles() {
        return this.$store.getters.roles[0]
      },
      ...mapGetters([
        'sidebar',
        'avatar',
        'device'
      ])
    },
    methods: {
      // 用户信息保存
      userEditSave(){
        let that=this;
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            changeAccount (that.userEdit).then(response => {
              console.log('changeAccount',response);
              that.dialogFormVisible1=false;
              that.$notify({
                showClose: true,
                message: that.$t('changeSuccess'),
                type: 'success'
              });
            }).catch(err => {
              console.log(err);
            })
          }
        })
      },
      changePassword(){
        let that=this;
        this.$refs['passwordForm'].validate((valid) => {
          if (valid) {
            changeAccountPassword (that.passwordEdit).then(response => {
              console.log('changeAccountPassword',response);
              that.logout();
              that.$notify({
                showClose: true,
                message: that.$t('changeSuccess'),
                type: 'success'
              });
            }).catch(err => {
              console.log(err);
            })
          }
        })
      },

      handleEdit(index, row) {
        console.log(index, row);
        this.dialogFormVisible1=true;
        let newObj = Object.assign({}, row.row);
        this.userEdit=newObj;
        this.userEdit.phone=parseInt(this.userEdit.phone);
      },
      toProfile(){
        this.dialogFormVisible1=true;
        getAccount ().then(response => {
          console.log('getAccount',response);
          this.userEdit=response.data;
          this.userEdit.phone=parseInt(this.userEdit.phone);
        }).catch(err => {
          console.log(err);
        })
      },
      toggleSideBar() {
        this.$store.dispatch('app/toggleSideBar')
      },
      async logout() {
        this.$store.dispatch('tagsView/delAllViews').then(({ visitedViews }) => {});//清除tabview
        await this.$store.dispatch('user/logout');
        this.$router.push(`/login?redirect=${this.$route.fullPath}`)
      },
    }
  }
</script>

<style lang="scss" scoped>
  .navbar {
    height: 50px;
    overflow: hidden;
    position: relative;
    background: #fff;
    box-shadow: 0 1px 4px rgba(0,21,41,.08);

    .hamburger-container {
      line-height: 46px;
      height: 100%;
      float: left;
      cursor: pointer;
      transition: background .3s;
      -webkit-tap-highlight-color:transparent;

      &:hover {
        background: rgba(0, 0, 0, .025)
      }
    }

    .breadcrumb-container {
      float: left;
    }

    .errLog-container {
      display: inline-block;
      vertical-align: top;
    }

    .right-menu {
      float: right;
      height: 100%;
      line-height: 50px;

      &:focus {
        outline: none;
      }

      .right-menu-item {
        display: inline-block;
        padding: 0 8px;
        height: 100%;
        font-size: 18px;
        color: #5a5e66;
        vertical-align: text-bottom;

        &.hover-effect {
          cursor: pointer;
          transition: background .3s;

          &:hover {
            background: rgba(0, 0, 0, .025)
          }
        }
      }

      .avatar-container {
        margin-right: 30px;

        .avatar-wrapper {
          /*margin-top: 5px;*/
          position: relative;

          .user-avatar {
            cursor: pointer;
            width: 40px;
            height: 40px;
            border-radius: 10px;
          }

          .el-icon-caret-bottom {
            cursor: pointer;
            position: absolute;
            right: -20px;
            top: 20px;
            font-size: 12px;
          }
        }
      }
    }
  }
</style>
