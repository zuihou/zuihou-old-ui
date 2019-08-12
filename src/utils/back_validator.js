/* eslint-disable */
import api from '@/api/AxiosApi.js'
/// ///////////////////加载及显示验证信息///////////////////////////
/**
 * 主要用于阶段url:ex:当axios的url为/api/xxx/xxx...时即截断url为api/xxx;
 *                    当axios的http请求统一前缀时url形如xxx/xxxxxx..,截断即为xxx/
 * @type {string[]}
 */
var projectPrefixs = ['authority/']
/**
 * 开启恒运校验体系
 * 校验规则向后端服务器拉取，保持与后端服务器的校验规则一致，使得修改校验的时候，仅仅需要修改一个地方即可
 * @param ajaxSetting      ajax配置文件主要包括(url,method)，一般只需配置url和method即可，可重写参数
 * @param selectorSetting  元素配置
 * 							formName： 表单的ref名称
 * 							validate： data中的验证集合，对应的prop应该绑定对应属性字段，主要用于表单提交验证
 *              vm: 当前页面顶级元素，主要用于错误提示
 * @param cb  回调方法
 * @returns
 */

// 表单元素标识
var formName
// 当前表单模板接口标识，若重复模板，则不再重复加载

function openValidator (ajaxSetting, selectorSetting, cb) {
  if (
    !ajaxSetting.api ||
    !selectorSetting.formName ||
    selectorSetting.vm['validatorUtilFunc'] ===
      ajaxSetting.api.url + ajaxSetting.api.method
  ) {
    return
  }

  formName = selectorSetting.formName
  selectorSetting.vm['validatorUtilFunc'] =
    ajaxSetting.api.url + ajaxSetting.api.method

  var ajaxSettingCopy = {}
  ajaxSettingCopy.url = builderValidatorUrl(ajaxSetting.api.url)
  ajaxSettingCopy.method = ajaxSetting.api.method
  ajaxSettingCopy.dataType = 'json'
  ajaxSettingCopy.contentType = 'application/json'

  Object.keys(ajaxSetting).forEach(function (key) {
    ajaxSettingCopy[key] = ajaxSetting[key]
  })
  api(ajaxSettingCopy, {}).then(res => {
    if (res) {
      const data = res
      selectorSetting.validate = selectorSetting.validate
        ? selectorSetting.validate
        : []
      Object.keys(data).forEach(function (index) {
        var key = data[index]['fieldName']
        data[index].constraints.forEach(item => {
          if (item) {
            item.fieldType = data[index]['fieldType']
            if (item.type === 'notNull') {
              setNotNullVali(selectorSetting, key, item)
            }
            if (item.type === 'regEx') {
              setRegExVali(selectorSetting, key, item)
            }
            if (item.type === 'range') {
              setRangeVali(selectorSetting, key, item)
            }
          }
        })
      })
      selectorSetting.vm.$set(selectorSetting.validate, 'tag', true)
      safeCb(cb)(res)
    } else {
      if (selectorSetting.vm) {
        selectorSetting.vm.$message('表单加载超时,请重试！')
      }
    }
  })
}

/**
 * 长度校验
 * @param selectorSetting 元素配置
 * @param key 校验字段key
 * @param item 校验类项
 */
function setRangeVali (selectorSetting, key, item) {
  var msgValue =
    item.attrs.message.length > 1
      ? item.attrs.message
      : '最小值:' + item.attrs.min + '最大值:' + item.attrs.max
  var msg =
    item.attrs.message.length > 1
      ? item.attrs.message
      : '长度不能超过' + String(item.attrs.max) + '位'
  // selectorSetting.tipForm[key] = msg
  if (!selectorSetting.validate.hasOwnProperty(key)) {
    selectorSetting.validate[key] = []
  }
  msg = item.fieldType === 'string' ? msg : msgValue

  setPlaceholder(selectorSetting, msg, key)
  selectorSetting.validate[key].push({
    validator: (rule, value, cb) => {
      if (
        (item.fieldType === 'int' && Number(value) > item.attrs.max) ||
        Number(value) < item.attrs.min
      ) {
        cb(new Error(msgValue))
        return
      } else if (
        item.fieldType === 'string' &&
        value &&
        value.length > item.attrs.max
      ) {
        cb(new Error(msg))
        return
      }
      cb()
    }
  })
}

/**
 * 必填校验
 * @param selectorSetting 元素配置
 * @param key 校验字段key
 */
function setNotNullVali (selectorSetting, key, item) {
  if (!selectorSetting.validate.hasOwnProperty(key)) {
    selectorSetting.validate[key] = []
  }
  setPlaceholder(selectorSetting, item.attrs.message || '不能为空', key)
  selectorSetting.validate[key].push({
    required: true,
    validator: (rule, value, cb) => {
      if (!value) {
        cb(new Error(item.attrs.message || '不能为空'))
        return
      }
      cb()
    }
  })
  selectorSetting.vm.$set(
    selectorSetting.validate,
    key,
    selectorSetting.validate[key]
  )
}

