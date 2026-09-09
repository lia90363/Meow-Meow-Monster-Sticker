const category = 'LV.80 狗狗';
const seriesId = 80;
const stickerNumber = 890826737; // 貼圖圖片路徑編號

const lines = [
'蛤', '我的世界在下雨', '狗狗流汗(動作)', '狗狗失望(動作)', '好安靜...(附熊熊)', '我以為我們永遠有話講...', '噴狗狗(附噴水器)', '(狗狗祟祟)', '(躺平)', '(大吸特吸)', '(難過小狗)', '你已經30秒沒有跟我講話了', '你是不是不要我了', '狗狗端茶(動作)', '狗狗撒嬌(動作)', '接我(附瓜皮安全帽)', '被接的狗狗(附推車)(動作)', '狗狗從廁所看你(動作)', '(翻滾)', '無力狗狗(動作)', '狗狗坐馬桶(動作)', '(咬被被)', '(譴責的眼神)', '我的呢?', '那個要', '好棒好棒(附按鈕)', '滾滾滾(附按鈕)', '陪我陪我(附按鈕)', '肉肉肉肉(附按鈕)', '謝謝(附按鈕)', '說話說話(附按鈕)', '吃飯吃飯(附按鈕)', '敲碗碗', '好呀', '狗狗給愛心(動作)', '狗狗咬你(動作)', '我最愛的人卻這樣對我...', '(哄不好了)', '你就罵我吧', '把最愛你的小狗罵走吧'

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