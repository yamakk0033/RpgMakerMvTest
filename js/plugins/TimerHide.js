//=============================================================================
// TimerHide.js	2018/02/18
//=============================================================================

/*:
 * @plugindesc タイマー非表示プラグイン
 * @author tomotomo
 *
 * @help このプラグインを使用するとタイマーが常に非表示となります。
 *
 * このプラグインにはプラグインコマンドはありません。
 */
 
(function() {
    var _Sprite_Timer_updateVisibility = Sprite_Timer.prototype.updateVisibility;
    Sprite_Timer.prototype.updateVisibility = function() {
        var result = _Sprite_Timer_updateVisibility.apply(this, arguments);
        this.visible = false;
        return result;
    };
})();
