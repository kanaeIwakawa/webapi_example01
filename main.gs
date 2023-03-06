//HTTP GETをハンドリングする
function doGet(e) {

    //リクエストパラメータ名"text"の値を取得する
    var text = e.parameter.text;

    var value;

    if (text) {
        value = "You say " + text;
    } else {
        value = "Please say something!";
    }

    var result = {
        message: value
    }

    var responseText;

    var out = ContentService.createTextOutput();

    var callback = e.parameter.callback;

    if (callback) {
        responseText = callback + "(" + JSON.stringify(result) + ")";
        //Mime Typeをapplication/javascriptに設定
        out.setMimeType(ContentService.MimeType.JAVASCRIPT);

    } else {
        responseText = JSON.stringify(result);
        //Mime Typeをapplication/jsonに設定
        out.setMimeType(ContentService.MimeType.JSON);
    }


    //JSONPテキストをセットする
    out.setContent(responseText);

    return out;
}

function testLogic() {
    var e = {
        "parameter": {
            "text": "hello",
            "callback": "myCallbackFunc"
        }
    };
    var out = doGet(e);
    var content = out.getContent();
    Logger.log("content=" + content);
}

function testGet() {

    var url = ScriptApp.getService().getUrl() + "?text=Hello&callback=myFunc001";
    Logger.log("url=" + url);

    var options = {
        "method": "GET",
        "followRedirects": true,
    };

    var response = UrlFetchApp.fetch(url, options);
    Logger.log("response=" + response);
}