<!--
 * @Author: lgh
 * @Date: 2019-12-10 10:17:43
 * @LastEditTime : 2019-01-09 12:01:15
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /SAUI-component/README.md
 -->
# SAUI-component
SAUI-component 是一个开发库(小程序原生)，剥离自原项目aotoo-hub，基于小程序类似于jquery基于web，可以方便的融入到现有的小程序项目中  

小程序社区： https://developers.weixin.qq.com/community/personal/oCJUsw5wnFb2vQec1JMMsu-4edTs  
更多说明及demo代码片段  

SAUI-component 包含以下这些特性  

* 组件选取
* 嵌套结构
* 事件函数封装
* 钩子方法
* 支持数据过期机制    
* lru缓存机制  
* markdown支持
* html支持
* 方便扩展内置/外部插件 

> SAUI-component源码中有`.styl`类型的样式文件，使用stylus命令行编译

## 如何使用  
clone或下载本项目  
* 本项目本身是一个完整的小程序示例demo，引入小程序开发工具中即可直接打开  
* 或者导入下例核心文件及配置，可以融入到已有项目中  

### 源码目录
    components 
        ├─ aotoo 核心代码必须有 ✔︎
        ├─ ssPop  弹窗组件
        ├─ tabChoose  tab选择器
        │
       css  样式
        │
       pages  基础示例
        │
      app.json  注册全局组件
 

app.json中定义全局组件
 ```js
  "usingComponents": {
    "ui-item": "/components/aotoo/item/index",   // 基础item组件 ✔︎
    "ui-list": "/components/aotoo/list/index",   // 基础list组件 ✔︎
    "ui-tree": "/components/aotoo/tree/index",   // 基础tree组件 ✔︎
    "ui-tab-choose": "/components/tabChoose/index",
    "ui-ss-pop": "/components/ssPop/index"
  }
 ```

> 勾选文件必须有，属于核心文件，组件可以按照需求增减    


## DEMO小程序 

![主小程序](./images/saui.jpeg)

![组件演示小程序](./images/saui-zj.jpg)