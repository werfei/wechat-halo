import Taro from '@tarojs/taro'

export const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

export const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

export function getWindowHeight(showTabBar = true) {
  const TAB_BAR_HEIGHT = 50
  const NAVIGATOR_HEIGHT = 44
  const info = Taro.getSystemInfoSync()
  const {windowHeight, statusBarHeight} = info
  const tabBarHeight = showTabBar ? TAB_BAR_HEIGHT : 0

  if (process.env.TARO_ENV === 'rn') {
    return windowHeight - statusBarHeight - NAVIGATOR_HEIGHT - tabBarHeight
  }

  if (process.env.TARO_ENV === 'h5') {
    return windowHeight - tabBarHeight
  }
  return windowHeight - tabBarHeight
}

export function getWindowWidth() {
  const info = Taro.getSystemInfoSync()
  return info.windowWidth;
}

export function pageToLogin() {

}
