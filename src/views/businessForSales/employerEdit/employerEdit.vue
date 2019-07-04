<template>
  <div class="app-container">
    <aside>
      <h3 style="text-align: center;">{{$t('route.employerEdit')}}</h3>
    </aside>
    <el-tabs type="border-card" @tab-click="changetab" style="padding-bottom: 30px;" v-loading="listLoading">
      <el-tab-pane :label="$t('english')" id="taben">
        <div class="formRow">
          <div class="formItem filter-item el-select--medium">
            <!--公司名称-->
            <span class="formItemSpan">{{$t('employeeEdit.companyName')}}</span>
            <el-input v-model="formDataEn.company" placeholder="Company Name" style="width: 70%;margin-bottom: 20px;"
                      class="filter-item"/>
          </div>
          <div class="formItem filter-item el-select--medium">
            <!--编号-->
            <span class="formItemSpan">{{$t('employeeEdit.Listing')}}</span>
            <el-input v-model="formDataEn.listing" placeholder="Listing" style="width: 70%;margin-bottom: 20px;"
                      class="filter-item"/>
          </div>
        </div>
        <div class="formRow">
          <div class="formItem filter-item el-select--medium">
            <!--标题-->
            <span class="formItemSpan">{{$t('employeeEdit.title')}}</span>
            <el-input v-model="formDataEn.title" placeholder="Title" style="width: 70%;margin-bottom: 20px;"
                      class="filter-item"/>
          </div>
          <div class="formItem filter-item el-select--medium">
            <!--标价-->
            <span class="formItemSpan">{{$t('employeeEdit.Price')}}</span>
            <el-input placeholder="price" v-model="formDataEn.price" style="width: 70%;margin-bottom: 20px;"
                      class="filter-item">
            </el-input>
          </div>
        </div>
        <div class="formRow">
          <div class="formItem filter-item el-select--medium">
            <!--是否盈利-->
            <span class="formItemSpan">{{$t('employeeEdit.Profitability')}}</span>
            <el-select v-model="formDataEn.profitability" placeholder="Select" style="width: 70%;margin-bottom: 20px;"
                       class="filter-item">
              <el-option label="Yes" :value="1"/>
              <el-option label="No" :value="2"/>
              <el-option label="NA" :value="3"/>
            </el-select>
          </div>
          <div class="formItem filter-item el-select--medium">
            <!--是否包含房地产-->
            <span class="formItemSpan">{{$t('employeeEdit.RealEstate')}}</span>
            <el-select v-model="formDataEn.real_estate" placeholder="Select" style="width: 70%;margin-bottom: 20px;"
                       class="filter-item">
              <el-option label="Yes" :value="1"/>
              <el-option label="No" :value="2"/>
              <el-option label="NA" :value="3"/>
            </el-select>
          </div>
        </div>
        <div class="formRow">
          <!--<div class="formItem filter-item el-select&#45;&#45;medium">-->
          <!--&lt;!&ndash;是否连锁店&ndash;&gt;-->
          <!--<span class="formItemSpan">Franchise</span>-->
          <!--<el-select v-model="formDataEn.type" placeholder="Select" style="width: 70%;margin-bottom: 20px;" class="filter-item">-->
          <!--<el-option label="Yes" value="1" />-->
          <!--<el-option label="No" value="2" />-->
          <!--<el-option label="NA" value="3" />-->
          <!--</el-select>-->
          <!--</div>-->
          <div class="formItem filter-item el-select--medium">
            <!--营业面积-->
            <span class="formItemSpan">{{$t('employeeEdit.BuildingSF')}}</span>
            <el-input placeholder="Building SF" v-model="formDataEn.building_sf" style="width: 70%;margin-bottom: 20px;"
                      class="filter-item">
            </el-input>
          </div>
        </div>
        <div class="formRow">
          <div class="formItem filter-item el-select--medium">
            <!--员工人数-->
            <span class="formItemSpan">{{$t('employeeEdit.EmployeeCount')}}</span>
            <el-input-number v-model="formDataEn.employee_count" :min="0" :max="100000" :precision="0" :step="1" style="width: 70%;margin-bottom: 20px;"></el-input-number>
          </div>
          <div class="formItem filter-item el-select--medium">
            <!--毛利润-->
            <span class="formItemSpan">{{$t('employeeEdit.GrossIncome')}}</span>
            <el-input placeholder="Gross Income" v-model="formDataEn.gross_income"
                      style="width: 70%;margin-bottom: 20px;" class="filter-item">
            </el-input>
          </div>
        </div>
        <div class="formRow">
          <div class="formItem filter-item el-select--medium">
            <!--税息折旧及摊销前利润-->
            <span class="formItemSpan">{{$t('employeeEdit.EBITDA')}}</span>
            <el-input placeholder="EBITDA" v-model="formDataEn.ebitda" style="width: 70%;margin-bottom: 20px;"
                      class="filter-item">
            </el-input>
          </div>
          <div class="formItem filter-item el-select--medium">
            <!--硬件资产价值-->
            <span class="formItemSpan">{{$t('employeeEdit.FFandE')}}</span>
            <el-input placeholder="FF&E" v-model="formDataEn.ff_e" style="width: 70%;margin-bottom: 20px;"
                      class="filter-item">
            </el-input>
          </div>
        </div>
        <div class="formRow">
          <div class="formItem filter-item el-select--medium">
            <!--库存-->
            <span class="formItemSpan">{{$t('employeeEdit.Inventory')}}</span>
            <el-input v-model="formDataEn.inventory" placeholder="Inventory" style="width: 70%;margin-bottom: 20px;" class="filter-item"/>
          </div>
          <div class="formItem filter-item el-select--medium">
            <!--净利润-->
            <span class="formItemSpan">{{$t('employeeEdit.NetIncome')}}</span>
            <el-input placeholder="Net Income" v-model="formDataEn.net_income" style="width: 70%;margin-bottom: 20px;" class="filter-item">
            </el-input>
          </div>
        </div>
        <div class="formRow">
          <div class="formItem filter-item el-select--medium">
            <!--租金-->
            <span class="formItemSpan">{{$t('employeeEdit.Lease')}}</span>
            <el-input placeholder="Lease" v-model="formDataEn.lease" style="width: 70%;margin-bottom: 20px;"
                      class="filter-item">
            </el-input>
          </div>
          <div class="formItem filter-item el-select--medium">
            <!--租约有效期-->
            <span class="formItemSpan">{{$t('employeeEdit.LeaseTerm')}}</span>
            <el-date-picker v-model="formDataEn.lease_term" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
                            placeholder="Lease Term" style="width: 70%;margin-bottom: 20px;"></el-date-picker>
          </div>
        </div>
        <div class="formRow">
          <div class="formItem filter-item el-select--medium">
            <!--房地产估价-->
            <span class="formItemSpan">{{$t('employeeEdit.Est')}}</span>
            <el-input placeholder="Est. Value of Real Estate" v-model="formDataEn.value_of_real_estate" style="width: 70%;margin-bottom: 20px;" class="filter-item">
            </el-input>
          </div>
          <div class="formItem filter-item el-select--medium">
            <!--佣金-->
            <span class="formItemSpan">{{$t('employeeEdit.Commission')}}</span>
            <el-input placeholder="Commission" v-model="formDataEn.commission" style="width: 70%;margin-bottom: 20px;"
                      class="filter-item">
            </el-input>
          </div>
        </div>
        <div class="formRow">
          <div class="formItem filter-item el-select--medium">
            <!--卖家融资-->
            <span class="formItemSpan">{{$t('employeeEdit.BuyerFinancing')}}</span>
            <el-input placeholder="Buyer Financing" v-model="formDataEn.buyer_financing"
                      style="width: 70%;margin-bottom: 20px;" class="filter-item">
            </el-input>
          </div>
          <!--<div class="formItem filter-item el-select&#45;&#45;medium">-->
          <!--&lt;!&ndash;生意介绍信息&ndash;&gt;-->
          <!--<span class="formItemSpan">Business Description</span>-->
          <!--<el-input v-model="formDataEn.business_description" placeholder="Business Description" style="width: 70%;margin-bottom: 20px;" class="filter-item"/>-->
          <!--</div>-->
        </div>
        <div class="formRow">
          <div class="formItem filter-item el-select--medium">
            <!--美国中介-->
            <span class="formItemSpan">{{$t('employeeEdit.USBroker')}}</span>
            <el-input v-model="formDataEn.us_broker" placeholder="US Broker" style="width: 70%;margin-bottom: 20px;"
                      class="filter-item"/>
          </div>
          <div class="formItem filter-item el-select--medium">
            <!--美国中介联系方式-->
            <span class="formItemSpan">{{$t('employeeEdit.USBrokerContactInfo')}}</span>
            <el-input v-model="formDataEn.us_broker_contact_info" placeholder="US Broker Contact Info"
                      style="width: 70%;margin-bottom: 20px;" class="filter-item"/>
          </div>
        </div>
        <div class="formRow">
          <div class="formItem filter-item el-select--medium">
            <!--待售开始日期-->
            <span class="formItemSpan">{{$t('employeeEdit.ListingDate')}}</span>
            <el-date-picker v-model="formDataEn.listing_date" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
                            placeholder="Listing Date" style="width: 70%;margin-bottom: 20px;"></el-date-picker>
          </div>
          <div class="formItem filter-item el-select--medium">
            <!--出售原因-->
            <span class="formItemSpan">{{$t('employeeEdit.ReasonForSelling')}}</span>
            <el-input v-model="formDataEn.reason_for_selling" placeholder="Reason for Selling"
                      style="width: 70%;margin-bottom: 20px;" class="filter-item"/>
          </div>
        </div>
        <div class="filter-item el-select--medium address">
          <!--地理位置-->
          <span class="formItemSpan" style="margin-right: -5px;">{{$t('employeeEdit.Location')}}</span>
          <el-select v-model="formDataEn.country" id="country"
                     @change="getlocation('country',formDataEn.country)"
                     style="width: 130px;margin: 0 5px;" class="filter-item">
            <el-option :label="$t('China')" value="1000"/>
            <el-option :label="$t('UnitedStates')" value="USA"/>
          </el-select>
          <el-select v-model="formDataEn.states" style="width: 130px;margin: 0 5px;" id="provinces"
                     :disabled="locationLoading"
                     @change="getlocation('provinces',formDataEn.states)"
                     class="filter-item">
            <el-option v-for="item in provinces" :label="item.name" :value="item.code"/>
          </el-select>
          <el-select v-model="formDataEn.city" style="width: 130px;margin: 0 5px;" id="city"
                     :disabled="locationLoading"
                     class="filter-item">
            <el-option v-for="item in cities" :label="item.name" :value="item.code"/>
          </el-select>
          <el-input v-model="formDataEn.address":placeholder="$t('address')" style="width: 50%;" class="filter-item"/>
        </div>
        <!--主体部分-->
        <div class="formContainer">
          <!--商业描述-->
          <div class="itemBox">
            <div class="formTitle">{{$t('employeeEdit.business_description')}}</div>
            <div>
              <el-input
                type="textarea"
                :autosize="{ minRows: 4}"
                placeholder="BUSINESS DESCRIPTIO"
                v-model="formDataEn.business_description">
              </el-input>
            </div>
          </div>
          <!--财务绩效-->
          <div class="itemBox">
            <div class="formTitle">{{$t('employeeEdit.financial_performance')}}</div>
            <div>
              <el-input
                type="textarea"
                :autosize="{ minRows: 4}"
                placeholder="FINANCIAL PERFORMANCE"
                v-model="formDataEn.financial_performance">
              </el-input>
            </div>
          </div>
          <!--当前每月总收入和净收入-->
          <!--<div class="itemBox">-->
          <!--<div class="formTitle">CURRENT MONTHLY GROSS AND NET INCOME</div>-->
          <!--<div>-->
          <!--<el-input-->
          <!--type="textarea"-->
          <!--:autosize="{ minRows: 4}"-->
          <!--placeholder="CURRENT MONTHLY GROSS AND NET INCOME"-->
          <!--v-model="formDataZh.currentMonthlyGrossAndNetIncome">-->
          <!--</el-input>-->
          <!--</div>-->
          <!--</div>-->
          <!--商业资产-->
          <div class="itemBox">
            <div class="formTitle">{{$t('employeeEdit.business_assets')}}</div>
            <div>
              <el-input
                type="textarea"
                :autosize="{ minRows: 4}"
                placeholder="BUSINESS ASSETS"
                v-model="formDataEn.business_assets">
              </el-input>
            </div>
          </div>
          <!--雇员-->
          <!--<div class="itemBox">-->
          <!--<div class="formTitle">EMPLOYEES</div>-->
          <!--<div class="addBtn"><el-button size="mini" type="primary" @click="handleAdd">+ Add</el-button></div>-->
          <!--<div>-->
          <!--<el-table-->
          <!--:data="Employee"-->
          <!--border-->
          <!--stripe-->
          <!--style="width: 100%">-->
          <!--<el-table-column-->
          <!--prop="position"-->
          <!--align="center"-->
          <!--label="Position"-->
          <!--min-width="150">-->
          <!--</el-table-column>-->
          <!--<el-table-column-->
          <!--prop="jobType"-->
          <!--align="center"-->
          <!--label="JobType"-->
          <!--min-width="150">-->
          <!--</el-table-column>-->
          <!--<el-table-column-->
          <!--prop="entryTime"-->
          <!--align="center"-->
          <!--label="Entry Time"-->
          <!--min-width="150">-->
          <!--</el-table-column>-->
          <!--<el-table-column-->
          <!--prop="salary"-->
          <!--align="center"-->
          <!--label="Salary( per hour)"-->
          <!--min-width="150">-->
          <!--<template slot-scope="{row}">-->
          <!--<el-tag type="success"> $ {{ row.salary }}</el-tag>-->
          <!--</template>-->
          <!--</el-table-column>-->
          <!--<el-table-column-->
          <!--prop="address"-->
          <!--align="center"-->
          <!--:label="'option'"-->
          <!--fixed="right"-->
          <!--min-width="180">-->
          <!--<template slot-scope="scope">-->
          <!--<el-button-->
          <!--size="mini"-->
          <!--type="primary"-->
          <!--@click="handleEdit(scope.$index,scope)">Edit-->
          <!--</el-button>-->
          <!--<el-button-->
          <!--size="mini"-->
          <!--type="danger"-->
          <!--@click="handleDelete(scope.$index,scope)">Delete-->
          <!--</el-button>-->
          <!--</template>-->
          <!--</el-table-column>-->
          <!--</el-table>-->
          <!--</div>-->
          <!--</div>-->

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
            <!--公司名称-->
            <span class="formItemSpan">{{$t('employeeEdit.companyName')}}</span>
            <el-input v-model="formDataZh.company" placeholder="标签名称" style="width: 70%;margin-bottom: 20px;"
                      class="filter-item"/>
          </div>
          <div class="formItem filter-item el-select--medium">
            <!--编号-->
            <span class="formItemSpan">{{$t('employeeEdit.Listing')}}</span>
            <el-input v-model="formDataZh.listing" placeholder="编号" style="width: 70%;margin-bottom: 20px;"
                      class="filter-item"/>
          </div>
        </div>
        <div class="formRow">
          <div class="formItem filter-item el-select--medium">
            <!--标题-->
            <span class="formItemSpan">{{$t('employeeEdit.title')}}</span>
            <el-input v-model="formDataZh.title" placeholder="标题" style="width: 70%;margin-bottom: 20px;"
                      class="filter-item"/>
          </div>
          <div class="formItem filter-item el-select--medium">
            <!--标价-->
            <span class="formItemSpan">{{$t('employeeEdit.Price')}}</span>
            <el-input placeholder="标价" v-model="formDataZh.price" style="width: 70%;margin-bottom: 20px;"
                      class="filter-item">
            </el-input>
          </div>
        </div>
        <div class="formRow">
          <div class="formItem filter-item el-select--medium">
            <!--是否盈利-->
            <span class="formItemSpan">{{$t('employeeEdit.Profitability')}}</span>
            <el-select v-model="formDataZh.profitability" placeholder="请选择" style="width: 70%;margin-bottom: 20px;"
                       class="filter-item">
              <el-option label="是" :value="1"/>
              <el-option label="否" :value="2"/>
              <el-option label="未知" :value="3"/>
            </el-select>
          </div>
          <div class="formItem filter-item el-select--medium">
            <!--是否包含房地产-->
            <span class="formItemSpan">{{$t('employeeEdit.RealEstate')}}</span>
            <el-select v-model="formDataZh.real_estate" placeholder="请选择" style="width: 70%;margin-bottom: 20px;"
                       class="filter-item">
              <el-option label="是" :value="1"/>
              <el-option label="否" :value="2"/>
              <el-option label="未知" :value="3"/>
            </el-select>
          </div>
        </div>
        <div class="formRow">
          <!--<div class="formItem filter-item el-select&#45;&#45;medium">-->
          <!--&lt;!&ndash;是否连锁店&ndash;&gt;-->
          <!--<span class="formItemSpan">是否连锁店</span>-->
          <!--<el-select v-model="formDataEn.type" placeholder="请选择" style="width: 70%;margin-bottom: 20px;" class="filter-item">-->
          <!--<el-option label="是" value="1" />-->
          <!--<el-option label="否" value="2" />-->
          <!--<el-option label="未知" value="3" />-->
          <!--</el-select>-->
          <!--</div>-->
          <div class="formItem filter-item el-select--medium">
            <!--营业面积-->
            <span class="formItemSpan">{{$t('employeeEdit.BuildingSF')}}</span>
            <el-input placeholder="营业面积" v-model="formDataZh.building_sf" style="width: 70%;margin-bottom: 20px;"
                      class="filter-item">
            </el-input>
          </div>
        </div>
        <div class="formRow">
          <div class="formItem filter-item el-select--medium">
            <!--员工人数-->
            <span class="formItemSpan">{{$t('employeeEdit.EmployeeCount')}}</span>
            <el-input-number v-model="formDataZh.employee_count" :min="0"
                             style="width: 70%;margin-bottom: 20px;"></el-input-number>
          </div>
          <div class="formItem filter-item el-select--medium">
            <!--毛利润-->
            <span class="formItemSpan">{{$t('employeeEdit.GrossIncome')}}</span>
            <el-input placeholder="毛利润" v-model="formDataZh.gross_income" style="width: 70%;margin-bottom: 20px;"
                      class="filter-item">
            </el-input>
          </div>
        </div>
        <div class="formRow">
          <div class="formItem filter-item el-select--medium">
            <!--税息折旧及摊销前利润-->
            <span class="formItemSpan">{{$t('employeeEdit.EBITDA')}}</span>
            <el-input placeholder="税息折旧及摊销前利润" v-model="formDataZh.ebitda" style="width: 70%;margin-bottom: 20px;"
                      class="filter-item">
            </el-input>
          </div>
          <div class="formItem filter-item el-select--medium">
            <!--硬件资产价值-->
            <span class="formItemSpan">{{$t('employeeEdit.FFandE')}}</span>
            <el-input placeholder="硬件资产价值" v-model="formDataZh.ff_e" style="width: 70%;margin-bottom: 20px;"
                      class="filter-item">
            </el-input>
          </div>
        </div>
        <div class="formRow">
          <div class="formItem filter-item el-select--medium">
            <!--库存-->
            <span class="formItemSpan">{{$t('employeeEdit.Inventory')}}</span>
            <el-input v-model="formDataZh.inventory" placeholder="库存" style="width: 70%;margin-bottom: 20px;"
                      class="filter-item"/>
          </div>
          <div class="formItem filter-item el-select--medium">
            <!--净利润-->
            <span class="formItemSpan">{{$t('employeeEdit.NetIncome')}}</span>
            <el-input placeholder="净利润" v-model="formDataZh.net_income" style="width: 70%;margin-bottom: 20px;"
                      class="filter-item">
            </el-input>
          </div>
        </div>
        <div class="formRow">
          <div class="formItem filter-item el-select--medium">
            <!--租金-->
            <span class="formItemSpan">{{$t('employeeEdit.Lease')}}</span>
            <el-input placeholder="租金" v-model="formDataZh.lease" style="width: 70%;margin-bottom: 20px;"
                      class="filter-item">
            </el-input>
          </div>
          <div class="formItem filter-item el-select--medium">
            <!--租约有效期-->
            <span class="formItemSpan">{{$t('employeeEdit.LeaseTerm')}}</span>
            <el-date-picker v-model="formDataZh.lease_term" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
                            placeholder="租约有效期" style="width: 70%;margin-bottom: 20px;"></el-date-picker>
          </div>
        </div>
        <div class="formRow">
          <div class="formItem filter-item el-select--medium">
            <!--房地产估价-->
            <span class="formItemSpan">{{$t('employeeEdit.Est')}}</span>
            <el-input placeholder="房地产估价" v-model="formDataZh.value_of_real_estate"
                      style="width: 70%;margin-bottom: 20px;" class="filter-item">
            </el-input>
          </div>
          <div class="formItem filter-item el-select--medium">
            <!--佣金-->
            <span class="formItemSpan">{{$t('employeeEdit.Commission')}}</span>
            <el-input placeholder="佣金" v-model="formDataZh.commission" style="width: 70%;margin-bottom: 20px;"
                      class="filter-item">
            </el-input>
          </div>
        </div>
        <div class="formRow">
          <div class="formItem filter-item el-select--medium">
            <!--卖家融资-->
            <span class="formItemSpan">{{$t('employeeEdit.BuyerFinancing')}}</span>
            <el-input placeholder="卖家融资" v-model="formDataZh.buyer_financing" style="width: 70%;margin-bottom: 20px;"
                      class="filter-item">
            </el-input>
          </div>
        </div>
        <div class="formRow">
          <div class="formItem filter-item el-select--medium">
            <!--美国中介-->
            <span class="formItemSpan">{{$t('employeeEdit.USBroker')}}</span>
            <el-input v-model="formDataZh.us_broker" placeholder="美国中介" style="width: 70%;margin-bottom: 20px;"
                      class="filter-item"/>
          </div>
          <div class="formItem filter-item el-select--medium">
            <!--美国中介联系方式-->
            <span class="formItemSpan">{{$t('employeeEdit.USBrokerContactInfo')}}</span>
            <el-input v-model="formDataZh.us_broker_contact_info" placeholder="美国中介联系方式"
                      style="width: 70%;margin-bottom: 20px;" class="filter-item"/>
          </div>
        </div>
        <div class="formRow">
          <div class="formItem filter-item el-select--medium">
            <!--待售开始日期-->
            <span class="formItemSpan">{{$t('employeeEdit.ListingDate')}}</span>
            <el-date-picker v-model="formDataZh.listing_date" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
                            placeholder="待售开始日期" style="width: 70%;margin-bottom: 20px;"></el-date-picker>
          </div>
          <div class="formItem filter-item el-select--medium">
            <!--出售原因-->
            <span class="formItemSpan">{{$t('employeeEdit.ReasonForSelling')}}</span>
            <el-input v-model="formDataZh.reason_for_selling" placeholder="出售原因" style="width: 70%;margin-bottom: 20px;"
                      class="filter-item"/>
          </div>
        </div>
        <div class="filter-item el-select--medium address">
          <span
            style="color: #717171;font-size: 14px;display: inline-block;text-align: right;line-height: 40px;padding-right: 20px;width: 160px;">{{$t('employeeEdit.Location')}}</span>
          <el-select v-model="formDataZh.country" id="country"
                     @change="getlocation('country',formDataZh.country)"
                     style="width: 130px;margin: 0 5px;" class="filter-item">
            <el-option :label="$t('China')" value="1000"/>
            <el-option :label="$t('UnitedStates')" value="USA"/>
          </el-select>
          <el-select v-model="formDataZh.states" style="width: 130px;margin: 0 5px;" id="provinces"
                     :disabled="locationLoading"
                     @change="getlocation('provinces',formDataZh.states)"
                     class="filter-item">
            <el-option v-for="item in provinces" :label="item.name" :value="item.code"/>
          </el-select>
          <el-select v-model="formDataZh.city" style="width: 130px;margin: 0 5px;" id="city"
                     :disabled="locationLoading"
                     class="filter-item">
            <el-option v-for="item in cities" :label="item.name" :value="item.code"/>
          </el-select>
          <el-input v-model="formDataZh.address" :placeholder="$t('address')" style="width: 50%;" class="filter-item"/>
        </div>
        <!--主体部分-->
        <div class="formContainer">
          <!--商业描述-->
          <div class="itemBox">
            <div class="formTitle">{{$t('employeeEdit.business_description')}}</div>
            <div>
              <el-input
                type="textarea"
                :autosize="{ minRows: 4}"
                placeholder="商业描述"
                v-model="formDataZh.business_description">
              </el-input>
            </div>
          </div>
          <!--财务绩效-->
          <div class="itemBox">
            <div class="formTitle">{{$t('employeeEdit.financial_performance')}}</div>
            <div>
              <el-input
                type="textarea"
                :autosize="{ minRows: 4}"
                placeholder="财务绩效"
                v-model="formDataZh.financial_performance">
              </el-input>
            </div>
          </div>
          <!--当前每月总收入和净收入-->
          <!--<div class="itemBox">-->
          <!--<div class="formTitle">当前每月总收入和净收入</div>-->
          <!--<div>-->
          <!--<el-input-->
          <!--type="textarea"-->
          <!--:autosize="{ minRows: 4}"-->
          <!--placeholder="当前每月总收入和净收入"-->
          <!--v-model="formDataZh.currentMonthlyGrossAndNetIncome">-->
          <!--</el-input>-->
          <!--</div>-->
          <!--</div>-->
          <!--商业资产-->
          <div class="itemBox">
            <div class="formTitle">{{$t('employeeEdit.business_assets')}}</div>
            <div>
              <el-input
                type="textarea"
                :autosize="{ minRows: 4}"
                placeholder="商业资产"
                v-model="formDataZh.business_assets">
              </el-input>
            </div>
          </div>
          <!--雇员-->
          <!--<div class="itemBox">-->
          <!--<div class="formTitle">雇员</div>-->
          <!--<div class="addBtn"><el-button size="mini" type="primary" @click="handleAdd">+ 增加雇员</el-button></div>-->
          <!--<div>-->
          <!--<el-table-->
          <!--:data="Employee"-->
          <!--border-->
          <!--stripe-->
          <!--style="width: 100%">-->
          <!--<el-table-column-->
          <!--prop="position"-->
          <!--align="center"-->
          <!--label="职位"-->
          <!--min-width="150">-->
          <!--</el-table-column>-->
          <!--<el-table-column-->
          <!--prop="jobType"-->
          <!--align="center"-->
          <!--label="职位类型"-->
          <!--min-width="150">-->
          <!--</el-table-column>-->
          <!--<el-table-column-->
          <!--prop="entryTime"-->
          <!--align="center"-->
          <!--label="入职时间"-->
          <!--min-width="150">-->
          <!--</el-table-column>-->
          <!--<el-table-column-->
          <!--prop="salary"-->
          <!--align="center"-->
          <!--label="薪资(时薪)"-->
          <!--min-width="150">-->
          <!--<template slot-scope="{row}">-->
          <!--<el-tag type="success"> $ {{ row.salary }}</el-tag>-->
          <!--</template>-->
          <!--</el-table-column>-->
          <!--<el-table-column-->
          <!--prop="address"-->
          <!--align="center"-->
          <!--:label="'操作'"-->
          <!--fixed="right"-->
          <!--min-width="180">-->
          <!--<template slot-scope="scope">-->
          <!--<el-button-->
          <!--size="mini"-->
          <!--type="primary"-->
          <!--@click="handleEdit(scope.$index,scope)">编辑-->
          <!--</el-button>-->
          <!--<el-button-->
          <!--size="mini"-->
          <!--type="danger"-->
          <!--@click="handleDelete(scope.$index,scope)">删除-->
          <!--</el-button>-->
          <!--</template>-->
          <!--</el-table-column>-->
          <!--</el-table>-->
          <!--</div>-->
          <!--</div>-->

          <div style="text-align: center;margin: 50px 0;">
            <el-button size="medium" type="primary" @click="formSave">{{$t('save')}}</el-button>
            <el-button size="medium" @click="cancelBtn">{{$t('cancel')}}</el-button>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
    <!--雇员编辑弹窗-->
    <el-dialog :title="EmployeeEdit.position?$t('employeeEdit.emploteesEdit'):$t('employeeEdit.emploteesAdd')"
               :visible.sync="dialogFormVisible" width="700px" :before-close="dialogClose">
      <el-form ref="dataForm" :model="EmployeeEdit" label-position="left" label-width="150px"
               style="width: 400px; margin-left:50px;">
        <el-form-item :label="$t('employeeEdit.position')">
          <el-input v-model="EmployeeEdit.position" :placeholder="$t('employeeEdit.position')" style="width:350px;"
                    class="filter-item"/>
        </el-form-item>
        <el-form-item :label="$t('employeeEdit.positionType')">
          <el-select v-model="EmployeeEdit.jobType" class="filter-item" placeholder="Please select"
                     style="width:350px;">
            <el-option :label="'全职'" :value="1"/>
            <el-option :label="'兼职'" :value="2"/>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('employeeEdit.InitiationTime')" prop="timestamp">
          <el-date-picker v-model="EmployeeEdit.entryTime" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
                          :placeholder="$t('employeeEdit.selectDate')" style="width:350px;"></el-date-picker>
        </el-form-item>
        <el-form-item :label="$t('employeeEdit.salary')" prop="title">
          <el-input :placeholder="$t('employeeEdit.salary')" v-model="EmployeeEdit.salary" style="width: 350px;"
                    class="filter-item">
            <template slot="prepend">$</template>
          </el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{ $t('table.cancel') }}</el-button>
        <el-button type="primary" @click="EmployeeEditSave">{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>


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
    editBusinessZh
  } from '@/api/business'

  export default {
    name: "employerEdit",
    data() {
      return {
        dialogFormVisible: false,
        listLoading: false,
        tablang: 'en',

        businessId:'',
        business_broker:'',

        provinces: [],//省份
        cities: [],//城市
        locationLoading: false,//

        formDataEn: {
          lang:'en',
          company: '',//
          title: '',//
          listing: '',//
          industry: '',//
          type: '',//
          price: '',//
          employee_count: '1',//
          country: '',//国家
          states: '',//省/州
          city: '',//城市
          address: '',//
          profitability: '',//
          real_estate: '',//
          building_sf: '',//
          gross_income: '',//
          value_of_real_estate: '',//
          net_income: '',//
          lease: '',//
          lease_term: '',//
          ebitda: '',//
          ff_e: '',//
          inventory: '',//
          commission: '',//
          buyer_financing: '',//
          us_broker: '',//
          us_broker_contact_info: '',//
          listing_date: '',//
          reason_for_selling: '',//
          business_description: '',//
          business_assets: '',//
          financial_performance: '',//
        },
        formDataZh: {
          lang:'zh',
          company: '',//
          title: '',//
          listing: '',//
          industry: '',//
          type: '',//
          price: '',//
          employee_count: '1',//
          country: '',//国家
          states: '',//省/州
          city: '',//城市
          address: '',//
          profitability: '',//
          real_estate: '',//
          building_sf: '',//
          gross_income: '',//
          value_of_real_estate: '',//
          net_income: '',//
          lease: '',//
          lease_term: '',//
          ebitda: '',//
          ff_e: '',//
          inventory: '',//
          commission: '',//
          buyer_financing: '',//
          us_broker: '',//
          us_broker_contact_info: '',//
          listing_date: '',//
          reason_for_selling: '',//
          business_description: '',//
          business_assets: '',//
          financial_performance: '',//
        },
        Employee: [
          {
            position: 'Operations Manager',
            entryTime: '2008-11-21',
            salary: '33',//per hour
            jobType: 'Full time',
          },
          {
            position: 'Lead Tooling Engineer',
            entryTime: '1998-09-02',
            salary: '31',//per hour
            jobType: 'Full time',
          },
        ],
        EmployeeEdit: {
          position: '',
          entryTime: '',
          salary: '',//
          jobType: '',
        }
      }
    },
    mounted() {
      this.businessId=this.$route.query.id;
      this.getBusinessEn();
    },
    methods: {
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
        showBusinessEn(this.$route.query.id).then(response => {
          that.listLoading = false;
          console.log('getBusinessEn', response);
          let data = Object.assign({}, response.data);
          that.formDataEn =  response.data;
          that.business_broker =  response.data.business_broker;
            that.getlocation('country', data.country).then(_ => {
              that.formDataEn.country = data.country;
              that.getlocation('provinces', data.states).then(_ => {
                that.formDataEn.city = data.city;
              })
            })
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
        showBusinessZh(this.$route.query.id).then(response => {
          that.listLoading = false;
          console.log('getBusinessZh', response);
          let data = Object.assign({}, response.data);
          if(data.length!=0){
            that.formDataZh =  response.data;
            that.getlocation('country', data.country).then(_ => {
              that.formDataZh.country = data.country;
              that.getlocation('provinces', data.states).then(_ => {
                that.formDataZh.city = data.city;
              })
            })
          }
        }).catch(err => {
          that.listLoading = false;
          console.log(err);
        })
      },

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
      // 弹出框
      dialogClose(done) {
        this.EmployeeEdit = {
          position: '',
          entryTime: '',
          salary: '',
          jobType: '',
        };
        done();
      },
      // 雇员添加
      handleAdd() {
        this.dialogFormVisible = true;
        this.EmployeeEdit = {
          position: '',
          entryTime: '',
          salary: '',
          jobType: '',
        };
      },
      //雇员编辑
      handleEdit(index, row) {
        console.log(index, row);
        this.EmployeeEdit = row.row;
        this.dialogFormVisible = true;
      },
      // 雇员删除
      handleDelete(index, row) {
        let that = this;
        console.log(index, row);
        this.$confirm(that.$t('delMsg'), that.$t('Confirmation'), {
          distinguishCancelAndClose: true,
          confirmButtonText: that.$t('confirm'),
          cancelButtonText: that.$t('cancel')
        }).then(() => {
          that.Employee.splice(index, 1);
          that.$notify({
            showClose: true,
            message: that.$t('deleted'),
            type: 'success'
          });
        }).catch(action => {
        });
      },
      // 雇员保存
      EmployeeEditSave() {
        console.log(this.EmployeeEdit)
      },

      // 企业编辑保存
      formSave() {
        let that = this;
        let formData = this.tablang == 'en' ? this.formDataEn : this.formDataZh;
        if (this.businessId != '0' && this.businessId) {
          formData.id=this.businessId;
          formData.business_broker=this.business_broker;
          if(that.tablang == 'en'){
            editBusiness(formData).then(response => {
              console.log('editBusiness', response);
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
          }else if(that.tablang == 'zh'){
            editBusinessZh(formData).then(response => {
              console.log('editBusinessZh', response);
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
        } else {
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
