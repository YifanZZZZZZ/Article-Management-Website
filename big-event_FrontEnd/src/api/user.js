//导入请求工具
import request from "@/utils/request.js"

//提供调用注册接口的函数
export const userRegisterService = (registerData) => {
    //用urlSearchParam完成传递
    const params = new URLSearchParams()
    for(let key in registerData){
        params.append(key, registerData[key]);
    }
    return request.post("/user/register", params);
}

//提供调用登陆接口的函数
export const userLoginService = (loginData)=>{
    const params = new URLSearchParams();
    for(let key in loginData){
        params.append(key,loginData[key]);
    }
    return request.post("/user/login",params);
}

//获取详细信息  
export const userInfoService = ()=>{
    return request.get('/user/userInfo')
}

export const updateUserInfoService = (userInfoData) =>{
    return request.put('/user/update',userInfoData)
}