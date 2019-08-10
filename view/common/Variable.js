/*
 * @Description: 常量,写了几个函数
 * @version: 0.1.0
 * @Company: 
 * @Author: AmandaYi
 * @Date: 2018-10-25
 * @LastEditors: AmandaYi
 * @LastEditTime: 2018-10-25 
 */
import {
	Dimensions
} from "react-native";
// 设计稿是750,这里一定要改设计稿的大小
const UIWIDTH = 750;
export const { width, height } = Dimensions.get("window");
export function rx(UIPX) {
	return Math.round(UIPX * width / UIWIDTH);
}

// 二次方程
export function ry(UIPX) {
	return UIPX * 12 / height;
}