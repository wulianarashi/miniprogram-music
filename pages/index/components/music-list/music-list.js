// pages/index/components/music-list/music-list.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    music_list: Array
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    gotoMusic() {
      wx.navigateTo({
        url: '/pages/music/music',
      })
    }
  }
})
