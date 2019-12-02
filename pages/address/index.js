//index.js
//获取应用实例
const app = getApp()
const Pager = require('../../components/aotoo/core/index.js')
const lib = Pager.lib


//模拟数据
import getCarData from './data'


//适配方法
import {selectionAllAdapter} from './adapter'

//右边浮层
const typeData = [
  {title: 'A'},
  {title: 'B'},
  {title: 'C'},
  {title: 'D'},
  {title: 'E'},
  {title: 'F'},
  {title: 'G'},
  {title: 'H'},
  {title: 'I'},
  {title: 'J'},
  {title: 'K'},
  {title: 'L'},
  {title: 'M'},
  {title: 'N'},
  {title: 'O'},
  {title: 'P'},
  {title: 'Q'},
  {title: 'R'},
  {title: 'S'},
  {title: 'T'},
  {title: 'W'},
  {title: 'X'},
  {title: 'Y'},
  {title: 'Z'},
]

Pager({
  data: {
    tabChoose: {
      $$id: 'tabChoose',
      data: typeData,
      listClass: 'hei-p100 bg-fff',
      showMenusStatus: true
    }
  },
  xsss: [],
  onReady: function() {
    const $tabChoose = this.getElementsById('tabChoose')
    $tabChoose.update(this.xsss)
    setTimeout(() => {
      wx.hideLoading()
    }, 1000);
  },
  onLoad: function() {
    this.xsss = selectionAllAdapter(typeData, getCarData)
    wx.showLoading({
      title: '加载中',
    })
  }
})


