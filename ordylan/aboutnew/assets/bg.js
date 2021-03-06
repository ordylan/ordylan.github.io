
    var particleSystem = null;
    var stage = null;
    //  ウィンドウのロードが終わり次第、初期化コードを呼び出す。
    window.addEventListener("load", function () {
      // Stageオブジェクトを作成します。表示リストのルートになります。
      stage = new createjs.Stage("myCanvas");
      // パーティクルシステム作成します。
      particleSystem = new particlejs.ParticleSystem();
      // パーティクルシステムの描画コンテナーを表示リストに登録します。
      stage.addChild(particleSystem.container);
      // Particle Develop( http://ics-web.jp/projects/particle-develop/ ) から書きだしたパーティクルの設定を読み込む
      particleSystem.importFromJson(
        // パラメーターJSONのコピー＆ペースト ここから--
        {
    "bgColor": "#000",
    "width": 2400,
    "height": 2400,
	//発生個数
    "emitFrequency": 20,
    "startX": 600,
    "startXVariance": 2400,
    "startY": 400,
    "startYVariance": 2400,
    "initialDirection": "192.5",
    "initialDirectionVariance": "148.5",
	//初期速度
    "initialSpeed": 12,
	//初期速度のばらつき
    "initialSpeedVariance": 6,
    "friction": 0,
    "accelerationSpeed": 0,
    "accelerationDirection": 100,
	//初期サイズ
    "startScale": 0.08,
	//サイズのばらつき
    "startScaleVariance": 0.1,
    "finishScale": 0,
    "finishScaleVariance": 0.1,
    "lifeSpan": 168,
    "lifeSpanVariance": 462,
    "startAlpha": 1,
    "startAlphaVariance": "1",
    "finishAlpha": "0",
    "finishAlphaVariance": "0",
    "shapeIdList": [
        "blur_circle"
    ],
    "startColor": {
		//色相
        "hue": 180,
		//色相のばらつき
        "hueVariance": 90,
		//彩度
        "saturation": "100",
		//彩度のばらつき
        "saturationVariance": "0",
		//明度
        "luminance": "100",
		//明度のばらつき
        "luminanceVariance": "20"
    },
    "blendMode": false,
    "alphaCurveType": "0",
    "VERSION": "1.0.0"
}
        // パラメーターJSONのコピー＆ペースト ここまで---
      );
      // フレームレートの設定
      createjs.Ticker.framerate = 60;
      // requestAnimationFrameに従った呼び出し
      createjs.Ticker.timingMode = createjs.Ticker.RAF;
      // 定期的に呼ばれる関数を登録
      createjs.Ticker.addEventListener("tick", handleTick);
 
// ページ読込時にCanvasサイズ設定 
setCanvasSize();

});

// リサイズ時にCanvasサイズを再設定 
window.addEventListener( 'resize', function() {
setCanvasSize();
}, false );

	
    function handleTick() {
      // パーティクルの発生・更新
      particleSystem.update();
      // 描画を更新する
      stage.update();
    }
	
	// Canvasサイズをコンテナの100%に 
function setCanvasSize() {
	  
//Canvasサイズ設定 
var container = document.getElementById( 'cts' ),
canvas = document.getElementById( 'myCanvas' ),
queue = null,
wait = 300;

canvas.width = container.offsetWidth;
canvas.height = container.offsetHeight;
}