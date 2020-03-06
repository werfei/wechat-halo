import {action, observable} from 'mobx'

class DrawerStore {
  @observable isShow = false

  @action.bound
  show() {
    this.isShow = true
  }

  @action.bound
  close() {
    this.isShow = false
  }
}

export default new DrawerStore()
