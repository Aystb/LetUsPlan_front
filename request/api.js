import Request from ".";
const request = new Request().http;
//测试的基础url,可以直接用全部的url，也可以和这个组合使用
let testBaseUrl = "http://127.0.0.1:4523/m1/4020303-0-default/"

function get(url, header, data) {
    return request({
        url: url,
        method: "GET",
        header: header,
        data: data
    })
}

function post(url, header, data) {
    return request({
        url: url,
        method: "POST",
        header: header,
        data: data
    })
}



// tag 外部结构,api的使用从这里开始
const  api = {
    
//登陆


 
//获取酒店的预订日历（就是选到店，离店，住几天的那个）
async requestHotelReservationCalendar(hotelid,data){
   var url = `http://127.0.0.1:4523/m1/4020303-0-default/CFT/1/hotel/reservationCalendar`
    return await get(url,{},data)
}

};

export default api;