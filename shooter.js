// Images
function loadImages(){
	// Φορτωσή των είκονων enemy, ship , bullet
	enemyImage = new Image();
	shipImage = new Image();
	bulletImage = new Image();

	enemyImage.src = "Images/enemy1.png";
	shipImage.src = "Images/player.png"
	bulletImage.src = "Images/bullet.png"
}


function init(){
// document.getElementById('mycanvas') ανακτά το στοιχείο καμβά που ορίζεται στο αρχείο html χρησιμοποιώντας το id.
canvas = document.getElementById('mycanvas');
console.log(canvas); // Για τον εντοπισμό λαθών
gameover = false;

// context είναι ένα αντικείμενο που δημιουργήθηκε χρησιμοποιώντας τη συνάρτηση getContext ().
// context όλη η αλληλεπίδραση με τον καμβα γίνεται μέσω αυτού το οπόιο το παίρνουμε  απο το canvas DOM 
ctx = canvas.getContext('2d'); // 2d: περνάει για να κάνει διδιάστα παιχνίδια σε html

W = canvas.width;  // Πλάτος του καμβά (1255)
H = canvas.height; // Ύψος του καμβά  (580)
prev_counter = 0;  
counter = 0;
score = 0;

loadImages();

// Ship είναι το διαστημόπλοιο που δημιουργούμε.
ship = {
	// Διαστάσεις διαστημόπλοιου
	x : 600,
	y : H-55,
	w : 50,
	h : 50,
	speed : 35,
	bullets : [],

	update : function(){
		
	},

	draw : function(){
		// Οταν η εικόνα έχει φορτωθεί χρησιμοποιούμε την drawImage().

		ctx.drawImage(shipImage,ship.x,ship.y,ship.w,ship.h) 

		//Εμφανίζει την εικόνα img στις συντεταγμένες x και y κάνοντας την scale έτσι ώστε να έχει πλάτος width και ύψος height

	},
// Συνάσρτηση πυροβολισμός
	shoot : function(){

		if(counter-prev_counter>=1){
			console.log("Shooting a bullet");

			var b = new bullet(this.x + ((this.w)/2) -5, this.y,10);
			this.bullets.push(b);
			prev_counter = counter;

			enemies.forEach(function(enemy){

			if(isCollidingWithBullet(b,enemy)){  //Πεθαίνει ο εχθρός
				this.state = "inactive"; //Αδρανής
				console.log("enemy died");
				//alert("You hit an enemy!");
				score ++ ;
				var index = enemies.indexOf(enemy);
				enemies.splice(index,1);
	
				}

			});

		}
		
	}

};

// Συνάρητηση για τα κουμπία
// Listener for events
function buttonGotPressed(e){
	if(e.key==" "){
		ship.shoot();
	}
	//Βέλος αριστερά
	if(e.key=="ArrowLeft"){
		ship.x = ship.x - ship.speed;
		if(ship.x<=0){
			ship.x= 0;
		}
	}
	//Βέλος Δεξιά
	if(e.key=="ArrowRight"){
		ship.x = ship.x + ship.speed;
		if(ship.x >= W-ship.w){
			ship.x = W-ship.w;
		}
	}
}
// Η μέθοδος επισυνάπτει ένα πρόγραμμα χειρισμού συμβάντων στο έγγραφο.
document.addEventListener('keydown', buttonGotPressed);   
// Το keydown συμβάν ενεργοποιείται όταν πατηθεί ένα πλήκτρο.
//Όταν πατηθεί το πλήκτρο space, τότε το πλοίο πυροβολεί τη σφαίρα.

enemies = [];
var e = new enemy(10,20,5);
enemies.push(e);

}

