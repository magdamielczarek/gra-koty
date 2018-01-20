
// GAME COMPONENTS
const boxes = document.querySelectorAll('.box');
const jokers = document.querySelectorAll('.joker');
const good_cats = document.querySelectorAll('.good');

//ANCILLARY VARIABLES
let last_index;
let timeup = false;
let game_is_end = false;
let running;

// BUTTONS 
const start_btn = document.querySelector('.start-button');
const close = document.querySelector('.close-modal');
const close_start_modal = document.querySelector('.close-start-modal'); 

//COMMUNICATION
const info = document.querySelector('.info');
const modal = document.querySelector('.modal');
const start_modal = document.querySelector('.start-modal');
const final_scores = document.querySelector('.final_scores');
const score_board = document.querySelector('.scores');

//SOUNDS
const miau = new Audio("sounds/cat.mp3");
   miau.loop = false;
   miau.autoplay = false;


//RANDOMIZATION
function random_time (min,max){
  return Math.round(Math.random() * (max-min)+min);
}

function random_box (boxes){
	const index = Math.floor(Math.random() * boxes.length);
  if(index===last_index){
    return random_box(boxes);  
  }
  last_index = index;
  return index;
}

function random_cat () {
	return Math.floor(Math.random()*6);
 }

//DISPLAYING CATS

function show () {
	const time = random_time(500,1200);
  const box_index = random_box(boxes);
  const cats = boxes[box_index].querySelectorAll('.cat');
  let cat = cats[random_cat()];
  if(game_is_end){
    return;
  };
  cat.classList.add("show-cat");
  setTimeout(()=>{
    cat.classList.remove("show-cat");
    if(!timeup){show()};
	},time);
}


//GAME LOOP

// start
function start () {
  if(running){
    return;
  }
  start_btn.classList.add('passive-button');
  timeup = false;
  game_is_end = false;
  scores = 0;
  score_board.innerText = scores;
  //modal.classList.remove('show-modal');
  show();
  running = setTimeout(()=>{
    timeup = true;
    if(!game_is_end){
      end_game();
    }
  },25000);
}

// stop

function end_game () {
  clearTimeout(running);
  timeup = true;
  running = false;
  start_btn.classList.remove('passive-button');
  if(scores>0){
    info.innerText = 'Gratulacje!';
    final_scores.innerText = scores;
  } else {
    info.innerText = 'Mistrzem głaskania, to Ty nie jesteś...';
    final_scores.innerText = scores;
  };
  modal.classList.add("show-modal");
}

function game_over (event) {
  if(!event.isTrusted){
    return;
  } else {
  miau.play();
  game_is_end = true;
  end_game();
  }   
}

//  adding scores

function clicked (event) {
  if(!event.isTrusted){
      return;
  } else {
    scores++;
    score_board.innerText = scores;
    this.classList.remove("show-cat");
  }
}

// EVENTS FOR BUTTONS

good_cats.forEach((element)=>element.addEventListener("click",clicked));

jokers.forEach((element)=>element.addEventListener("click",game_over));

start_btn.addEventListener('click',start);

close.addEventListener('click',(event)=>{
    modal.classList.remove('show-modal');
    score_board.innerText = "0";
});

close_start_modal.addEventListener('click',(event)=>{
    start_modal.classList.remove('show-modal');
});

// BEGIN OF THE GAME WITH RULES - MODAL
start_modal.classList.add('show-modal');