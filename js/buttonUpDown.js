var buttonUpDown =
webpackJsonp_name_([0,2],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _ButtonUpDown = __webpack_require__(1);
	
	var _ButtonUpDown2 = _interopRequireDefault(_ButtonUpDown);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var firstButton = new _ButtonUpDown2.default({
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
	window.addEventListener('load', function () {
	    document.body.appendChild(firstButton.canvas);
	});
	window.addEventListener('load', firstButton.__render());
	window.addEventListener('scroll', firstButton.__toggleVisibility());
	
	/*
	new ButtonUpDown({
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
	        imgSrc : './img/up-arrow-icon-top-small.png',
	        animationTime: 0.3
	    }
	);*/
	
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
	    }
	
	    _createClass(ButtonUpDown, [{
	        key: '__render',
	        value: function __render() {
	            this.__createCanvas();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9idXR0b25VcERvd24vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vYnV0dG9uVXBEb3duL0J1dHRvblVwRG93bi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBOztBQUVBOzs7Ozs7QUFFQSxLQUFJLGNBQWMsMkJBQWlCO0FBQzNCLGtCQUFhO0FBQ1QsaUJBQVEsRUFEQztBQUVULGNBQUssS0FGSTtBQUdULGVBQU0sT0FIRztBQUlULGlCQUFRO0FBSkMsTUFEYztBQU8zQiw0QkFBdUIsR0FQSTtBQVEzQixZQUFPLG1CQVJvQjtBQVMzQixpQkFBWSxHQVRlO0FBVTNCLDhCQUF5QixHQVZFO0FBVzNCLGFBQVMsbUNBWGtCO0FBWTNCLG9CQUFlO0FBWlksRUFBakIsQ0FBbEI7QUFlQSxRQUFPLGdCQUFQLENBQXdCLE1BQXhCLEVBQWdDLFlBQVc7QUFDdkMsY0FBUyxJQUFULENBQWMsV0FBZCxDQUEwQixZQUFZLE1BQXRDO0FBQ0gsRUFGRDtBQUdBLFFBQU8sZ0JBQVAsQ0FBd0IsTUFBeEIsRUFBZ0MsWUFBWSxRQUFaLEVBQWhDO0FBQ0EsUUFBTyxnQkFBUCxDQUF3QixRQUF4QixFQUFrQyxZQUFZLGtCQUFaLEVBQWxDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBc0JBLFNBQVEsWUFBUiwwQjs7Ozs7O0FDN0NBOzs7Ozs7Ozs7Ozs7S0FFc0IsWTtBQUNsQiwyQkFBWSxLQUFaLEVBQW1CO0FBQUE7O0FBQ2YsY0FBSyxLQUFMLEdBQWEsS0FBYjtBQUNBLGNBQUssV0FBTCxHQUFtQixNQUFNLEtBQUssS0FBTCxDQUFXLGFBQWpCLEdBQWlDLEtBQUssRUFBdEMsR0FBMkMsR0FBM0MsR0FBaUQsTUFBcEU7QUFDQSxjQUFLLE1BQUwsR0FBYyxDQUFkO0FBQ0EsY0FBSyx5QkFBTCxHQUFrQyxLQUFLLEtBQUwsQ0FBVyxVQUFYLEdBQXdCLEtBQUssS0FBTCxDQUFXLHVCQUFwQyxHQUErRCxNQUFoRztBQUVIOzs7O29DQUVVO0FBQ1Asa0JB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cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgQnV0dG9uVXBEb3duIGZyb20gJy4vQnV0dG9uVXBEb3duJ1xuXG5sZXQgZmlyc3RCdXR0b24gPSBuZXcgQnV0dG9uVXBEb3duKHtcbiAgICAgICAgY2FudmFzU3R5bGU6IHtcbiAgICAgICAgICAgIHJhZGl1czogMzAsXG4gICAgICAgICAgICB0b3A6ICcyMCUnLFxuICAgICAgICAgICAgc2lkZTogJ3JpZ2h0JyxcbiAgICAgICAgICAgIGluZGVudDogJzEwcHgnXG4gICAgICAgIH0sXG4gICAgICAgIHRvZ2dsZVZpc2liaWxpdHlQb2ludDogNjAwLFxuICAgICAgICBjb2xvcjogJ3JnYig5NiwgMTUwLCAyMTkpJyxcbiAgICAgICAgYmFyT3BhY2l0eTogMC44LFxuICAgICAgICBiYXJPcGFjaXR5VGltZUFuaW1hdGlvbjogMC4zLFxuICAgICAgICBpbWdTcmMgOiAnLi9pbWcvdXAtYXJyb3ctaWNvbi10b3Atc21hbGwucG5nJyxcbiAgICAgICAgYW5pbWF0aW9uVGltZTogMC4yXG4gICAgfVxuKTtcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgZnVuY3Rpb24oKSB7XG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChmaXJzdEJ1dHRvbi5jYW52YXMpXG59KVxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBmaXJzdEJ1dHRvbi5fX3JlbmRlcigpKVxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIGZpcnN0QnV0dG9uLl9fdG9nZ2xlVmlzaWJpbGl0eSgpKTtcblxuXG4vKlxubmV3IEJ1dHRvblVwRG93bih7XG4gICAgICAgIGNhbnZhc1N0eWxlOiB7XG4gICAgICAgICAgICByYWRpdXM6IDIwLFxuICAgICAgICAgICAgdG9wOiAnNTAlJyxcbiAgICAgICAgICAgIHNpZGU6ICdsZWZ0JyxcbiAgICAgICAgICAgIGluZGVudDogJzIwcHgnXG4gICAgICAgIH0sXG4gICAgICAgIHRvZ2dsZVZpc2liaWxpdHlQb2ludDogMTAwMCxcbiAgICAgICAgY29sb3I6ICdyZ2IoOTYsIDE1MCwgMjE5KScsXG4gICAgICAgIGJhck9wYWNpdHk6IDAuNixcbiAgICAgICAgYmFyT3BhY2l0eVRpbWVBbmltYXRpb246IDAuMyxcbiAgICAgICAgaW1nU3JjIDogJy4vaW1nL3VwLWFycm93LWljb24tdG9wLXNtYWxsLnBuZycsXG4gICAgICAgIGFuaW1hdGlvblRpbWU6IDAuM1xuICAgIH1cbik7Ki9cblxuXG5cbmV4cG9ydHMuQnV0dG9uVXBEb3duID0gQnV0dG9uVXBEb3duIC8v0LLRi9Cz0YDRg9C30LrQsCDQstC+INCy0L3QtdGI0L3RjtGOINC/0LXRgNC10LzQtdC90L3Rg9GOXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2J1dHRvblVwRG93bi9pbmRleC5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzICBCdXR0b25VcERvd24ge1xyXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgICAgICB0aGlzLnByb3BzID0gcHJvcHM7XHJcbiAgICAgICAgdGhpcy5yYWRpYW5EZWx0YSA9IDE4MCAvIHRoaXMucHJvcHMuYW5pbWF0aW9uVGltZSAqIE1hdGguUEkgLyAxODAgKiAwLjAxNjc7XHJcbiAgICAgICAgdGhpcy5yYWRpYW4gPSAwO1xyXG4gICAgICAgIHRoaXMuZWxlbU9wYWNpdHlTcGVlZEFuaW1hdGlvbiA9ICh0aGlzLnByb3BzLmJhck9wYWNpdHkgLyB0aGlzLnByb3BzLmJhck9wYWNpdHlUaW1lQW5pbWF0aW9uKSAqIDAuMDE2NztcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBfX3JlbmRlcigpIHtcclxuICAgICAgICB0aGlzLl9fY3JlYXRlQ2FudmFzKCk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIF9fY2FudmFzRHJhdygpIHtcclxuICAgICAgICB0aGlzLmN0eC5iZWdpblBhdGgoKTtcclxuICAgICAgICB0aGlzLmN0eC5hcmModGhpcy5wcm9wcy5jYW52YXNTdHlsZS5yYWRpdXMsIHRoaXMucHJvcHMuY2FudmFzU3R5bGUucmFkaXVzLCB0aGlzLnByb3BzLmNhbnZhc1N0eWxlLnJhZGl1cywgMCwgMiAqIE1hdGguUEksIHRydWUpO1xyXG4gICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IHRoaXMucHJvcHMuY29sb3I7XHJcbiAgICAgICAgdGhpcy5jdHguZmlsbCgpO1xyXG4gICAgICAgIHRoaXMuY3R4LmRyYXdJbWFnZSh0aGlzLmltZywgMCwgMCwgdGhpcy5pbWcud2lkdGgsIHRoaXMuaW1nLmhlaWdodCwgMCwgMCwgdGhpcy5jYW52YXMud2lkdGgsIHRoaXMuY2FudmFzLmhlaWdodCk7XHJcbiAgICAgICAgdGhpcy5jdHguY2xvc2VQYXRoKCk7XHJcbiAgICB9XHJcblxyXG4gICAgX19jYW52YXNTdHlsZSgpIHtcclxuICAgICAgICB0aGlzLmNhbnZhcy53aWR0aCA9IHRoaXMucHJvcHMuY2FudmFzU3R5bGUucmFkaXVzICogMjtcclxuICAgICAgICB0aGlzLmNhbnZhcy5oZWlnaHQgPSB0aGlzLnByb3BzLmNhbnZhc1N0eWxlLnJhZGl1cyAqIDI7XHJcbiAgICAgICAgdGhpcy5jYW52YXMuc3R5bGUucG9zaXRpb24gPSAnZml4ZWQnO1xyXG4gICAgICAgIHRoaXMuY2FudmFzLnN0eWxlLnRvcCA9IHRoaXMucHJvcHMuY2FudmFzU3R5bGUudG9wO1xyXG4gICAgICAgIHRoaXMuY2FudmFzLnN0eWxlW3RoaXMucHJvcHMuY2FudmFzU3R5bGUuc2lkZV0gPSB0aGlzLnByb3BzLmNhbnZhc1N0eWxlLmluZGVudDtcclxuICAgICAgICB0aGlzLmNhbnZhcy5zdHlsZS5vcGFjaXR5ID0gMFxyXG4gICAgfVxyXG5cclxuICAgIF9fY3JlYXRlQ2FudmFzKCkge1xyXG4gICAgICAgIHRoaXMuaW1nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XHJcbiAgICAgICAgdGhpcy5pbWcuc3JjID0gdGhpcy5wcm9wcy5pbWdTcmM7XHJcbiAgICAgICAgdGhpcy5jYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcclxuICAgICAgICB0aGlzLmN0eCA9IHRoaXMuY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcclxuICAgICAgICB0aGlzLmNhbnZhcy5zY3JvbGwgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmNhbnZhcy5wYWdlUG9zaXRpb24gPSAnJztcclxuXHJcbiAgICAgICAgbGV0IGxvYWRJbWcgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuX19jYW52YXNEcmF3KClcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBpZih0aGlzLmltZy5jb21wbGV0ZSkge1xyXG4gICAgICAgICAgICBsb2FkSW1nKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmltZy5vbmxvYWQgPSBsb2FkSW1nO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fX2NhbnZhc1N0eWxlKClcclxuICAgICAgICB0aGlzLmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuX190b2dnbGVQb3NpdGlvbi5iaW5kKHRoaXMpKVxyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgX190b2dnbGVWaXNpYmlsaXR5QW5pbWF0aW9uKHNob3cpIHtcclxuICAgICAgICBsZXQgYW5pbWF0aW9uID0gKCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuY2FudmFzLnN0eWxlLm9wYWNpdHkgPD0gdGhpcy5wcm9wcy5iYXJPcGFjaXR5ICYmIHRoaXMuY2FudmFzLnN0eWxlLm9wYWNpdHkgPj0gMCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHNob3cudmFsdWUgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNhbnZhcy5zdHlsZS5vcGFjaXR5ID0gK3RoaXMuY2FudmFzLnN0eWxlLm9wYWNpdHkgKyB0aGlzLmVsZW1PcGFjaXR5U3BlZWRBbmltYXRpb25cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHNob3cudmFsdWUgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jYW52YXMuc3R5bGUub3BhY2l0eSAtPSB0aGlzLmVsZW1PcGFjaXR5U3BlZWRBbmltYXRpb25cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jYW52YXMuc3R5bGUub3BhY2l0eSA+IHRoaXMucHJvcHMuYmFyT3BhY2l0eSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2FudmFzLnN0eWxlLm9wYWNpdHkgPSB0aGlzLnByb3BzLmJhck9wYWNpdHk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jYW52YXMuc3R5bGUub3BhY2l0eSA8IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNhbnZhcy5zdHlsZS5vcGFjaXR5ID0gMDtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoYW5pbWF0aW9uKVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmV0dXJuIGFuaW1hdGlvbigpXHJcblxyXG4gICAgfVxyXG5cclxuICAgIF9fdG9nZ2xlVmlzaWJpbGl0eSgpIHtcclxuICAgICAgICBsZXQgcGFnZVlPZmZzZXQ7XHJcbiAgICAgICAgbGV0IHNob3cgPSB7fTtcclxuXHJcbiAgICAgICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuY2FudmFzLnNjcm9sbCA9PT0gZmFsc2UpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBwYWdlWU9mZnNldCA9IHdpbmRvdy5wYWdlWU9mZnNldDtcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAodGhpcy5jYW52YXMucGFnZVBvc2l0aW9uKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgKCcnKTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBhZ2VZT2Zmc2V0ID4gdGhpcy5wcm9wcy50b2dnbGVWaXNpYmlsaXR5UG9pbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2FudmFzLnBhZ2VQb3NpdGlvbiA9ICd0b3AnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hvdy52YWx1ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9fdG9nZ2xlVmlzaWJpbGl0eUFuaW1hdGlvbihzaG93KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBjYXNlICgndG9wJyk6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwYWdlWU9mZnNldCA8IHRoaXMucHJvcHMudG9nZ2xlVmlzaWJpbGl0eVBvaW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNhbnZhcy5wYWdlUG9zaXRpb24gPSAnJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNob3cudmFsdWUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX190b2dnbGVWaXNpYmlsaXR5QW5pbWF0aW9uKHNob3cpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgKCdib3R0b20nKTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBhZ2VZT2Zmc2V0ID4gdGhpcy5wcm9wcy50b2dnbGVWaXNpYmlsaXR5UG9pbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2FudmFzLnBhZ2VQb3NpdGlvbiA9ICd0b3AnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGFuaW1hdGlvbiA9ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5yYWRpYW4gPCAzLjE1IC0gdGhpcy5yYWRpYW5EZWx0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJhZGlhbiArPSB0aGlzLnJhZGlhbkRlbHRhO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9fcm90YXRlKDEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoYW5pbWF0aW9uKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJhZGlhbiA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYW5pbWF0aW9uKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgX190b2dnbGVQb3NpdGlvbigpICB7XHJcbiAgICAgICAgaWYgKHRoaXMuY2FudmFzLnNjcm9sbCA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgdGhpcy5jYW52YXMuc2Nyb2xsID0gdHJ1ZTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHN3aXRjaCAodGhpcy5jYW52YXMucGFnZVBvc2l0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlICgnJyk6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jYW52YXMuc2Nyb2xsID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgY2FzZSAoJ3RvcCcpOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2FudmFzLndoZXJlUmV0dXJuID0gd2luZG93LnBhZ2VZT2Zmc2V0O1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX190b2dnbGVQb3NpdGlvbkFuaW1hdGlvbigwLCAnYm90dG9tJywgLTEpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICAgIGNhc2UgKCdib3R0b20nKTpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9fdG9nZ2xlUG9zaXRpb25BbmltYXRpb24oMCwgJ3RvcCcsIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIF9fdG9nZ2xlUG9zaXRpb25BbmltYXRpb24oc2Nyb2xsU3BlZWQsIHRvZ2dsZVBvc2l0aW9uLCBkaXJlY3Rpb24pIHtcclxuICAgICAgICBsZXQgcGFnZVlPZmZzZXQgPSB3aW5kb3cucGFnZVlPZmZzZXQ7XHJcbiAgICAgICAgbGV0IHBhdGg7XHJcbiAgICAgICAgLy9Gb3JtdWxhIGZvciBhbmltYXRpb24gb2Ygc3BlZWQgfCBTVEFSVFxyXG4gICAgICAgIGlmIChwYWdlWU9mZnNldCA+PSAwICYmIHRvZ2dsZVBvc2l0aW9uID09PSAnYm90dG9tJykge1xyXG4gICAgICAgICAgICBwYXRoID0gdGhpcy5jYW52YXMud2hlcmVSZXR1cm4vMlxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcGF0aCA9ICh0aGlzLmNhbnZhcy53aGVyZVJldHVybiAtIHdpbmRvdy5wYWdlWU9mZnNldCkvMlxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgYW5pbWF0aW9uVGltZSA9IHRoaXMucHJvcHMuYW5pbWF0aW9uVGltZSAvIDAuMDE2ICogMjtcclxuICAgICAgICBsZXQgYWNjZWxlcmF0aW9uVGltZSA9IGFuaW1hdGlvblRpbWUgLyAyO1xyXG4gICAgICAgIGxldCBkZWNlbGVyYXRpb25UaW1lID0gYW5pbWF0aW9uVGltZSAvIDI7XHJcbiAgICAgICAgbGV0IGFjY2VsZXJhdGlvbiA9IChwYXRoICogMikgLyAoYWNjZWxlcmF0aW9uVGltZSAqIGFjY2VsZXJhdGlvblRpbWUpO1xyXG4gICAgICAgIGxldCBzcGVlZCA9IGFjY2VsZXJhdGlvbiAqIGFjY2VsZXJhdGlvblRpbWU7XHJcblxyXG4gICAgICAgIGxldCBkZWNlbGVyYXRpb24gPSAocGF0aC1zcGVlZCpkZWNlbGVyYXRpb25UaW1lKSoyLyhkZWNlbGVyYXRpb25UaW1lKmRlY2VsZXJhdGlvblRpbWUpO1xyXG4gICAgICAgIC8vRm9ybXVsYSBmb3IgYW5pbWF0aW9uIG9mIHNwZWVkIHwgRU5EXHJcbiAgICAgICAgbGV0IHRlbXAgPSBmYWxzZTtcclxuICAgICAgICBsZXQgZ29BbmltYXRpb24gPSAoKSA9PiB7XHJcblxyXG4gICAgICAgICAgICBpZiAoKHBhZ2VZT2Zmc2V0ID4gMCAmJiB0b2dnbGVQb3NpdGlvbiA9PT0gJ2JvdHRvbScpIHx8IChwYWdlWU9mZnNldCA8IHRoaXMuY2FudmFzLndoZXJlUmV0dXJuICYmIHRvZ2dsZVBvc2l0aW9uID09PSAndG9wJykpIHtcclxuICAgICAgICAgICAgICAgIGlmIChzY3JvbGxTcGVlZCA8PSBzcGVlZCAmJiB0ZW1wID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNjcm9sbFNwZWVkICs9IGFjY2VsZXJhdGlvblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGVtcCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgc2Nyb2xsU3BlZWQgKz0gZGVjZWxlcmF0aW9uXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBwYWdlWU9mZnNldCA9IHBhZ2VZT2Zmc2V0ICsgZGlyZWN0aW9uICogc2Nyb2xsU3BlZWQ7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cuc2Nyb2xsVG8oMCwgcGFnZVlPZmZzZXQpO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuY2FudmFzLnBhZ2VQb3NpdGlvbiA9IHRvZ2dsZVBvc2l0aW9uO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucmFkaWFuIDwgMy4xNSAtIHRoaXMucmFkaWFuRGVsdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJhZGlhbiArPSB0aGlzLnJhZGlhbkRlbHRhO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX19yb3RhdGUoZGlyZWN0aW9uKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGdvQW5pbWF0aW9uKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jYW52YXMuc2Nyb2xsID0gZmFsc2VcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5yYWRpYW4gPSAwO1xyXG4gICAgICAgIHJldHVybiBnb0FuaW1hdGlvbigpXHJcbiAgICB9XHJcblxyXG4gICAgX19yb3RhdGUgKGRpcmVjdGlvbikge1xyXG4gICAgICAgIGxldCBhbmltYXRpb24gPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuY3R4LmNsZWFyUmVjdCgwLCAwLCB0aGlzLnByb3BzLmNhbnZhc1N0eWxlLnJhZGl1cyAqIDIsIHRoaXMucHJvcHMuY2FudmFzU3R5bGUucmFkaXVzICogMik7XHJcbiAgICAgICAgICAgIHRoaXMuY3R4LnRyYW5zbGF0ZSh0aGlzLnByb3BzLmNhbnZhc1N0eWxlLnJhZGl1cywgdGhpcy5wcm9wcy5jYW52YXNTdHlsZS5yYWRpdXMpO1xyXG4gICAgICAgICAgICB0aGlzLmN0eC5yb3RhdGUoLTEgKiBkaXJlY3Rpb24gKiAxODAgLyB0aGlzLnByb3BzLmFuaW1hdGlvblRpbWUgKiBNYXRoLlBJIC8gMTgwICogMC4wMTY3KTtcclxuICAgICAgICAgICAgdGhpcy5jdHgudHJhbnNsYXRlKC10aGlzLnByb3BzLmNhbnZhc1N0eWxlLnJhZGl1cywgLXRoaXMucHJvcHMuY2FudmFzU3R5bGUucmFkaXVzKTtcclxuICAgICAgICAgICAgdGhpcy5fX2NhbnZhc0RyYXcoKVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmV0dXJuIGFuaW1hdGlvbigpXHJcbiAgICB9XHJcblxyXG5cclxuXHJcblxyXG59XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vYnV0dG9uVXBEb3duL0J1dHRvblVwRG93bi5qc1xuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=