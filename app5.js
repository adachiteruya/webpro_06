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
  else if( num==2 ) luck = '中吉';
  console.log( 'あなたの運勢は' + luck + 'です' );
  res.render( 'luck', {number:num, luck:luck} );
});

app.get("/janken", (req, res) => {
  let hand = req.query.hand;
  let win = Number( req.query.win );
  let total = Number( req.query.total );
  console.log( {hand, win, total});
  const num = Math.floor( Math.random() * 3 + 1 );
  let cpu = '';
  if( num==1 ) cpu = 'グー';
  else if( num==2 ) cpu = 'チョキ';
  else cpu = 'パー';
  // ここに勝敗の判定を入れる
  // 今はダミーで人間の勝ちにしておく
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
  //win += 1;
  //total += 1;
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
  console.log( {face, win, total});
  const num = Math.floor( Math.random() * 4 + 1 );
  let cpu = '';
  if( num==1 ) cpu = '上';
  else if( num==2 ) cpu = '下';
  else if( num==3 ) cpu = '左';
  else cpu = '右';
  // ここに勝敗の判定を入れる
  // 今はダミーで人間の勝ちにしておく
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
  //win += 1;
  //total += 1;
  const display = {
    your: face,
    cpu: cpu,
    judgement: judgement,
    win: win,
    total: total
  }
  res.render( 'hoi', display );
});



app.listen(8080, () => console.log("Example app listening on port 8080!"));
