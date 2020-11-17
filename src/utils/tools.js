const tools = {}

/**
 * 防抖
 */
tools.debounce = (fn, delay = 500) => {
  let timer = null

  return function () {
    let self = this
    let args = [].slice.call(arguments)

    clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(self, args)
    }, delay)
  }
}

/**
 * 节流
 */
tools.throttle = (fn, wait = 500) => {
  let lastTime = wx.getStorageSync('lastTime')
  return function () {
    let args = [].slice.call(arguments) // 将类数组转化为数组
    let nowTime = new Date().getTime() // 获取当前时间
    if (nowTime - lastTime > wait) {
      fn.apply(this, args)
      wx.setStorage({
        key: 'lastTime',
        data: nowTime
      })
    }
  }
}

/**
 * 格式化数字，左侧补零
 * @params {number} n 要格式化的数字
 * @params {number} len 长度，默认长度为2
 */
tools.padLeft = (n, len = 2) => {
  n = n.toString()
  return new Array(len - n.length + 1).join('0') + n
}

/**
 * 格式化数字，右侧补零
 * @params {number} n 要格式化的数字
 * @params {number} len 长度，默认长度为2
 */
tools.padRight = (n, len = 2) => {
  n = n.toString()
  return n + new Array(len - n.length + 1).join('0')
}

/**
 * 是否是空对象，是：true，不是：false
 * @params {Object} obj 对象
 */
tools.isEmptyObject = function (obj) {
  if (Object.prototype.toString.call(obj) !== '[object Object]') { return false }
  return !(Object.keys(obj).length > 0)
}

/**
 * 隐藏部分字符
 * @params {string} str：字符串
 * @params {number} keepLen：保留的开头的字符个数
 * @params {number} endLen：保留的结尾的字符个数
 */
tools.hideStrFormate = function (str, keepLen, endLen) {
  let len = str.length - keepLen - endLen
  let newStr = ''
  for (let i = 0; i < len; i++) {
    newStr += '*'
  }
  const start = str.substring(0, keepLen)
  return start + newStr + str.substring(str.length - endLen)
}

/**
 * 验证变量值是否为null、空字符串、undefined，是：true，否：false
 */
tools.isEmptyValue = function (value) {
  let isEmpty = true
  if (
    value != null &&
        value !== '' &&
        value !== 'undefined' &&
        value !== undefined
  ) {
    isEmpty = false
  }

  return isEmpty
}

tools.idToName = function (idStr, dataArr) {
  let idArr = (idStr + '').split(',')
  let nameStr = ''
  for (let i = 0; i < idArr.length; i++) {
    for (let j = 0; j < dataArr.length; j++) {
      if (idArr[i] === dataArr[j].id) {
        if (i < idArr.length - 1) {
          nameStr = nameStr + dataArr[i].name + '、'
        } else {
          nameStr = nameStr + dataArr[i].name
        }
      }
    }
  }

  return nameStr
}

tools.getIndex = function (name, dataArr) {
  let index = 0
  for (let i = 0; i < dataArr.length; i++) {
    if (dataArr[i].name === name || dataArr[i].id === name) {
      index = i
      break
    }
  }

  return index
}

// 给定的数组中是否包含id,包含：true，dataArr：[{id:'',name:''},...]
tools.isHas = function (id, dataArr) {
  for (let i = 0; i < dataArr.length; i++) {
    if (id === dataArr[i].id) {
      return true
    }
  }

  return false
}

/**
 * 判断对象是否相等，类型相同，值相等
 */
tools.isObjectValueEqual = function (objectA, objectB) {
  if (typeof objectA !== typeof objectB) { return false }

  // 是对象
  if (objectA instanceof Object) {
    // 对象都为数组对象
    if (Array.isArray(objectA) && Array.isArray(objectB)) {
      let isArrEqual = tools.isArrayValueEqual(objectA, objectB)
      if (!isArrEqual) { return false }
    } else if (objectA instanceof Date && objectB instanceof Date) {
      return objectA.getTime() === objectB.getTime()
    } else if (typeof objectA === 'function') {
      if (objectA.toString() !== objectB.toString()) { return false }
    } else {
      if (Object.keys(objectA).length !== Object.keys(objectB).length) { return false }
      for (let attr in objectA) {
        let isAttrEqual = tools.isObjectValueEqual(
          objectA[attr],
          objectB[attr]
        )
        if (!isAttrEqual) { return false }
      }
    }
  } else {
    // 非对象
    return objectA === objectB
  }
  return true
}

/**
 * 判断两个数组是否相等
 */
tools.isArrayValueEqual = function (arrayA, arrayB) {
  if (arrayA.length !== arrayB.length) { return false }

  for (let i = 0; i < arrayA.length; i++) {
    let isObjectEqual = tools.isObjectValueEqual(arrayA[i], arrayB[i])
    if (!isObjectEqual) { return false }
  }

  return true
}

// 格式化日期
tools.formatDate = function(date) {
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let hour = date.getHours();
  let minute = date.getMinutes();
  let second = date.getSeconds();
  if (month < 10) {
      month = '0' + month;
  }
  if (day < 10) {
      day = '0' + day;
  }
  if (hour < 10) {
      hour = '0' + hour;
  }
  if (minute < 10) {
      minute = '0' + minute;
  }
  if (second < 10) {
      second = '0' + second;
  }
  return {
      year: year,
      month: month,
      day: day,
      ymd: year + '-' + month + '-' + day,
      completeDate: year +
          '-' +
          month +
          '-' +
          day +
          ' ' +
          hour +
          ':' +
          minute +
          ':' +
          second
  };
}

export default tools
