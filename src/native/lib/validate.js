const accountValidate = (data) => {
  const phoneVal = /((?=(09))[0-9]{10})$/g;
  if (!phoneVal.test(data)) {
    return { result: false, errMsg: '帳號必須為電話號碼' };
  }
  return { result: true, errMsg: '' };
};

const nameValidate = (data) => {
  if (data.length <= 0 || data.length > 6) {
    return { result: false, errMsg: '暱稱長度最長為六，最短為一' };
  }
  return { result: true, errMsg: '' };
};

const pwdValidate = (data) => {
  const passwordVal = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/g;
  if (data.length < 1) {
    return { result: false, errMsg: '密碼至少為八碼，需包含字元和數字' };
  }
  if (!passwordVal.test(data)) {
    return { result: false, error: '密碼至少為八碼，需包含字元和數字' };
  }
  return { result: true, errMsg: '' };
};

const transPwdValidate = (data) => {
  const transPwdVal = /([0-9]{6})$/g;
  if (data.length < 1) {
    return { result: false, errMsg: '轉帳密碼必須為6位數字' };
  }

  if (!transPwdVal.test(data)) {
    return { result: false, errMsg: '轉帳密碼必須為6位數字' };
  }
  return { result: true, errMsg: '' };
};

const verifyCodeValidate = (data) => {
  const verifyCodeVal = /([0-9]{6})$/g;
  if (!verifyCodeVal.test(data)) {
    return { result: false, errMsg: '驗證碼必須為6位數字' };
  }
  return { result: true, errMsg: '' };
};

const bindCodeValidate = (data) => {
  const bindCodeVal = /([0-9]{6})$/g;
  if (!bindCodeVal.test(data)) {
    return { result: false, errMsg: '綁定碼需為6位數' };
  }
  return { result: true, errMsg: '' };
};

const amountValidate = (data) => {
  const amountVal = /^\d+$/g;
  if (parseInt(data, 10) === 0) {
    return { result: false, errMsg: '轉帳數量不可為0' };
  }
  if (!amountVal.test(data)) {
    return { result: false, errMsg: '轉帳數量必須為數字' };
  }
  return { result: true, errMsg: '' };
};

export {
  accountValidate,
  nameValidate,
  pwdValidate,
  transPwdValidate,
  verifyCodeValidate,
  bindCodeValidate,
  amountValidate,
};
