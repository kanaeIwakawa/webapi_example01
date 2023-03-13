//HTTP GETをハンドリングする
function doGet(e) {

    //リクエストパラメータ名"text"の値を取得する
    const text = e.parameter.text;
    //textという変数（箱）を用意しての中身はeの中のparameterの中のtextにする

    let value;
　　 //letの場合はvalueの中身が変わっても再代入できる（constはできない）
    if (text) {
        value = "You say " + text;
    } else {
        value = "Please say something!";
    }
　　 //もし変数textの中身がtrueだった場合、let varueで定義した変数のあとに変数textの内容が入る
　　//true出なかった場合はPlease say something!が表示される

    const result = {
        message: value
    }
　　　//resultという箱を用意する。中身はmessage:valueである
    let responseText;
　　　//esponseTextという箱を用意する
    const out = ContentService.createTextOutput();
     //ContentService.createTextOutput();という箱を用意する
     //ContentServiceは「内容を扱うためのサービス」で.createTextOutputがtextを作って出力する
     //ContentServiceのあとがtextであるとは限らない
    const callback = e.parameter.callback;
　　//callbackという箱の中にe.parameter.callbackを入れる
    if (callback) {
        responseText = callback + "(" + JSON.stringify(result) + ")";
        //JSONはJavaScript Object Notationの略称であり、テキストベースの構造データ表現フォーマットのことを表す
        //決められた形で書かれている文字列のこと
        //JSで書く場合はstringify()という文字が必要
        //JSON型のresultを文字列型に変換するという意味の一文
        //Mime Typeをapplication/javascriptに設定
        out.setMimeType(ContentService.MimeType.JAVASCRIPT);

    } else {
        responseText = JSON.stringify(result);
        //Mime Typeをapplication/jsonに設定
        out.setMimeType(ContentService.MimeType.JSON);
    }


    //JSONPテキストをセットする
    out.setContent(responseText);

    PropertiesService.getScriptProperties().setProperty("key","value");

    return out;
}
　 //結末
function testLogic() {
    let e = {
        "parameter": {
            "text": "hello",
            "callback": "myCallbackFunc"
        }
     //testLogicを押したときにhelloというtextが実装されcallbackが行われる。
     //callbackが概念でmyCallbackFuncが実際に表示されるもの
    };
    const out = doGet(e);
    const content = out.getContent();
    Logger.log("content=" + content);
}
　　//outという箱（変数）の中にdoGet(e)を入れる。
　　//contentという箱（変数）の中に out.getContent();を入れる。getContentは中身が更新されると読み込まれるのでoutで打ち消す。
　  //Logger.logはconsole.logに似たもの。
muteHttpExceptions: true
 //UrlFetchApp.fetch() メソッドには muteHttpExceptions オプションというものがあり、これを true に指定しておくとエラーを吐かずに HttpResponse を返してくれます


