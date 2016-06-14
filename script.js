$(document).ready(function(){

var gameOver=true;
var currentState= {};
var symbols = ['&times;' , '&#9675;'];
var currentStep=0;

//Arrow point to who is the first player
var showArrow = function(p){
  if(p%2===0){
    $('.player1 > .arrow').removeClass('inv');
    $('.player2 > .arrow').addClass('inv');
  }else{
    $('.player1 > .arrow').addClass('inv');
    $('.player2 > .arrow').removeClass('inv');
  }
};

var winResizeHandler = function(){
//when you resize the screen, the table will resize and x,and o will resize as well
   var w1 = $('.content').width();
   $('.content').height(w1).css({
       'font-size':w1 + 'px',
       'line-height':w1 * 0.92 + 'px',

});

};
//all the possible combination to win the game
var winningCombination = {
  combin0:[0,1,2],
  combin1:[0,3,6],
  combin2:[0,4,8],
  combin3:[1,4,7],
  combin4:[2,5,8],
  combin5:[2,4,6],
  combin6:[3,4,5],
  combin7:[6,7,8],

};

//all the possible combination for one key.
var potentialCombos = {
0:['combin0','combin1','combin2'],
1:['combin3','combin0'],
2:['combin4','combin5','combin0'],
3:['combin6','combin1'],
4:['combin2','combin3','combin6','combin5'],
5:['combin4','combin6'],
6:['combin1','combin5','combin7'],
7:['combin3','combin7'],
8:['combin2','combin4','combin7'],
};


var checkCombo=function(a){
  var a0=currentState[a[0]],
      a1=currentState[a[1]],
      a2=currentState[a[2]];

  var w2 = (a0 === a1 && a1 === a2)
  if (w2) {
            $('.content[data-i="' + a[0] + '"]').addClass('win');
            $('.content[data-i="' + a[1] + '"]').addClass('win');
            $('.content[data-i="' + a[2] + '"]').addClass('win');
        }
        return w2;
    };

 //initialization the game
var initGame = function() {
  if (gameOver){
    $('.content').empty();
    for (var i=0; i<9; i++) {
      currentState[i]=null;
    }
    currentStep = 0;
    showArrow(currentStep);
    gameOver = false;
    $('.content').removeClass('win');
    $('.ss').text('');
  }

};
initGame();

 $('.content').click(function(e){
//whether game is over or not, if not record the click!
  if(!gameOver){
    var i = $(this).data('i');
    // currentState is an array consists of all the symbols
    if (currentState[i]===null) {
      var s = symbols[currentStep++ %2];
      currentState[i]=s;
      $(this).html(s);
      debugger
    for (var j=0, len=potentialCombos[i].length; j<len; j++){
      var winning=winningCombination[potentialCombos[i][j]];
      if (checkCombo(winning)){
          gameOver=true;
          $('.ss').text('You win!!! Press any key to start new game.');
          return;
      }
     }
     if(currentStep===9){
          gameOver=true;
          $('.ss').text('Draw!! Press any kay to start new game.');
          return;
      // alert('Tie!!! Play it Again!!')
     }
     showArrow(currentStep);
    }
   }
 });


$(window)
  .resize(winResizeHandler)
  .keydown(function(e){
     e.preventDefault();
     initGame();
});

winResizeHandler();

});












