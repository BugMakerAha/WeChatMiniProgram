Component({
  /**
   * 组件的属性列表
   */
  properties: {
    text: {
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    marqueePace: 1,
    marqueeDistance: 0,
    size: 13,
    orientation: 'left',
    interval: 20
  },

  /**
   * 组件的方法列表
   */
  methods: {
    _scrolling: function () {
      var _this = this;
      var timer = setInterval(() => {
        if (-_this.data.marqueeDistance < _this.data.length) {
          _this.setData({
            marqueeDistance: _this.data.marqueeDistance - _this.data.marqueePace
          })
        } else {
          clearInterval(timer);
          _this.setData({
            marqueeDistance: _this.data.windowWidth
          });
          _this._scrolling();
        }
      }, _this.data.interval);
    }
  },

  ready: function () {
    var _this = this;
    var length = _this.data.text.length * _this.data.size;
    
    var windowWidth = wx.getSystemInfoSync().windowWidth
    _this.setData({
      length: length,
      windowWidth: windowWidth
    });
    console.log(this.data.length);
    _this._scrolling();
  }
})