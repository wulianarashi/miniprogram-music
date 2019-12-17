//初始歌词滚动高度
let lyricHeight = 0 
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    lyric: String
  },

  observers: {
    lyric(data) {
      //监听歌词的来到
      if(data) {
        this.formatLyric(data)
      }else {
        //对于没有歌词的设定
        this.setData({
          lrcList: [
            {
              time:0,
              lrc:'暂无歌词'
            }
          ],
          lrcIndex:-1
        })
      }
    }
  },
  lifetimes: {
    ready() {
      wx.getSystemInfo({
        success(res) {
          // 歌词滚动的高度
          lyricHeight = res.screenWidth / 750 * 64
        },
      })
    },
  },
  /**
   * 组件的初始数据
   */
  data: {
    lrcList: [],
    lrcIndex:0,//歌词索引
    scrollTop:0//滚动高度
  },

  /**
   * 组件的方法列表
   */
  methods: {
    formatLyric(lyric) {
      const line = lyric.split('↵')
      let lrcList = []
      line.forEach((elem) => {
        let time = elem.match(/\[(\d{2,}):(\d{2})(?:\.(\d{2,3}))?]/g)
        if (time != null) {
          let lrc = elem.split(time)[1]
          let timeReg = time[0].match(/(\d{2,}):(\d{2})(?:\.(\d{2,3}))?/)
          // 把时间转换为秒
          let timeSeconds = parseInt(timeReg[1]) * 60 + parseInt(timeReg[2]) + parseInt(timeReg[3]) / 1000
          lrcList.push({
            lrc,
            time: timeSeconds,
          })
        }
      })
      this.setData({
        lrcList
      })
    },

    timeUpdate(time) {
      //获取歌词
      let lrcList = this.data.lrcList
      if (lrcList.length == 0) {
        //无歌词下面的滚动就不要做了
        return
      }
      if (time > lrcList[lrcList.length - 1].time) {
        //如果播放的时间比歌词列表的最后一句歌词时间大
        if (this.data.lrcIndex != -1) {
          this.setData({
            lrcIndex: -1,
            scrollTop: lrcList.length * lyricHeight
          })
        }
      }
      //对进来的歌词进行设置(包含歌词的高亮显示索引位置和滚动高度)
      for (let i = 0, len = lrcList.length; i < len; i++) {
        if (time <= lrcList[i].time) {
          this.setData({
            lrcIndex: i - 1,
            scrollTop: (i - 1) * lyricHeight
          })
          break
        }
      }
    }
  }
})