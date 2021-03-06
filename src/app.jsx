import Taro, {Component} from '@tarojs/taro'
import {Provider} from '@tarojs/mobx'
import Index from './pages/index'
import drawerStore from './store/drawer'
import cons from "./config/cons"

import './app.scss'
// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5') {
//   require('nerv-devtools')
// }

const store = {
  drawerStore: drawerStore
}

class App extends Component {
  constructor() {
    super();
    this.config = {
      pages: [
        'pages/index/index',
        'pages/posts/index'
      ],
      window: {
        backgroundTextStyle: 'light',
        navigationBarBackgroundColor: '#fff',
        navigationBarTextStyle: 'black'
      }
    }
  }

  componentDidMount() {
  }

  componentDidShow() {
    Taro.setNavigationBarTitle({
      title: cons.blogName
    }).then(() => {
    }).catch(() => {
    })
  }

  componentDidHide() {
  }

  componentDidCatchError() {
  }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
