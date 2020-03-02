import {Component} from '@tarojs/taro'
import {Text, View} from '@tarojs/components'
import {AtTag} from "taro-ui"
import moment from 'moment'
import EmptyView from "../EmptyView"
import './index.scss'

class PostList extends Component {

  static  options = {
    addGlobalClass: true
  }


  static defaultProps = {
    posts: []
  }

  componentWillMount() {

  }

  buildCategory(categories) {
    let footer = null;
    if (categories && categories.length > 0) {
      footer = categories.map(c => {
        return (
          <AtTag
            key={c.id}
            size='small'
            type='primary'
            circle
            active
          >
            {c.name}
          </AtTag>
        )
      })
    }
    return footer
  }

  render() {
    let content
    const {posts} = this.props
    if (posts.length > 0) {
      content = posts.map(o => {
        let footer = this.buildCategory(o.categories);
        return (
          <View className='article' key={o.id}>
            <View className='title'>{o.title}</View>
            <View className='content'>
              {o.summary}
              <View className='des'>
                {footer}
                <Text className='time'>{moment(o.createTime).format("YYYY-MM-DD")}</Text>
              </View>
            </View>
          </View>
        )
      })
    } else {
      content = <EmptyView text='作者太懒了~' />
    }
    return content
  }
}

export default PostList
