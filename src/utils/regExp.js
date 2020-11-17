/*eslint-disable*/
const feiCheRegExp = {
  account: /^[a-zA-Z0-9]{6,15}$/, // 账号：6-15位字母或数字
  password1: /^[a-zA-Z0-9]{6,15}$/, // 6-15位字母或数字
  userName: /[a-zA-Z\u4E00-\u9FA5]$/, // 支持中文、英文姓名，不支持特殊字符
  name: /^.{2,30}$/, // 2-30个任意字符
  email: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/, // 邮箱
  IdCard: /^[1-9]\d{5}[1-9]\d{3}(((0[13578]|1[02])(0[1-9]|[12]\d|3[0-1]))|((0[469]|11)(0[1-9]|[12]\d|30))|(02(0[1-9]|[12]\d)))(\d{4}|\d{3}[xX])$/, // 身份证号，支持18位
  intNumber: /^[0-9]+$/, // 数字
  mobileNumber: /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[0135678]|18[0-9]|14[56789]|19[0-9])[0-9]{8}$/, // 手机号
  numberLetter: /^[0-9a-zA-Z]+$/, // 只字母或数字
  tel2: /\d{3}-\d{8}|\d{4}-\{7,8}$/, // 电话号码,正确格式：056-13882171，区号支持3-4位
  tel: /\d{3}\d{8}|\d{4}\{7,8}$/, // 电话号码,正确格式：05613882171，区号支持3-4位,
  floatNumber: /^\d+(\.\d{1,2})?$/, // 小数，支持小数点后2位,
  registNo: /^[a-zA-Z]{4}[a-zA-Z0-9]{18}$/ // 报案号：22位，前4位是字母，后18位为字母或者数字
};

const regExpCheck = {};

// 验证手机号
regExpCheck.checkMobileNumber = function(mNumber) {
  let isPass = false;
  if (mNumber.toString().length == 11) {
    isPass = feiCheRegExp.mobileNumber.test(mNumber);
  }
  return isPass;
};

// 验证电话号码
regExpCheck.checkTel = function(tel) {
  let isPass = false;
  if (tel.toString().length == 11 || tel.toString().length == 12) {
    isPass = feiCheRegExp.tel.test(tel);
  }
  return isPass;
};

// 验证账号
regExpCheck.checkAccount = function(account) {
  return feiCheRegExp.account.test(account);
};

// 验证姓名
regExpCheck.checkName = function(name) {
  return feiCheRegExp.name.test(name.trim());
};

// 验证用户名
regExpCheck.checkUserName = function(userName) {
  return feiCheRegExp.userName.test(userName.trim());
};

// 验证邮箱
regExpCheck.checkEmail = function(email) {
  return feiCheRegExp.email.test(email);
};

// 验证密码
regExpCheck.checkPassword = function(pwd) {
  return feiCheRegExp.password1.test(pwd);
};

// 验证身份证
regExpCheck.checkIdCard = function(IdCard) {
  let isPassReg = feiCheRegExp.IdCard.test(IdCard);
  if (!isPassReg) {
    return isPassReg;
  }

  let idCardCode = ["1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2"];
  let idCardStrArr = (IdCard + "").split("");

  let isPassCodeCheck = false;

  let iSum = 0;
  for (let i = 17; i > 0; i--) {
    iSum += Math.pow(2, i) * parseInt(idCardStrArr[17 - i]);
  }

  let index = iSum % 11;
  isPassCodeCheck = idCardCode[index] == idCardStrArr[17].toUpperCase();

  return isPassReg && isPassCodeCheck;
};

// 验证是否为正整数
regExpCheck.checkNumber = function(value) {
  return feiCheRegExp.intNumber.test(value);
};

// 验证是否为小数且小数点后保留两位
regExpCheck.checkFloat = function(value) {
  return feiCheRegExp.floatNumber.test(value);
};

