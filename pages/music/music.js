// pages/music/music.js
const MUSIC = require('../../static/play.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    music:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   this.getMusic()
  },

  getMusic() {
    this.setData({
      music: MUSIC.default.result.songs
    })
    //数据过多,放置缓存,也可用于避免第二次请求
    wx.setStorageSync('musiclist', this.data.music)
  },
  
  gotoPlay(e) {
    const index = e.currentTarget.dataset.index
    wx.navigateTo({
      url: `../../pages/play/play?index=${index}`,
    })
  }
})