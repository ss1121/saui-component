/**
 * 作者： 天天修改
 * github: webkixi
 * 小程序的模板真是又长又臭
 */
const app = null //getApp()
const Core = require('../aotoo/core/index')
const lib = Core.lib

function adapterDataStructure(data) {
  let _menus = []
  let _contents = []
  if ( lib.isArray(data)){
    data.map( item => {
      const title = item.title.title || item.title
      _menus.push({
        title: title,
        $$id: title,
        id: title,    //为了scroll-into-view
        aim: 'onClickCityMenu?id='+title
      })
      _contents.push({
        title: item.title.title ? item.title : ' ',
        li: item.li || '',
        id: title,
        liClass: item.liClass || ''
      })
    })
  }
  return {_menus, _contents}
}

function chooseParse(source ={}) {
  const data = source.data
  const dt = adapterDataStructure(data)
  const menus = {
    $$id: lib.suid('mytabchoosemenus_'),
    data: dt._menus,
    listClass: 'selectionMenus pt-20-r',
    itemClass: 'size10'
  }
  const contents = {
    $$id: lib.suid('chooseContent_'),       //为了支持同一个页面，调用多次的问题
    data: dt._contents,
    type: {
      is: 'scroll',
      'scroll-y': true,
      'scroll-into-view': 'scorllLocaltion',
      'bindscroll': 'onScroll',
    },
    listClass: 'size16 hei-p100 selection-scroll',
    itemClass: 'xxss'
  }
  const lettertip = {
    $$id: lib.suid('mytabchoosetip_'),
  }
  source['show'] = source.hasOwnProperty('show') ? source.show : true
  return {menus, contents, lettertip, source}
}

/**
 * data: [
 *  {title: 'tabName', content: 'some content'},
 *  {title: 'tabName', content: 'some content'},
 *  {title: 'tabName', content: 'some content'},
 *  {title: 'tabName', content: 'some content'},
 * ],
 * $$id: 'some id',
 * select: 0,
 * multipy: false,
 * singleView: false,
 * show: true
 */

