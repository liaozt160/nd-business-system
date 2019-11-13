<template>
  <div class="app-container">
    <aside>
      <h3 style="text-align: center;">{{businessId?$t('route.employerEdit'):$t('route.AddBusiness')}}</h3>
    </aside>
    <el-tabs type="border-card" @tab-click="changetab" :before-leave="tabBefore" style="padding-bottom: 30px;" v-loading="listLoading">
      <el-tab-pane :label="$t('english')" id="taben">
        <div class="formRow">
          <div class="formItem filter-item el-select--medium">
            <!--企业分类-->
            <span class="formItemSpan">{{$t('employeeEdit.business_category')}}</span>
            <el-select v-model="formDataEn.category_id" :placeholder="$t('select')" style="width: 70%;margin-bottom: 20px;"
                       class="filter-item">
              <el-option v-for="item in business_category_arr" :label="item.category" :value="item.id.toString()"/>
            </el-select>
          </div>
        </div>
        <div class="formRow">
          <div class="formItem filter-item el-select--medium">
            <!--企业名称-->
            <span class="formItemSpan"><span style="font-size:20px;margin-left: -10px;color:red; position: absolute;margin-top: 3px;">*</span>{{$t('employeeEdit.companyName')}}</span>
            <el-input v-model="formDataEn.company" :placeholder="$t('employeeEdit.companyName')" style="width: 70%;margin-bottom: 20px;" class="filter-item"></el-input>
          </div>
          <div class="formItem filter-item el-select--medium">
            <!--编号-->
            <span class="formItemSpan"><span style="font-size:20px;margin-left: -10px;color:red; position: absolute;margin-top: 3px;">*</span>{{$t('employeeEdit.Listing')}}</span>
            <el-input v-model="formDataEn.listing" :placeholder="$t('employeeEdit.Listing')" style="width: 70%;margin-bottom: 20px;" class="filter-item"></el-input>
          </div>
        </div>
        <div class="formRow">
          <div class="formItem filter-item el-select--medium">
            <!--标题-->
            <span class="formItemSpan"><span style="font-size:20px;margin-left: -10px;color:red; position: absolute;margin-top: 3px;">*</span>{{$t('employeeEdit.title')}}</span>
            <el-input v-model="formDataEn.title" :placeholder="$t('employeeEdit.title')" style="width: 70%;margin-bottom: 20px;" class="filter-item"></el-input>
          </div>
          <div class="formItem filter-item el-select--medium">
            <!--标价-->
            <span class="formItemSpan"><span style="font-size:20px;margin-left: -10px;color:red; position: absolute;margin-top: 3px;">*</span>{{$t('employeeEdit.Price')}}</span>
            <el-input v-enter-number :placeholder="$t('employeeEdit.Price')" maxLength="10" v-model="formDataEn.price" style="width: 70%;margin-bottom: 20px;" class="filter-item">
              <template slot="prepend">$</template>
            </el-input>
          </div>
        </div>
        <div class="formRow">
          <div class="formItem filter-item el-select--medium">
            <!--卖家融资-->
            <span class="formItemSpan">{{$t('employeeEdit.BuyerFinancing')}}</span>
            <el-input :placeholder="$t('employeeEdit.BuyerFinancing')" v-model="formDataEn.buyer_financing"
                      style="width: 70%;margin-bottom: 20px;" class="filter-item">
            </el-input>
          </div>
          <div class="formItem filter-item el-select--medium">
            <!--企业状态-->
            <span class="formItemSpan">{{$t('employeeEdit.EnterpriseState')}}</span>
            <el-select v-model="formDataEn.status" :placeholder="$t('select')" style="width: 70%;margin-bottom: 20px;"
                       class="filter-item">
              <el-option :label="$t('table.forSale')" :value="1"/>
              <el-option :label="$t('table.soldOut')" :value="2"/>
              <el-option :label="$t('employeeEdit.noVerified')" :value="3"/>
            </el-select>
          </div>
          <!--<div class="formItem filter-item el-select&#45;&#45;medium">-->
          <!--&lt;!&ndash;生意介绍信息&ndash;&gt;-->
          <!--<span class="formItemSpan">Business Description</span>-->
          <!--<el-input v-model="formDataEn.business_description" placeholder="Business Description" style="width: 70%;margin-bottom: 20px;" class="filter-item"/>-->
          <!--</div>-->
        </div>
        <div class="formRow">
          <div class="formItem filter-item el-select--medium">
            <!--是否盈利-->
            <span class="formItemSpan">{{$t('employeeEdit.Profitability')}}</span>
            <el-select v-model="formDataEn.profitability" :placeholder="$t('select')" style="width: 70%;margin-bottom: 20px;"
                       class="filter-item">
              <el-option :label="$t('yes')" :value="1"/>
              <el-option :label="$t('no')" :value="2"/>
              <el-option :label="$t('NA')" :value="3"/>
            </el-select>
          </div>
          <div class="formItem filter-item el-select--medium">
            <!--是否包含房地产-->
            <span class="formItemSpan">{{$t('employeeEdit.RealEstate')}}</span>
            <el-select v-model="formDataEn.real_estate" :placeholder="$t('select')" style="width: 70%;margin-bottom: 20px;"
                       class="filter-item">
              <el-option :label="$t('yes')" :value="1"/>
              <el-option :label="$t('no')" :value="2"/>
              <el-option :label="$t('NA')" :value="3"/>
            </el-select>
          </div>
        </div>
        <div class="formRow">
          <div class="formItem filter-item el-select--medium">
          <!--是否加盟店-->
          <span class="formItemSpan">{{$t('employeeEdit.Franchise')}}</span>
          <el-select v-model="formDataEn.franchise" :placeholder="$t('select')" style="width: 70%;margin-bottom: 20px;" class="filter-item">
          <el-option :label="$t('yes')" :value="1" />
          <el-option :label="$t('no')"  :value="2" />
          <el-option :label="$t('NA')"  :value="3" />
          </el-select>
          </div>
          <div class="formItem filter-item el-select--medium">
            <!--营业面积-->
            <span class="formItemSpan">{{$t('employeeEdit.BuildingSF')}}</span>
            <el-input :placeholder="$t('employeeEdit.BuildingSF')" v-model="formDataEn.building_sf" style="width: 70%;margin-bottom: 20px;"
                      class="filter-item">
            </el-input>
          </div>
        </div>
        <div class="formRow">
          <div class="formItem filter-item el-select--medium">
            <!--员工人数-->
            <span class="formItemSpan">{{$t('employeeEdit.EmployeeCount')}}</span>
            <div style="width: 70%;margin-bottom: 20px;position: relative;">
              <el-input v-enter-number v-model="formDataEn.employee_count" class="filter-item" @focus="employee_countNA=true" @blur="employee_countBlur"></el-input>
              <div v-show="employee_countNA" class="selectBox" @click="formDataEn.employee_count=$t('NA');employee_countNA=false">{{$t('NA')}}</div>
            </div>

          </div>
          <div class="formItem filter-item el-select--medium">
            <!--营业额-->
            <span class="formItemSpan">{{$t('employeeEdit.GrossIncome')}}</span>
            <el-input v-enter-number :placeholder="$t('employeeEdit.GrossIncome')" maxLength="10" v-model="formDataEn.gross_income" style="width: 70%;margin-bottom: 20px;" class="filter-item">
              <template slot="prepend"> $ </template>
              <el-select v-model="formDataEn.gross_income_unit" slot="append" :placeholder="$t('unit')" style="width: 110px">
                <el-option :label="'/ '+$t('week')"   value="1"></el-option>
                <el-option :label="'/ '+$t('Month')"   value="2"></el-option>
                <el-option :label="'/ '+$t('Quarter')"   value="3"></el-option>
                <el-option :label="'/ '+$t('Year')"   value="4"></el-option>
              </el-select>
            </el-input>
          </div>
        </div>
        <div class="formRow">
          <div class="formItem filter-item el-select--medium">
            <!--税息折旧及摊销前利润-->
            <span class="formItemSpan">{{$t('employeeEdit.EBITDA')}}</span>
            <el-input :placeholder="$t('employeeEdit.EBITDA')" v-model="formDataEn.ebitda" style="width: 70%;margin-bottom: 20px;" class="filter-item">
            </el-input>
          </div>
          <div class="formItem filter-item el-select--medium">
            <!--硬件资产价值-->
            <span class="formItemSpan">{{$t('employeeEdit.FFandE')}}</span>
            <el-input :placeholder="$t('employeeEdit.FFandE')" v-model="formDataEn.ff_e" style="width: 70%;margin-bottom: 20px;" class="filter-item">
            </el-input>
          </div>
        </div>
        <div class="formRow">
          <div class="formItem filter-item el-select--medium">
            <!--库存-->
            <span class="formItemSpan">{{$t('employeeEdit.Inventory')}}</span>
            <el-input v-model="formDataEn.inventory" :placeholder="$t('employeeEdit.Inventory')" style="width: 70%;margin-bottom: 20px;" class="filter-item"></el-input>
          </div>
          <div class="formItem filter-item el-select--medium">
            <!--净利润-->
            <span class="formItemSpan">{{$t('employeeEdit.NetIncome')}}</span>
            <el-input v-enter-number :placeholder="$t('employeeEdit.NetIncome')" maxLength="10" v-model="formDataEn.net_income" style="width: 70%;margin-bottom: 20px;" class="filter-item">
              <template slot="prepend"> $ </template>
              <el-select v-model="formDataEn.net_income_unit" slot="append" :placeholder="$t('unit')" style="width: 110px">
                <el-option :label="'/ '+$t('week')"   value="1"></el-option>
                <el-option :label="'/ '+$t('Month')"   value="2"></el-option>
                <el-option :label="'/ '+$t('Quarter')"   value="3"></el-option>
                <el-option :label="'/ '+$t('Year')"   value="4"></el-option>
              </el-select>
            </el-input>
          </div>
        </div>
        <div class="formRow">
          <div class="formItem filter-item el-select--medium">
            <!--租金-->
            <span class="formItemSpan">{{$t('employeeEdit.Lease')}}</span>
            <el-input v-enter-number :placeholder="$t('employeeEdit.Lease')" maxLength="10" v-model="formDataEn.lease" style="width: 70%;margin-bottom: 20px;" class="filter-item">
              <template slot="prepend"> $ </template>
              <el-select v-model="formDataEn.lease_unit" slot="append" :placeholder="$t('unit')" style="width: 110px">
                <el-option :label="'/ '+$t('week')"   value="1"></el-option>
                <el-option :label="'/ '+$t('Month')"   value="2"></el-option>
                <el-option :label="'/ '+$t('Quarter')"   value="3"></el-option>
                <el-option :label="'/ '+$t('Year')"   value="4"></el-option>
              </el-select>
            </el-input>
          </div>
          <div class="formItem filter-item el-select--medium">
            <!--租约有效期-->
            <span class="formItemSpan">{{$t('employeeEdit.LeaseTerm')}}</span>
            <el-input :placeholder="$t('employeeEdit.LeaseTerm')" v-model="formDataEn.lease_term" style="width: 70%;margin-bottom: 20px;" class="filter-item"></el-input>
          </div>
        </div>
        <div class="formRow">
          <div class="formItem filter-item el-select--medium">
            <!--房地产估价-->
            <span class="formItemSpan">{{$t('employeeEdit.Est')}}</span>
            <el-input :placeholder="$t('employeeEdit.Est')" v-model="formDataEn.value_of_real_estate" style="width: 70%;margin-bottom: 20px;" class="filter-item"></el-input>
          </div>
          <div class="formItem filter-item el-select--medium">
            <!--服务费-->
            <span class="formItemSpan">{{$t('employeeEdit.ServiceFee')}}</span>
            <el-input :placeholder="$t('employeeEdit.ServiceFee')" v-model="formDataEn.commission" style="width: 70%;margin-bottom: 20px;" class="filter-item"></el-input>
          </div>
        </div>
        <div class="formRow">
          <div class="formItem filter-item el-select--medium">
            <!--美国中介-->
            <span class="formItemSpan">{{$t('employeeEdit.USBroker')}}</span>
            <el-input v-model="formDataEn.us_broker" :placeholder="$t('employeeEdit.USBroker')" style="width: 70%;margin-bottom: 20px;" class="filter-item"> </el-input>
          </div>
          <div class="formItem filter-item el-select--medium">
            <!--美国中介联系方式-->
            <span class="formItemSpan">{{$t('employeeEdit.USBrokerContactInfo')}}</span>
            <el-input v-model="formDataEn.us_broker_contact_info" :placeholder="$t('employeeEdit.USBrokerContactInfo')" style="width: 70%;margin-bottom: 20px;" class="filter-item"></el-input>
          </div>
        </div>
        <div class="formRow">
          <div class="formItem filter-item el-select--medium">
            <!--待售开始日期-->
            <span class="formItemSpan">{{$t('employeeEdit.ListingDate')}}</span>
            <el-date-picker v-model="formDataEn.listing_date" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
                            :placeholder="$t('employeeEdit.ListingDate')" style="width: 70%;margin-bottom: 20px;"></el-date-picker>
          </div>
          <div class="formItem filter-item el-select--medium">
            <!--出售原因-->
            <span class="formItemSpan">{{$t('employeeEdit.ReasonForSelling')}}</span>
            <el-input v-model="formDataEn.reason_for_selling" :placeholder="$t('employeeEdit.ReasonForSelling')" style="width: 70%;margin-bottom: 20px;" class="filter-item"></el-input>
          </div>
        </div>
        <div class="filter-item el-select--medium address">
          <!--地理位置-->
          <span class="formItemSpan" style="margin-right: -5px;">{{$t('employeeEdit.Location')}}</span>
          <el-select v-model="formDataEn.country" id="country"
                     @change="getlocation('country',formDataEn.country)"
                     style="width: 215px;margin: 0 5px;" class="filter-item">
            <el-option :label="$t('China')" value="1000"/>
            <el-option :label="$t('UnitedStates')" value="USA"/>
          </el-select>
          <el-select v-model="formDataEn.states" style="width: 215px;margin: 0 5px;" id="provinces"
                     :disabled="locationLoading"
                     class="filter-item">
            <el-option v-for="item in provinces" :label="item.name" :value="item.code"/>
          </el-select>
          <!--<el-select v-model="formDataEn.city" style="width: 130px;margin: 0 5px;" id="city"-->
                     <!--:disabled="locationLoading"-->
                     <!--class="filter-item">-->
            <!--<el-option v-for="item in cities" :label="item.name" :value="item.code"/>-->
          <!--</el-select>-->
          <el-input v-model="formDataEn.address":placeholder="$t('address')" style="width: 50%;" class="filter-item"/>
        </div>
        <!--主体部分-->
        <div class="formContainer">
          <!--BUSINESS DESCRIPTION 商业描述-->
          <div class="itemBox">
            <div class="formTitle">{{$t('employeeEdit.business_description')}}</div>
            <div>
              <el-input
                type="textarea"
                :autosize="{ minRows: 4}"
                :placeholder="$t('employeeEdit.business_description')"
                v-model="formDataEn.business_description">
              </el-input>
            </div>
          </div>
          <!--Business Asset For Sale 待售商业资产-->
          <div class="itemBox">
            <div class="formTitle">{{$t('employeeEdit.businessAssetForSale')}}</div>
            <div>
              <el-input
                type="textarea"
                :autosize="{ minRows: 4}"
                :placeholder="$t('employeeEdit.businessAssetForSale')"
                v-model="formDataEn.business_assets">
              </el-input>
            </div>
          </div>
          <!--Financial Performance 财务绩效-->
          <div class="itemBox">
            <div class="formTitle">{{$t('employeeEdit.financial_performance')}}</div>
            <div>
              <el-input
                type="textarea"
                :autosize="{ minRows: 4}"
                :placeholder="$t('employeeEdit.financial_performance')"
                v-model="formDataEn.financial_performance">
              </el-input>
            </div>
          </div>
          <!--Employee Info 员工信息-->
          <div class="itemBox">
            <div class="formTitle">{{$t('employeeEdit.employee_info')}}</div>
            <div>
              <el-input
                type="textarea"
                :autosize="{ minRows: 4}"
                :placeholder="$t('employeeEdit.employee_info')"
                v-model="formDataEn.employee_info">
              </el-input>
            </div>
          </div>
          <!--Financial Reports 财务报表-->
          <div class="itemBox">
            <div class="formTitle">{{$t('employeeEdit.financial_reports')}}</div>
            <div>
              <el-input
                type="textarea"
                :autosize="{ minRows: 4}"
                :placeholder="$t('employeeEdit.financial_reports')"
                v-model="formDataEn.franchise_reports">
              </el-input>
            </div>
          </div>
          <!--Tax Returns 报税记录-->
          <div class="itemBox">
            <div class="formTitle">{{$t('employeeEdit.tax_returns')}}</div>
            <div>
              <el-input
                type="textarea"
                :autosize="{ minRows: 4}"
                :placeholder="$t('employeeEdit.tax_returns')"
                v-model="formDataEn.tax_returns">
              </el-input>
            </div>
          </div>
          <div style="text-align: center;margin: 50px 0;">
            <el-button size="medium" type="primary" @click="formSave">{{$t('save')}}</el-button>
            <el-button size="medium" @click="cancelBtn">{{$t('cancel')}}</el-button>
          </div>
        </div>

      </el-tab-pane>
      <!--中文tab-->
      <el-tab-pane :label="$t('chinese')" id="tabzh">
        <div class="formRow">
          <div class="formItem filter-item el-select--medium">
            <!--企业分类-->
            <span class="formItemSpan">{{$t('employeeEdit.business_category')}}</span>
            <el-select v-model="formDataZh.category_id" :placeholder="$t('select')" style="width: 70%;margin-bottom: 20px;"
                       class="filter-item">
              <el-option v-for="item in business_category_arr" :label="item.category" :value="item.id.toString()"/>
            </el-select>
          </div>
        </div>
        <div class="formRow">
          <div class="formItem filter-item el-select--medium">
            <!--公司名称-->
            <span class="formItemSpan"><span style="font-size:20px;margin-left: -10px;color:red; position: absolute;margin-top: 3px;">*</span>{{$t('employeeEdit.companyName')}}</span>
            <el-input v-model="formDataZh.company" :placeholder="$t('employeeEdit.companyName')" style="width: 70%;margin-bottom: 20px;"
                      class="filter-item"/>
          </div>
          <div class="formItem filter-item el-select--medium">
            <!--编号-->
            <span class="formItemSpan"><span style="font-size:20px;margin-left: -10px;color:red; position: absolute;margin-top: 3px;">*</span>{{$t('employeeEdit.Listing')}}</span>
            <el-input v-model="formDataZh.listing" :placeholder="$t('employeeEdit.Listing')" style="width: 70%;margin-bottom: 20px;"
                      class="filter-item"/>
          </div>
        </div>
        <div class="formRow">
          <div class="formItem filter-item el-select--medium">
            <!--标题-->
            <span class="formItemSpan"><span style="font-size:20px;margin-left: -10px;color:red; position: absolute;margin-top: 3px;">*</span>{{$t('employeeEdit.title')}}</span>
            <el-input v-model="formDataZh.title" :placeholder="$t('employeeEdit.title')" style="width: 70%;margin-bottom: 20px;"
                      class="filter-item"></el-input>
          </div>
          <div class="formItem filter-item el-select--medium">
            <!--标价-->
            <span class="formItemSpan"><span style="font-size:20px;margin-left: -10px;color:red; position: absolute;margin-top: 3px;">*</span>{{$t('employeeEdit.Price')}}</span>
            <el-input v-enter-number :placeholder="$t('employeeEdit.Price')" maxLength="10" v-model="formDataZh.price" style="width: 70%;margin-bottom: 20px;" class="filter-item">
              <template slot="prepend">$</template>
            </el-input>
          </div>
        </div>
        <div class="formRow">
          <div class="formItem filter-item el-select--medium">
            <!--卖家融资-->
            <span class="formItemSpan">{{$t('employeeEdit.BuyerFinancing')}}</span>
            <el-input :placeholder="$t('employeeEdit.BuyerFinancing')" v-model="formDataZh.buyer_financing"
                      style="width: 70%;margin-bottom: 20px;" class="filter-item">
            </el-input>
          </div>
          <div class="formItem filter-item el-select--medium">
            <!--企业状态-->
            <span class="formItemSpan">{{$t('employeeEdit.EnterpriseState')}}</span>
            <el-select v-model="formDataZh.status" :placeholder="$t('select')" style="width: 70%;margin-bottom: 20px;"
                       class="filter-item">
              <el-option :label="$t('table.forSale')" :value="1"/>
              <el-option :label="$t('table.soldOut')" :value="2"/>
              <el-option :label="$t('employeeEdit.noVerified')" :value="3"/>
            </el-select>
          </div>
          <!--<div class="formItem filter-item el-select&#45;&#45;medium">-->
          <!--&lt;!&ndash;生意介绍信息&ndash;&gt;-->
          <!--<span class="formItemSpan">Business Description</span>-->
          <!--<el-input v-model="formDataEn.business_description" placeholder="Business Description" style="width: 70%;margin-bottom: 20px;" class="filter-item"/>-->
          <!--</div>-->
        </div>
        <div class="formRow">
          <div class="formItem filter-item el-select--medium">
            <!--是否盈利-->
            <span class="formItemSpan">{{$t('employeeEdit.Profitability')}}</span>
            <el-select v-model="formDataZh.profitability" :placeholder="$t('select')" style="width: 70%;margin-bottom: 20px;"
                       class="filter-item">
              <el-option :label="$t('yes')" :value="1"/>
              <el-option :label="$t('no')"  :value="2"/>
              <el-option :label="$t('NA')" :value="3"/>
            </el-select>
          </div>
          <div class="formItem filter-item el-select--medium">
            <!--是否包含房地产-->
            <span class="formItemSpan">{{$t('employeeEdit.RealEstate')}}</span>
            <el-select v-model="formDataZh.real_estate" :placeholder="$t('select')" style="width: 70%;margin-bottom: 20px;"
                       class="filter-item">
              <el-option :label="$t('yes')"  :value="1"/>
              <el-option :label="$t('no')"   :value="2"/>
              <el-option :label="$t('NA')"  :value="3"/>
            </el-select>
          </div>
        </div>
        <div class="formRow">
          <div class="formItem filter-item el-select--medium">
          <!--是否连锁店-->
          <span class="formItemSpan">{{$t('employeeEdit.Franchise')}}</span>
          <el-select v-model="formDataZh.franchise" :placeholder="$t('select')" style="width: 70%;margin-bottom: 20px;" class="filter-item">
          <el-option :label="$t('yes')"  :value="1" />
          <el-option :label="$t('no')"   :value="2" />
          <el-option :label="$t('NA')"   :value="3" />
          </el-select>
          </div>
          <div class="formItem filter-item el-select--medium">
            <!--营业面积-->
            <span class="formItemSpan">{{$t('employeeEdit.BuildingSF')}}</span>
            <el-input :placeholder="$t('employeeEdit.BuildingSF')" v-model="formDataZh.building_sf" style="width: 70%;margin-bottom: 20px;"
                      class="filter-item">
            </el-input>
          </div>
        </div>
        <div class="formRow">
          <div class="formItem filter-item el-select--medium">
            <!--员工人数-->
            <span class="formItemSpan">{{$t('employeeEdit.EmployeeCount')}}</span>
            <div style="width: 70%;margin-bottom: 20px;position: relative;">
              <el-input v-enter-number v-model="formDataZh.employee_count" class="filter-item" @focus="employee_countNA=true" @blur="employee_countBlur"></el-input>
              <div v-show="employee_countNA" class="selectBox" @click="formDataZh.employee_count=$t('NA');employee_countNA=false">{{$t('NA')}}</div>
            </div>

          </div>
          <div class="formItem filter-item el-select--medium">
            <!--营业额-->
            <span class="formItemSpan">{{$t('employeeEdit.GrossIncome')}}</span>
            <el-input v-enter-number :placeholder="$t('employeeEdit.GrossIncome')" maxLength="10" v-model="formDataZh.gross_income" style="width: 70%;margin-bottom: 20px;" class="filter-item">
              <template slot="prepend"> $ </template>
              <el-select v-model="formDataZh.gross_income_unit" slot="append" :placeholder="$t('unit')" style="width: 110px">
                <el-option :label="'/ '+$t('week')"   value="1"></el-option>
                <el-option :label="'/ '+$t('Month')"   value="2"></el-option>
                <el-option :label="'/ '+$t('Quarter')"   value="3"></el-option>
                <el-option :label="'/ '+$t('Year')"   value="4"></el-option>
              </el-select>
            </el-input>
          </div>
        </div>
        <div class="formRow">
          <div class="formItem filter-item el-select--medium">
            <!--税息折旧及摊销前利润-->
            <span class="formItemSpan">{{$t('employeeEdit.EBITDA')}}</span>
            <el-input :placeholder="$t('employeeEdit.EBITDA')" v-model="formDataZh.ebitda" style="width: 70%;margin-bottom: 20px;"
                      class="filter-item">
            </el-input>
          </div>
          <div class="formItem filter-item el-select--medium">
            <!--硬件资产价值-->
            <span class="formItemSpan">{{$t('employeeEdit.FFandE')}}</span>
            <el-input :placeholder="$t('employeeEdit.FFandE')" v-model="formDataZh.ff_e" style="width: 70%;margin-bottom: 20px;"
                      class="filter-item">
            </el-input>
          </div>
        </div>
        <div class="formRow">
          <div class="formItem filter-item el-select--medium">
            <!--库存-->
            <span class="formItemSpan">{{$t('employeeEdit.Inventory')}}</span>
            <el-input v-model="formDataZh.inventory" :placeholder="$t('employeeEdit.Inventory')" style="width: 70%;margin-bottom: 20px;" class="filter-item"></el-input>
          </div>
          <div class="formItem filter-item el-select--medium">
            <!--净利润-->
            <span class="formItemSpan">{{$t('employeeEdit.NetIncome')}}</span>
            <el-input v-enter-number :placeholder="$t('employeeEdit.NetIncome')" maxLength="10" v-model="formDataZh.net_income" style="width: 70%;margin-bottom: 20px;" class="filter-item">
              <template slot="prepend"> $ </template>
              <el-select v-model="formDataZh.net_income_unit" slot="append" :placeholder="$t('unit')" style="width: 110px">
                <el-option :label="'/ '+$t('week')"   value="1"></el-option>
                <el-option :label="'/ '+$t('Month')"   value="2"></el-option>
                <el-option :label="'/ '+$t('Quarter')"   value="3"></el-option>
                <el-option :label="'/ '+$t('Year')"   value="4"></el-option>
              </el-select>
            </el-input>
          </div>
        </div>
        <div class="formRow">
          <div class="formItem filter-item el-select--medium">
            <!--租金-->
            <span class="formItemSpan">{{$t('employeeEdit.Lease')}}</span>
            <el-input v-enter-number :placeholder="$t('employeeEdit.Lease')" maxLength="10" v-model="formDataZh.lease" style="width: 70%;margin-bottom: 20px;" class="filter-item">
              <template slot="prepend"> $ </template>
              <el-select v-model="formDataZh.lease_unit" slot="append" :placeholder="$t('unit')" style="width: 110px">
                <el-option :label="'/ '+$t('week')"   value="1"></el-option>
                <el-option :label="'/ '+$t('Month')"   value="2"></el-option>
                <el-option :label="'/ '+$t('Quarter')"   value="3"></el-option>
                <el-option :label="'/ '+$t('Year')"   value="4"></el-option>
              </el-select>
            </el-input>
          </div>
          <div class="formItem filter-item el-select--medium">
            <!--租约有效期-->
            <span class="formItemSpan">{{$t('employeeEdit.LeaseTerm')}}</span>
            <el-input :placeholder="$t('employeeEdit.LeaseTerm')" v-model="formDataZh.lease_term" style="width: 70%;margin-bottom: 20px;" class="filter-item"></el-input>
          </div>
        </div>
        <div class="formRow">
          <div class="formItem filter-item el-select--medium">
            <!--房地产估价-->
            <span class="formItemSpan">{{$t('employeeEdit.Est')}}</span>
            <el-input :placeholder="$t('employeeEdit.Est')" v-model="formDataZh.value_of_real_estate" style="width: 70%;margin-bottom: 20px;" class="filter-item"></el-input>
          </div>
          <div class="formItem filter-item el-select--medium">
            <!--服务费-->
            <span class="formItemSpan">{{$t('employeeEdit.ServiceFee')}}</span>
            <el-input :placeholder="$t('employeeEdit.ServiceFee')" v-model="formDataZh.commission" style="width: 70%;margin-bottom: 20px;"
                      class="filter-item">
            </el-input>
          </div>
        </div>
        <div class="formRow">
          <div class="formItem filter-item el-select--medium">
            <!--卖家融资-->
            <span class="formItemSpan">{{$t('employeeEdit.BuyerFinancing')}}</span>
            <el-input :placeholder="$t('employeeEdit.BuyerFinancing')" v-model="formDataZh.buyer_financing" style="width: 70%;margin-bottom: 20px;" class="filter-item">
            </el-input>
          </div>
        </div>
        <div class="formRow">
          <div class="formItem filter-item el-select--medium">
            <!--美国中介-->
            <span class="formItemSpan">{{$t('employeeEdit.USBroker')}}</span>
            <el-input v-model="formDataZh.us_broker" :placeholder="$t('employeeEdit.USBroker')" style="width: 70%;margin-bottom: 20px;"
                      class="filter-item"/>
          </div>
          <div class="formItem filter-item el-select--medium">
            <!--美国中介联系方式-->
            <span class="formItemSpan">{{$t('employeeEdit.USBrokerContactInfo')}}</span>
            <el-input v-model="formDataZh.us_broker_contact_info" :placeholder="$t('employeeEdit.USBrokerContactInfo')"
                      style="width: 70%;margin-bottom: 20px;" class="filter-item"/>
          </div>
        </div>
        <div class="formRow">
          <div class="formItem filter-item el-select--medium">
            <!--待售开始日期-->
            <span class="formItemSpan">{{$t('employeeEdit.ListingDate')}}</span>
            <el-date-picker v-model="formDataZh.listing_date" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
                            :placeholder="$t('employeeEdit.ListingDate')" style="width: 70%;margin-bottom: 20px;"></el-date-picker>
          </div>
          <div class="formItem filter-item el-select--medium">
            <!--出售原因-->
            <span class="formItemSpan">{{$t('employeeEdit.ReasonForSelling')}}</span>
            <el-input v-model="formDataZh.reason_for_selling" :placeholder="$t('employeeEdit.ReasonForSelling')" style="width: 70%;margin-bottom: 20px;"
                      class="filter-item"/>
          </div>
        </div>
        <div class="filter-item el-select--medium address">
          <span
            style="color: #717171;font-size: 14px;display: inline-block;text-align: right;line-height: 40px;padding-right: 20px;width: 160px;">{{$t('employeeEdit.Location')}}</span>
          <el-select v-model="formDataZh.country" id="country"
                     @change="getlocation('country',formDataZh.country)"
                     style="width: 215px;margin: 0 5px;" class="filter-item">
            <el-option :label="$t('China')" value="1000"/>
            <el-option :label="$t('UnitedStates')" value="USA"/>
          </el-select>
          <el-select v-model="formDataZh.states" style="width: 215px;margin: 0 5px;" id="provinces"
                     :disabled="locationLoading"
                     class="filter-item">
            <el-option v-for="item in provinces" :label="item.name" :value="item.code"/>
          </el-select>
          <!--<el-select v-model="formDataZh.city" style="width: 130px;margin: 0 5px;" id="city"-->
                     <!--:disabled="locationLoading"-->
                     <!--class="filter-item">-->
            <!--<el-option v-for="item in cities" :label="item.name" :value="item.code"/>-->
          <!--</el-select>-->
          <el-input v-model="formDataZh.address" :placeholder="$t('address')" style="width: 50%;" class="filter-item"/>
        </div>
        <!--主体部分-->
        <div class="formContainer">
          <!--BUSINESS DESCRIPTION 商业描述-->
          <div class="itemBox">
            <div class="formTitle">{{$t('employeeEdit.business_description')}}</div>
            <div>
              <el-input
                type="textarea"
                :autosize="{ minRows: 4}"
                :placeholder="$t('employeeEdit.business_description')"
                v-model="formDataZh.business_description">
              </el-input>
            </div>
          </div>
          <!--Business Asset For Sale 待售商业资产-->
          <div class="itemBox">
            <div class="formTitle">{{$t('employeeEdit.businessAssetForSale')}}</div>
            <div>
              <el-input
                type="textarea"
                :autosize="{ minRows: 4}"
                :placeholder="$t('employeeEdit.businessAssetForSale')"
                v-model="formDataZh.business_assets">
              </el-input>
            </div>
          </div>
          <!--Financial Performance 财务绩效-->
          <div class="itemBox">
            <div class="formTitle">{{$t('employeeEdit.financial_performance')}}</div>
            <div>
              <el-input
                type="textarea"
                :autosize="{ minRows: 4}"
                :placeholder="$t('employeeEdit.financial_performance')"
                v-model="formDataZh.financial_performance">
              </el-input>
            </div>
          </div>
          <!--Employee Info 员工信息-->
          <div class="itemBox">
            <div class="formTitle">{{$t('employeeEdit.employee_info')}}</div>
            <div>
              <el-input
                type="textarea"
                :autosize="{ minRows: 4}"
                :placeholder="$t('employeeEdit.employee_info')"
                v-model="formDataZh.employee_info">
              </el-input>
            </div>
          </div>
          <!--Financial Reports 财务报表-->
          <div class="itemBox">
            <div class="formTitle">{{$t('employeeEdit.financial_reports')}}</div>
            <div>
              <el-input
                type="textarea"
                :autosize="{ minRows: 4}"
                :placeholder="$t('employeeEdit.financial_reports')"
                v-model="formDataZh.franchise_reports">
              </el-input>
            </div>
          </div>
          <!--Tax Returns 报税记录-->
          <div class="itemBox">
            <div class="formTitle">{{$t('employeeEdit.tax_returns')}}</div>
            <div>
              <el-input
                type="textarea"
                :autosize="{ minRows: 4}"
                :placeholder="$t('employeeEdit.tax_returns')"
                v-model="formDataZh.tax_returns">
              </el-input>
            </div>
          </div>
          <div style="text-align: center;margin: 50px 0;">
            <el-button size="medium" type="primary" @click="formSave">{{$t('save')}}</el-button>
            <el-button size="medium" @click="cancelBtn">{{$t('cancel')}}</el-button>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>

  </div>
