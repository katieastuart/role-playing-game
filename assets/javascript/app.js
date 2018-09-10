    $("#your-character").hide()
    $("#enemies-section-title").hide()
    $("#attack").hide()
    $("#your-defender").hide()

//object with fighter's information
var fighters = {
    character: [
        {
            name: "Elizabeth",
            image: "./assets/images/elizabeth_bennett.jpeg",
            health: 120,
            attack: 8,
            counterAttack: 15,
            defeated: false
        }, {
            name: "Elinor",
            image: "./assets/images/elinor_dashwood.jpeg",
            health: 100,
            attack: 14,
            counterAttack: 5,
            defeated: false   
        }, {
            name: "Emma",
            image: "./assets/images/emma_woodhouse.jpeg",
            health: 150,
            attack: 8,
            counterAttack: 20,
            defeated: false
        }, {
            name: "Anne",
            image: "./assets/images/anne_elliot.jpeg",
            health: 180,
            attack: 7,
            counterAttack: 25,
            defeated: false
        }
    ]
}

console.log(fighters.character[0].name)
console.log(fighters.character[1].name)
console.log(fighters.character[2].name)
console.log(fighters.character[3].name)

//setting initial variables
var enemies = [];
var played = [];
var fighter = "";
var enemy = "";
var fighterHealth = 0;
var fighterAttack = 0;
var fighterAttackBase = 0;
var enemyHealth = 0;
var enemyCounterAttack = 0;
var defeated = [];
var fighterValue = "";

//create div of characters
function resetCharacters() {
    for (var i = 0; i < fighters.character.length; i++) {
        var characterStartPosition = $("<div>")
        characterStartPosition.addClass("col-sm-3 fighter")
        characterStartPosition.attr("data-character",fighters.character[i].name);

        var name = $("<h4>").text(fighters.character[i].name)

        var img = $("<img>").attr("src", fighters.character[i].image);
        
        var health = $("<p id='health-section'>").text(fighters.character[i].health)

        characterStartPosition.append(img)
        characterStartPosition.append(name)
        characterStartPosition.append(health)

        // characterStartPosition.text(fighters.character[i].name);
        $("#start-position").append(characterStartPosition);
    }
}
//run resetCharacters for initial play
resetCharacters();

//function to reset the game
function reset() {
    resetCharacters();
    $("#character-section").empty()
    $("#enemies-section").empty()
    $("#defender-section").empty()
    enemies = [];
    played = [];
    fighter = "";
    enemy = "";
    fighterHealth = 0;
    fighterAttack = 0;
    fighterAttackBase = 0;
    enemyHealth = 0;
    enemyCounterAttack = 0;
    defeated = [];
    fighterValue = "";
    $("#your-character").hide()
    $("#enemies-section-title").hide()
    $("#attack").hide()
    $("#your-defender").hide()
}

//pick fighter and move rest of defenders to enemies section
function pickFighter() {
    $("#your-character").show()
    $("#enemies-section-title").show()
    fighter = $(this);
    fighterValue = $(this).attr("data-character");

    $("#character-section").append(fighter);
    $("#start-position").empty()

    //creates an array of enemies
    $(fighters.character).each(function(j) {
        if (fighterValue != fighters.character[j].name) {
            enemies.push(fighters.character[j].name)
        }
        console.log(enemies);
    })

    generateEnemiesDiv (enemies)

    //put fighter's health and attack power in variables
    $(fighters.character).each(function(i) {
        if (fighterValue === fighters.character[i].name) {
            fighterHealth = fighters.character[i].health
            fighterAttack = fighters.character[i].attack
            fighterAttackBase = fighters.character[i].attack
            console.log(fighterHealth)
            console.log(fighterAttack)
            console.log(fighterAttackBase)
        }
    })
    $("#enemies-section").show()
}

//generate enemies array and update on page
function generateEnemiesDiv (enemies){
    $("#enemies-section").empty();
        $(enemies).each(function(k) {
            var enemiesDiv = $("<div>");
            enemiesDiv.addClass("col-sm-4 enemy");
            enemiesDiv.attr("data-enemy",enemies[k]);

            var name = $("<h4>").text(enemies[k])
            var img = "";
            var health = "";

            $(fighters.character).each(function(m) {
            if (enemies[k] === fighters.character[m].name) {
                console.log(enemies[k] + ' ' + fighters.character[m].name)
                img = $("<img>").attr("src", fighters.character[m].image);
                
                health = $("<p id='health-section'>").text(fighters.character[m].health)
            }
            enemiesDiv.append(img)
            enemiesDiv.append(name)
            enemiesDiv.append(health)
        })
            // enemiesDiv.text(enemies[k]);
            $("#enemies-section").append(enemiesDiv);
        })
    // $("#enemies-section-title").show()

}

//pick defender and move to defender section
function pickDefender() {
    $("#your-defender").show()
    $("#attack").show()
    $("#enemies-section-title").hide()
    $("#enemies-section").hide()
    enemy = $(this).attr("data-enemy");

    $("#defender-section").empty();

    var enemyDiv = $("<div>")

            var name = $("<h4>").text(enemy)
            var img = "";
            var health = "";

            $(fighters.character).each(function(m) {
            if (enemy === fighters.character[m].name) {
                console.log(enemy + ' ' + fighters.character[m].name)
                img = $("<img>").attr("src", fighters.character[m].image);
                
                health = $("<p id='health-section-enemy'>").text(fighters.character[m].health)
            }
            enemyDiv.append(img)
            enemyDiv.append(name)
            enemyDiv.append(health)
        })

    $("#defender-section").append(enemyDiv)

    var nextEnemy = [];

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

//logic for attack
$("#attack").on("click", function() {

    console.log(fighter)
    console.log(enemy)

    //calculate hit on enemy
    enemyHealth = enemyHealth - fighterAttack
    console.log("Enemy Health: " + enemyHealth)
    $("#health-section-enemy").text(enemyHealth)

    //calculate hit on fighter
    fighterHealth = fighterHealth - enemyCounterAttack
    console.log("Fighter Health: " + fighterHealth)
    $("#health-section").text(fighterHealth)

    //increase fighters attack strength
    fighterAttack = fighterAttack + fighterAttackBase
    console.log("Fighter Attack Power: " + fighterAttack)

    //if the enemy loses all their health points
    if (enemyHealth < 1 && fighterHealth > 0) {
        $(fighters.character).each(function(p) {
            if (enemy === fighters.character[p].name) {
                defeated.push(enemy);
            }
        })

        //removes the enemy from the defender section
        $("#defender-section").empty();

        console.log("defeated #: " + defeated.length)

        //if there are still enemies left it tells you to pick another one, if all enemies have been defeated it tells you you've won and resets the game.
        if (defeated.length < 3) {
            alert("You beat " + enemy + ". Pick another enemy to fight.")
            $("#enemies-section-title").show()
            $("#enemies-section").show()
            $("#attack").hide()
            $("#your-defender").hide()
        } else {
            alert("YOU WIN")
            reset();
        }
    } 

    //if the fighter loses all their health points. tell you you've lost and resets game.
    if (fighterHealth < 1 && enemyHealth > 0 || fighterHealth < 1 && enemyHealth < 1) {
        alert("You lose.")
        reset();
    }

    // if(fighterHealth < 1 && enemyHealth < 1) {
    //     alert("You lose.")
    //     reset()
    // }
})

//click event for picking fighter
$(document).on("click", ".fighter", pickFighter);
//click event for picking defender
$(document).on("click", ".enemy", pickDefender);