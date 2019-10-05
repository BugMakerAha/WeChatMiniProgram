// component/search.js
const app = getApp()
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
        statusBarHeight: (app.globalData.menutop)+'px',/**搜索框距离顶部的高度 */
      navBarHeight: (app.globalData.menutop + app.globalData.menuButtonRect[1]+3)+'px'/**胶囊高度，胶囊距状态栏高度，扩充高度3 */
    },
    /**
     * 组件的方法列表
     */
    methods: {

    }
})
