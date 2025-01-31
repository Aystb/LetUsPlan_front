//后续这个替换成公共域名
const BaseUrl = "http://43.139.8.195:8009";

export default class Request {
    http(param) {
       // const url = BaseUrl + param.url;
       //暂时未有公共域名的时候只用param的url
        const url = param.url
        const method = param.method;
        let header = param.header || {};
        const data = Object.assign(param.data || {});
        // const hideLoading = param.hideLoading || false; // info toast 的显示
        // Run
        if(method == "POST") {
            header = Object.assign({
                'content-type': "application/x-www-from-urlencoded"
            }, param.header)
        } else if(method == "GET"){ // tag GET
            header = Object.assign({
                'content-type': "application/json"
            }, param.header);
        }

        // if(!hideLoading) // info 并不通用...
        //     uni.showLoading({
        //         title: '加载中',
        //         mask: true
        //     });
        return new Promise((resolve, reject) => {
            uni.request({
                url: url,
                method: method,
                header: header,
                data: data,
                success: (res) => {
                    if(res.statusCode === 200) { // mark 一般默认会用200吧，不过也看实际了，
                        resolve(res.data);
                        console.log(res.data)
                    } else {
                        // todo 错误处理
                        console.info("request bug - success:", res);
                        reject(new Error('Request succeeded but with a non-success status'));
                    }
                },
                fail: (err) => {
                    console.info("request bug - fail:", err);
                    reject(err);
                }
            })
        })
    }
}