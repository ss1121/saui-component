let downloadFile = wx.downloadFile
function saveImageToLocalCache(poi, imgsrc, imgsCache) {
  return new Promise((resolve, reject) => {
    let config = {
      fileID: imgsrc, // wx.cloud.downloadFile
      url: imgsrc,  // wx.downloadFile
      fail(err) {
        console.log(err);
      },
      success: function (res) {
        if (res.statusCode === 200) {
          wx.saveFile({
            tempFilePath: res.tempFilePath, // 传入一个临时文件路径
            success(res) {
              let imgObj = {
                ori: imgsrc,
                target: res.savedFilePath
              }
              imgsCache.setItem(poi, imgObj)
              resolve(imgObj)
            }
          })
        }
      }
    }

    if (imgsrc.indexOf('cloud://')===0) {
      downloadFile = wx.isCloud ? wx.cloud.downloadFile : ()=>{}
    }

    downloadFile(config)
  })
}

//单个更新，适用于数据过大
const selectionAdapter = (data, imgsCache) => {
  let output = []
  data.map( (item, ii) => {
    let localCacheImg = imgsCache.getItem(item.id)
    if (localCacheImg) {
      if (item.logo === localCacheImg.ori) {
        item.logo = localCacheImg.target
      } else {
        imgsCache.delete(item.id)
        saveImageToLocalCache(item.id, item.logo, imgsCache)
      }
    }
    else {
      saveImageToLocalCache(item.id, item.logo, imgsCache) // 缓存图片到本地
    }
    
    output.push({
      img: {
        src: item.logo,
        itemClass: 'pic-80-r'
      },
      title: {
        title: item.cname,
        itemClass: 'color-active size18 lhei-60-r ml-40-r'
      },
      itemClass: 'ptb-20-r bb-default flex-row-start-center',
    })
  })
  return output
}

//全部更新
const selectionAllAdapter = (data, data2, imgsCache) => {
  let output = []
  data.map(item => {
    const kk = data2.filter(itemx => {
      if (itemx.cfrl == item.title) {
        return itemx
      }
    })
    if (kk.length > 0) {
      output.push({
        title: {
          title: item.title,
          itemClass: 'color-primary ss-block ss-sticky ptb-20-r bg-fff ml-20-r'
        },
        li: selectionAdapter(kk, imgsCache),
        liClass: 'pl-default-r'
      })
    }
  })
  return output
}

module.exports = {
  selectionAdapter,
  selectionAllAdapter,
}