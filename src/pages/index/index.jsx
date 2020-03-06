import {Component} from '@tarojs/taro'
import {View} from '@tarojs/components'
import {AtLoadMore} from 'taro-ui'
import './index.scss'
import UserProfile from "../../components/UserProfile"
import post from "../../api/post"
import PostList from '../../components/PostList'
import AppNav from "../../components/AppNav";

class Index extends Component {

  state = {
    postsData: {
      content: [],
      hasNext: false,
      page: 0,
      hasContent: false
    },
    posts: [],
    isLoaded: false
  }

  componentWillMount() {
    this.loadData(0)
  }

  options = {
    addGlobalClass: true
  }

  config = {
    enablePullDownRefresh: true,
    backgroundTextStyle: "dark"
  }

  onPullDownRefresh() {
    this.loadData(0, function () {
      Taro.stopPullDownRefresh()
    })
  }

  onReachBottom() {
    if (!this.state.postsData.hasNext) {
      return
    }
    this.loadData(this.state.postsData.page + 1, function () {

    })
  }

  loadData(page, callback) {
    this.setState({
      isLoaded: true
    })
    post.posts({sort: 'createTime,desc', page: page, size: 2}).then(res => {
      if (callback) {
        callback()
      }
      let posts = this.state.posts
      let contents = res.data && res.data.content ? res.data.content : []
      if (page === 0) {
        posts = contents
      } else {
        posts = [...posts, ...contents]
      }
      res.data.content = []
      this.setState({
        isLoaded: false,
        postsData: Object.assign(this.state.postsData, res.data),
        posts: posts
      })
    }).catch(() => {
      if (callback) {
        callback()
      }
      this.setState({
        isLoaded: false
      })
    })
  }

  render() {
    const {postsData} = this.state
    const {posts} = this.state
    const {isLoaded} = this.state
    return (
      <View>
        <View className='main'>
          <UserProfile />
          <View className='list_container bs'>
            <View className='list_title'>最新文章</View>
            <View className='list'>
              <PostList posts={posts} />
            </View>
          </View>
          {postsData.content.length > 10 &&
          <AtLoadMore noMoreText='亲，到底了~' status={isLoaded ? 'loading' : (postsData.hasNext ? 'more' : 'noMore')} />}
        </View>
        <AppNav />
      </View>
    )
  }
}

export default Index
