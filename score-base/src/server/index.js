import axios from './request';
import apiUrl from './apiUrl';

//获取配置对象
export const getScoreParm = (option)=> axios.post(apiUrl.getScoreParm,option);
export const getQuestion = (option)=> axios.post(apiUrl.getQuestion,option);
export const getScoreSubmit = (option)=> axios.post(apiUrl.getScoreSubmit,option);