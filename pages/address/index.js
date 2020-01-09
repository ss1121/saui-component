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
  },
  onShareAppMessage: function () {
    /**
    * 用户点击右上角分享
    */
    let title=this.data.show.name;
    let path=app.getNowPage();
    return {
      title: title,  // 转发标题（默认：当前小程序名称）
      path: path, // 转发路径（当前页面 path ），必须是以 / 开头的完整路径
      success(e) {
        // shareAppMessage: ok,
        // shareTickets 数组，每一项是一个 shareTicket ，对应一个转发对象
        // 需要在页面onLoad()事件中实现接口
        console.log('分享成功');
        wx.showShareMenu({
            // 要求小程序返回分享目标信息
            withShareTicket: true
        });
        var shareTickets = e.shareTickets;
        if (shareTickets.length == 0) {
          return false;
        }
        wx.getShareInfo({
          shareTicket: shareTickets[0],
          success: function(res){
            console.log('立即分享获得信息',res);
            var encryptedData = res.encryptedData;
            var iv = res.iv;
          }
        })
      },
      fail(e) {
        console.log('分享失败');
      }
    }
  }
})