</template>

<script>
  import {
    getBusinessList,
    addBusiness,
    editBusiness,
    delBusiness,
    showBusinessEn,
    showBusinessZh,
    getLocation,
    editBusinessZh,
    getBusinessCategoryArr
  } from '@/api/business'

  export default {
    name: "employerEdit",
    data() {
      return {
        employee_countNA: false,
        editStatus: false,

        dialogFormVisible: false,
        listLoading: false,
        tablang: 'en',

        businessId:'',
        business_broker:'',

        provinces: [],//省份
        cities: [],//城市
        locationLoading: false,

        business_category_arr:[],

        formDataEn: {
          lang:'en',
          category_id: '',
          company: '',
          title: '',
          listing: '',
          industry: '',
          // status: 1,
          type: '',
          franchise: '',
          price: '',
          employee_count: '1',
          country: '',//国家
          states: '',//省/州
          city: '',//城市
          address: '',
          profitability: '',
          real_estate: '',
          building_sf: '',
          gross_income: '',
          gross_income_unit: '4',
          value_of_real_estate: '',
          net_income: '',
          net_income_unit: '4',
          lease: '',
          lease_unit: '2',
          lease_term: '',
          ebitda: '',
          ff_e: '',
          inventory: '',
          commission: '',
          buyer_financing: '',
          us_broker: '',
          us_broker_contact_info: '',
          listing_date: '',
          reason_for_selling: '',
          business_description: '',
          business_assets: '',
          financial_performance: '',
          franchise_reports: '',
          tax_returns: '',
          employee_info: '',
        },
        formDataZh: {
          lang:'zh',
          category_id: '',
          company: '',
          title: '',
          listing: '',
          industry: '',
          // status: 1,
          type: '',
          franchise: '',
          price: '',
          employee_count: '1',
          country: '',//国家
          states: '',//省/州
          city: '',//城市
          address: '',
          profitability: '',
          real_estate: '',
          building_sf: '',
          gross_income: '',
          gross_income_unit: '4',
          value_of_real_estate: '',
          net_income: '',
          net_income_unit: '4',
          lease: '',
          lease_unit: '2',
          lease_term: '',
          ebitda: '',
          ff_e: '',
          inventory: '',
          commission: '',
          buyer_financing: '',
          us_broker: '',
          us_broker_contact_info: '',
          listing_date: '',
          reason_for_selling: '',
          business_description: '',
          business_assets: '',
          financial_performance: '',
          franchise_reports: '',
          tax_returns: '',
          employee_info: '',
        },
      }
    },
    computed: {
      price() {
          return this.formDataEn.price?this.formDataEn.price.toString():this.formDataEn.price;
      },
      gross_income() {
        return this.formDataEn.gross_income?this.formDataEn.gross_income.toString():this.formDataEn.gross_income;
      },
      net_income() {
        return this.formDataEn.net_income?this.formDataEn.net_income.toString():this.formDataEn.net_income;
      },
      lease() {
        return this.formDataEn.lease?this.formDataEn.lease.toString():this.formDataEn.lease;
      },

      price_zh() {
          return this.formDataZh.price?this.formDataZh.price.toString():this.formDataZh.price;
      },
      gross_income_zh() {
        return this.formDataZh.gross_income?this.formDataZh.gross_income.toString():this.formDataZh.gross_income;
      },
      net_income_zh() {
        return this.formDataZh.net_income?this.formDataZh.net_income.toString():this.formDataZh.net_income;
      },
      lease_zh() {
        return this.formDataZh.lease?this.formDataZh.lease.toString():this.formDataZh.lease;
      },
    },
    watch: {
      price(newvalue, oldvalue) {
        if(!newvalue){return false}
        let newvalue_ = (newvalue.indexOf('.00') > 0) ? newvalue.replace('.00', '') : newvalue; //禁止ie8,9自动添加.00的小数点
        if ((isNaN(parseFloat(newvalue_.replace(/,/ig, ''))))) { //如果当前输入的不是数字就停止执行
          this.formDataEn.price = '';  //防止不是数字是input出现NaN提示
          return false;
        }
        if (/\./i.test(newvalue_)) { //判断处理含有.的情况下
          if (/\.\d\d\d$/.test(newvalue_)) {
            this.formDataEn.price = oldvalue; //限制只能输入2位小数点
          } else {
            this.formDataEn.price = newvalue_.replace(/[^\d\.\,]/ig, '') //开始输入小数点之后，只能输入数字
          }
        } else {
          this.formDataEn.price = ((parseFloat(newvalue_.replace(/,/ig, '')).toLocaleString()).toString()).replace('.00', '');
        }
      },
      gross_income(newvalue, oldvalue) {
        if(!newvalue){return false}
        let newvalue_ = (newvalue.indexOf('.00') > 0) ? newvalue.replace('.00', '') : newvalue; //禁止ie8,9自动添加.00的小数点
        if ((isNaN(parseFloat(newvalue_.replace(/,/ig, ''))))) { //如果当前输入的不是数字就停止执行
          this.formDataEn.gross_income = '';  //防止不是数字是input出现NaN提示
          return false;
        }
        if (/\./i.test(newvalue_)) { //判断处理含有.的情况下
          if (/\.\d\d\d$/.test(newvalue_)) {
            this.formDataEn.gross_income = oldvalue; //限制只能输入2位小数点
          } else {
            this.formDataEn.gross_income = newvalue_.replace(/[^\d\.\,]/ig, '') //开始输入小数点之后，只能输入数字
          }
        } else {
          this.formDataEn.gross_income = ((parseFloat(newvalue_.replace(/,/ig, '')).toLocaleString()).toString()).replace('.00', '');
        }
      },
      net_income(newvalue, oldvalue) {
        if(!newvalue){return false}
        let newvalue_ = (newvalue.indexOf('.00') > 0) ? newvalue.replace('.00', '') : newvalue; //禁止ie8,9自动添加.00的小数点
        if ((isNaN(parseFloat(newvalue_.replace(/,/ig, ''))))) { //如果当前输入的不是数字就停止执行
          this.formDataEn.net_income = '';  //防止不是数字是input出现NaN提示
          return false;
        }
        if (/\./i.test(newvalue_)) { //判断处理含有.的情况下
          if (/\.\d\d\d$/.test(newvalue_)) {
            this.formDataEn.net_income = oldvalue; //限制只能输入2位小数点
          } else {
            this.formDataEn.net_income = newvalue_.replace(/[^\d\.\,]/ig, '') //开始输入小数点之后，只能输入数字
          }
        } else {
          this.formDataEn.net_income = ((parseFloat(newvalue_.replace(/,/ig, '')).toLocaleString()).toString()).replace('.00', '');
        }
      },
      lease(newvalue, oldvalue) {
        if(!newvalue){return false}
        let newvalue_ = (newvalue.indexOf('.00') > 0) ? newvalue.replace('.00', '') : newvalue; //禁止ie8,9自动添加.00的小数点
        if ((isNaN(parseFloat(newvalue_.replace(/,/ig, ''))))) { //如果当前输入的不是数字就停止执行
          this.formDataEn.lease = '';  //防止不是数字是input出现NaN提示
          return false;
        }
        if (/\./i.test(newvalue_)) { //判断处理含有.的情况下
          if (/\.\d\d\d$/.test(newvalue_)) {
            this.formDataEn.lease = oldvalue; //限制只能输入2位小数点
          } else {
            this.formDataEn.lease = newvalue_.replace(/[^\d\.\,]/ig, '') //开始输入小数点之后，只能输入数字
          }
        } else {
          this.formDataEn.lease = ((parseFloat(newvalue_.replace(/,/ig, '')).toLocaleString()).toString()).replace('.00', '');
        }
      },



      price_zh(newvalue, oldvalue) {
        if(!newvalue){return false}
        let newvalue_ = (newvalue.indexOf('.00') > 0) ? newvalue.replace('.00', '') : newvalue; //禁止ie8,9自动添加.00的小数点
        if ((isNaN(parseFloat(newvalue_.replace(/,/ig, ''))))) { //如果当前输入的不是数字就停止执行
          this.formDataZh.price = '';  //防止不是数字是input出现NaN提示
          return false;
        }
        if (/\./i.test(newvalue_)) { //判断处理含有.的情况下
          if (/\.\d\d\d$/.test(newvalue_)) {
            this.formDataZh.price = oldvalue; //限制只能输入2位小数点
          } else {
            this.formDataZh.price = newvalue_.replace(/[^\d\.\,]/ig, '') //开始输入小数点之后，只能输入数字
          }
        } else {
          this.formDataZh.price = ((parseFloat(newvalue_.replace(/,/ig, '')).toLocaleString()).toString()).replace('.00', '');
        }
      },
      gross_income_zh(newvalue, oldvalue) {
        if(!newvalue){return false}
        let newvalue_ = (newvalue.indexOf('.00') > 0) ? newvalue.replace('.00', '') : newvalue; //禁止ie8,9自动添加.00的小数点
        if ((isNaN(parseFloat(newvalue_.replace(/,/ig, ''))))) { //如果当前输入的不是数字就停止执行
          this.formDataZh.gross_income = '';  //防止不是数字是input出现NaN提示
          return false;
        }
        if (/\./i.test(newvalue_)) { //判断处理含有.的情况下
          if (/\.\d\d\d$/.test(newvalue_)) {
            this.formDataZh.gross_income = oldvalue; //限制只能输入2位小数点
          } else {
            this.formDataZh.gross_income = newvalue_.replace(/[^\d\.\,]/ig, '') //开始输入小数点之后，只能输入数字
          }
        } else {
          this.formDataZh.gross_income = ((parseFloat(newvalue_.replace(/,/ig, '')).toLocaleString()).toString()).replace('.00', '');
        }
      },
      net_income_zh(newvalue, oldvalue) {
        if(!newvalue){return false}
        let newvalue_ = (newvalue.indexOf('.00') > 0) ? newvalue.replace('.00', '') : newvalue; //禁止ie8,9自动添加.00的小数点
        if ((isNaN(parseFloat(newvalue_.replace(/,/ig, ''))))) { //如果当前输入的不是数字就停止执行
          this.formDataZh.net_income = '';  //防止不是数字是input出现NaN提示
          return false;
        }
        if (/\./i.test(newvalue_)) { //判断处理含有.的情况下
          if (/\.\d\d\d$/.test(newvalue_)) {
            this.formDataZh.net_income = oldvalue; //限制只能输入2位小数点
          } else {
            this.formDataZh.net_income = newvalue_.replace(/[^\d\.\,]/ig, '') //开始输入小数点之后，只能输入数字
          }
        } else {
          this.formDataZh.net_income = ((parseFloat(newvalue_.replace(/,/ig, '')).toLocaleString()).toString()).replace('.00', '');
        }
      },
      lease_zh(newvalue, oldvalue) {
        if(!newvalue){return false}
        let newvalue_ = (newvalue.indexOf('.00') > 0) ? newvalue.replace('.00', '') : newvalue; //禁止ie8,9自动添加.00的小数点
        if ((isNaN(parseFloat(newvalue_.replace(/,/ig, ''))))) { //如果当前输入的不是数字就停止执行
          this.formDataZh.lease = '';  //防止不是数字是input出现NaN提示
          return false;
        }
        if (/\./i.test(newvalue_)) { //判断处理含有.的情况下
          if (/\.\d\d\d$/.test(newvalue_)) {
            this.formDataZh.lease = oldvalue; //限制只能输入2位小数点
          } else {
            this.formDataZh.lease = newvalue_.replace(/[^\d\.\,]/ig, '') //开始输入小数点之后，只能输入数字
          }
        } else {
          this.formDataZh.lease = ((parseFloat(newvalue_.replace(/,/ig, '')).toLocaleString()).toString()).replace('.00', '');
        }
      },
    },


    mounted() {
      this.businessId=this.$route.query.id;
      this.get_business_category_arr();
      this.getBusinessEn();
      this.tablang='en';
    },
    methods: {
      get_business_category_arr(){
        let that = this;
        getBusinessCategoryArr().then(response => {
          console.log('getBusinessCategoryArr',response);
          that.business_category_arr = response.data;
        }).catch(err => {
          console.log(err);
        })
      },
      // 员工人数选择NA
      employee_countBlur(){
        let that=this;
        setTimeout(function() {
          that.employee_countNA=false;
        },200)
      },
      // 获取地址三级联动数据
      getlocation(type, value) {
        let that = this;
        return new Promise(function (resolve, reject) {
          if (type && value) {
            let paramsData = {code: value, lang: that.$store.getters.language};
            that.locationLoading = true;
            getLocation(paramsData).then(response => {
              if (type == 'country') {
                that.provinces = response.data;
                that.cities = [];
                that.formDataEn.states = '';
                that.formDataZh.states = '';
                that.formDataEn.city = '';
                that.formDataZh.city = '';
                resolve();
              } else if (type == 'provinces') {
                that.cities = response.data;
                that.formDataEn.city = '';
                that.formDataZh.city = '';
                that.formDataEn.states = value;
                that.formDataZh.states = value;
                resolve();
              }
              that.locationLoading = false;
            }).catch(err => {
              console.log(err);
            })
          }
        })
      },
      // 查看待售企业信息-英文
      getBusinessEn() {
        let that = this;
        this.listLoading = true;
        if (this.$route.query.id == '0' || !this.$route.query.id) {
          that.listLoading = false;
          return
        }
        showBusinessEn({id:this.$route.query.id}).then(response => {
          that.listLoading = false;
          console.log('getBusinessEn', response);
          that.formDataEn =  response.data;
          that.formDataEn.employee_count=response.data.employee_count==0?that.$t('NA'):response.data.employee_count;
          that.business_broker =  response.data.business_broker;
          let data = Object.assign({}, response.data);
          that.getlocation('country', data.country).then(_ => {
              that.formDataEn.country = data.country;
              that.getlocation('provinces', data.states).then(_ => {
                that.formDataEn.city = data.city;
              })
            });
          that.get_business_category_arr();
        }).catch(err => {
          that.listLoading = false;
          console.log(err);
        })
      },
      // 查看待售企业信息-中文
      getBusinessZh() {
        let that = this;
        this.listLoading = true;
        if (this.$route.query.id == '0' || !this.$route.query.id) {
          that.listLoading = false;
          return
        }
        showBusinessZh({id:this.$route.query.id}).then(response => {
          that.listLoading = false;
          console.log('getBusinessZh', response);
          if(response.data.length!=0){
            that.formDataZh =  response.data;
            that.formDataZh.employee_count=response.data.employee_count==0?that.$t('NA'):response.data.employee_count;
            let data = Object.assign({}, response.data);
            that.getlocation('country', data.country).then(_ => {
              that.formDataZh.country = data.country;
              that.getlocation('provinces', data.states).then(_ => {
                that.formDataZh.city = data.city;
              })
            })
          }
          that.get_business_category_arr();
        }).catch(err => {
          that.listLoading = false;
          console.log(err);
        })
      },
      //切换中英tab
      changetab(e) {
        this.tablang = e.index == 0 ? 'en' : 'zh';
        this.provinces = [];
        this.cities = [];
        if (e.index == 0) {
          this.getBusinessEn();
        } else if (e.index == 1) {
          this.getBusinessZh();
        }
      },
      //切换中英tab之前的钩子
      tabBefore(e) {
        if(e==1&&!this.businessId){
          this.$alert( this.$t('pleaseSaveBefore'), this.$t('Confirmation'), {
            confirmButtonText: this.$t('confirm'),
          });
          this.tablang =  'en';
          return false;
        }else{
          this.tablang = e.index == 0 ? 'en' : 'zh';
        }
      },

      // 企业编辑保存
      formSave() {
        let that = this;
        // let formData = this.tablang == 'en' ? this.formDataEn : this.formDataZh;
        let formData = Object.assign({}, this.tablang == 'en' ? this.formDataEn : this.formDataZh);
        formData.price=Number(formData.price.replace(/,/g,''));
        formData.gross_income=Number(formData.gross_income.replace(/,/g,''));
        formData.net_income=Number(formData.net_income.replace(/,/g,''));
        formData.lease=Number(formData.lease.replace(/,/g,''));

        if(formData.employee_count=='NA'||formData.employee_count=='未知'){formData.employee_count=0;}
        if(!formData.company||!formData.title||!formData.listing||!formData.price){//必填信息不能为空
          this.$alert( this.$t('pleaseImproveBusiness'), this.$t('Confirmation'), {
            confirmButtonText: this.$t('confirm'),
          });
          return false;
        }
        if (this.businessId != '0' && this.businessId) {//编辑
          formData.id=this.businessId;
          formData.business_broker=this.business_broker;
          if(that.tablang == 'en'){

            console.log(123,formData)
            editBusiness(formData).then(response => {
              console.log('editBusiness', response);
              // that.formDataEn = {};
              // that.formDataZh = {};
              // that.$router.push('/businessForSales/index');
              that.$notify({
                showClose: true,
                message: that.$t('Successful'),
                type: 'success'
              });
            }).catch(err => {
              console.log(err);
            })
          }else if(that.tablang == 'zh'){
            editBusinessZh(formData).then(response => {
              console.log('editBusinessZh', response);
              // that.formDataEn = {};
              // that.formDataZh = {};
              // that.$router.push('/businessForSales/index');
              that.$notify({
                showClose: true,
                message: that.$t('Successful'),
                type: 'success'
              });
            }).catch(err => {
              console.log(err);
            })
          }
        } else { //新增
          addBusiness(formData).then(response => {
            console.log('addBusiness', response);
            that.formDataEn = {};
            that.formDataZh = {};
            that.$router.push('/businessForSales/index');
            that.$notify({
              showClose: true,
              message: that.$t('Successful'),
              type: 'success'
            });
          }).catch(err => {
            console.log(err);
          })
        }
      },
      cancelBtn() {
        this.$router.push('/businessForSales/index');
      }
    }
  }
