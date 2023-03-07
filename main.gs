//HTTP GETをハンドリングする
function doGet(e) {

    //リクエストパラメータ名"text"の値を取得する
    const text = e.parameter.text;

    let value;

    if (text) {
        value = "You say " + text;
    } else {
        value = "Please say something!";
    }

    const result = {
        message: value
    }

    let responseText;

    const out = ContentService.createTextOutput();

    const callback = e.parameter.callback;

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
    let e = {
        "parameter": {
            "text": "hello",
            "callback": "myCallbackFunc"
        }
    };
    const out = doGet(e);
    const content = out.getContent();
    Logger.log("content=" + content);
}

function testGet() {

    const url = ScriptApp.getService().getUrl() + "?text=Hello&callback=myFunc001";
    Logger.log("url=" + url);

    let options = {
        "method": "GET",
        "followRedirects": true,
    };

    const response = UrlFetchApp.fetch(url, options);
    Logger.log("response=" + response);
}