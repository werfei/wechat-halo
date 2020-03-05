import {Component} from '@tarojs/taro'
import {Text, View} from "@tarojs/components"
import moment from "moment"
import TaroParser from "taro-parse"
import './index.scss'
import post from "../../api/post"
import cons from "../../config/cons"

class Posts extends Component {

  state = {
    posts: {
      categories: [],
      commentCount: null,
      createFrom: null,
      createTime: null,
      disallowComment: null,
      editTime: null,
      formatContent: null,
      id: null,
      likes: null,
      originalContent: null,
      tags: [],
      title: '',
      topPriority: null,
      updateTime: null,
      url: null,
      visits: 0
    }
  }

  // 页面加载事件
  componentWillMount() {
    this.loadPost()
    global._events = {
      tap: function (item) {
        if (item.tag === 'img' && item.attr.src) {
          Taro.previewImage({
            urls: [item.attr.src]
          }).then(() => {
          }).catch(() => {
          })
        } else if (item.tag === 'navigator') {
          Taro.setClipboardData({data: item.attr.href}).then(() => {
            Taro.showToast({
              title: "链接已复制"
            }).then(() => {
            })
          })
        }
      }
    }
  }

  componentDidUpdate() {
  }

  imgClick = (src) => {
    Taro.previewImage({urls: [src]}).then(() => {
    })
  }

  linkClick = (href) => {
    Taro.setClipboardData({data: href}).then(() => {
      Taro.showToast({title: '链接已复制'}).then(() => {
      })
    })

  }

  loadPost() {
    post.info(this.$router.params.id).then(res => {
      this.setState({
        posts: res.data
      })
      Taro.setNavigationBarTitle({
        title: res.data.title
      })
    }).catch(() => {
    })
  }

  render() {
    const {posts} = this.state
    return (
      <View className='at-article'>
        <View className='article_title'>
          {posts.title}
        </View>
        <View className='at-article__info'>
          {moment(posts.createTime).format('YYYY-MM-DD')}<Text className='article-author'>{cons.blogName}</Text>
        </View>
        <View className='at-article__content'>
          {/*{process.env.TARO_ENV !== 'h5' ?*/}
          {/*  <towxml content={posts.originalContent || ''} type='markdown' /> : md(posts.originalContent || '')}*/}
          <TaroParser
            type='markdown'
            theme='light'
            onImgClick={this.imgClick}
            onLinkClick={this.linkClick}
            yumlApi='https://md.werfei.com/?yuml'
            latexApi='https://md.werfei.com/?tex'
            content={posts.originalContent}
          />
        </View>
      </View>
    )
  }
}

export default Posts
