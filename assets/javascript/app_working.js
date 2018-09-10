var fighters = {
    character: [
        {
            name: "elizabeth",
            image: "",
            health: 120,
            attack: 8,
            counterAttack: 15,
            enemyDefeated: false
        }, {
            name: "elinor",
            image: "",
            health: 100,
            attack: 14,
            counterAttack: 5,
            enemyDefeated: false   
        }, {
            name: "emma",
            image: "",
            health: 150,
            attack: 8,
            counterAttack: 20,
            enemyDefeated: false
        }, {
            name: "anne",
            image: "",
            health: 180,
            attack: 7,
            counterAttack: 25,
            enemyDefeated: false
        }
    ]
}

console.log(fighters.character[0].name)
console.log(fighters.character[1].name)
console.log(fighters.character[2].name)
console.log(fighters.character[3].name)

var enemies = [];
var played = [];
var fighter = "";
var enemy = "";
var fighterHealth = 0;
var fighterAttack = 0;
var fighterAttackBase = 0;
var enemyHealth = 0;
var enemyCounterAttack = 0;
var nextEnemy = [];

//create div of characters
function reset() {
for (var i = 0; i < fighters.character.length; i++) {
    var characterStartPosition = $("<h1>")
    characterStartPosition.addClass("col-sm-3 fighter")
    characterStartPosition.attr("data-fighter",fighters.character[i].name);
    characterStartPosition.text(fighters.character[i].name);
    $("#start-position").append(characterStartPosition);
}
}
reset();

//pick fighter and move rest of defenders to enemies section
function pickFighter() {
    fighter = $(this).attr("data-fighter");

    $("#character-section").append(fighter);
    $("#start-position").empty()

    //creates an array of enemies
    $(fighters.character).each(function(j) {
        if (fighter != fighters.character[j].name) {
            enemies.push(fighters.character[j].name)
        }
        console.log(enemies);
    })

    generateEnemiesDiv (enemies)

    //put fighter's health and attack power in variables
    $(fighters.character).each(function(i) {
        if (fighter === fighters.character[i].name) {
            fighterHealth = fighters.character[i].health
            fighterAttack = fighters.character[i].attack
            fighterAttackBase = fighters.character[i].attack
            console.log(fighterHealth)
            console.log(fighterAttack)
            console.log(fighterAttackBase)
        }
    })

}

//generate enemies array and update on page
function generateEnemiesDiv (enemies){
    $("#enemies-section").empty();
        $(enemies).each(function(k) {
            var enemiesDiv = $("<h1>");
            enemiesDiv.addClass("col-sm-4 enemy");
            enemiesDiv.attr("data-enemy",enemies[k]);
            enemiesDiv.text(enemies[k]);
            $("#enemies-section").append(enemiesDiv);
        })
    $("#enemies-section-title").show()

}

//pick defender and move to defender section
function pickDefender() {
    enemy = $(this).attr("data-enemy");

    $("#defender-section").append(enemy)

    $(enemies).each(function(l) {
        if (enemy != enemies[l] && played.includes(enemies[l]) === false) {
            nextEnemy.push(enemies[l]);
            console.log("MATCH");
            console.log(nextEnemy);
            generateEnemiesDiv(nextEnemy)
        }
        else {
            played.push(enemies[l]);
        }
        
        console.log("enemies: " + nextEnemy);
        console.log("played:  " + played);

    if (nextEnemy.length ===0) {
        $("#enemies-section").empty();
        $("#enemies-section-title").hide();
    }
    })

    //put enemies health and attach power in variables
    $(fighters.character).each(function(i) {
        if (enemy === fighters.character[i].name) {
            enemyHealth = fighters.character[i].health
            enemyCounterAttack = fighters.character[i].counterAttack
            console.log(enemyHealth)
            console.log(enemyCounterAttack)
        }
    })
}




$("#attack").on("click", function() {

    console.log(fighter)
    console.log(enemy)

    //calculate hit on enemy
    enemyHealth = enemyHealth - fighterAttack
    console.log("Enemy Health: " + enemyHealth)

    //calculate hit on fighter
    fighterHealth = fighterHealth - enemyCounterAttack
    console.log("Fighter Health: " + fighterHealth)

    //increase fighters attack strength
    fighterAttack = fighterAttack + fighterAttackBase
    console.log("Fighter Attack Power: " + fighterAttack)

    if (enemyHealth < 1) {
        $("#defender-section").empty();
        alert("You beat " + enemy + ". Pick another enemy to fight.")
    }

    if (fighterHealth < 1) {
        alert("You lose.")
        reset();
        $("#character-section").empty()
        $("#enemies-section").empty()
        $("#defender-section").empty()
    }

    if (nextEnemy.length ===0 && enemyHealth < 1) {
        alert("YOU WIN")
    }


})

//click event for picking fighter
$(document).on("click", ".fighter", pickFighter);
//click event for picking defender
$(document).on("click", ".enemy", pickDefender);