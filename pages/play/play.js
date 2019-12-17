//声明音乐列表和索引
let music_List
let now_index
//实例化一个音频
const musicAudio = wx.getBackgroundAudioManager()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: '',
    playing: false, //音频的播放状态
    lyric:'', //歌词
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //获取缓存音乐数据
    music_List = wx.getStorageSync('musiclist')
    //知道是第几首歌曲
    now_index = options.index
    //把当前音乐数据传给设置
    this.setMusicInfo(music_List[now_index])
  },

  setMusicInfo(data) {
    console.log(data)
    //对于上一首下一首的操作先暂停
    musicAudio.stop()
    const {
      name,
      al: {
        picUrl
      },
      lyric,
      musicUrl,
      ar
    } = data
    wx.setNavigationBarTitle({
      title: name,
    })
    this.setData({
      imgUrl: picUrl,
      lyric
    })
    //对音频实例的设置
    musicAudio.src = musicUrl
    musicAudio.title = name
    //手机上看到的当前歌曲图片
    musicAudio.coverImgUrl = picUrl
    //手机上看到的当前歌曲歌手
    musicAudio.singer = ar[0].name
    //改变音频的播放状态
    this.setData({
      playing: true
    })
  },

  changePlay() {
    //点击播放或暂停
    if(this.data.playing) {
      musicAudio.pause()
    }else {
      musicAudio.play()
    }
    
    this.setData({
      playing: !this.data.playing
    })
  },

  prev() {
    //上一首
    now_index -- 
    if (now_index < 0) {
      now_index = music_List.length - 1
    }
    this.setMusicInfo(music_List[now_index])
  },

  next() {
    //下一首
    now_index ++
    if (now_index >= music_List.length) {
      now_index = 0
    }
    this.setMusicInfo(music_List[now_index])
  },
  
  timeUpdate(event) {
    this.selectComponent('.lyric').timeUpdate(event.detail.nowTime)
  },

  musicPlay() {
    this.setData({
      playing:true
    })
  },

  musicPause() {
    this.setData({
      playing: false
    })
  }
})