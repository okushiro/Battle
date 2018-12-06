//関数定義
//1か2を返す
const makeNumber2 = function() {
    const number = Math.random() * 2;
    const randomNumber = Math.ceil(number);
    return randomNumber;
};

//1か2か3を返す
const makeNumber3 = function() {
    const number = Math.random() * 3;
    const randomNumber = Math.ceil(number);
    return randomNumber;
};

//1か3を返す
const makeNumber1or3 = function(){
    const number = Math.random() * 2;
    const randomNumber = Math.ceil(number);
    const dubble = randomNumber * 2;
    const res = 5 - dubble;
    return res;
};

let count1 = 0; //自分の溜め数
let count2 = 0; //相手の溜め数
let cpMove = 1; //相手の動き

//相手の動き
const cpMoveRes = function(){
    if(count1 === 0 && count2 === 0){
        cpMove = 1;
    }else if(count1 === 0 && count2 === 2){
        cpMove = 1;
    }else if(count2 === 3){
        cpMove = 4;
    }else if(count2 === 0){
        cpMove = makeNumber1or3();
    }else if(count1 === 0){
        cpMove = makeNumber2();
    }else{
        cpMove = makeNumber3();
    }
    
    if(cpMove === 1){
        $('#computer').html('溜め');
        count2 += 1;
    }else if(cpMove === 2){
        $('#computer').html('波動弾');
        count2 -= 1;
    }else if(cpMove === 3){
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


btnHide();
imgHide();
$('#btn5').hide();
$('#btn6').hide();

//隠し画像
const prob = Math.random();
if(prob > 0.1){
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
    if(cpMove == 2 || cpMove ==4){
        lose();
        fin();
    }
    $('#btnbox').slideDown(1000);
});

//波動弾
$('#btn2').on('click', function(){
    //相手
    $('#computer').html('ガード');

    //自分
    imgHide();
    $('#img2').show();
    count1 -= 1;
    $('#btnbox').css('display','none');
    btnHide();
    btnShow();
    $('#count1').html(count1);
    $('#btnbox').slideDown(1000);
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
    if(cpMove === 4){
        lose();
        fin();
    }
    $('#btnbox').slideDown(1000);
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
    if(cpMove !== 4){
        win();
        fin();
    }
    $('#btnbox').slideDown(1000);
});


$('#btn5').on('click', function(){
    location.reload();
});