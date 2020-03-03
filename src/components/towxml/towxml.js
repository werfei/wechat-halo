const parser = require('./index')

Component({
  options: {
    styleIsolation: 'shared'
  },
  properties: {
    content: {
      type: String,
      value: ''
    },
    type: {
      type: String,
      value: 'markdown'
    }
  },
  data: {
    someData: {},
    nodes: {}
  },
  observers: {
    "content": function (content) {
      let nodes = parser(content || '', this.data.type)
      this.setData({
        nodes: nodes
      })
    }
  }
})
