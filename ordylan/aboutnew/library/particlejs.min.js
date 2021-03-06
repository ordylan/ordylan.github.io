/**
**原理：
**  1、每个粒子为一个实例对象，有初始大小，初始坐标，成长速度，粒子透明度
**  2、每个粒子对象，通过requestAnimationFrame不断重绘画布，粒子会随着size变化，坐标也会变化，直到离开画布
**  3、requestAnimationFrame每次重新绘制画布，会将之前的粒子遮住，视觉形成消失
**
**  @param  el: 画布的挂载元素，默认为body
**  @param  startX: 生成粒子x轴坐标
**  @param  startY: 生成粒子y轴坐标
**  @param  num: 生成粒子的数量
**  @param  shape: 粒子的透明度
**  @param  isMouseEvent: 是否使用鼠标改变粒子出生坐标
**
*/

;(function (global, factory) {

    (typeof exports === 'object' && typeof module !==undefined)
    ? (module.exports = factory())
    : (typeof define === 'function' && define.amd)
      ? (define(factory))
      : (global.particle = factory())

}(this, function () {

    function Particle(options){

        this.options = {
            el: 'body',
            startX: 0,
            startY: 0,
            num: 100,
            shape: 0.1,
            isMouseEvent: false
        }
        Object.assign(this.options, options)

        this.createCanvas()

    }
    Particle.prototype = {

        constructor: Particle,

        createCanvas() { //  初始化canvas元素
            this.el = document.querySelector(this.options.el)
            if (!document.querySelector(`${this.options.el} canvas`)) {
              this.el.insertBefore(document.createElement('canvas'), this.el.firstChild)
            }

            this.canvas = document.querySelector(`${this.options.el} canvas`)
            this.ctx = this.canvas.getContext('2d')
            if(this.options.el === 'body') {
                this.canvas.width = window.innerWidth
                this.canvas.height =  window.innerHeight
            } else {
                this.canvas.width = this.el.getBoundingClientRect().width
                this.canvas.height = this.el.getBoundingClientRect().height
            }
        },

        init() {   // 初始化
            // 随机初始坐标
            this.x = this.options.startX || this.randomDigit(0,this.canvas.width)
            this.y = this.options.startY || this.randomDigit(0,this.canvas.height)

            this.size = 1.3 //  粒子初始大小
            this.grow = 0.01    //  粒子成长速度
            this.color = `#${Math.random().toString().slice(-6)}`   // 随机颜色

            // 随机方向
            this.angle = this.randomDigit(0, Math.PI * 2, false)
            this.angleX = Math.sin(this.angle) * this.size
            this.angleY = Math.cos(this.angle) * this.size
        },

        draw() {   // 绘画粒子
            this.ctx.beginPath()
            this.ctx.fillStyle = this.color
            this.ctx.arc(this.x, this.y, this.size, 0, Math.PI*2)
            this.ctx.fill()

            this.update()
        },

        update() { //  更新粒子大小和运动轨迹
            this.size += this.grow

            this.resize = this.size
            this.angleX = Math.sin(this.angle) * this.resize
            this.angleY = Math.cos(this.angle) * this.resize

            this.x += this.angleX
            this.y += this.angleY

            if(this.x >= this.canvas.width || this.x <=0 || this.y >= this.canvas.height || this.y <= 0){

                this.init()
            }
        },

        randomDigit (min, max, flag = true) {    //  随机数(坐标为整数，角度为小数)
            return flag
                    ? parseInt(Math.random() * (max - min) + min)
                    : parseFloat(Math.random() * (max - min) + min)
        },

        createParticle() {  //  生成粒子对象
            this.part = []

            for (let i = 0; i < this.options.num; i++) {
                this.part[i] = new Particle(this.options)
                this.part[i].init()
            }
        },

        renderParticle() {  //  渲染粒子
            let _this = this;
            (function redraw(){
                // 清除画布效果并重绘画布
                _this.ctx.fillStyle = `rgba(0, 0, 0, ${_this.options.shape})`
                _this.ctx.fillRect(0, 0, _this.canvas.width, _this.canvas.height)

                for (let i = 0; i < _this.options.num; i++) {
                    _this.part[i].draw()
                }
                requestAnimationFrame(redraw)
            }());
        },

        mouseEvent() {  //  鼠标改变粒子坐标
            if(this.options.isMouseEvent) {
                this.el.addEventListener('mousemove', e =>{

                    let x = e.clientX - this.canvas.offsetLeft + window.scrollX;
                    let y = e.clientY - this.canvas.offsetTop + window.scrollY;
                    if (x <= this.canvas.width && y <= this.canvas.height) {
                        for (let i = 0; i < this.options.num; i++) {
                            this.part[i].options.startX = x
                            this.part[i].options.startY = y
                        }
                    }
                })
            }
        },

        colorfulAnimation () {  //  粒子动画
            this.createParticle();
            this.mouseEvent();

            this.renderParticle();
        }
    }

    return function particle(options) {
        return options
                ? new Particle(options).colorfulAnimation()
                : new Particle().colorfulAnimation()
    }
}))

