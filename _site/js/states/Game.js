// インスタンス変数、関数の定義
MyGame.Game = function (game) {
    // Star
    this.star = null;
    // カーソルオブジェクト
    this.cursors = null;
    // スペースキーの取得
    this.spaceKey = null;
    // 星の移動速度
    this.speed = 200;
    // BGM
    this.bgm = null;
    // SE
    this.se = [];
};

// 効果音：アイテムゲット
MyGame.SE_PPING = 0;
// 効果音：死亡
MyGame.SE_DEATH = 1;

// タイトル処理
MyGame.Game.prototype = {
    // ゲームの作成
    create: function() {
        // 物理エンジンを起動
        this.physics.startSystem(Phaser.Physics.ARCADE);

        // 作成
        this.star = this.add.sprite(this.world.width/2, this.world.height/2, "star");
        this.star.anchor.setTo(0.5);
        // Arcade物理エンジンを設定
        this.physics.enable(this.star);

        // カーソルキーの作成
        this.cursors = this.input.keyboard.createCursorKeys();
        // スペースキーの作成
        this.spaceKey = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        // スコアを初期化
        MyGame.gameParams.score = 0;

        // 音読み込み
        if (this.bgm == null) {
            this.bgm = this.add.audio("BGM");
            this.se[0] = this.add.audio("PPING");
            this.se[1] = this.add.audio("DEATH");
        }
        this.bgm.fadeIn(1000, true);
    },

    // 更新処理
    update: function() {
        // 移動
        let newvel = new Phaser.Point(0,0);
        // 上
        if (this.cursors.up.isDown) {
            newvel.y = -1;
        }
        // 下
        if (this.cursors.down.isDown) {
            newvel.y = 1;
        }
        // 左
        if (this.cursors.left.isDown) {
            newvel.x = -1;
        }
        // 右
        if (this.cursors.right.isDown) {
            newvel.x = 1;
        }
        // 速度設定
        if (!newvel.isZero()) {
            // 速度が設定されていたら、速度をthis.speedに設定する
            newvel.setMagnitude(this.speed);
        }
        this.star.body.velocity = newvel;

        // Qで再生
        if (this.input.keyboard.isDown(Phaser.KeyCode.Q)) {
            this.se[MyGame.SE_PPING].play();
        }
        if (this.input.keyboard.isDown(Phaser.KeyCode.W)) {
            this.bgm.fadeOut(1000);
        }

        // スペースキーをチェック
        this.star.tint = 0xffffff;
        if (this.spaceKey.justDown) {
            // スペースが押された瞬間だったら赤くする
            this.star.tint = 0xff0000;
        }
        else if (this.spaceKey.isDown) {
            // スペースが押しっぱなしの間、青にする
            this.star.tint = 0x0000ff;
        }

        // Oキーでゲームオーバー
        if (this.input.keyboard.isDown(Phaser.KeyCode.O)) {
            this.state.start("GameOver", false);
        }

        // Cキーでクリア
        if (this.input.keyboard.isDown(Phaser.KeyCode.C)) {
            this.state.start("Clear", false, false, this.bgm);
        }

        // Aキーで点数加算
        if (this.input.keyboard.isDown(Phaser.KeyCode.A)) {
            MyGame.gameParams.AddScore(100);
        }
    },

    // 描画
    render: function() {

    },

    // 終了処理
    shutdown: function() {

    }

}