// 验证银行卡号
regExpCheck.checkBankCardNumber = function(cardNo) {
  let isPass = false;
  let cardNoArr = cardNo.split("").reverse();
  let oddSum = 0; // 奇数位的数字的和
  let evenSum = 0;
  for (let i = 0; i < cardNoArr.length; i++) {
    let iCardNo = parseInt(cardNoArr[i]);
    if (i % 2 == 0) {
      oddSum += iCardNo;
    } else {
      evenSum +=
        iCardNo * 2 > 9 && iCardNo * 2 < 100 ? iCardNo * 2 - 9 : iCardNo * 2;
    }
  }

  if ((oddSum + evenSum) % 10 == 0) {
    isPass = true;
  }
  return isPass;
};

// 验证只字母或数字
regExpCheck.numberLetter = function(value) {
  return feiCheRegExp.numberLetter.test(value);
};

// 验证是否为空字符串或均为空格
regExpCheck.checkEmptyOrWhiteSpace = function(str) {
  return !str || /^[ ]+$/.test(str);
};

// 验证报案号
regExpCheck.checkRegistNo = function(registNo) {
  return feiCheRegExp.registNo.test(registNo);
};

// 验证统一社会信用代码
regExpCheck.CheckSocialCreditCode = function(Code) {
  let patrn = /^[0-9A-Z]+$/;
  // 18位校验及大写校验
  if (Code.length != 18 || patrn.test(Code) == false) {
    console.info("不是有效的统一社会信用编码！");
    return false;
  } else {
    let Ancode; // 统一社会信用代码的每一个值
    let Ancodevalue; // 统一社会信用代码每一个值的权重
    let total = 0;
    let weightedfactors = [
      1,
      3,
      9,
      27,
      19,
      26,
      16,
      17,
      20,
      29,
      25,
      13,
      8,
      24,
      10,
      30,
      28
    ]; // 加权因子
    let str = "0123456789ABCDEFGHJKLMNPQRTUWXY";
    // 不用I、O、S、V、Z
    for (let i = 0; i < Code.length - 1; i++) {
      Ancode = Code.substring(i, i + 1);
      Ancodevalue = str.indexOf(Ancode);
      total = total + Ancodevalue * weightedfactors[i];
      // 权重与加权因子相乘之和
    }
    let logiccheckcode = 31 - (total % 31);
    if (logiccheckcode == 31) {
      logiccheckcode = 0;
    }
    let Str = "0,1,2,3,4,5,6,7,8,9,A,B,C,D,E,F,G,H,J,K,L,M,N,P,Q,R,T,U,W,X,Y";
    let Array_Str = Str.split(",");
    logiccheckcode = Array_Str[logiccheckcode];

    let checkcode = Code.substring(17, 18);
    if (logiccheckcode != checkcode) {
      console.info("不是有效的统一社会信用编码！");
      return false;
    } else {
      console.info("yes");
    }
    return true;
  }
};

// 验证组织机构代码
regExpCheck.CheckOrganizationCode = function(value) {
  let ret = false;
  value = value.replace("-", "");
  let codeVal = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z"
  ];
  let intVal = [
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    24,
    25,
    26,
    27,
    28,
    29,
    30,
    31,
    32,
    33,
    34,
    35
  ];
  let crcs = [3, 7, 9, 10, 5, 8, 4, 2]; // 加权因子
  if (!(value === "") && value.length === 9) {
    let sum = 0;
    for (let i = 0; i < 8; i++) {
      let codeI = value.substring(i, i + 1);
      let valI = -1;
      // 数字 或者大小写字母
      for (let j = 0; j < codeVal.length; j++) {
        if (codeI === codeVal[j]) {
          valI = intVal[j];
          break;
        }
      }
      sum += valI * crcs[i];
    }
    let crc = 11 - (sum % 11);
    switch (crc) {
      case 10: {
        crc = "X";
        break;
      }
      case 11: {
        crc = "0";
        break;
      }
      default: {
        break;
      }
    }
    if (crc + "" === value.substring(8)) {
      ret = true;
    }
  } else if (value === "") {
    ret = true;
  }
  return ret;
};

module.exports = regExpCheck;
