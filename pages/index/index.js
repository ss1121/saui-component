//index.js
//获取应用实例
const Pager = require('../../components/aotoo/core/index.js')


Pager({
  data: {
    item: Pager.item({
      title: {
        title: '仿通讯录，汽车品牌选择',
        itemClass: 'article-title mb-20-r'
      },
      body: [
        {
          // img: {
          //   src: '/images/logo.png',
          //   itemClass: 'item-pic'
          // },
          title: {
            title: '通讯录',
            itemClass: 'item-title'
          },
          itemClass: 'item-li',
          url: '../address/index#itemClass=hei-p100'
        },
        {
          title: {
            title: '汽车品牌',
            itemClass: 'item-title'
          },
          itemClass: 'item-li',
          url: '../car/index#itemClass=hei-p100'
        },
      ],
      dot: [{
        title: [
          {
            title: '如需了解更多，请点击或搜索'
          },
          {
            title: 'SAUI',
            itemClass: 'fw-bold'
          }
        ],
        titleClass: 'btn-primary',
        tap: 'onModal'
      }],
      itemClass: 'padding-normal'
    }),
    modal: Pager.item({})
  },
  onModal: function(e, params, inst){
    wx.navigateToMiniProgram({
      appId: 'wx6dfd3ea360d61f4d',//小程序appid
      path: 'pages/index/index',//跳转关联小程序app.json配置里面的地址
     //**重点**要打开的小程序版本，有效值 develop（开发版），trial（体验版），release（正式版） 
      envVersion: 'release',
      success(res) {
        console.log(res)
        // 打开成功
      }
    })
  },
  previewImage: function(e, param) {
    const $modal = this.getElementsById('modal')
    var url = param.src;
    wx.saveImageToPhotosAlbum({
      filePath:url,
      success(res) { 
        wx.showToast({
            title: '图片保存成功',
            icon: 'none',
            duration: 2000
        })
        $modal.onHide()
      },
      fail(res){
        console.log('fail', res);
      }
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
