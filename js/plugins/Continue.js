//=============================================================================
// FootStepSe.js	2018/03/18
//=============================================================================

/*:
 * @plugindesc コマンド追加プラグイン
 * @author tomotomo
 *
 * @help このプラグインはコマンドを追加します。
 *
 * このプラグインにはプラグインコマンドはありません。
 */
(function() {


    Scene_Title.prototype.commandContinue = function() {
        this._commandWindow.close();
        //SceneManager.push(Scene_Load);

        var scene = SceneManager._scene;
        scene.fadeOutAll();
        DataManager.loadGame(slotId);
        gameInterpreter.command115(); // 今のイベントが継続しないように中断コマンドを実行する
        Scene_Load.prototype.reloadMapIfUpdated.apply(scene);
        SceneManager.goto(Scene_Map);
        $gameSystem.onAfterLoad();
    };


})();