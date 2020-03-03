import {Component} from '@tarojs/taro'
import {Text, View} from '@tarojs/components'
import {AtAvatar} from 'taro-ui'
import {inject, observer} from "@tarojs/mobx"
import classnames from 'classnames'
import './index.scss'
import statistic from "../../api/statistic";

@inject((stores) => ({
  drawerStore: stores.drawerStore
}))
@observer
class UserProfile extends Component {
  static options = {
    addGlobalClass: true
  }

  state = {
    statistic: {
      postCount: 0,
      tagCount: 0,
      categoryCount: 0,
      user: {
        avatar: null,
        description: null,
        email: null,
        nickname: null
      }
    }
  }

  componentWillMount() {
    this.loadUser()
  }

  loadUser() {
    statistic.statisticsWithUser().then(res => {
      this.setState({
        statistic: Object.assign({}, this.state.statistic, res.data)
      })
    }).catch(() => {
    })
  }

  showDrawer = () => {
    const {drawerStore} = this.props
    drawerStore.show()
  }

  render() {
    return (
      <View className={classnames({card: true, text_center: true})}>
        <AtAvatar className='margin-auto' size='large' circle image={this.state.statistic.user.avatar} />
        <View className='nick-name'>
          {this.state.statistic.user.nickname}
        </View>
        <View className='margin-v20 font-size26'>{this.state.statistic.user.description}</View>
        <View className='at-row'>
          <View className='at-col'>
            <View>{this.state.statistic.postCount}</View>
            <Text className='iconfont icon-post' />
          </View>
          <View className='at-col'>
            <View>{this.state.statistic.categoryCount}</View>
            <Text className='iconfont icon-category' />
          </View>
          <View className='at-col'>
            <View>{this.state.statistic.tagCount}</View>
            <Text className='iconfont icon-tag' />
          </View>
        </View>
        <View className='navbar-toggle' onClick={this.showDrawer}>
          <View className='at-icon at-icon-menu' />
        </View>
      </View>
    )
  }
}

export default UserProfile
