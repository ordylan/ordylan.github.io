var Setting = (function() {
    /*
        设计规则：
        页面比例 1920*1440(4/3比例） 20190428
    */
    return {
        "template_id": "$${VIDEO}$$",
        "template_type": "VIDEO",
        "template_name": "视频播放",
        "template_topic": [{
            "pageBg": "assets/images/bg.jpg",//背景图
            "video": {
                "videoFile": "../video/video.mp4", //视频
                "defImg": "assets/images/cover.jpg", //视频内默认展示图片
                "showVideoControlBar": true, //是否显示视频播放器进度条
                /*视频展示位置。 如果用4:3 width设置为1920 height:1440。*/
                "width": 1920,
                "height": 1440,
                "left": 0,
                "top": 0,
            },
        }],
    };
}());
