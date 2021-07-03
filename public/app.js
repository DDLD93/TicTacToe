const player = document.querySelectorAll('.mv-container'),
    gameContainer = document.querySelector(".main-container"),
    winingContainer = document.querySelector('.wining-container'),
    pl1Win = document.querySelector('.pl1-win'),
    plOWin = document.querySelector('.plO-win'),
    noWinner = document.getElementById('draw'),
    winnerText = document.getElementById('winner');

    var socket = io.connect('http://localhost:4200');
    socket.on('connect', function(data) {
       socket.on('playerORes', (e) => {
           let snum = e
        player.forEach(e => {
        var num = Number(e.dataset.mv);

            if(num == snum) {
                click('playerO', pl1, e, num)
            }
        })
    })

       socket.on('player1Res', (e) => {
        let snum = e
     player.forEach(e => {
        var num = Number(e.dataset.mv);

         if(num == snum) {
            click('player1', pl2, e, num)
         }
     })
    })
    socket.on('resetRes', () => {
        reset()
    })
});

    function click(ply, arr, event, cnum) {
        let field =  event.querySelector("div");
        field.classList.add(ply)
        arr.push(cnum)
        moves++;
        state = !state
        checked(arr)
}

player.forEach(e => {
    let currentConatainer = Number(e.dataset.mv);
    e.addEventListener('click', (e) => {
        if (state == true && won == false && drawn == false ) {
            
            socket.emit('playerO', currentConatainer);
            //click('playerO', pl1, e)
        }else if (state == false && won == false && drawn == false){
            
            socket.emit('player1', currentConatainer);
           // click('player1', pl2, e)
      } else {
        
               if (moves >= 9) { 
                  reset()
                    
             }else if (pl1w == true || pl2w == true) {
                   reset()
                  console.log('No draw')
               }
        }}
    )
})


// Array to keep track of players moves
let pl1 = [];
let pl2 = [];
var won = false;
let pl1w = false;
let pl2w = false;
// set who's turn to make the next move
var state = true
// total number of moves in each game session cannot exceed 9
var moves = 0
var drawn = false;
// winning combinations
let winCon = [[1,2,3],
              [4,5,6],
              [7,8,9],
              [3,6,9],
              [2,5,8],
              [1,4,7],
              [3,5,7],
              [1,5,9]];
// determining our winner
function checked(player) {
     for (let i = 0; i < winCon.length; i++) {
        var combination = winCon[i];
        //console.log(combination)
        let checker = (arr, arr2) => 
    arr2.every(v => 
        arr.includes(v));
        let checking = checker(player, combination)
            //console.log(checking)
            if (checking == true) {
             return true, won = true;
            }
            }
        };
// checking if we have a winner
// stoping the set interval listner after condition are meet
 function stopsetint(a) {
     clearInterval(a)
 };

 // listening if player won
const setintpl1 = setInterval(function winchecker() {
    if(checked(pl1) == true) {
        stopsetint(setintpl1)
        stopsetint(setintpl2)
        stopsetint(draw)
        pl1w = true
        gameContainer.style.webkitFilter = "blur(40px)";
        gameContainer.style.opaque = "1";
        winingContainer.style.visibility = "visible";
        plOWin.style.display = "block"
        console.log('we have our winner!! playerOne')}
         },500);
 // listening if player two won        
const setintpl2 = setInterval(function winchecker() {
    if(checked(pl2) == true) {
        stopsetint(setintpl1)
        stopsetint(setintpl2)
        stopsetint(draw)
        pl2w = true;
        gameContainer.style.webkitFilter = "blur(40px)";
        gameContainer.style.opaque = "1";
        winingContainer.style.visibility = "visible";
        pl1Win.style.display = "block";
        console.log('we have our winner!! playerTwo')}

        },500);
// listening if seesion is a draw
const draw = setInterval(function winchecker() {
    if(moves >= 9) {
        stopsetint(setintpl1)
        stopsetint(setintpl2)
        stopsetint(draw)
        drawn = true
        gameContainer.style.webkitFilter = "blur(40px)";
        gameContainer.style.opaque = "1";
        winingContainer.style.visibility = "visible";
        noWinner.style.visibility = "visible";
        winnerText.style.visibility = 'hidden'
        console.log('we have no winner')};
        },500);     
// creating a function  a reset game after game session
function reset() {
    var cons = document.querySelectorAll('.player1, .playerO')
    for (let i = 0; i < cons.length; i++) {
        const con = cons[i];
        con.classList.remove('player1', 'playerO')
       socket.emit('reset',)

    }
    pl1w = false;
    pl2w = false;
    won = false;
    state = 0;
    moves = 0;
    drawn = false;
    gameContainer.style.webkitFilter = "blur(0)";
    gameContainer.style.opaque = "1";
    winingContainer.style.visibility = "hidden";
    noWinner.style.visibility = "hidden";
    pl1Win.style.display = "none";
    plOWin.style.display = "none";
    pl1 = []
    pl2 = []

    const setintpl1 = setInterval(function winchecker() {
        if(checked(pl1) == true) {
                                stopsetint(setintpl1)
                                stopsetint(setintpl2)
                                stopsetint(draw)
                                pl1w = true
                                gameContainer.style.webkitFilter = "blur(40px)";
                                gameContainer.style.opaque = "1";
                                winingContainer.style.visibility = "visible";
                                plOWin.style.display = "block"
                                console.log('we have our winner!! playerOne')}
            
            },500);
const setintpl2 = setInterval(function winchecker() {
                if(checked(pl2) == true) {
                                stopsetint(setintpl1)
                                stopsetint(setintpl2)
                                stopsetint(draw)
                                pl2w = true;
                                gameContainer.style.webkitFilter = "blur(40px)";
                                gameContainer.style.opaque = "1";
                                winingContainer.style.visibility = "visible";
                                pl1Win.style.display = "block";
                                console.log('we have our winner!! playerTwo')}
            
                    },500);
const draw = setInterval(function winchecker() {
                            if(moves >= 9) {
                                stopsetint(setintpl1)
                                stopsetint(setintpl2)
                                stopsetint(draw)
                                drawn = true
                                gameContainer.style.webkitFilter = "blur(40px)";
                                gameContainer.style.opaque = "1";
                                winingContainer.style.visibility = "visible";
                                noWinner.style.visibility = "visible";
                                winnerText.style.visibility = 'hidden';
                                console.log('we have no winner')} 
                            },500);                                
    
}        


  //Adding event listeners to game field 
  //var gameFields = document.querySelectorAll('.player1, .playerO');
  winingContainer.addEventListener('click',function () {
   // if (pl1w == true || pl2w == true || drawn == true) {
      reset()
console.log('i work') //}
});
//winingContainer.addEventListener('click', function () {
 //   if (moves >= 9) {
       // reset()
       // console.log('i work too')});



//   for (let i = 0; i < player.length; i++) {
    

//     if (state == 0 && won == false && drawn == false ) {
//           click('player1', pl1)
//        }else if (state == 1 && won == false && drawn == false){
        
//     } else {
        
//         if (moves >= 9) { 
//             reset()
            
//         }else if (pl1w == true || pl2w == true) {
//             reset()
//             console.log('No draw')
//         }
        
        
           
//        }
//     })
        
// } 
   