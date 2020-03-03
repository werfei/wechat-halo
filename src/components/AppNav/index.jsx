import {Component} from '@tarojs/taro'
import {inject, observer} from "@tarojs/mobx"
import {AtDrawer, AtList, AtListItem} from 'taro-ui'
import './index.scss'

@inject((stores) => ({
  drawerStore: stores.drawerStore
}))
@observer
class AppNav extends Component {

  static  options = {
    addGlobalClass: true
  }


  componentWillMount() {

  }

  closeDrawer = () => {
    const {drawerStore} = this.props
    drawerStore.close()
  }

  render() {
    const {drawerStore: {isShow}} = this.props
    const drawerWidth = Taro.pxTransform(350)
    return (
      <AtDrawer
        show={isShow}
        width={drawerWidth}
        onClose={this.closeDrawer}
        style={{height: '100vh'}}
        mask
      >
        <AtList>
          <AtListItem title='日志' />
          <AtListItem title='归档' />
          <AtListItem title='关于我' />
        </AtList>
      </AtDrawer>
    )
  }
}

export default AppNav
