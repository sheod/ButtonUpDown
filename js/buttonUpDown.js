var buttonUpDown =
webpackJsonp_name_([0,2],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _ButtonUpDown = __webpack_require__(1);
	
	var _ButtonUpDown2 = _interopRequireDefault(_ButtonUpDown);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	new _ButtonUpDown2.default({
	    canvasStyle: {
	        radius: 30,
	        top: '20%',
	        side: 'right',
	        indent: '10px'
	    },
	    toggleVisibilityPoint: 600,
	    color: 'rgb(96, 150, 219)',
	    barOpacity: 0.8,
	    barOpacityTimeAnimation: 0.3,
	    imgSrc: './img/up-arrow-icon-top-small.png',
	    animationTime: 0.2
	});
	
	new _ButtonUpDown2.default({
	    canvasStyle: {
	        radius: 20,
	        top: '50%',
	        side: 'left',
	        indent: '20px'
	    },
	    toggleVisibilityPoint: 1000,
	    color: 'rgb(96, 150, 219)',
	    barOpacity: 0.6,
	    barOpacityTimeAnimation: 0.3,
	    imgSrc: './img/up-arrow-icon-top-small.png',
	    animationTime: 0.3
	});
	
	exports.ButtonUpDown = _ButtonUpDown2.default; //выгрузка во внешнюю переменную

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var ButtonUpDown = function () {
	    function ButtonUpDown(props) {
	        _classCallCheck(this, ButtonUpDown);
	
	        this.props = props;
	        this.radianDelta = 180 / this.props.animationTime * Math.PI / 180 * 0.0167;
	        this.radian = 0;
	        this.elemOpacitySpeedAnimation = this.props.barOpacity / this.props.barOpacityTimeAnimation * 0.0167;
	        window.addEventListener('load', this.__render());
	    }
	
	    _createClass(ButtonUpDown, [{
	        key: '__render',
	        value: function __render() {
	            this.__createCanvas();
	            window.addEventListener('scroll', this.__toggleVisibility());
	        }
	    }, {
	        key: '__canvasDraw',
	        value: function __canvasDraw() {
	            this.ctx.beginPath();
	            this.ctx.arc(this.props.canvasStyle.radius, this.props.canvasStyle.radius, this.props.canvasStyle.radius, 0, 2 * Math.PI, true);
	            this.ctx.fillStyle = this.props.color;
	            this.ctx.fill();
	            this.ctx.drawImage(this.img, 0, 0, this.img.width, this.img.height, 0, 0, this.canvas.width, this.canvas.height);
	            this.ctx.closePath();
	        }
	    }, {
	        key: '__canvasStyle',
	        value: function __canvasStyle() {
	            this.canvas.width = this.props.canvasStyle.radius * 2;
	            this.canvas.height = this.props.canvasStyle.radius * 2;
	            this.canvas.style.position = 'fixed';
	            this.canvas.style.top = this.props.canvasStyle.top;
	            this.canvas.style[this.props.canvasStyle.side] = this.props.canvasStyle.indent;
	            this.canvas.style.opacity = 0;
	        }
	    }, {
	        key: '__createCanvas',
	        value: function __createCanvas() {
	            var _this = this;
	
	            this.img = document.createElement('img');
	            this.img.src = this.props.imgSrc;
	            this.canvas = document.createElement('canvas');
	            this.ctx = this.canvas.getContext("2d");
	            this.canvas.scroll = false;
	            this.canvas.pagePosition = '';
	
	            var loadImg = function loadImg() {
	                document.body.appendChild(_this.canvas);
	                _this.__canvasDraw();
	            };
	
	            if (this.img.complete) {
	                loadImg();
	            } else {
	                this.img.onload = loadImg;
	            }
	
	            this.__canvasStyle();
	            this.canvas.addEventListener('click', this.__togglePosition.bind(this));
	        }
	    }, {
	        key: '__toggleVisibilityAnimation',
	        value: function __toggleVisibilityAnimation(show) {
	            var _this2 = this;
	
	            var animation = function animation() {
	
	                if (_this2.canvas.style.opacity <= _this2.props.barOpacity && _this2.canvas.style.opacity >= 0) {
	                    if (show.value === true) {
	                        _this2.canvas.style.opacity = +_this2.canvas.style.opacity + _this2.elemOpacitySpeedAnimation;
	                    } else if (show.value === false) {
	                        _this2.canvas.style.opacity -= _this2.elemOpacitySpeedAnimation;
	                    }
	
	                    if (_this2.canvas.style.opacity > _this2.props.barOpacity) {
	                        _this2.canvas.style.opacity = _this2.props.barOpacity;
	                        return;
	                    }
	                    if (_this2.canvas.style.opacity < 0) {
	                        _this2.canvas.style.opacity = 0;
	                        return;
	                    }
	                }
	                requestAnimationFrame(animation);
	            };
	            return animation();
	        }
	    }, {
	        key: '__toggleVisibility',
	        value: function __toggleVisibility() {
	            var _this3 = this;
	
	            var pageYOffset = void 0;
	            var show = {};
	
	            return function () {
	                if (_this3.canvas.scroll === false) {
	
	                    pageYOffset = window.pageYOffset;
	                    switch (_this3.canvas.pagePosition) {
	
	                        case '':
	                            if (pageYOffset > _this3.props.toggleVisibilityPoint) {
	                                _this3.canvas.pagePosition = 'top';
	                                show.value = true;
	                                _this3.__toggleVisibilityAnimation(show);
	                            }
	                            break;
	
	                        case 'top':
	                            if (pageYOffset < _this3.props.toggleVisibilityPoint) {
	                                _this3.canvas.pagePosition = '';
	                                show.value = false;
	                                _this3.__toggleVisibilityAnimation(show);
	                            }
	                            break;
	
	                        case 'bottom':
	                            if (pageYOffset > _this3.props.toggleVisibilityPoint) {
	                                var _ret = function () {
	                                    _this3.canvas.pagePosition = 'top';
	                                    var animation = function animation() {
	                                        if (_this3.radian < 3.15 - _this3.radianDelta) {
	                                            _this3.radian += _this3.radianDelta;
	                                            _this3.__rotate(1);
	                                            requestAnimationFrame(animation);
	                                        }
	                                    };
	                                    _this3.radian = 0;
	                                    return {
	                                        v: animation()
	                                    };
	                                }();
	
	                                if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
	                            }
	                            break;
	                    }
	                }
	            };
	        }
	    }, {
	        key: '__togglePosition',
	        value: function __togglePosition() {
	            if (this.canvas.scroll === false) {
	                this.canvas.scroll = true;
	
	                switch (this.canvas.pagePosition) {
	                    case '':
	                        this.canvas.scroll = false;
	                        break;
	
	                    case 'top':
	                        this.canvas.whereReturn = window.pageYOffset;
	                        this.__togglePositionAnimation(0, 'bottom', -1);
	                        break;
	
	                    case 'bottom':
	                        this.__togglePositionAnimation(0, 'top', 1);
	                        break;
	                }
	            }
	        }
	    }, {
	        key: '__togglePositionAnimation',
	        value: function __togglePositionAnimation(scrollSpeed, togglePosition, direction) {
	            var _this4 = this;
	
	            var pageYOffset = window.pageYOffset;
	            var path = void 0;
	            //Formula for animation of speed | START
	            if (pageYOffset >= 0 && togglePosition === 'bottom') {
	                path = this.canvas.whereReturn / 2;
	            } else {
	                path = (this.canvas.whereReturn - window.pageYOffset) / 2;
	            }
	            var animationTime = this.props.animationTime / 0.016 * 2;
	            var accelerationTime = animationTime / 2;
	            var decelerationTime = animationTime / 2;
	            var acceleration = path * 2 / (accelerationTime * accelerationTime);
	            var speed = acceleration * accelerationTime;
	
	            var deceleration = (path - speed * decelerationTime) * 2 / (decelerationTime * decelerationTime);
	            //Formula for animation of speed | END
	            var temp = false;
	            var goAnimation = function goAnimation() {
	
	                if (pageYOffset > 0 && togglePosition === 'bottom' || pageYOffset < _this4.canvas.whereReturn && togglePosition === 'top') {
	                    if (scrollSpeed <= speed && temp === false) {
	                        scrollSpeed += acceleration;
	                    } else {
	                        temp = true;
	                        scrollSpeed += deceleration;
	                    }
	                    pageYOffset = pageYOffset + direction * scrollSpeed;
	                    window.scrollTo(0, pageYOffset);
	
	                    _this4.canvas.pagePosition = togglePosition;
	                    if (_this4.radian < 3.15 - _this4.radianDelta) {
	                        _this4.radian += _this4.radianDelta;
	                        _this4.__rotate(direction);
	                    }
	                    requestAnimationFrame(goAnimation);
	                } else {
	                    _this4.canvas.scroll = false;
	                }
	            };
	            this.radian = 0;
	            return goAnimation();
	        }
	    }, {
	        key: '__rotate',
	        value: function __rotate(direction) {
	            var _this5 = this;
	
	            var animation = function animation() {
	                _this5.ctx.clearRect(0, 0, _this5.props.canvasStyle.radius * 2, _this5.props.canvasStyle.radius * 2);
	                _this5.ctx.translate(_this5.props.canvasStyle.radius, _this5.props.canvasStyle.radius);
	                _this5.ctx.rotate(-1 * direction * 180 / _this5.props.animationTime * Math.PI / 180 * 0.0167);
	                _this5.ctx.translate(-_this5.props.canvasStyle.radius, -_this5.props.canvasStyle.radius);
	                _this5.__canvasDraw();
	            };
	            return animation();
	        }
	    }]);
	
	    return ButtonUpDown;
	}();
	
	exports.default = ButtonUpDown;

/***/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9idXR0b25VcERvd24vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vYnV0dG9uVXBEb3duL0J1dHRvblVwRG93bi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBOztBQUVBOzs7Ozs7QUFFQSw0QkFBaUI7QUFDVCxrQkFBYTtBQUNULGlCQUFRLEVBREM7QUFFVCxjQUFLLEtBRkk7QUFHVCxlQUFNLE9BSEc7QUFJVCxpQkFBUTtBQUpDLE1BREo7QUFPVCw0QkFBdUIsR0FQZDtBQVFULFlBQU8sbUJBUkU7QUFTVCxpQkFBWSxHQVRIO0FBVVQsOEJBQXlCLEdBVmhCO0FBV1QsYUFBUyxtQ0FYQTtBQVlULG9CQUFlO0FBWk4sRUFBakI7O0FBaUJBLDRCQUFpQjtBQUNULGtCQUFhO0FBQ1QsaUJBQVEsRUFEQztBQUVULGNBQUssS0FGSTtBQUdULGVBQU0sTUFIRztBQUlULGlCQUFRO0FBSkMsTUFESjtBQU9ULDRCQUF1QixJQVBkO0FBUVQsWUFBTyxtQkFSRTtBQVNULGlCQUFZLEdBVEg7QUFVVCw4QkFBeUIsR0FWaEI7QUFXVCxhQUFTLG1DQVhBO0FBWVQsb0JBQWU7QUFaTixFQUFqQjs7QUFrQkEsU0FBUSxZQUFSLDBCOzs7Ozs7QUN2Q0E7Ozs7Ozs7Ozs7OztLQUVzQixZO0FBQ2xCLDJCQUFZLEtBQVosRUFBbUI7QUFBQTs7QUFDZixjQUFLLEtBQUwsR0FBYSxLQUFiO0FBQ0EsY0FBSyxXQUFMLEdBQW1CLE1BQU0sS0FBSyxLQUFMLENBQVcsYUFBakIsR0FBaUMsS0FBSyxFQUF0QyxHQUEyQyxHQUEzQyxHQUFpRCxNQUFwRTtBQUNBLGNBQUssTUFBTCxHQUFjLENBQWQ7QUFDQSxjQUFLLHlCQUFMLEdBQWtDLEtBQUssS0FBTCxDQUFXLFVBQVgsR0FBd0IsS0FBSyxLQUFMLENBQVcsdUJBQXBDLEdBQStELE1BQWhHO0FBQ0EsZ0JBQU8sZ0JBQVAsQ0FBd0IsTUFBeEIsRUFBZ0MsS0FBSyxRQUFMLEVBQWhDO0FBQ0g7Ozs7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V0FBWCxDQUF1QixNQUEzRTtBQUNBLHdCQUFLLFlBQUw7QUFDSCxjQU5EO0FBT0Esb0JBQU8sV0FBUDtBQUNIOzs7Ozs7bUJBL01pQixZIiwiZmlsZSI6ImJ1dHRvblVwRG93bi5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IEJ1dHRvblVwRG93biBmcm9tICcuL0J1dHRvblVwRG93bidcblxubmV3IEJ1dHRvblVwRG93bih7XG4gICAgICAgIGNhbnZhc1N0eWxlOiB7XG4gICAgICAgICAgICByYWRpdXM6IDMwLFxuICAgICAgICAgICAgdG9wOiAnMjAlJyxcbiAgICAgICAgICAgIHNpZGU6ICdyaWdodCcsXG4gICAgICAgICAgICBpbmRlbnQ6ICcxMHB4J1xuICAgICAgICB9LFxuICAgICAgICB0b2dnbGVWaXNpYmlsaXR5UG9pbnQ6IDYwMCxcbiAgICAgICAgY29sb3I6ICdyZ2IoOTYsIDE1MCwgMjE5KScsXG4gICAgICAgIGJhck9wYWNpdHk6IDAuOCxcbiAgICAgICAgYmFyT3BhY2l0eVRpbWVBbmltYXRpb246IDAuMyxcbiAgICAgICAgaW1nU3JjIDogJy4vaW1nL3VwLWFycm93LWljb24tdG9wLXNtYWxsLnBuZycsXG4gICAgICAgIGFuaW1hdGlvblRpbWU6IDAuMlxuICAgIH1cbik7XG5cblxubmV3IEJ1dHRvblVwRG93bih7XG4gICAgICAgIGNhbnZhc1N0eWxlOiB7XG4gICAgICAgICAgICByYWRpdXM6IDIwLFxuICAgICAgICAgICAgdG9wOiAnNTAlJyxcbiAgICAgICAgICAgIHNpZGU6ICdsZWZ0JyxcbiAgICAgICAgICAgIGluZGVudDogJzIwcHgnXG4gICAgICAgIH0sXG4gICAgICAgIHRvZ2dsZVZpc2liaWxpdHlQb2ludDogMTAwMCxcbiAgICAgICAgY29sb3I6ICdyZ2IoOTYsIDE1MCwgMjE5KScsXG4gICAgICAgIGJhck9wYWNpdHk6IDAuNixcbiAgICAgICAgYmFyT3BhY2l0eVRpbWVBbmltYXRpb246IDAuMyxcbiAgICAgICAgaW1nU3JjIDogJy4vaW1nL3VwLWFycm93LWljb24tdG9wLXNtYWxsLnBuZycsXG4gICAgICAgIGFuaW1hdGlvblRpbWU6IDAuM1xuICAgIH1cbik7XG5cblxuXG5leHBvcnRzLkJ1dHRvblVwRG93biA9IEJ1dHRvblVwRG93biAvL9Cy0YvQs9GA0YPQt9C60LAg0LLQviDQstC90LXRiNC90Y7RjiDQv9C10YDQtdC80LXQvdC90YPRjlxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9idXR0b25VcERvd24vaW5kZXguanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyAgQnV0dG9uVXBEb3duIHtcclxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICAgICAgdGhpcy5wcm9wcyA9IHByb3BzO1xyXG4gICAgICAgIHRoaXMucmFkaWFuRGVsdGEgPSAxODAgLyB0aGlzLnByb3BzLmFuaW1hdGlvblRpbWUgKiBNYXRoLlBJIC8gMTgwICogMC4wMTY3O1xyXG4gICAgICAgIHRoaXMucmFkaWFuID0gMDtcclxuICAgICAgICB0aGlzLmVsZW1PcGFjaXR5U3BlZWRBbmltYXRpb24gPSAodGhpcy5wcm9wcy5iYXJPcGFjaXR5IC8gdGhpcy5wcm9wcy5iYXJPcGFjaXR5VGltZUFuaW1hdGlvbikgKiAwLjAxNjc7XHJcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCB0aGlzLl9fcmVuZGVyKCkpXHJcbiAgICB9XHJcblxyXG4gICAgX19yZW5kZXIoKSB7XHJcbiAgICAgICAgdGhpcy5fX2NyZWF0ZUNhbnZhcygpO1xyXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzLl9fdG9nZ2xlVmlzaWJpbGl0eSgpKTtcclxuICAgIH1cclxuXHJcbiAgICBfX2NhbnZhc0RyYXcoKSB7XHJcbiAgICAgICAgdGhpcy5jdHguYmVnaW5QYXRoKCk7XHJcbiAgICAgICAgdGhpcy5jdHguYXJjKHRoaXMucHJvcHMuY2FudmFzU3R5bGUucmFkaXVzLCB0aGlzLnByb3BzLmNhbnZhc1N0eWxlLnJhZGl1cywgdGhpcy5wcm9wcy5jYW52YXNTdHlsZS5yYWRpdXMsIDAsIDIgKiBNYXRoLlBJLCB0cnVlKTtcclxuICAgICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSB0aGlzLnByb3BzLmNvbG9yO1xyXG4gICAgICAgIHRoaXMuY3R4LmZpbGwoKTtcclxuICAgICAgICB0aGlzLmN0eC5kcmF3SW1hZ2UodGhpcy5pbWcsIDAsIDAsIHRoaXMuaW1nLndpZHRoLCB0aGlzLmltZy5oZWlnaHQsIDAsIDAsIHRoaXMuY2FudmFzLndpZHRoLCB0aGlzLmNhbnZhcy5oZWlnaHQpO1xyXG4gICAgICAgIHRoaXMuY3R4LmNsb3NlUGF0aCgpO1xyXG4gICAgfVxyXG5cclxuICAgIF9fY2FudmFzU3R5bGUoKSB7XHJcbiAgICAgICAgdGhpcy5jYW52YXMud2lkdGggPSB0aGlzLnByb3BzLmNhbnZhc1N0eWxlLnJhZGl1cyAqIDI7XHJcbiAgICAgICAgdGhpcy5jYW52YXMuaGVpZ2h0ID0gdGhpcy5wcm9wcy5jYW52YXNTdHlsZS5yYWRpdXMgKiAyO1xyXG4gICAgICAgIHRoaXMuY2FudmFzLnN0eWxlLnBvc2l0aW9uID0gJ2ZpeGVkJztcclxuICAgICAgICB0aGlzLmNhbnZhcy5zdHlsZS50b3AgPSB0aGlzLnByb3BzLmNhbnZhc1N0eWxlLnRvcDtcclxuICAgICAgICB0aGlzLmNhbnZhcy5zdHlsZVt0aGlzLnByb3BzLmNhbnZhc1N0eWxlLnNpZGVdID0gdGhpcy5wcm9wcy5jYW52YXNTdHlsZS5pbmRlbnQ7XHJcbiAgICAgICAgdGhpcy5jYW52YXMuc3R5bGUub3BhY2l0eSA9IDBcclxuICAgIH1cclxuXHJcbiAgICBfX2NyZWF0ZUNhbnZhcygpIHtcclxuICAgICAgICB0aGlzLmltZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xyXG4gICAgICAgIHRoaXMuaW1nLnNyYyA9IHRoaXMucHJvcHMuaW1nU3JjO1xyXG4gICAgICAgIHRoaXMuY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XHJcbiAgICAgICAgdGhpcy5jdHggPSB0aGlzLmNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XHJcbiAgICAgICAgdGhpcy5jYW52YXMuc2Nyb2xsID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5jYW52YXMucGFnZVBvc2l0aW9uID0gJyc7XHJcblxyXG4gICAgICAgIGxldCBsb2FkSW1nID0gKCkgPT4ge1xyXG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRoaXMuY2FudmFzKTtcclxuICAgICAgICAgICAgdGhpcy5fX2NhbnZhc0RyYXcoKVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGlmKHRoaXMuaW1nLmNvbXBsZXRlKSB7XHJcbiAgICAgICAgICAgIGxvYWRJbWcoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuaW1nLm9ubG9hZCA9IGxvYWRJbWc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9fY2FudmFzU3R5bGUoKVxyXG4gICAgICAgIHRoaXMuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5fX3RvZ2dsZVBvc2l0aW9uLmJpbmQodGhpcykpXHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICBfX3RvZ2dsZVZpc2liaWxpdHlBbmltYXRpb24oc2hvdykge1xyXG4gICAgICAgIGxldCBhbmltYXRpb24gPSAoKSA9PiB7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5jYW52YXMuc3R5bGUub3BhY2l0eSA8PSB0aGlzLnByb3BzLmJhck9wYWNpdHkgJiYgdGhpcy5jYW52YXMuc3R5bGUub3BhY2l0eSA+PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoc2hvdy52YWx1ZSA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2FudmFzLnN0eWxlLm9wYWNpdHkgPSArdGhpcy5jYW52YXMuc3R5bGUub3BhY2l0eSArIHRoaXMuZWxlbU9wYWNpdHlTcGVlZEFuaW1hdGlvblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoc2hvdy52YWx1ZSA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNhbnZhcy5zdHlsZS5vcGFjaXR5IC09IHRoaXMuZWxlbU9wYWNpdHlTcGVlZEFuaW1hdGlvblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmNhbnZhcy5zdHlsZS5vcGFjaXR5ID4gdGhpcy5wcm9wcy5iYXJPcGFjaXR5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jYW52YXMuc3R5bGUub3BhY2l0eSA9IHRoaXMucHJvcHMuYmFyT3BhY2l0eTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmNhbnZhcy5zdHlsZS5vcGFjaXR5IDwgMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2FudmFzLnN0eWxlLm9wYWNpdHkgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShhbmltYXRpb24pXHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXR1cm4gYW5pbWF0aW9uKClcclxuXHJcbiAgICB9XHJcblxyXG4gICAgX190b2dnbGVWaXNpYmlsaXR5KCkge1xyXG4gICAgICAgIGxldCBwYWdlWU9mZnNldDtcclxuICAgICAgICBsZXQgc2hvdyA9IHt9O1xyXG5cclxuICAgICAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5jYW52YXMuc2Nyb2xsID09PSBmYWxzZSkge1xyXG5cclxuICAgICAgICAgICAgICAgIHBhZ2VZT2Zmc2V0ID0gd2luZG93LnBhZ2VZT2Zmc2V0O1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoICh0aGlzLmNhbnZhcy5wYWdlUG9zaXRpb24pIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAoJycpOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocGFnZVlPZmZzZXQgPiB0aGlzLnByb3BzLnRvZ2dsZVZpc2liaWxpdHlQb2ludCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jYW52YXMucGFnZVBvc2l0aW9uID0gJ3RvcCc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaG93LnZhbHVlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX190b2dnbGVWaXNpYmlsaXR5QW5pbWF0aW9uKHNob3cpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgKCd0b3AnKTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBhZ2VZT2Zmc2V0IDwgdGhpcy5wcm9wcy50b2dnbGVWaXNpYmlsaXR5UG9pbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2FudmFzLnBhZ2VQb3NpdGlvbiA9ICcnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hvdy52YWx1ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fX3RvZ2dsZVZpc2liaWxpdHlBbmltYXRpb24oc2hvdylcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAoJ2JvdHRvbScpOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocGFnZVlPZmZzZXQgPiB0aGlzLnByb3BzLnRvZ2dsZVZpc2liaWxpdHlQb2ludCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jYW52YXMucGFnZVBvc2l0aW9uID0gJ3RvcCc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgYW5pbWF0aW9uID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnJhZGlhbiA8IDMuMTUgLSB0aGlzLnJhZGlhbkRlbHRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmFkaWFuICs9IHRoaXMucmFkaWFuRGVsdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX19yb3RhdGUoMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShhbmltYXRpb24pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmFkaWFuID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBhbmltYXRpb24oKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBfX3RvZ2dsZVBvc2l0aW9uKCkgIHtcclxuICAgICAgICBpZiAodGhpcy5jYW52YXMuc2Nyb2xsID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICB0aGlzLmNhbnZhcy5zY3JvbGwgPSB0cnVlO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgc3dpdGNoICh0aGlzLmNhbnZhcy5wYWdlUG9zaXRpb24pIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgKCcnKTpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNhbnZhcy5zY3JvbGwgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgICBjYXNlICgndG9wJyk6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jYW52YXMud2hlcmVSZXR1cm4gPSB3aW5kb3cucGFnZVlPZmZzZXQ7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fX3RvZ2dsZVBvc2l0aW9uQW5pbWF0aW9uKDAsICdib3R0b20nLCAtMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgY2FzZSAoJ2JvdHRvbScpOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX190b2dnbGVQb3NpdGlvbkFuaW1hdGlvbigwLCAndG9wJywgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgX190b2dnbGVQb3NpdGlvbkFuaW1hdGlvbihzY3JvbGxTcGVlZCwgdG9nZ2xlUG9zaXRpb24sIGRpcmVjdGlvbikge1xyXG4gICAgICAgIGxldCBwYWdlWU9mZnNldCA9IHdpbmRvdy5wYWdlWU9mZnNldDtcclxuICAgICAgICBsZXQgcGF0aDtcclxuICAgICAgICAvL0Zvcm11bGEgZm9yIGFuaW1hdGlvbiBvZiBzcGVlZCB8IFNUQVJUXHJcbiAgICAgICAgaWYgKHBhZ2VZT2Zmc2V0ID49IDAgJiYgdG9nZ2xlUG9zaXRpb24gPT09ICdib3R0b20nKSB7XHJcbiAgICAgICAgICAgIHBhdGggPSB0aGlzLmNhbnZhcy53aGVyZVJldHVybi8yXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBwYXRoID0gKHRoaXMuY2FudmFzLndoZXJlUmV0dXJuIC0gd2luZG93LnBhZ2VZT2Zmc2V0KS8yXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBhbmltYXRpb25UaW1lID0gdGhpcy5wcm9wcy5hbmltYXRpb25UaW1lIC8gMC4wMTYgKiAyO1xyXG4gICAgICAgIGxldCBhY2NlbGVyYXRpb25UaW1lID0gYW5pbWF0aW9uVGltZSAvIDI7XHJcbiAgICAgICAgbGV0IGRlY2VsZXJhdGlvblRpbWUgPSBhbmltYXRpb25UaW1lIC8gMjtcclxuICAgICAgICBsZXQgYWNjZWxlcmF0aW9uID0gKHBhdGggKiAyKSAvIChhY2NlbGVyYXRpb25UaW1lICogYWNjZWxlcmF0aW9uVGltZSk7XHJcbiAgICAgICAgbGV0IHNwZWVkID0gYWNjZWxlcmF0aW9uICogYWNjZWxlcmF0aW9uVGltZTtcclxuXHJcbiAgICAgICAgbGV0IGRlY2VsZXJhdGlvbiA9IChwYXRoLXNwZWVkKmRlY2VsZXJhdGlvblRpbWUpKjIvKGRlY2VsZXJhdGlvblRpbWUqZGVjZWxlcmF0aW9uVGltZSk7XHJcbiAgICAgICAgLy9Gb3JtdWxhIGZvciBhbmltYXRpb24gb2Ygc3BlZWQgfCBFTkRcclxuICAgICAgICBsZXQgdGVtcCA9IGZhbHNlO1xyXG4gICAgICAgIGxldCBnb0FuaW1hdGlvbiA9ICgpID0+IHtcclxuXHJcbiAgICAgICAgICAgIGlmICgocGFnZVlPZmZzZXQgPiAwICYmIHRvZ2dsZVBvc2l0aW9uID09PSAnYm90dG9tJykgfHwgKHBhZ2VZT2Zmc2V0IDwgdGhpcy5jYW52YXMud2hlcmVSZXR1cm4gJiYgdG9nZ2xlUG9zaXRpb24gPT09ICd0b3AnKSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHNjcm9sbFNwZWVkIDw9IHNwZWVkICYmIHRlbXAgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2Nyb2xsU3BlZWQgKz0gYWNjZWxlcmF0aW9uXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0ZW1wID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBzY3JvbGxTcGVlZCArPSBkZWNlbGVyYXRpb25cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHBhZ2VZT2Zmc2V0ID0gcGFnZVlPZmZzZXQgKyBkaXJlY3Rpb24gKiBzY3JvbGxTcGVlZDtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5zY3JvbGxUbygwLCBwYWdlWU9mZnNldCk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5jYW52YXMucGFnZVBvc2l0aW9uID0gdG9nZ2xlUG9zaXRpb247XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5yYWRpYW4gPCAzLjE1IC0gdGhpcy5yYWRpYW5EZWx0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmFkaWFuICs9IHRoaXMucmFkaWFuRGVsdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fX3JvdGF0ZShkaXJlY3Rpb24pXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZ29BbmltYXRpb24pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNhbnZhcy5zY3JvbGwgPSBmYWxzZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLnJhZGlhbiA9IDA7XHJcbiAgICAgICAgcmV0dXJuIGdvQW5pbWF0aW9uKClcclxuICAgIH1cclxuXHJcbiAgICBfX3JvdGF0ZSAoZGlyZWN0aW9uKSB7XHJcbiAgICAgICAgbGV0IGFuaW1hdGlvbiA9ICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5jdHguY2xlYXJSZWN0KDAsIDAsIHRoaXMucHJvcHMuY2FudmFzU3R5bGUucmFkaXVzICogMiwgdGhpcy5wcm9wcy5jYW52YXNTdHlsZS5yYWRpdXMgKiAyKTtcclxuICAgICAgICAgICAgdGhpcy5jdHgudHJhbnNsYXRlKHRoaXMucHJvcHMuY2FudmFzU3R5bGUucmFkaXVzLCB0aGlzLnByb3BzLmNhbnZhc1N0eWxlLnJhZGl1cyk7XHJcbiAgICAgICAgICAgIHRoaXMuY3R4LnJvdGF0ZSgtMSAqIGRpcmVjdGlvbiAqIDE4MCAvIHRoaXMucHJvcHMuYW5pbWF0aW9uVGltZSAqIE1hdGguUEkgLyAxODAgKiAwLjAxNjcpO1xyXG4gICAgICAgICAgICB0aGlzLmN0eC50cmFuc2xhdGUoLXRoaXMucHJvcHMuY2FudmFzU3R5bGUucmFkaXVzLCAtdGhpcy5wcm9wcy5jYW52YXNTdHlsZS5yYWRpdXMpO1xyXG4gICAgICAgICAgICB0aGlzLl9fY2FudmFzRHJhdygpXHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXR1cm4gYW5pbWF0aW9uKClcclxuICAgIH1cclxuXHJcblxyXG5cclxuXHJcbn1cclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9idXR0b25VcERvd24vQnV0dG9uVXBEb3duLmpzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==