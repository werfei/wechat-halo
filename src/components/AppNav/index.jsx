import {Component} from '@tarojs/taro'
import {View} from '@tarojs/components'
import {AtDrawer} from 'taro-ui'
import './index.scss'

class AppNav extends Component {

  static  options = {
    addGlobalClass: true
  }


  static defaultProps = {
    show: false
  }

  componentWillMount() {

  }

  render() {
    const {show} = this.props
    return (
      <AtDrawer
        show={show}
        mask
      >
        <View className='drawer-item'>优先展示items里的数据</View>
        <View className='drawer-item'>如果items没有数据就会展示children</View>
        <View className='drawer-item'>这是自定义内容</View>
        <View className='drawer-item'>这是自定义内容</View>
      </AtDrawer>
    )
  }
}

export default AppNav
