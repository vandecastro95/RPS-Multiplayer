let userScore = 0;
let user2Score = 0;
let gamestarted = true;

function computerRandom(userInput) {
    let a = Math.floor(Math.random() * 3);
    let array = ["Rock", "Paper", "Scissors"];
    let computerRandom = array[a];
    console.log("computerRandom: " + computerRandom)
    checkWin(userInput, computerRandom);
}

function checkWin(userInput, computerRandom) {
    $(document).ready(function() {
        let winorlose;
    if (userInput == "Rock") {
        if (computerRandom == "Rock") {
            winorlose = "<h1>Tie!</h1>"
            console.log("tie");
        }
        if (computerRandom == "Paper") {
            console.log("You lose");
            user2Score++;
            winorlose = "<h1>You Lose!</h1>"
        }   
        if (computerRandom == "Scissors") {
            console.log("you win");
            userScore++;
            winorlose = "<h1>You Win!</h1>"
        }
    }
    if (userInput == "Paper") {
        if (computerRandom == "Rock") {
            console.log("you win");
            userScore++;
            winorlose = "<h1>You Win!</h1>"
        }
        if (computerRandom == "Paper") {
            console.log("tie");
            winorlose = "<h1>Tie!</h1>"
        }
        if (computerRandom == "Scissors") {
            console.log("you lose");
            user2Score++;
            winorlose = "<h1>You Lose!</h1>"
        }
    }
    if (userInput == "Scissors") {
        if (computerRandom == "Rock") {
            console.log("you lose");
            user2Score++;
            winorlose = "<h1>You Lose!</h1>"
        }
        if (computerRandom == "Paper") {
            console.log("you win");
            userScore++;
            winorlose = "<h1>You Win!</h1>"
        }
        if (computerRandom == "Scissors") {
            console.log("tie");
            winorlose = "<h1>Tie!</h1>"
        }
    }
    changeDisplay(userInput, computerRandom, winorlose);
})
}

function changeDisplay(userInput, computerRandom, winorlose) {
    $(document).ready(function () { 
    $(".user").addClass("" + userInput);
    $(".computer").addClass("" + computerRandom);
    $(".user").text(userInput);
    $(".computer").text(computerRandom);
    $(".score").text("" + userScore + "-" + user2Score)
    $(".winorlose").append(winorlose);
})
}


$(document).ready(function () {
    
    if (gamestarted){


    $(".choices").on("click", function () {
        $( ".choices").unbind( "click" );
        let userInput = $(this).attr("data");
        console.log("UserInput: " + userInput);
        
        $(".choices").removeClass("hvr-bob")
        $("body").addClass("highheight");
        $('html,body').animate({
            scrollTop: $(".bottom").offset().top},
            'slow');
            $(".page-content").removeClass("hidden");
            computerRandom(userInput);
    })
}
})


let heroShinker = function() {
    let hero = $('.hero-nav'),
        heroHeight = $('.hero-nav').outerHeight(true);
        $(hero).parent().css('padding-top', heroHeight);
    $(window).scroll(function() {
        let scrollOffset = $(window).scrollTop();
        if (scrollOffset < heroHeight) {
            $(hero).css('height', (heroHeight - scrollOffset));
        }
        if (scrollOffset > 132) {
            hero.addClass('fixme');
        } else {
            hero.removeClass('fixme');
        };
    });
}
heroShinker();

$(window).scroll(function() {
    if($(window).scrollTop() + $(window).height() > $(document).height() - 50) {
        $("img").addClass("h-50");
        $(".main").hide("fast");
    }
    if($(window).scrollTop() + $(window).height() < $(document).height() - 50) {
        $("img").removeClass("h-50");
    }
 });

