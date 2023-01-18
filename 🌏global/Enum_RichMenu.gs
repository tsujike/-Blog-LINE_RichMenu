const richMenuEnum = {

  testRichMenuSource: {
    "size": {
      "width": 2500,
      "height": 1686
    },
    "selected": false,
    "name": "99_richMenu_test",
    "chatBarText": "▲タップしてメニューを表示▲",
    "areas": [ //リッチメニューの画像下部に、垂直に3分割
      { //左
        "bounds": {
          "x": 0,
          "y": 1686 / 2,
          "width": 2500 / 3,
          "height": 1686 / 2
        },
        "action": {
          "type": "uri",
          "uri": "https://www.instagram.com/darvishsefat11/",
        }
      },
      { //中
        "bounds": {
          "x": 2500 / 3,
          "y": 1686 / 2,
          "width": 2500 / 3,
          "height": 1686 / 2
        },
        "action": {
          "type": "uri",
          "uri": "https://tonari-it.com/"
        }
      },
      { //右
        "bounds": {
          "x": (2500 / 3) * 2,
          "y": 1686 / 2,
          "width": 2500 / 3,
          "height": 1686 / 2
        },
        "action": {
          "type": "message",
          "text": "info@gmail.comまでメールしてくださいね",
        }
      }
    ]
  },

  testRichMenuSource2: {
    //2つ目以降はここに記述する
  }

}

//書き換え禁止処置
const ENUM_RICHMENU = Object.freeze(richMenuEnum);