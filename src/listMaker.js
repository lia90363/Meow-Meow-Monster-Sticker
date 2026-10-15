const category = 'RE.01 猴子'; // RE複刻
const seriesId = 1001; // LV照數字 無LV從1001
const stickerNumber = 907332385; // 貼圖圖片路徑編號

const lines = [
'讚', '謝謝!', '收到', '哈哈', 'OK唷', '動作：猴子比愛心', '快點!!!!', '喝熱水', '馬上爆富!(新春大吉)', 
'錢錢入帳', '(財富自由)', '我吃一口', '走!去吃飯', '謝謝乾爹', '請收下!', 'Hi', '刷刷(附魔法小卡)', 
'坐以待幣', '不客氣', '我是一根香蕉', '給你(附香蕉)', '欸~~~~~', '把錢放進來', '生存下來啦!', '我不是閒猴 我要工作的',
'(秘密交易))', '所以有買嗎', '錢欸', '(害怕)', '這是這個月的關係維護費', '吱!(附搶劫)', '打劫!', '吱!!(附人質)',
'可以給我嗎?', '怎麼這樣', '沒事了', '(進化)', '(退化)', '哦~~~', '你太吵了!汪!(附香蕉狗)'

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