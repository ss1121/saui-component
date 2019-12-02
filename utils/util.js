const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const onMenus = (inst, paramVal, judgeDirect, itemClass) => {
  inst.siblings().removeClass('active')
  judgeDirect.push(paramVal)
  inst.addClass(judgeDirect.length > 1 ? judgeDirect[0] > judgeDirect[1] ? ' f-right active' : ' active' : ' active')
}


module.exports = {
  formatTime: formatTime,
  onMenus: onMenus
}
