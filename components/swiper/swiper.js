// components/swiper/swiper.js
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
    cardCur: 0,
    swiperList: [{
      id: 1,
      type: 'image',
      url: '/images/swiper/swiper_1.jpg'
    }, {
      id: 2,
      type: 'image',
      url: '/images/swiper/swiper_2.jpg'
    }, {
      id: 3,
      type: 'image',
      url: '/images/swiper/swiper_3.jpg'
    }, {
      id: 4,
      type: 'image',
      url: '/images/swiper/swiper_4.jpg'
    }],
  }
})
