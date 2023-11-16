var playing = false;
var score;
var lifeLeft;
var step;
var action; // used for set Interval
var fruits = ['apple', 'banana', 'cherry', 'mango', 'orange', 'pineapple', 'watermelon'];
$(function(){
    $("#startreset").click(function(){
        if(playing == true)
        {
            //reload game
            location.reload();
        }
        else
        {
            playing = true; // initiated game
            score = 0; // score set to 0
            $("#scorevalue").html(score);

            // show lifes
            $("#lifeLeft").show();
            lifeLeft = 3;
            addHearts();

            //hide gameover box
            $("#gameOver").hide();

            //change button text
            $("#startreset").html("Reset game");

            // start sending fruits
            startAction();

        }

    });

    $("#fruit1").mouseover(function(){
        score++;
        $("#scorevalue").html(score); //update score
        //animation
        clearInterval(action); //stop fruit
        $("#fruit1").hide("explode", 500); // fruit explosion
        setTimeout(startAction, 500); //new fruit after animation
    })


    //functions

    function addHearts(){
        $("#lifeLeft").empty();
        for(i = 0; i < lifeLeft; i++){
            $("#lifeLeft").append('<img src="images/heart.png" class="life">');
        }
    }

    function startAction(){
        $("#fruit1").show(); //generate fruit
        chooseFruit(); //choose a random fruit
        $("#fruit1").css({'left':Math.round(550*Math.random()), 'top':-50});
        //generate a random step
        step = 1+ Math.round(5*Math.random());
        //move fruit down every 10 ms
        action = setInterval(function(){
            $("#fruit1").css('top', $("#fruit1").position().top + step);
            //check fruit position
            if($("#fruit1").position().top > $("#fruitsContainer").height()){
                // check life status
                if(lifeLeft > 1){
                    $("#fruit1").show(); //generate fruit
                    chooseFruit(); //choose a random fruit
                    $("#fruit1").css({'left':Math.round(550*Math.random()), 'top':-50});
                    //generate a random step
                    step = 1+ Math.round(5*Math.random());
                    //reduce life
                    lifeLeft --;
                    //populate heart in box
                    addHearts();

                }
                else{
                    //game over
                    playing = false;
                    $("#startreset").html("Start Game");
                    $("#gameOver").show();
                    $("#gameOver").html('<p> Game Over</p><p>Your score is ' + score +'</p>');
                    $("#lifeLeft").hide();
                    stopAction();

                }

            }
        
        }, 10);
    }

    // generating random fruit

    function chooseFruit(){
        $("#fruit1").attr('src', 'images/' + fruits[Math.round(6*Math.random())] +'.png');
    }

    //stop dropping fruits
    function stopAction(){
        clearInterval(action);
        $("#fruit1").hide();
    }

});