// 基于item的组件
Component({
  options: {
    multipleSlots: true, // 在组件定义时的选项中启用多slot支持
    addGlobalClass: true
  },
  properties: {
    source: Object,
  },
  data: {
    $source: {},
    $lettertip: {}
  },
  behaviors: [Core.treeComponentBehavior(app, 'choose')],
  lifetimes: {
    created: function(){
      this.saveMenusIds = []          //存储当前的id,及上一个id
      this.uMenusStatus = false      //判断是否能进入滚动时更新menus
      this.stopUMenusStatus = false     //二次判断是否已存在当前属性，存在就禁止再更新menus
      this.isClickMenus = false     //点击右侧栏目时 不触发滚动切换的事件

      this.storeClientRectAll = []

      this.menusId = ''     //getElementsById 为了防止一个页面调用多次，从而分辨交互的属于
      this.contentId = ''     //getElementsById
      this.lettertipId = ''     //getElementsById

      this.menusEd = false    //单个更新时，menus是否也要更新？？ 目前是只更新一次

      wx.clearStorageSync('topVals')
    },
    attached: function() { //节点树完成，可以用setData渲染节点，但无法操作节点
      let properties = this.properties
      let dataSource = properties.source 
      const {menus, contents, lettertip} = chooseParse(dataSource)
      this.menusId = menus.$$id
      this.contentId = contents.$$id
      this.lettertipId = lettertip.$$id
      this.setData({
        $source: dataSource,
        $menus: menus,
        $contents: contents,
        $lettertip: lettertip
      })
    },
    ready: function() {
      const ds = this.data.$source
      this.mount((ds.$$id || ds.id || ''))
    }
  },
  methods: {
    __ready: function(){
      setTimeout(() => {
        this.onScrollIng('A')
      }, 50);
    },
    reset: function(params){
      params = params ? params : [] 
      const {menus, contents, lettertip} = chooseParse.call(this, params)
      this.setData({
        $source: params,
        $menus: menus,
        $contents: contents,
        $lettertip: lettertip
      })
      return this
    },
    update: function(params, callback) {
      const {menus, contents, lettertip} = chooseParse.call(this, {data: params})
      this.setData({
        // $source: {data: params},
        $menus: menus,
        $contents: contents,
        // $lettertip: lettertip
      })
      this.updateSelectorQuery()
      return this
    },
    updateItems: function(params, callback) {
      const {data, id} = params
      const {_contents} = adapterDataStructure(data)
      this.setData({
        [`$contents.data[${id}]`]: _contents[0]
      })
      this.updateSelectorQuery()
      return this
    },
    updateSelectorQuery: function() {
      const query = wx.createSelectorQuery().in(this)      //获取节点需要的
      let getTops = []
      //注意：获取节点信息 一定要在wxml开始查找 select的id或class一定要已经存在
      query.selectAll('.tab-choose >>> .xxss').boundingClientRect()
      query.exec(res=>{
        this.storeClientRectAll = res[0]
      })
      // setTimeout(() => {
      //   //注意：this.getSystemHeight = wx.getSystemInfoSync().windowHeight  但是windowHeight获取不到？？？
      //   this.getSystemHeight = wx.getSystemInfoSync().screenHeight - wx.getSystemInfoSync().batteryLevel - wx.getSystemInfoSync().statusBarHeight
      // }, 50);
    },
    onScroll: function(e, param) {
      //滚动时触发 fixed菜单的切换  这里快速滚动还是有问题
      const scrollTop = e.detail.scrollTop + e.currentTarget.offsetTop
      if (!this.isClickMenus) {
        this.storeClientRectAll.map((item, ii) => {
          //以下的判断 为了防止滚动时，也一直更新$clickcitymenu
          if (scrollTop > item.top) {
            this.saveMenusIds.length > 1 ? this.saveMenusIds = this.saveMenusIds.splice(1) : this.saveMenusIds
            this.saveMenusIds.push(item.id)
            this.uMenusStatus = true
          }
        })
        if (this.uMenusStatus) {
          if (this.stopUMenusStatus) {
            this.saveMenusIds = this.saveMenusIds.length > 1 ? this.saveMenusIds[1].split(' ') : this.saveMenusIds[0].split(' ')
            this.onScrollIng(this.saveMenusIds[0] || this.saveMenusIds, 'scroll')
            this.stopUMenusStatus = false
          }
          else {
            if (this.saveMenusIds[0] != this.saveMenusIds[1]){
              this.stopUMenusStatus = true
            }
          }
        }
        
      }
      this.isClickMenus = false
    },
    onScrollIng: function(id, type, inst) {
      if (this.data.$source.showMenusStatus) {
        // const inst = inst || this.activePage.getElementsById(id)
        const inst = this.activePage.getElementsById(this.menusId)
        const instData = inst.data.$list.data
        let cls = ['active']
        instData.map( item => {
          let itCls = item.itemClass.split(' ')
          let _cls = itCls.filter(c => cls.indexOf(c) === -1)
          item.itemClass = _cls.join(' ')
          if(item.title == id){
            item.itemClass += ' active'
          }
          return item
        })
        inst.setData({
          '$list.data': instData
        })
        if (type == 'scroll'){
          this.uMenusStatus = false
        }
      }
    },
    onClickCityMenu: function (e, param, inst) {
      const $content = this.activePage.getElementsById(this.contentId)
      const $letterToast = this.activePage.getElementsById(this.lettertipId)
      let letter = param['id']
      this.saveMenusIds.length > 1 ? this.saveMenusIds = this.saveMenusIds.splice(1) : this.saveMenusIds
      this.hooks.emit('updateContent', {id: letter})
      this.isClickMenus = true
      $content.setData({
        '$list.type.scroll-into-view': letter,
      })
      $letterToast.lettertipx({
        title: {
          title: letter,
          itemClass: 'item-circle-solid'
        },
        itemClass: 'popups-wrap-trans'
      })
      this.onScrollIng(letter, '', inst)
      this.saveMenusIds.push(letter)
    }
  }
}) 