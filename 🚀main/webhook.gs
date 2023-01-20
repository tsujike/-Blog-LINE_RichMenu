/** メッセージが送付された際に、実行される関数 */
function doPost(e) {

  const event = JSON.parse(e.postData.contents).events[0];

  const userMessage = event.message.text;
  const timestamp = Utilities.formatDate(new Date(event.timestamp), "JST", "yyyyMMdd_hh:mm:ss");
  const userId = event.source.userId;

  GmailApp.sendEmail("info@gmail.com", "メッセージが送信されました", [userId,timestamp,userMessage]);

}