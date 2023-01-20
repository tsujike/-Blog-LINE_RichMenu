/** リッチメニューに関するクラス */
class RichMenu {

  constructor() {
    this.ACCESS_TOKEN = "ox4co5ohKzmT/kY9nh2K+FHbKjjzds5xEgK1yJzcZJ8LctJIb9Bp7RZmUWgcCNsdRLOXTZAWKSXk9OGqUvwp7eUlA9mDBCKB+mMjGjVvRJTi9TNd6VzGl0pmm8rFb3Cv1URKwABU3JCCkmvfzNb1TgdB04t89/1O/w1cDnyilFU=";
  }


  /** リッチメニューを新規アップロードするメソッド
   * @param{object} リッチメニューオブジェクト
   * @param{string} リッチメニューid
   */
  createRichMenu(richMenuSource) {
    const url = "https://api.line.me/v2/bot/richmenu";
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.ACCESS_TOKEN,
    };

    const payload = richMenuSource;

    const options = {
      'headers': headers,
      'method': 'post',
      'payload': JSON.stringify(payload),
    };

    const id = UrlFetchApp.fetch(url, options);
    return `リッチメニューID[${id}]を作成しました`
  }



  /** アップロードされている全リッチメニューIDの配列を取得するメソッド
   * @return{array} リッチメニューオブジェクトの配列
   */
  getRichMenuIds() {
    const url = "https://api.line.me/v2/bot/richmenu/list";
    const headers = {
      'Authorization': 'Bearer ' + this.ACCESS_TOKEN,
    };

    const options = {
      'headers': headers,
      'method': "get",
    };

    const richMenuIds = UrlFetchApp.fetch(url, options);
    const ids = JSON.parse(richMenuIds);
    return ids.richmenus;
  }


  /** リッチメニューを削除するメソッド
   * @param{string} リッチメニューid
   */
  deleteRichMenu_(id) {
    const richMenuId = id;
    const url = `https://api.line.me/v2/bot/richmenu/${richMenuId}`;
    const headers = {
      'Authorization': 'Bearer ' + this.ACCESS_TOKEN,
    };

    const options = {
      'headers': headers,
      'method': "delete",
    };

    const response = UrlFetchApp.fetch(url, options);
    const statusCode = response.getResponseCode();
    return `[${statusCode}]:リッチメニューオブジェクトを削除しました`
  }


  /** リッチメニューidsをスプレッドシートに出力するメソッド */
  setValuesRichMenuIds() {
    const ids = this.getRichMenuIds(); //[]
    const values = ids.map(element => { return Object.values(element) });

    //nameで降順ソートする
    values.sort((a, b) => { return a[1] < b[1] ? -1 : 1; });

    const sheet = SpreadsheetApp.openById("1UxX6rKm8BwN9irV0kKJgsvokAx1HLJDTOS3ccKBiXy4").getSheetByName("シート1");
    sheet.getRange(2, 5, values.length, values[0].length).setValues(values);
    return "スプレッドシートに貼り付けしました";
  }


  /** リッチメニュー画像アップロードとリッチメニューIDへの紐づけを行うメソッド
    * @param{string} リッチメニューid
    * @param{string} 画像のファイルID
    */
  uploadRichMenuImage(richMenuId, imageId) {

    const imageBlob = DriveApp.getFileById(imageId);

    const url = `https://api-data.line.me/v2/bot/richmenu/${richMenuId}/content`;
    const headers = {
      'Content-Type': 'image/jpeg',
      'Authorization': 'Bearer ' + this.ACCESS_TOKEN,
    };

    const options = {
      'headers': headers,
      'method': 'post',
      'payload': imageBlob
    };

    const response = UrlFetchApp.fetch(url, options);
    const statusCode = response.getResponseCode();
    return `[${statusCode}]リッチメニュー画像をアップロードしました`

  }


  /** ユーザーにリッチメニューをリンクする
   * @param{string} リッチメニューID
   * @param{string} ユーザーID
   * ※ただし、RichMenuImageが紐づいてないと送信不可
   */
  sendRichMenuToUser(richMenuId, userId) {

    const url = `https://api.line.me/v2/bot/user/${userId}/richmenu/${richMenuId}`;
    const headers = {
      'Authorization': 'Bearer ' + this.ACCESS_TOKEN,
    };

    const options = {
      'headers': headers,
      'method': "post",
    };

    const response = UrlFetchApp.fetch(url, options);
    const statusCode = response.getResponseCode();
    return `[${statusCode}]ユーザーにリッチメニューを送信しました`
  }


}


/** TEST用関数 */
function testRichMenu() {

  //インスタンス生成
  const r = new RichMenu();
  // console.log(r); //{}

  //リッチメニューオブジェクトを取得する
  const richMenuSource = ENUM_RICHMENU["testRichMenuSource"];
  // console.log(richMenuSource);

  //リッチメニューオブジェクトのアップロード
  // const result = r.createRichMenu(richMenuSource);
  // console.log(result);

  //アップロードされている全リッチメニューIDの配列を取得する
  // console.log(r.getRichMenuIds());

  //リッチメニューオブジェクトを削除する
  // const id = "richmenu-6110d3a177026a9be9296854562152ea";
  // console.log(r.deleteRichMenu_(id));

  //リッチメニュー一覧をスプレッドシートに出力する
  // console.log(r.setValuesRichMenuIds());

  //リッチメニュー画像アップロードとリッチメニューIDへの紐づけを行う
  // const richMenuId = "richmenu-80084483883fcb04aeba595d1e64fff4";
  // const imageId = "1ULNCgtGPSaB-04n_mO4WfuXfdRyi2Xx2";
  // console.log(r.uploadRichMenuImage(richMenuId, imageId));

  //ユーザーにリッチメニューをリンクする
  const richMenuId = "richmenu-80084483883fcb04aeba595d1e64fff4";
  const userId = "U071717f1c8812b9cc053a8084ef94d88";
  console.log(r.sendRichMenuToUser(richMenuId, userId));


}
