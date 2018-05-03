//=============================================================================
// FootStepSe.js	2018/02/25
//=============================================================================

/*:
 * @plugindesc bgsプラグイン
 * @author tomotomo
 *
 * @help このプラグインを使用するとプレイヤー、イベントの足音を演奏させます。
 *
 * このプラグインにはプラグインコマンドはありません。
 */

(function() {

    // status
    // name   : 効果音名称(拡張子不要)
    // volume : 音量(0...100)
    // pitch  : ピッチ(50...150)
    // pan    : 位相(-100...100)
    //var always = { name:'walk-high-heele-s1_01', volume:90, pitch:100, pan:0, pos:1 };
    //var always2 = { name:'walk-leather-shoes1_01', volume:90, pitch:100, pan:0, pos:10 };


    //{"name":"Rain-Real_Ambi01-1_cat","pan":0,"pitch":100,"volume":90}

    AudioManager._playBgs_FadeIn = function(pos) {

        var bgs = {name:"Rain-Real_Ambi01-1_cat",pan:0,pitch:100,volume:90};

        if (this.isCurrentBgs(bgs)) {
            this.updateBgsParameters(bgs);
        } else {
            this.stopBgs();
            if (bgs.name) {
                this._bgsBuffer = this.createBuffer('bgs', bgs.name);
                this.updateBgsParameters(bgs);
                //this._bgsBuffer.play(true, pos || 0);
                AudioManager.fadeInBgs(2);
            }
        }
        this.updateCurrentBgs(bgs, pos);
    };
})();