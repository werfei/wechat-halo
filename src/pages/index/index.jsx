import {Component} from '@tarojs/taro'
import {View} from '@tarojs/components'
import ListView from 'taro-listview'
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
    isLoaded: false,
    error: false
  }

  componentWillMount() {
    this.loadData(0)
  }

  pullDownRefresh(reset) {
    console.log(111)
    this.loadData(0, function () {
      reset()
    })
  }

  onScrollToLower(reset) {
    if (!this.state.postsData.hasNext) {
      reset()
      return
    }
    this.loadData(this.state.postsData.page + 1, function () {
      reset()
    })
  }

  loadData(page, callback) {
    this.setState({
      isLoaded: true
    })
    post.posts({sort: 'createTime', page: page, size: 2}).then(res => {
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
        isLoaded: true,
        postsData: Object.assign(this.state.postsData, res.data),
        posts: posts
      })
    }).catch(() => {
      if (callback) {
        callback()
      }
      this.setState({
        isLoaded: true,
        error: true
      })
    })
  }

  render() {
    const {postsData} = this.state
    const {posts} = this.state
    const {isLoaded} = this.state
    const {error} = this.state
    return (
      <View>
        <ListView
          isLoaded={isLoaded}
          isError={error}
          hasMore={postsData.hasNext}
          isEmpty={!postsData.hasContent}
          onPullDownRefresh={this.pullDownRefresh.bind(this)}
          onScrollToLower={this.onScrollToLower.bind(this)}
          style={{height: '100vh'}}
        >
          <View className='main'>
            <UserProfile />
            <View className='list_container bs'>
              <View className='list_title'>最新文章</View>
              <View className='list'>
                <PostList posts={posts} />
              </View>
            </View>
          </View>
        </ListView>
        <AppNav />
      </View>
    )
  }
}

export default Index
