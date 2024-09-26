//定制请求的实例

//导入axios  npm install axios
import axios from 'axios';

import { ElMessage } from 'element-plus'
//定义一个变量,记录公共的前缀  ,  baseURL
const baseURL = '/api';
const instance = axios.create({baseURL})

import {useTokenStore} from '@/stores/token.js'
//请求拦截器
instance.interceptors.request.use(
    (config) =>{
        const tokenStore = useTokenStore();
        if(tokenStore.token){
            config.headers.Authorization = tokenStore.token
        }
        return config;
    },
    (err)=>{
        Promise.reject(err)
    }
)

import router from '@/router'

//添加响应拦截器
instance.interceptors.response.use(
    result=>{
        //判断业务状态码
        if(result.data.code === 0){
            return result.data;
        }

        //操作失败
        //alert(result.data.msg?result.data.msg:"服务异常")
        ElMessage.error(result.data.msg?result.data.msg:"服务异常")
        return Promise.reject(result.data)
    },
    err=>{
        //判断响应状态码是否为401-》未登录，提示登录并转跳
        if(err.response.status === 401){
            ElMessage.error('请先登录')
            router.push('/login')
        }else{
            ElMessage.error('服务异常');
        }
        
        return Promise.reject(err);//异步的状态转化成失败的状态
    }
)

export default instance;