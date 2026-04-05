const category = 'LV.1 遊戲';
const seriesId = 1;
const stickerNumber = 165296174; // 貼圖圖片路徑編號

const lines = [
'你沒有奶媽', '你摸不到奇遇', '你沒有情緣', '你沒有親友', '你邊緣到我看不到你', '沒有奶媽愛你', '你怎麼覺得我有剁手?', '拜託養我 養我', '製杖。', '看劍!', '吃老孫一棒!', '交粗乃!!', '抱抱', '要抱抱!', '唱歌 唱歌 唱歌', '抱團', '你的東西掉了', '(喵方認證)100%黑人', '(好人卡)你是個好人。', '(智商診斷書)87 不能再高了', '約嗎', '不約。', '(坐等吃瓜)', '打本啊', '(再300年)我等等就去睡了', '對方朝你發出了組隊邀請。', '對方拒絕了你的邀請。', '對方對你開啟了仇殺。', '哼唧—', '退下', '你的鍋', '(委屈)', '吸附附', '大爺行行好', '打碼', '老司機帶帶我!', '司機我要上車', '上車—!!!(速車 老司機)', '來，你的位置', '超速了，停車'

];

const mockStickers = lines.map((title, index) => {
  const numericId = seriesId * 100 + (index + 1);
  
  return {
    id: numericId.toString().padStart(4, '0'), 
    number: stickerNumber + (index),
    title,
    category,
  };
});

console.log(mockStickers);

// 終端機輸入：node src/listMaker.js