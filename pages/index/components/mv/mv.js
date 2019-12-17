// pages/index/components/mv.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    mv_list: {
      type: Array,
    }
  },

  observers: {
    mv_list(item) {
      this.setData({
        mv_copy_list: item.map(item => {
          item.playTime = this.tranNumber(item.playTime, 2)
          return item
        })
      })
    }
  },


  /**
   * 组件的初始数据
   */
  data: {
    mv_copy_list:[]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //对播放量数字的格式化
    tranNumber(num, point) {
      let numStr = num.toString().split('.')[0]
      if (numStr.length < 6) {
        return numStr
      } else if (numStr.length >= 6 && numStr.length <= 8) {
        let decimal = numStr.substring(numStr.length - 4, numStr.length - 4 + point)
        return parseFloat(parseInt(num / 10000) + '.' + decimal) +
          '万'
      } else if (numStr.length > 8) {
        let decimal = numStr.substring(numStr.length - 8, numStr.length - 8 + point)
        return parseFloat(parseInt(num / 100000000) + '.' + decimal) + '亿'
      }
    }
  }
})