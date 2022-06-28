import axios from './request';
import apiUrl from './apiUrl';

//获取配置对象
export const getScoreParm = (option)=> axios.post(apiUrl.getScoreParm,option);