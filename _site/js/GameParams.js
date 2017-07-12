MyGame.GameParams = function (game) {

    // キーを無視する秒数
    this.IGNORE_KEY = 1;

    // ゲームオブジェクト
    this.game = game;
    // スコア
    this.score = 0;
    // スコアテキスト
    this.scoreText = null;

    // スコアを追加
    let style = {
        font: "bold 24px Arial",
        fill: "#f00",
        boundsAlignH: "left",
        boundsAlignV: "top"
    };
    this.scoreText = game.add.text(5, 5, "", style);
    this.scoreText.setShadow(1, 1, "rgba(255, 255, 255, 0.8)", 1);

    // 常に表示するために、Stageに追加
    game.stage.addChild(this.scoreText);

    // スペースキーを定義
    this.spaceKey = game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);

}

// ゲームパラメーター関連
MyGame.GameParams.prototype = {

    // スコアを加算
    AddScore: function(add) {
        this.score += add;
        if (this.score > 999999) {
            this.score = 999999;
        }
        this.scoreText.text = "Score "+("00000"+this.score).slice(-6);
    },

    // スペースキーの無視を開始
    StartSpaceKey: function() {
        this.isStartSpace = false;
        this.game.time.events.add(Phaser.Timer.SECOND*this.IGNORE_KEY, this._startSpaceKey, this);
    },
    _startSpaceKey: function() {
        this.isStartSpace = true;
    },

    // スペースキーが押された瞬間か
    JustDownSpace: function() {
        if (!this.isStartSpace) {
            // 読み捨てる。一度読みだすと、falseになる
            let ignore = this.spaceKey.justDown;
        }
        return this.spaceKey.justDown;
    },

}
