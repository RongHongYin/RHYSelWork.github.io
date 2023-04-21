const isPlainObject = function isPlainObject(obj) {
    let proto, Ctor;
    if (!obj || Object.prototype.toString.call(obj) !== "[object Object]") return false;
    proto = Object.getPrototypeOf(obj);
    if (!proto) return true;
    Ctor = proto.hasOwnProperty('constructor') && proto.constructor;
    return typeof Ctor === "function" && Ctor === Object;
  };

  axios.defaults.baseURL = './json/';
  axios.defaults.timeout = 5000;
  axios.defaults.withCredentials = false;
  axios.defaults.validateStatus = function (status) {
    return status >= 200 && status < 400;
  };

  axios.defaults.transformRequest = function (data) {
    if (isPlainObject(data)) {
      return Qs.stringify(data);
    }
  }

  axios.interceptors.request.use(function (config) {

    return config
  }, function (err) {
    return Promise.reject(err)
  }
  )

  axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    //console.log(response,"111");
    return response.data;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });