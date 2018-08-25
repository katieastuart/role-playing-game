var fighters = {
    elizabeth: {
        name: "elizabeth",
        image: "",
        health: 120,
        attack: 6,
        counterAttack: 20,
        enemyDefeated: false
    },
    elinor: {
        name: "elinor",
        image: "",
        health: 100,
        attack: 6,
        counterAttack: 20,
        enemyDefeated: false
    },
    emma: {
        name: "emma",
        image: "",
        health: 150,
        attack: 6,
        counterAttack: 20,
        enemyDefeated: false
    },
    anne: {
        name: "anne",
        image: "",
        health: 180,
        attack: 6,
        counterAttack: 20,
        enemyDefeated: false
    }
}

//try using an array within the object. see 06.01 customer object

//creates an array of the names
const fighterName = Object.keys(fighters)
    console.log(fighterName)

var startPosition = $("#start-position");
var enemiesPosition = $("#enemies-section");

var attacker = "";

var enemies = [];

var enemy = "";

var played = [];

   //moves the enemies to the enemies section. TRY ADDING CONDITION IN HERE TO GET RID OF LAST DEFENDER WHEN YOU CLICK ON THEM
   function generateEnemiesDiv (enemies){
    $("#enemies-section").empty();
    $(enemies).each(function(k) {
        var enemiesDiv = $("<h1>");
        enemiesDiv.addClass("col-sm-4 enemy");
        enemiesDiv.attr("data-enemy",enemies[k]);
        enemiesDiv.text(enemies[k]);
        enemiesPosition.append(enemiesDiv);
    })
}



//add a data type to associate name value with div and put characters in the top section
$(fighterName).each(function(i) {
    var characterDiv = $("<h1>");
    characterDiv.addClass("col-sm-3 fighter")
    characterDiv.attr("data-character",fighterName[i]);
    characterDiv.text(fighterName[i]);
    startPosition.append(characterDiv);
})

//when a fighter is clicked they get moved to the your character section
$(".fighter").on("click", function(){
        var pickFighter = $("<h1>");
        pickFighter.addClass("col-sm-3");
        pickFighter.text($(this).attr("data-character"));
        attacker = $(this).attr("data-character");
        console.log(attacker);
    $("#character-section").append(pickFighter);
    startPosition.html("<div></div>")
    console.log(fighters);


        //creates an array of enemies
        $(fighterName).each(function(j) {
            if (attacker != fighterName[j]) {
                enemies.push(fighterName[j])
            }
            console.log(enemies);
        })

        generateEnemiesDiv(enemies)

    //pick a defender
    $("#enemies-section").on("click", ".enemy", function(){
        var pickEnemy = $("<h1>");
        pickEnemy.addClass("col-sm-3");
        pickEnemy.text($(this).attr("data-enemy"));
        enemy = $(this).attr("data-enemy");
        console.log("enemy: " + enemy);

    //puts enemy in the defender box    
    $("#defender-section").append(pickEnemy);

    //paints the html with the remaining enemies
        
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
        })
    })
})

//when attack button is clicked
// $("#attack").on("click", function(){

// })









