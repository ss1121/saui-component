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
            title: '如需了解更多，请搜索'
          },
          {
            title: 'SAUI',
            itemClass: 'fw-bold'
          }
        ],
        titleClass: 'btn-primary flex-row'
      }],
      itemClass: 'padding-normal'
    })
  }
})
