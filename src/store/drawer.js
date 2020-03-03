import {action, observable} from 'mobx'

class DrawerStore {
  @observable isShow = false

  @action.bound
  show() {
    this.isShow = true
    console.log(2)
  }

  @action.bound
  close() {
    this.isShow = false
    console.log(1)
  }
}

export default new DrawerStore()
