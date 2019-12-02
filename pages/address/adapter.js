//单个更新，适用于数据过大
const selectionAdapter = (data) => {
  let output = []
  data.map( (item, ii) => {
    output.push({
      img: {
        src: item.logo,
        itemClass: 'pic-60-r'
      },
      title: {
        title: item.cname,
        itemClass:  + data.length != ii + 1 ? 'color-active size14 lhei-60-r ml-40-r ptb-20-r flex-1 bb-default' : 'color-active size14 lhei-60-r ml-40-r ptb-20-r flex-1 '
      },
      itemClass: 'flex-row-start-center ss-focus plr-default-r',
    })
  })
  return output
}

//全部更新
const selectionAllAdapter = (data, data2) => {
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
          itemClass: 'color-primary ss-sticky bg-bg plr-default-r'
        },
        li: selectionAdapter(kk),
        // liClass: 'pl-default-r'
      })
    }
  })
  return output
}

module.exports = {
  selectionAdapter,
  selectionAllAdapter,
}