/**
 * 正则校验
 * @param selectorSetting 元素配置
 * @param key 校验字段key
 */
function setRegExVali (selectorSetting, key, item) {
  var msg = item.attrs.message
  if (!selectorSetting.validate.hasOwnProperty(key)) {
    selectorSetting.validate[key] = []
  }

  var regEx = new RegExp(item.attrs.regexp)
  selectorSetting.validate[key].push({
    validator: (rule, value, cb) => {
      if (value && value.length > 0 && !regEx.test(value)) {
        cb(new Error(msg))
        return
      }
      cb()
    }
  })
  setPlaceholder(selectorSetting, msg, key)
}

function setPlaceholder (selectorSetting, msg, key) {
  if (selectorSetting.vm.$refs[formName]) {
    selectorSetting.vm.$refs[formName].fields.forEach(field => {
      if (field.prop === key) {
        var inputTag = field.$el.getElementsByTagName('input')
        inputTag =
          inputTag.length === 0
            ? field.$el.getElementsByTagName('textarea')
            : inputTag
        if (inputTag && inputTag.length > 0) {
          inputTag[0].placeholder = msg
        }
      }
    })
  }
}

function safeCb (cb) {
  if (typeof cb === 'function') {
    return cb
  } else {
    return function () {}
  }
}

// function hasClass(elem, cls) {
//   cls = cls || "";
//   //当cls没有参数时，返回false
//   if (cls.replace(/\s/g, "").length == 0) return false;
//   return new RegExp(" " + cls + " ").test(" " + elem.className + " ");
// }

// function addClass(ele, cls) {
//   if (!hasClass(ele, cls)) {
//     ele.className = ele.className == "" ? cls : cls + " " + ele.className ;
//   }
// }

// function copy(obj){
//   var copyObj = {};
//   for ( var key in obj) {
//     copyObj[key] = obj[key];
//   }
//   return copyObj;
// }

function builderValidatorUrl (url) {
  for (var i in projectPrefixs) {
    var index = url.indexOf(projectPrefixs[i])
    if (index < 0) {
      continue
    }
    return (
      url.substring(0, index + projectPrefixs[i].length) +
      'form/validator/' +
      url.substring(index + projectPrefixs[i].length)
    )
  }
}

/// ///////////////////校验规则配置   有默认规则   可以被覆盖///////////////////////////
// function defaultCallbackValidatorRuleConfig(jqueryElem,constraint){

//   var dataTypes = "";
//   for(var j in constraint.constraints){
//     var dataType = null;
//     switch(constraint.fieldType){
//       case "string": dataType =stringValidatorRuleConfig(constraint.constraints[j]) ;break;
//       case "int": dataType =numberValidatorRuleConfig(constraint.constraints[j]) ;break;
//       case "double": dataType =doubleValidatorRuleConfig(constraint.constraints[j]) ;break;
//       case "date": dataType = dateValidatorRuleConfig(constraint.constraints[j]) ;break;
//       default : dataType = ortherValidatorRuleConfig(constraint.constraints[j]);break;
//     }
//     if(dataType){
//       dataTypes += dataType + ",";
//     }
//   }

//   dataTypes = removeLastChar(dataTypes,",");
//   if(dataTypes.length > 0){
//     var customRule = jqueryElem.attr("dataType");
//     if(notEmpty(customRule)){
//       dataTypes = customRule + "," + dataTypes;
//     }
//     jqueryElem.attr("dataType",dataTypes);
//   }
// }

// function notEmpty(str){

//   return str && str.length > 0 ;
// }
// function removeLastChar(str,removeChar){

//   if(!str || str.length == 0 || str.charAt(str.length-1) != removeChar){
//     return str;
//   }
//   return removeLastChar(str.substring(0,str.length-1),removeChar);
// }

// 字符串长度验证规则
// function stringValidatorRuleConfig(constraint){

//   if(constraint.type == "range"){
//     return "*1-"+constraint.attrs.max;
//   }

//   if(constraint.type == "notNull"){
//     return "*";
//   }
//   return null;
// }
// 整数校验规则
// function numberValidatorRuleConfig(constraint){

//   if(constraint.type == "notNull"){
//     return "*,/\\d+/";
//   }
//   return null;
// }
// /**
//  * 浮点数（小数）校验规则
//  * @param constraint
//  * @returns
//  */
// function doubleValidatorRuleConfig(constraint){

//   if(constraint.type == "notNull"){
//     return "*,/^\\d+\\.?\\d*$/";
//   }
//   return null;
// }
// //时间校验规则
// function dateValidatorRuleConfig(constraint){

//   if(constraint.type == "notNull"){
//     return "*";
//   }
//   return null;
// }
// //除了上面以为的其他类型的校验规则
// function ortherValidatorRuleConfig(constraint){

//   if(constraint.type == "notNull"){
//     return "*";
//   }
//   return null;
// }

const validatorModel = (
  ajaxSetting,
  selectorSetting,
  callbackValidatorRuleConfig
) => {
  return openValidator(
    ajaxSetting,
    selectorSetting,
    callbackValidatorRuleConfig
  )
}

export default validatorModel
