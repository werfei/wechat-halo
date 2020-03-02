import {Component} from '@tarojs/taro'
import {View} from '@tarojs/components'
import classnames from 'classnames'
import './index.scss'

class EmptyView extends Component {

  static  options = {
    addGlobalClass: true
  }


  static defaultProps = {
    text: "暂时还没有数据哦~"
  }

  componentWillMount() {

  }

  render() {
    const {text} = this.props
    return (
      <View className={classnames({text_center: true})}>
        <View className='iconfont icon-empty empty-icon' />
        <View className='empty-text'>{text}</View>
      </View>
    )
  }
}

export default EmptyView
