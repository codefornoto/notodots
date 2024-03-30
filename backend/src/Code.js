function doGet() {
  var texts = getData(); // スプレッドシートからデータを取得

  var htmlOutput = HtmlService.createHtmlOutputFromFile('index')
    .setTitle('Canvas Animation')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);

  // データをHTMLページに渡す
  htmlOutput.append("<script>var texts = " + JSON.stringify(texts) + ";</script>");
  
  return htmlOutput;
}

function getData() {
  var ss = SpreadsheetApp.openById("1BCukBp8I0OzC-xPLot0GlM9YFD_FcT-1m88dK4a4uRA"); // スプレッドシートの ID を指定
  var sheet = ss.getSheetByName("Message"); // "dev" シートを指定

  // テキストを格納する配列
  var texts = [];

  // "C2" セル以降のテキストを配列に格納
  var data = sheet.getRange("B2:B").getValues();
  data.forEach(function(row) {
    if (row[0] !== "") {
      texts.push(row[0]);
    }
  });

  return texts;
}
