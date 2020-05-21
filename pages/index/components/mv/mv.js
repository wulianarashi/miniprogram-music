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
        mv_copy_list: item.map(item => item)
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
  
  }
})
