/** リッチメニューに関するクラス */
class RichMenu {

  constructor() {
    this.ACCESS_TOKEN = "";
  }


  /** リッチメニューを新規アップロードするメソッド
 * @param{object} リッチメニューオブジェクト
 */
  createRichMenu(richMenuSource) {
    const url = "https://api.line.me/v2/bot/richmenu";
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.ACCESS_TOKEN,
    };

    const payload = ENUM_RICHMENU[richMenuSource];

    const options = {
      'headers': headers,
      'method': 'post',
      'payload': JSON.stringify(payload),
    };

    const id = UrlFetchApp.fetch(url, options);
    return `リッチメニューID[${id}]を作成しました`
  }

}


/** TEST用関数 */
function testRichMenu() {

  //インスタンス生成
  const r = new RichMenu();
  console.log(r); //{}

  //リッチメニューオブジェクトの取得
  const richMenuSource = ENUM_RICHMENU["testRichMenuSource"];
  console.log(richMenuSource);

  //リッチメニューオブジェクトのアップロード
  const result = r.createRichMenu(richMenuSource);
  console.log(result);

}
