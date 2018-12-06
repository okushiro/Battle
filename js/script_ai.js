
//関数定義

// 頻度の計算
const freqCalc = function(arr) {
    let sum = 0;
    arr.forEach(function(elm) {
        sum += elm;
    });
    let val = [0,0,0,0];
    for(let i=0;i<=3;i++){
        val[i] = arr[i]/sum;
    }
    return val
};


let count1 = 0; //自分の溜め数
let count2 = 0; //相手の溜め数
let cpMove = ''; //相手の動き
let myMove = ''; //自分の一つ前の動き


const btnHide = function(){
    if(count1 === 0){
        $('#btn2').hide();
        $('#btn2-fake').show();
        $('#btn4').hide();
        $('#btn4-fake').show();
    }else if(count1 > 0 && count1 < 3){
        $('#btn4').hide();
        $('#btn4-fake').show();
    }
}

const btnShow = function(){
    if(count1 >= 3){
        $('#btn4-fake').hide();
        $('#btn4').show();
    }else if(count1 >=1){
        $('#btn2-fake').hide();
        $('#btn2').show();
    }
}

const lose = function(){
    $('#message').html('LOSE');
    $('#body').css('background-color','#1e90ff');
    $('#body').css('color','#ffffff');
    loseTimes += 1;
}

const win = function(){
    $('#message').html('WIN');
    $('#body').css('background-color','#ff4500');
    $('#body').css('color','#ffffff');
    winTimes += 1;
}

const fin = function(){
    $('#btn1').hide();
    $('#btn2').hide();
    $('#btn2-fake').hide();
    $('#btn3').hide();
    $('#btn4').hide();
    $('#btn4-fake').hide();
    $('#btn5').show();
    $('#btn6').show();
    $('#rate').show();
    $('#rate').html(winTimes + "勝" + loseTimes + "敗");
    localStorage.setItem('loseTimes',loseTimes);
    localStorage.setItem('winTimes',winTimes);
}

const imgHide = function(){
    $('#img1').hide();
    $('#img2').hide();
    $('#img3').hide();
    $('#img4').hide();
    $('#img5a').hide();
    $('#img5b').hide();
}


// AIの設定

if(localStorage.getItem('freq')){
    // 初期値
    var freq = JSON.parse(localStorage.getItem('freq'));

    // 事前確率
    var preProb = JSON.parse(localStorage.getItem('preProb'));

}else{
    // 初期値
    var freq = [
        [5,5,5,5],
        [5,5,5,5],
        [5,5,5,5],
        [5,5,5,5]
    ];

    // 事前確率
    var preProb = [
        [1/4, 1/4, 1/4, 1/4],
        [1/4, 1/4, 1/4, 1/4],
        [1/4, 1/4, 1/4, 1/4],
        [1/4, 1/4, 1/4, 1/4]
    ];
}


//相手の動き
const cpMoveRes = function(){
    const random = Math.random();
    if(myMove === ''){
        cpMove = 0;
    }else if(count2 === 3){
        cpMove = 3;
    }else if(random < preProb[myMove][0]){
        if(count2 === 0){
            cpMove = 0;
        }else{
            cpMove = 1;
        }
    }else if(random >= preProb[myMove][0] && random < preProb[myMove][0]+preProb[myMove][1]){
        cpMove = 2;
    }else{
        cpMove = 0;
    }
    
    if(cpMove === 0){
        $('#computer').html('溜め');
        count2 += 1;
    }else if(cpMove === 1){
        $('#computer').html('波動弾');
        count2 -= 1;
    }else if(cpMove === 2){
        $('#computer').html('ガード');
    }else{
        $('#computer').html('ビーム');
        count2 -= 3;
    }
}


//勝ち数設定
if(localStorage.getItem('winTimes')){
    var winTimes = Number(localStorage.getItem('winTimes'));
    var loseTimes = Number(localStorage.getItem('loseTimes'));
}else{
    var winTimes = 0;
    var loseTimes = 0;
}


// 表示および計算