// Class ορίζεται για μια σφαίρα.
function bullet(x,y,speed){
	this.x = x;
	this.y = y;
	this.w = 10;
	this.h = 20;
	this.state = "active" // State αντικειμενο αποθηκευει τιμες. Το αφηνουμε ενεργο
	this.speed = speed;

	this.draw = function(){
		// Οταν η εικόνα έχει φορτωθεί χρησιμοποιούμε την drawImage().

        ctx.drawImage(bulletImage,this.x,this.y,this.w,this.h);

		//Εμφανίζει την εικόνα img στις συντεταγμένες x και y κάνοντας την scale έτσι ώστε να έχει πλάτος width και ύψος height

	}

	this.update = function(){
		this.y -= this.speed;

		if(this.y<=0){
			this.state = "inactive"  //Αδρανης 
		}
	}

}

// Class ορίζεται για τον εχθρό.
function enemy(x,y,speed){
	this.x = x;
	this.y = y;
	this.w = 40;
	this.h = 40;
	this.state = "active"
	this.speed = speed;

	this.draw = function(){

		ctx.drawImage(enemyImage,this.x,this.y,this.w,this.h);

	}

	this.update = function(){

		this.x = this.x + this.speed;

		// Έλενχος οριακών συνθήκών
		if(this.x >= W-this.w || this.x<=0){
			this.speed *= -1;
		}

		this.y++;

		if(this.y<=0){
			this.state = "inactive"
		}
	}

}



function draw(){

	// Διαγράφουμε την παλιά οθόνη. Εδώ, διαγράφουμε ολόκληρη την οθόνη και την επανασχεδιάζουμε ξανά.
	ctx.clearRect(0,0,W,H);

	ctx.fillStyle = "red"  // to fill with red color.

	//Drawing the ship
	ship.draw()

	//Drawing the bullets
	ship.bullets.forEach(function(bullet){
		bullet.draw();
	});

	//Drawing the enemy
	enemies.forEach(function(enemy){
		enemy.draw();

	});


}

function update(){
	ship.update()

	ship.bullets.forEach(function(bullet){
		bullet.update();

	});

	enemies.forEach(function(enemy){
		enemy.update();
	});

    // Math.random() δημιουργει ένα τυχαίο αριθμό μεταξύ 0 & 1.
	var no =  Math.random();
	if(no<0.01){
		var x = Math.floor(Math.random()*(W-50));
		// Πολλαπλασιασμένος επί 100 για να δημιουργήσει εχθρούς στην περιοχή από 0 έως 100 εικονοστοιχεία.
		var y = Math.floor(Math.random()*100);

		var speed = Math.random()*10 +2;
		var negative = Math.random();
		if(negative<0.5){
			speed = -speed;
		}

		var e = new enemy(x,y,speed);
		enemies.push(e);
	}

	enemies.forEach(function(enemy){
		if(isColliding(ship,enemy)){
			alert("Game over!"+'\n'+"You kill: "+score+" enemies"+'\n'+"Press OK to restart!"); //Μήνυμα όταν τελέιωνει το παιχνίδι
			gameover = true;
		}

	});
	
	//add score
    ctx.font = "30px Verdana";
    ctx.textAlign = "center";
    ctx.fillStyle = "#66ff33";
    ctx.fillText("Score: " + score, mycanvas.width - 1175, 35);
}

//Συνάρτηση συγκρουσής 
function isColliding(r1,r2){
	var x_axis = Math.abs(r1.x - r2.x)<= Math.max(r1.w,r2.w);
	var y_axis = Math.abs(r1.y - r2.y)<= Math.max(r1.h,r2.h);

	return x_axis && y_axis;
} 

//Συνάρτηση σύγκρουσης με την σφαίρα
function isCollidingWithBullet(r1,r2){
	var x_axis = Math.abs(r1.x - r2.x)<= Math.max(r1.w,r2.w);
	var y_axis = Math.abs(r1.y - r2.y)<= Math.max(r1.h,r2.h);

	return x_axis || y_axis;
}

// Μια συνάρτηση για την κλήση της update() and draw()
function render(){
	draw();
	update();
	console.log("in render");
	counter++;

	// 	Παρόμοιο με το setInterval()
	if(gameover == false){
		// Παρόμοιο με το  setInterval()
		window.requestAnimationFrame(render);
	}
	else{
		startGame();
	}
}
	
function startGame(){
	init();
	render();
}

startGame();





