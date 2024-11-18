const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));

app.get("/hello1", (req, res) => {
  const message1 = "Hello world";
  const message2 = "Bon jour";
  res.render('show', { greet1:message1, greet2:message2});
});

app.get("/hello2", (req, res) => {
  res.render('show', { greet1:"Hello world", greet2:"Bon jour"});
});

app.get("/icon", (req, res) => {
  res.render('icon', { filename:"./public/Apple_logo_black.svg", alt:"Apple Logo"});
});

app.get("/luck", (req, res) => {
  const num = Math.floor( Math.random() * 6 + 1 );
  let luck = '';
  if( num==1 ) luck = '大吉';
  else if( num==2 ) luck = '吉';
  else if( num==3 ) luck = '中吉';
  else if( num==4 ) luck = '小吉';
  else if( num==5 ) luck = '末吉';
  else if( num==6 ) luck = '凶';
  console.log( 'あなたの運勢は' + luck + 'です' );
  res.render( 'luck', {number:num, luck:luck} );
});

app.get("/janken", (req, res) => {
  let hand = req.query.hand;
  let win = Number( req.query.win );
  let total = Number( req.query.total );
  console.log( {hand, win, total} );
  const num = Math.floor( Math.random() * 3 + 1 );
  let cpu = '';
  if( num==1 ) cpu = 'グー';
  else if( num==2 ) cpu = 'チョキ';
  else cpu = 'パー';
  
  let judgement = '';
  if( hand == 'グー' ) {
    if( num==1 ) {judgement = 'あいこ';}
    else if( num==2 ) {judgement = '勝ち', win += 1;}
    else {judgement = '負け';}
    total += 1;
  }
  if( hand == 'チョキ' ) {
    if( num==1 ) {judgement = '負け';}
    else if( num==2 ) {judgement = 'あいこ';}
    else {judgement = '勝ち', win += 1;}
    total += 1;
  }
  if( hand == 'パー' ){ 
    if( num==1 ) {judgement = '勝ち', win += 1;}
    else if( num==2 ) {judgement = '負け';}
    else {judgement = 'あいこ';}
    total += 1;
  }
  
  const display = {
    your: hand,
    cpu: cpu,
    judgement: judgement,
    win: win,
    total: total
  }
  res.render( 'janken', display );
});

app.get("/hoi", (req, res) => {
  let face = req.query.face;
  let win = Number( req.query.win );
  let total = Number( req.query.total );
  console.log( {face, win, total} );
  const num = Math.floor( Math.random() * 4 + 1 );
  let cpu = '';
  if( num==1 ) cpu = '上';
  else if( num==2 ) cpu = '下';
  else if( num==3 ) cpu = '左';
  else cpu = '右';
  
  let judgement = '';
  if( face == '上' ) {
    if( num==1 ) {judgement = '負け';}
    else if( num==2 ) {judgement = '勝ち', win += 1;}
    else if( num==3 ) {judgement = '勝ち', win += 1;}
    else {judgement = '勝ち', win += 1;}
    total += 1;
  }
  if( face == '下' ) {
    if( num==1 ) {judgement = '勝ち', win += 1;}
    else if( num==2 ) {judgement = '負け';}
    else if( num==3 ) {judgement = '勝ち', win += 1;}
    else {judgement = '勝ち', win += 1;}
    total += 1;
  }
  if( face == '左' ){ 
    if( num==1 ) {judgement = '勝ち', win += 1;}
    else if( num==2 ) {judgement = '勝ち', win += 1;}
    else if( num==3 ) {judgement = '負け';}
    else {judgement = '勝ち', win += 1;}
    total += 1;
  }
  if( face == '右' ){ 
    if( num==1 ) {judgement = '勝ち', win += 1;}
    else if( num==2 ) {judgement = '勝ち', win += 1;}
    else if( num==3 ) {judgement = '勝ち', win += 1;}
    else {judgement = '負け';}
    total += 1;
  }
  
  const display = {
    your: face,
    cpu: cpu,
    judgement: judgement,
    win: win,
    total: total
  }
  res.render( 'hoi', display );
});

app.get("/size", (req, res) => {
  let choice = req.query.choice;
  let win = Number( req.query.win );
  let total = Number( req.query.total );
  console.log( {choice, win, total} );

  // 1から5の数字を配列に格納
  let numbers = [1, 2, 3, 4, 5];

  // 配列をシャッフルする関数（Fisher-Yatesアルゴリズム）
  function shuffleArray(arr) {
      for (let i = arr.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1)); // 0からiの間でランダムなインデックスを選ぶ
          [arr[i], arr[j]] = [arr[j], arr[i]]; // 要素を交換
      }
  }

  // 配列をシャッフル
  shuffleArray(numbers);

  // それぞれの変数に代入
  let a = numbers[0];
  let b = numbers[1];
  let c = numbers[2];
  let d = numbers[3];
  let e = numbers[4];

  let num1;
  if( choice === 'A' ){ num1 = a; }
  else if( choice === 'B' ){ num1 = b; }
  else if( choice === 'C' ){ num1 = c; }
  else if( choice === 'D' ){ num1 = d; }
  else if( choice === 'E' ){ num1 = e; }

  let player = String(num1);

  const num2 = Math.floor( Math.random() * 5 + 1 );
  let cpu = '';
  if( num2==1 ) cpu = '1';
  else if( num2==2 ) cpu = '2';
  else if( num2==3 ) cpu = '3';
  else if( num2==4 ) cpu = '4';
  else cpu = '5';
  
  let judgement = '';
  if( num1 < num2 ) {
    {judgement = '負け';}
    total += 1;
  }
  if( num1 == num2 ) {
    {judgement = 'あいこ';}
    total += 1;
  }
  if( num1 > num2 ){ 
    {judgement = '勝ち', win += 1;}
    total += 1;
  }
  
  const display = {
    your: player,
    cpu: cpu,
    judgement: judgement,
    win: win,
    total: total
  }
  res.render( 'size', display );
});

app.listen(8080, () => console.log("Example app listening on port 8080!"));
