//=============================================================================
// FootStepSe.js	2018/02/25
//=============================================================================

/*:
 * @plugindesc 足音プラグイン
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
    var always  = { name:"walk-high-heele-s1_01",  volume:90, pitch:100, pan:0 };
    var always2 = { name:"walk-leather-shoes1_01", volume:90, pitch:100, pan:0 };


    var posList = { "walk-high-heele-s1_01":1, "walk-leather-shoes1_01":10 };

    // 画像ごとに足音を設定
    var eventIamgeList = { "Male_Zombies_Gore":always, "Male Heroes":always2 };

    // 足音演奏フラグ
    var isFootStepSe = false;


    //=============================================================================
    // プラグインコマンドを取得
    //=============================================================================
    var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        var result = _Game_Interpreter_pluginCommand.call(this, command, args);

        switch(command)
        {
            case "FootStepSound": isFootStepSe = (args[0].toLowerCase() === 'true'); break;
        }

        return result;
    };


    //=============================================================================
    // 足音を演奏
    //=============================================================================
    var _Sprite_Character_updateCharacterFrame = Sprite_Character.prototype.updateCharacterFrame;
    Sprite_Character.prototype.updateCharacterFrame = function() {

        var prev_sx = this._frame.x;
        var result = _Sprite_Character_updateCharacterFrame.apply(this, arguments);
        var state = undefined;

        if(!isFootStepSe) return result;

        if(this._character === $gamePlayer)
        {
            state = always;
        }
        else
        {
            var array = $gameMap.events();
            for(var i=0; i<array.length; i++)
            {
                var element = array[i];
                if( element !== this._character ||
                   !eventIamgeList[element.characterName()]) continue;

                state = eventIamgeList[element.characterName()];
                break;
            }
        }

        if(typeof(state) !== "undefined")
        {
            var pw = this.patternWidth();
            var sx = (this.characterBlockX() + this.characterPatternX()) * pw;

            if(prev_sx !== pw * posList[state.name] && prev_sx !== sx)
            {
                AudioManager.playSe(state);
            }
        }

        return result;
    };
})();