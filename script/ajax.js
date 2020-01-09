/**
options = {
  url: "",
  method: "",
  headers: {}, 
  data: "",
  success: function(result) {},  // 请求成功后调用此方法
  fail: function(error) {}    // 请求失败或出错后调用此方法
}
**/
window.ajax = function(options) {
    var option = {
        url: options.url || '',
        method: options.method.toLocaleUpperCase() || 'GET',
        headers: options.headers || '',
        data: options.data || null,
        onSuccess: options.success || function(result) {},
        onFail: options.fail || function(error) {}
    };

    var xhr = new XMLHttpRequest();
    xhr.open(option.method, option.url, true);
    if (option.method === 'POST' || option.method === 'PUT') {
        //xhr.setRequestHeader(option.headers.key, option.headers.value);
        xhr.setRequestHeader('content-type', 'application/json');
        option.data = JSON.stringify(option.data);
    }
    xhr.onload = () => option.onSuccess(JSON.parse(xhr.responseText));
    xhr.onerror = () => option.onFail(xhr.status);
    

    // xhr.onreadystatechange = function() {
    //     if (xhrObject.readyState === 4) {
    //         if (xhrObject.status === 200 || (xhr.status === 201 && option.method === 'POST')) {
    //             option.onSuccess(JSON.parse(xhr.responseText));
    //         } else {
    //             option.onFail(xhr.status);
    //         }
    //     }
    // };
    xhr.send(option.data);

}