btnHide();
imgHide();
$('#btn5').hide();
$('#btn6').hide();

//隠し画像
const imgProb = Math.random();
if(imgProb > 0.1){
    $('#img5a').show();
}else{
    $('#img5b').show();
}

//溜め
$('#btn1').on('click', function(){
    //相手
    cpMoveRes();
    $('#count2').html(count2);

    //自分
    imgHide();
    $('#img1').show();
    count1 += 1;
    $('#btnbox').css('display','none');
    btnHide();
    btnShow();
    $('#count1').html(count1);
    if(cpMove == 1 || cpMove ==3){
        lose();
        fin();
    }
    $('#btnbox').slideDown(1000);

    // 確率の更新
    if(myMove === ''){
        myMove = 0;
    }else{
        freq[myMove][0] += 1;
        let freq_calc = freqCalc(freq[myMove]);
        for(let i=0;i<=3;i++){
            preProb[myMove][i] = freq_calc[i]*preProb[myMove][i];
        }
        preProb[myMove] = freqCalc(preProb[myMove]);
        myMove = 0;
        localStorage.setItem('freq', JSON.stringify(freq));
        localStorage.setItem('preProb', JSON.stringify(preProb));
    }
});

//波動弾
$('#btn2').on('click', function(){
    //相手
    cpMoveRes();
    $('#count2').html(count2);

    //自分
    imgHide();
    $('#img2').show();
    count1 -= 1;
    $('#btnbox').css('display','none');
    btnHide();
    btnShow();
    $('#count1').html(count1);
    if(cpMove === 0){
        win();
        fin();
    }else if(cpMove === 3){
        lose();
        fin();
    }
    $('#btnbox').slideDown(1000);

    // 確率の更新
    freq[myMove][1] += 1;
    let freq_calc = freqCalc(freq[myMove]);
    for(let i=0;i<=3;i++){
        preProb[myMove][i] = freq_calc[i]*preProb[myMove][i];
    }
    preProb[myMove] = freqCalc(preProb[myMove]);
    myMove = 1;
    localStorage.setItem('freq', JSON.stringify(freq));
    localStorage.setItem('preProb', JSON.stringify(preProb));
});

//ガード
$('#btn3').on('click', function(){
    //相手
    cpMoveRes();
    $('#count2').html(count2);

    //自分
    imgHide();
    $('#img3').show();
    $('#btnbox').css('display','none');
    btnHide();
    btnShow();
    if(cpMove === 3){
        lose();
        fin();
    }
    $('#btnbox').slideDown(1000);

    // 確率の更新
    if(myMove === ''){
        myMove = 2;
    }else{
        freq[myMove][2] += 1;
        let freq_calc = freqCalc(freq[myMove]);
        for(let i=0;i<=3;i++){
            preProb[myMove][i] = freq_calc[i]*preProb[myMove][i];
        }
        preProb[myMove] = freqCalc(preProb[myMove]);
        myMove = 2;
        localStorage.setItem('freq', JSON.stringify(freq));
        localStorage.setItem('preProb', JSON.stringify(preProb));
    }
});

//ビーム
$('#btn4').on('click', function(){
    //相手
    cpMoveRes();
    $('#count2').html(count2);

    //自分
    imgHide();
    $('#img4').show();
    count1 -= 3;
    $('#btnbox').css('display','none');
    btnHide();
    btnShow();
    $('#count1').html(count1);
    if(cpMove !== 3){
        win();
        fin();
    }
    $('#btnbox').slideDown(1000);

    // 確率の更新
    freq[myMove][3] += 1;
    let freq_calc = freqCalc(freq[myMove]);
    for(let i=0;i<=3;i++){
        preProb[myMove][i] = freq_calc[i]*preProb[myMove][i];
    }
    preProb[myMove] = freqCalc(preProb[myMove]);
    myMove = 3;
    localStorage.setItem('freq', JSON.stringify(freq));
    localStorage.setItem('preProb', JSON.stringify(preProb));
});


$('#btn5').on('click', function(){
    location.reload();
});