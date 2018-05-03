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

    //=============================================================================
    // プラグインコマンドを取得
    //=============================================================================
    var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        var result = _Game_Interpreter_pluginCommand.call(this, command, args);

        switch(command)
        {
            case "CallMapEventById": this.callMapEventById(args); break;
            case "CallMapEventByName": this.callMapEventByName(args); break;

            case "EraseEventById": this.eraseEventById(args); break;
            case "EraseEventByName": this.eraseEventByName(args); break;
        }

        return result;
    };

    // イベントから別のイベントを呼び出す
    Game_Interpreter.prototype.callMapEventById = function(args) {
        var pageIndex = getArgNumber(args[1], 1);
        var eventId   = getArgNumber(args[0]);

        var event = $gameMap.event(eventId);
        if (event) {
            this.setupAnotherList(eventId, event.getPages(), pageIndex);
        }
    };

    Game_Interpreter.prototype.callMapEventByName = function(args) {
        var pageIndex = getArgNumber(args[1], 1);
        var eventName = args[0];

        var event = DataManager.searchDataItem($dataMap.events, 'name', eventName);
        if (event) {
            this.setupAnotherList(event.id, event.pages, pageIndex);
        }
    };

    Game_Interpreter.prototype.setupAnotherList = function(eventId, pages, pageIndex) {
        var page = pages[pageIndex - 1 || this._pageIndex] || pages[0];
        if (!eventId) eventId = this.isOnCurrentMap() ? this._eventId : 0;
        this.setupChild(page.list, eventId);
    };



    Game_Interpreter.prototype.eraseEventById = function(args) {
        var eventId = getArgNumber(args[0]);
        $gameMap.eraseEvent(eventId);
    }

    Game_Interpreter.prototype.eraseEventByName = function(args) {
        var eventName = args[0];

        var event = DataManager.searchDataItem($dataMap.events, 'name', eventName);
        if(event) {
            $gameMap.eraseEvent(event.id);
        }
    }




    //=============================================================================
    // Game_Event
    //  テンプレートイベントマップをロードしてグローバル変数に保持します。
    //=============================================================================
    Game_Event.prototype.getPages = function() {
        return this.event().pages;
    };

    //=============================================================================
    // DataManager
    //  データ検索用の共通処理です。
    //=============================================================================
    if (!DataManager.searchDataItem) {
        DataManager.searchDataItem = function(dataArray, columnName, columnValue) {
            var result = 0;
            dataArray.some(function(dataItem) {
                if (dataItem && dataItem[columnName] === columnValue) {
                    result = dataItem;
                    return true;
                }
                return false;
            });
            return result;
        };
    }

    var getArgNumber = function(arg, min, max) {
        if (arguments.length < 2) min = -Infinity;
        if (arguments.length < 3) max = Infinity;
        return (parseInt(arg) || 0).clamp(min, max);
    };
})();