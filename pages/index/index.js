//精选歌单数据
const MUSIC_LIST = require('../../static/music.js')
//精选歌单默认展示的条数
const MAX_MUSIC_LENGTH = 9
//mv数据
const MV_LIST = require('../../static/mv.js')
//mv展示的条数
let MAX_MV_LENGTH = 6
Page({
  /**
   * 页面的初始数据
   */
  data: {
    music_list: [],
    mv_list: [],
    flag: false, //如果没有数据了，触底就不要触发加载
    timer: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMusicList()
    this.getMvList()
  },

  getMusicList() {
    //获取精选歌单数据
    const music_list_copy = MUSIC_LIST.default.result.albums.filter((item, index) => index < MAX_MUSIC_LENGTH)
    this.setData({
      music_list: music_list_copy
    })
  },

  getMvList() {
    let { mv_list, flag, timer } = this.data
    const mv = MV_LIST.default.result.videos
    clearTimeout(timer)
    if(flag) return
    wx.showLoading({
      title: '加载中',
      mask:true
    })
    const mvc_list_copy = mv.filter((item, index) => index < MAX_MV_LENGTH)
    MAX_MV_LENGTH += MAX_MV_LENGTH
    this.setData({
      mv_list: mvc_list_copy
    }, () => {
      //如果已经是最全的歌单
      if (mv_list.length === mv.length) {
        this.setData({
          flag:true
        })
      }
    })
    timer = setTimeout( () => {
      wx.hideLoading()
    }, 700)
  },
 
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.getMvList()
  },
})