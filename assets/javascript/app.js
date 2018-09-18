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
let players = 1;
let move = 0;
let userScore = 0;
let user2Score = 0;
let playernumber;
let opponentnumber;

function computerRandom(userInput) {
    let a = Math.floor(Math.random() * 3);
    let array = ["Rock", "Paper", "Scissors"];
    let computerRandom = array[a];
    console.log("computerRandom: " + computerRandom)
    checkWin(userInput, computerRandom);
}

function multiplayer() {

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
    players = localStorage.getItem("players");

    animationClick('#rock', 'pulse');
    animationClick('#paper', 'pulse');
    animationClick('#scissors', 'pulse');
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
            if (players == 1) { computerRandom(userInput) }
            if (players == 2) { }

        }, 800);


    })




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

    $(".submit").on("click", function (event) {



        event.preventDefault();
        let usersRef = database.ref().child("Users");
        usersRef.set({
            move: 0
        })
        let player;

        if ($(this).text() == "Multiplayer") {

            players = 2;
            localStorage.setItem("players", players);

            let connections = database.ref("/connections");
            let connectedRef = database.ref(".info/connected");

            connectedRef.on("value", function (snap) {

                // If they are connected..
                if (snap.val()) {

                    // Add user to the connections list.
                    let con = connections.push(true);

                    // Remove user from the connection list when they disconnect.
                    con.onDisconnect().remove();
                }
            });

            connections.once('value', function (snapshot) {
                if (Object.keys(snapshot.val()).indexOf('1') === -1) {
                    playernumber = '1';
                    opponentnumber = '2';
                    alert(playernumber)
                } else if (Object.keys(snapshot.val()).indexOf('2') === -1) {
                    playernumber = '2';
                    opponentnumber = '1';
                }

                // If you got a player number, you're 1 or 2.
                if (playernumber !== '0') {

                    con = connections.child(playernumber);
                    con.set(player);
                    $(".div1").removeClass("hidden");
                    $(".div2").addClass("hidden");
                    // When I disconnect, remove this device.
                    con.onDisconnect().remove();

                    // If 1 and 2 were taken, your number is still 0.
                } else {
                    // Remove the name form and put the alert there.

                    // And disconnect from Firebase.
                    app.delete();
                }
            })

            // connectionsRef.on("value", function (snap) {
            //     alert(Object.keys(snap.val()).indexOf('1'))

            if ($(this).text() == "Single Player") {
                console.log($("#Username"));
                let username = $("#Username").val().trim();
                checkifExists(username);
                $(".div1").removeClass("hidden");
                $(".div2").addClass("hidden");
                usersRef.on("child_added", snapshot => {
                    
                })

               
            }


            function checkifExists(username) {
                let usersRef = database.ref().child("Users");


                usersRef.orderByChild("name").equalTo(username).on("value", function (snapshot) {
                    if (snapshot.exists()) {
                        username = snapshot.child("name").val();
                        console.log("1");
                    }
                    else {
                        
                    }
                })
            }
        }
    })

}

// var database = firebase.database();
// var chats = database.ref('chat');
// var connections = database.ref('connections');




// // Ongoing event listening.
// connections.on('value', function (snapshot) {
//     // If the player is connected,
//     if (con) {
//         // And an opponent is connected,
//         if (Object.keys(snapshot.val()).indexOf(opponent.number) !== -1) {
//             // Gather the latest info about your opponent and also yourself.
//             opponent = snapshot.val()[opponent.number];
//             player = snapshot.val()[player.number];
//             // If we have a name for our opponent,
//             if (opponent.name.length > 0) {
//                 // Show the opponent. This also updates the opponents info over time.
//                 DOMFunctions.showOpponentInfo();
//                 // Once both players have a name,
//                 if (player.name.length > 0) {
//                     // Check each time whether the players have made selections.
//                     var choice1 = snapshot.val()['1'].choice;
//                     var choice2 = snapshot.val()['2'].choice;
//                     var turns1 = snapshot.val()['1'].turns;

//                     // If both have picked, run getWinner on those choices.
//                     if (choice1.length > 0 && choice2.length > 0) {
//                         getWinner(choice1, choice2);
//                         // If player 1 hasn't chosen yet, show them their options.
//                     } else if (choice1.length === 0 && turns1 === 0) {
//                         DOMFunctions.showMoveOptions('1');
//                         // Otherwise player 2 must be the one who hasn't make a choice yet.
//                     } else if (choice1.length > 0 && choice2.length === 0) {
//                         DOMFunctions.showMoveOptions('2');
//                     }
//                 }
//             }
//         } else if (opponent.name.length > 0 && Object.keys(snapshot.val()).indexOf(opponent.number) === -1) {
//             $('.turn').text('Opponent left. Waiting for new opponent.');
//             $('.waiting-' + opponent.number).show();
//             $('.name-' + opponent.number).empty();
//             $('.win-loss-' + opponent.number).empty();
//         }
//     }
// });


// // On-click function for submitting a name.
// $('#submit-name').on('click', function () {
//     player.name = username.val();
//     if (player.name.length > 0) {
//         con.update({
//             name: player.name
//         });
//         DOMFunctions.showSelfJoin();
//     }

//     return false;
// });


