var config = {
    apiKey: "AIzaSyBVglUwhuynOEOC2E2hIvT1YL9vF8ETx6g",
    authDomain: "rps-multiplayer-d438a.firebaseapp.com",
    databaseURL: "https://rps-multiplayer-d438a.firebaseio.com",
    projectId: "rps-multiplayer-d438a",
    storageBucket: "rps-multiplayer-d438a.appspot.com",
    messagingSenderId: "219741738946"
};
firebase.initializeApp(config);
let database = firebase.database();

let userScore = 0;
let user2Score = 0;
let gamestarted = false;


function computerRandom(userInput) {
    let a = Math.floor(Math.random() * 3);
    let array = ["Rock", "Paper", "Scissors"];
    let computerRandom = array[a];
    console.log("computerRandom: " + computerRandom)
    checkWin(userInput, computerRandom);
}

function checkWin(userInput, computerRandom) {
    $(document).ready(function () {
        let winorlose;
        if (userInput == "Rock") {
            $(".user").css("color", "#3296B8");
            if (computerRandom == "Rock") {
                $(".computer").css("color", "#3296B8");
                winorlose = "Tie!"
                console.log("tie");
            }
            if (computerRandom == "Paper") {
                $(".computer").css("color", "#FEC657");
                console.log("You lose");
                user2Score++;
                winorlose = "You Lose!"
            }
            if (computerRandom == "Scissors") {
                $(".computer").css("color", "#CE1141");
                console.log("you win");
                userScore++;
                winorlose = "You Win!"
            }
        }
        if (userInput == "Paper") {
            $(".user").css("color", "#FEC657");
            if (computerRandom == "Rock") {
                $(".computer").css("color", "#3296B8");
                console.log("you win");
                userScore++;
                winorlose = "You Win!"
            }
            if (computerRandom == "Paper") {
                $(".computer").css("color", "#FEC657");
                console.log("tie");
                winorlose = "Tie!"
            }
            if (computerRandom == "Scissors") {
                $(".computer").css("color", "#CE1141");
                console.log("you lose");
                user2Score++;
                winorlose = "You Lose!"
            }
        }
        if (userInput == "Scissors") {
            $(".user").css("color", "#CE1141");
            if (computerRandom == "Rock") {
                $(".computer").css("color", "#3296B8");
                console.log("you lose");
                user2Score++;
                winorlose = "You Lose!"
            }
            if (computerRandom == "Paper") {
                $(".computer").css("color", "#FEC657");
                console.log("you win");
                userScore++;
                winorlose = "You Win!"
            }
            if (computerRandom == "Scissors") {

                $(".computer").css("color", "#CE1141");
                console.log("tie");
                winorlose = "Tie!"
            }
        }
        changeDisplay(userInput, computerRandom, winorlose);
    })
}

function changeDisplay(userInput, computerRandom, winorlose) {
    $(document).ready(function () {
        $(".user").text(userInput);
        $(".computer").text(computerRandom);
        $(".score").text("" + userScore + "-" + user2Score)
        $(".winorlose").text(winorlose);

    })
}

$(document).ready(function () {
    storeData();

    if (gamestarted == true) {
        $(".choices").on("click", function () {
            $(".choices").removeClass("hvr-bob")
            let userInput = $(this).attr("data");
            console.log(this);

            setTimeout(function () {
                $("body").addClass("highheight");
                $('html,body').animate({
                    scrollTop: $(".bottom").offset().top
                },
                    'slow');
                $(".page-content").removeClass("hidden");
                computerRandom(userInput);

            }, 800);


        })
    }



})


let heroShinker = function () {
    let hero = $('.hero-nav'),
        heroHeight = $('.hero-nav').outerHeight(true);
    $(hero).parent().css('padding-top', heroHeight);
    $(window).scroll(function () {
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

$(window).scroll(function () {
    if ($(window).scrollTop() + $(window).height() > $(document).height() - 50) {
        $("img").addClass("h-50");
        $(".main").hide("fast");
    }
    if ($(window).scrollTop() + $(window).height() < $(document).height() - 50) {
        $("img").removeClass("h-50");
    }
});

function animationClick(element, animation) {
    element = $(element);
    element.click(
        function () {
            element.addClass('animated ' + animation);
            //wait for animation to finish before removing classes
            window.setTimeout(function () {
                element.removeClass('animated ' + animation);
            }, 2000);
        }
    );
};

function storeData() {

    $("#btn").on("click", function (event) {

        event.preventDefault();
        console.log($("#Username"));
        let username = $("#Username").val().trim();
        animationClick('#rock', 'pulse');
        animationClick('#paper', 'pulse');
        animationClick('#scissors', 'pulse');
        gamestarted = true;

        let usersRef = database.ref().child("Users");

        usersRef.orderByChild("name").equalTo(username).on("value", function (snapshot) {
            if (snapshot.exists()) {
                username = snapshot.child("name").val();
                console.log("1")
            }
            else {
                usersRef.push(username);
                console.log("2")
            }
        })
        usersRef.on("child_added", snapshot => {
            window.location.href = "../javascript/assets/parallax.html";

        })

    })
}


