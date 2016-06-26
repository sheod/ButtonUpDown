'use strict';

export default class  ButtonUpDown {
    constructor(props) {
        this.props = props;
        this.radianDelta = 180 / this.props.animationTime * Math.PI / 180 * 0.0167;
        this.radian = 0;
        this.elemOpacitySpeedAnimation = (this.props.barOpacity / this.props.barOpacityTimeAnimation) * 0.0167;
    }
    
    __canvasDraw() {
        this.ctx.beginPath();
        this.ctx.arc(this.props.canvasStyle.radius, this.props.canvasStyle.radius, this.props.canvasStyle.radius, 0, 2 * Math.PI, true);
        this.ctx.fillStyle = this.props.color;
        this.ctx.fill();
        this.ctx.drawImage(this.img, 0, 0, this.img.width, this.img.height, 0, 0, this.element.width, this.element.height);
        this.ctx.closePath();
    }

    __canvasStyle() {
        this.element.width = this.props.canvasStyle.radius * 2;
        this.element.height = this.props.canvasStyle.radius * 2;
        this.element.style.position = 'fixed';
        this.element.style.top = this.props.canvasStyle.top;
        this.element.style[this.props.canvasStyle.side] = this.props.canvasStyle.indent;
        this.element.style.opacity = 0
    }

    createCanvas() {
        this.img = document.createElement('img');
        this.img.src = this.props.imgSrc;
        this.element = document.createElement('canvas');
        this.ctx = this.element.getContext("2d");
        this.element.scroll = false;
        this.element.pagePosition = '';

        let loadImg = () => {
            this.__canvasDraw()
        };

        if(this.img.complete) {
            loadImg();
        }
        else {
            this.img.onload = loadImg;
        }

        this.__canvasStyle()
        this.element.addEventListener('click', this.__togglePosition.bind(this))
    }



    __toggleVisibilityAnimation(show) {
        let animation = () => {

            if (this.element.style.opacity <= this.props.barOpacity && this.element.style.opacity >= 0) {
                if (show.value === true) {
                    this.element.style.opacity = +this.element.style.opacity + this.elemOpacitySpeedAnimation
                }
                else if (show.value === false) {
                    this.element.style.opacity -= this.elemOpacitySpeedAnimation
                }

                if (this.element.style.opacity > this.props.barOpacity) {
                    this.element.style.opacity = this.props.barOpacity;
                    return
                }
                if (this.element.style.opacity < 0) {
                    this.element.style.opacity = 0;
                    return
                }
            }
            requestAnimationFrame(animation)
        };
        return animation()

    }

    toggleVisibility() {
        let pageYOffset;
        let show = {};

        return () => {
            if (this.element.scroll === false) {

                pageYOffset = window.pageYOffset;
                switch (this.element.pagePosition) {

                    case (''):
                        if (pageYOffset > this.props.toggleVisibilityPoint) {
                            this.element.pagePosition = 'top';
                            show.value = true;
                            this.__toggleVisibilityAnimation(show)
                        }
                        break;

                    case ('top'):
                        if (pageYOffset < this.props.toggleVisibilityPoint) {
                            this.element.pagePosition = '';
                            show.value = false;
                            this.__toggleVisibilityAnimation(show)
                        }
                        break;

                    case ('bottom'):
                        if (pageYOffset > this.props.toggleVisibilityPoint) {
                            this.element.pagePosition = 'top';
                            let animation = () => {
                                if (this.radian < 3.15 - this.radianDelta) {
                                    this.radian += this.radianDelta;
                                    this.__rotate(1);
                                    requestAnimationFrame(animation)
                                }
                            };
                            this.radian = 0;
                            return animation()
                        }
                        break;
                }
            }
        }

    }

    __togglePosition()  {
        if (this.element.scroll === false) {
            this.element.scroll = true;
            
            switch (this.element.pagePosition) {
                case (''):
                    this.element.scroll = false;
                    break;

                case ('top'):
                    this.element.whereReturn = window.pageYOffset;
                    this.__togglePositionAnimation(0, 'bottom', -1);
                    break;

                case ('bottom'):
                    this.__togglePositionAnimation(0, 'top', 1);
                    break;
            }
        }
    }

    __togglePositionAnimation(scrollSpeed, togglePosition, direction) {
        let pageYOffset = window.pageYOffset;
        let path;
        //Formula for animation of speed | START
        if (pageYOffset >= 0 && togglePosition === 'bottom') {
            path = this.element.whereReturn/2
        }
        else {
            path = (this.element.whereReturn - window.pageYOffset)/2
        }
        let animationTime = this.props.animationTime / 0.016 * 2;
        let accelerationTime = animationTime / 2;
        let decelerationTime = animationTime / 2;
        let acceleration = (path * 2) / (accelerationTime * accelerationTime);
        let speed = acceleration * accelerationTime;

        let deceleration = (path-speed*decelerationTime)*2/(decelerationTime*decelerationTime);
        //Formula for animation of speed | END
        let temp = false;
        let goAnimation = () => {

            if ((pageYOffset > 0 && togglePosition === 'bottom') || (pageYOffset < this.element.whereReturn && togglePosition === 'top')) {
                if (scrollSpeed <= speed && temp === false) {
                    scrollSpeed += acceleration
                }
                else {
                    temp = true;
                    scrollSpeed += deceleration
                }
                pageYOffset = pageYOffset + direction * scrollSpeed;
                window.scrollTo(0, pageYOffset);

                this.element.pagePosition = togglePosition;
                if (this.radian < 3.15 - this.radianDelta) {
                    this.radian += this.radianDelta;
                    this.__rotate(direction)
                }
                requestAnimationFrame(goAnimation)
            }
            else {
                this.element.scroll = false
            }
        };
        this.radian = 0;
        return goAnimation()
    }

    __rotate (direction) {
        let animation = () => {
            this.ctx.clearRect(0, 0, this.props.canvasStyle.radius * 2, this.props.canvasStyle.radius * 2);
            this.ctx.translate(this.props.canvasStyle.radius, this.props.canvasStyle.radius);
            this.ctx.rotate(-1 * direction * 180 / this.props.animationTime * Math.PI / 180 * 0.0167);
            this.ctx.translate(-this.props.canvasStyle.radius, -this.props.canvasStyle.radius);
            this.__canvasDraw()
        };
        return animation()
    }




}