</script>

<style scoped>
  .selectBox{
    list-style: none;
    margin-top: 6px;
    background-color: #fff;
    color: #606266;
    height: 34px;
    line-height: 34px;
    padding-left: 10px;
    cursor: pointer;
    border: solid 1px #dfe4ed;
    border-radius: 4px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    position: absolute;
    width: 100%;
    z-index: 100;
    font-size: 14px;
  }
  .selectBox:hover{
    background-color: #F5F7FA;
  }
  .formRow {
    display: flex;
    justify-content: space-between;
    max-width: 1300px;
    margin: auto;
  }

  .formItem {
    width: 49%;
    display: flex;
    justify-content: space-between;
  }

  .formItemSpan {
    color: #717171;
    font-size: 14px;
    width: 180px;
    display: inline-block;
    text-align: right;
    margin: 10px 0;
    padding-right: 20px;
  }

  .address {
    max-width: 1300px;
    margin: auto;
    display: flex;
    justify-content: space-between;
  }

  .formContainer {
    max-width: 1300px;
    margin: 0 auto;
  }

  .itemBox {
    margin-top: 30px;
  }

  .formTitle {
    line-height: 50px;
    border: 1px solid #DCDFE6;
    border-bottom: transparent;
    padding-left: 20px;
    color: #4a4a4a;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }

  .addBtn {
    line-height: 45px;
    border: 1px solid #DCDFE6;
    border-bottom: transparent;
    text-align: center;
    font-size: 14px;
  }
</style>
