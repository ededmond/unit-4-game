$(document).ready(function() {
    var playerChar;
    var opponentChar;
    var leia = {
        name : "Leia",
        card : $("#Leia"),
        hp : 120,
        maxHp :120,
        baseAttack : 4,
        counterAttack :15,
        attack : 4
    };
    var luke = {
        name : "Luke",
        card : $("#Luke"),
        hp : 100,
        maxHp :100,
        baseAttack : 6,
        counterAttack :20,
        attack : 6
    };
    var solo = {
        name : "Solo",
        card : $("#Solo"),
        hp : 150,
        maxHp :150,
        baseAttack : 2,
        counterAttack :10,
        attack : 2
    };
    var vader = {
        name : "Vader",
        card : $("#Vader"),
        hp : 80,
        maxHp :80,
        baseAttack : 8,
        counterAttack :30,
        attack : 6
    };
    var characters = [leia,luke,solo,vader];
    var gameMode = "waiting";
    var won = 3;
    $(".card").on("click",function() {
        if (gameMode === "waiting") {
            playerChar = getObj($(this).attr("id"));
            $("#characters").text("Your Character");
            $("#enemies").text("Pick Your Opponent");
            console.log(playerChar);
            characters.forEach(function(character) {
                console.log(character);
                if (playerChar !== character) {
                    character.card.animate({top: "540px"},"normal");
                }
            });
            gameMode = "pick Defender"
        } else if (gameMode === "pick Defender") {
            opponentChar = getObj($(this).attr("id"));
            if (opponentChar !== playerChar) {
                opponentChar.card.animate({top: "280px"},"normal");
                $("#enemies").text("Enemies");
                gameMode = "playing";
                $(".btn").show();
                // $(".Defender").show();
            }
        }
    })
    $(".btn").on("click",function() {
        if(gameMode === "playing") {    //should always be true
            var attack = playerChar.attack;
            opponentChar.hp -= attack;
            $("."+opponentChar.name + "-body").text(opponentChar.hp);
            var opaque = opponentChar.hp / opponentChar.maxHp;
            opponentChar.card.animate({ opacity: opaque.toString() },"fast")
            playerChar.attack = attack * 2;

            if (opponentChar.hp <= 0) {
                won--;
                console.log(won);
                opponentChar.card.hide();
                gameMode = "pick Defender";
                $(".btn").hide();
                if (won < 1) {
                    console.log("Got here");
                    $("#Defender").text("YOU WIN!");
                }
            } else {
                playerChar.hp -= opponentChar.counterAttack;
                $("."+playerChar.name + "-body").text(playerChar.hp);
                opaque = playerChar.hp / playerChar.maxHp;
                playerChar.card.animate({ opacity: opaque.toString() },"fast")
            }
            if (playerChar.hp <=0) {
                playerChar.card.hide();
                $(".btn").hide();
                playerChar.attack = 0;
                $("#Defender").text("You Lose!");
            }
        }
    })

    
    function getObj(word) {
        for (i = 0; i < characters.length; i++) {
            if (characters[i].name === word) {
                return characters[i];
            }
        }
    }
    

    // $(".card").on("click",function() {
    //     $(".card").animate({ top: "+=200px" }, "normal");
    // });
    // $(".Leia").on("click",function() {
    //     $(".Leia").animate({top:"0px"},"normal");
    //    // $(".Leia").animate({ top: "+=200px" }, "normal");
    // });
});


//$(".crystal-image").on("click", function() {