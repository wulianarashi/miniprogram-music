//movable-area和movable-view的宽度
let areaWidth
let viewWidth
const MUSICAUDIO = wx.getBackgroundAudioManager()
let isMoving
//当前秒数
let nowSecond = -1
//歌曲总时长
let totalTime
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    time: {
      nowTime: '00:00',
      endTime: '00:00'
    },
    moveX: 0, //moveview值
    percent:0 //progress值
  },

  lifetimes: {
    ready() {
      this.getWidth()
      this.musicEvent()
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getWidth() {
      //获取手机上movable-area和movable-view的宽度
      const x = this.createSelectorQuery()
      x.select('.movable-area').boundingClientRect()
      x.select('.movable-view').boundingClientRect()
      x.exec( data => {
        areaWidth = data[0].width
        viewWidth = data[1].width
      })
    },

    musicEvent() {
      MUSICAUDIO.onPlay(() => {
        isMoving = false
        this.triggerEvent('musicPlay')
      })

      MUSICAUDIO.onStop(() => {
        console.log('onStop')
      })

      MUSICAUDIO.onPause(() => {
        console.log('Pause')
        this.triggerEvent('musicPause')
      })

      MUSICAUDIO.onWaiting(() => {
        console.log('onWaiting')
      })

      MUSICAUDIO.onCanplay(() => {
        //判断音乐的时长是否能得到
        const totalTime = MUSICAUDIO.duration
        if (totalTime !== undefined) {
          this.setTime()
        } else {
          setTimeout(() => {
            this.setTime()
          }, 1000)
        }
      })

      MUSICAUDIO.onTimeUpdate(() => {
        if (true) {
          //音乐当前播放时间,带有小数点
          const nowTime = MUSICAUDIO.currentTime
          //音乐总时长
          const totalTime = MUSICAUDIO.duration
          //取消小数点
          const s = Math.floor(nowTime)
          if (s != nowSecond) {
            const nowTimeFormat = this.formatTime(nowTime)
            this.setData({
              moveX: (areaWidth - viewWidth) * nowTime / totalTime,
              percent: nowTime / totalTime * 100, 
              ['time.nowTime']: `${nowTimeFormat.m}:${nowTimeFormat.s}`,
            })
            nowSecond = s
            // 联动歌词
            this.triggerEvent('timeUpdate', {
              nowTime
            })
          }
        }
      })

      MUSICAUDIO.onEnded(() => {
        this.triggerEvent('musicEnd')
      })

      MUSICAUDIO.onError((res) => {
        wx.showToast({
          title: '歌曲发生错误',
        })
      })
    },

    setTime() {
      //设置总时长
      totalTime = MUSICAUDIO.duration
      const totalTimeFormat = this.formatTime(totalTime)
      this.setData({
        ['time.endTime']: `${totalTimeFormat.m}:${totalTimeFormat.s}`
      })
    },

    formatTime(second) {
      //分钟
      const m = Math.floor(second / 60)
      //秒
      const s = Math.floor(second % 60)
      return {
        "m":this.padStart(m),
        "s":this.padStart(s)
      }
    },

    padStart(time) {
      //补0计划
     return time < 10 ? "0" + time : time
    },

    onChange(event) {
      //滚动条拖到某处change事件
      if (event.detail.source == 'touch') {
        this.data.percent = event.detail.x / (areaWidth - viewWidth) * 100
        this.data.moveX = event.detail.x
        // isMoving = true
      }
    },

    onTouchEnd() {
      //滚动条松手事件
      const formatTime = this.formatTime(Math.floor(MUSICAUDIO.currentTime))
      this.setData({
        percent: this.data.percent,
        moveX: this.data.moveX,
        ['showTime.currentTime']: formatTime.m + ':' + formatTime.s
      })
      //音乐播放跳到指定位置
      MUSICAUDIO.seek(totalTime * this.data.percent / 100)
      isMoving = false
    }
  }
})
