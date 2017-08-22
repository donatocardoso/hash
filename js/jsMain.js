/*Eventos jQuery - JQuery Events*/


$(document).ready(function(){
    var setIcone, turnPlayer, victory = false, tdWin = [], finishGame, old=0;
    $('section#sectionGame').hide();

    /*Escolha ícone - Choose icon*/
    $('section#sectionIndex img').click(function(){
        $('section#sectionIndex img').removeClass('cheked');
        $(this).addClass('cheked');
    });

    /*Começa o jogo - Start the game*/
    $('#btnStart').click(function(){
        if(($('#playerOne').is(':checked') || $('#playerTwo').is(':checked')) && 
           ($('#playerOneStart').is(':checked') || $('#playerTwoStart').is(':checked')) &&
           ($('#iconeBola').attr('class')==="cheked" || $('#iconeXis').attr('class')==="cheked")){

            $('#sectionIndex').hide();
            $('#sectionGame').show();

            /*Controlar altura da DivLeft e DivRight - Controlling height of DivLeft and DivRight*/
            setInterval(function(){
                if($('html').width() > 779){
                    $('section#sectionGame article#left').height($('section#sectionGame').height());
                    $('section#sectionGame article#right').height($('section#sectionGame').height());
                }else{
                    $('section#sectionGame article#left').height('auto');
                    $('section#sectionGame article#right').height('auto');
                }
            },50);

            if($('#playerOne').is(':checked')){
                setImg(1,2);
            }else{
                setImg(2,1);
            }

            function setImg(playerSelected, otherPlayer){
                if($('#iconeBola').attr('class')==="cheked"){
                    $('#img'+playerSelected).attr('src','img/bola.png');
                    $('#img'+playerSelected).addClass('bola');

                    $('#img'+otherPlayer).attr('src','img/xis.png');
                    $('#img'+otherPlayer).addClass('xis');
                }else{
                    $('#img'+playerSelected).attr('src','img/xis.png');
                    $('#img'+playerSelected).addClass('xis');

                    $('#img'+otherPlayer).attr('src','img/bola.png');
                    $('#img'+otherPlayer).addClass('bola');
                }
            }

            if($('#playerOneStart').is(':checked')){
                $('#vez1').css('color','green').show();
                $('#vez2').css('color','#ffffff');
                setIcone = $('img#img1').attr('class');
                turnPlayer = 1;
            }else{
                $('#vez2').css('color','green').show();
                $('#vez1').css('color','#ffffff');
                setIcone = $('img#img2').attr('class');
                turnPlayer = 2;
            }   
        }else{
            $('section#sectionIndex p').css('color', '#cc0000');
            setTimeout(
                function(){
                    $('section#sectionIndex p').css('color', '#ffffff');
                },2000
            );
        }
    });

    /*Marca o campo - Tag the field*/
    $('td').click(function(){
        $('#back').css('visibility','hidden');
        $('#resetScore').css('visibility','hidden');

        if($(this).attr('class') === undefined){
            old++;

            $(this).css('background-image','url(img/'+setIcone+'.png)');
            $(this).addClass(setIcone);
            
            if(setIcone === 'bola'){
                setIcone = 'xis';
            }else{
                setIcone = 'bola';
            }

            victory = VictoryConditions();
            if(victory === true){
                Win(turnPlayer);
            }

            $('#vez'+turnPlayer).css('color','#ffffff');
            if(turnPlayer === 1){
                turnPlayer = 2;
            }else{
                turnPlayer = 1;
            }
            $('#vez'+turnPlayer).css('color','green');

            if(old === 9 && victory !== true){
                GameOver();
            }
        }
    });

    /*Volta ao Início - Back to Start*/
    $('#back').click(function(){
        $('#sectionIndex').show();
        $('#sectionGame').hide();
        $('img#img1').removeAttr('class');
        $('img#img2').removeAttr('class');
        Reset();
    });

    /*Reinicia a pontuação - Reboot the punctuation*/
    $('#resetScore').click(function Reset(){
        $('#placar1 span').text(0);
        $('#placar2 span').text(0);
    });

    /*Condições de Vitória - Victory Conditions*/
    function VictoryConditions(){
        for (i=1; i<=7; i+=3) {
            if ($('td#' + (i)).attr('class') === $('td#' + (1 + i)).attr('class') &&
                $('td#' + (i)).attr('class') === $('td#' + (2 + i)).attr('class') &&
                $('td#' + (i)).attr('class') != undefined) {
                tdWin = [i,(i+1),(i+2)];
                return true;
            }
        }

        for (i=1; i<=3; i++) {
            if ($('td#' + (i)).attr('class') === $('td#' + (3 + i)).attr('class') &&
                $('td#' + (i)).attr('class') === $('td#' + (6 + i)).attr('class') &&
                $('td#' + (i)).attr('class') != undefined) {
                tdWin = [i,(i+3),(i+6)];
                return true;
            }
        }

        if ($('td#1').attr('class') === $('td#5').attr('class') &&
            $('td#1').attr('class') === $('td#9').attr('class') &&
            $('td#1').attr('class') !== undefined) {
            tdWin = [1,5,9];
            return true;
        }

        if ($('td#3').attr('class') === $('td#5').attr('class') &&
            $('td#3').attr('class') === $('td#7').attr('class') &&
            $('td#3').attr('class') !== undefined) {
            tdWin = [3,5,7];
            return true;
        }
    }

    /*Declara o Ganhador - Declares the Winner*/
    function Win(winner){
        old=0;
        if(winner === 1) {
            turnPlayer = winner;
        }

        $('#placar'+winner+' span').text(parseInt( $('#placar'+winner+' span').text() )+1);
        $('td').css('opacity','0.3');

        for(i=0; i<=2; i++){
            $('td#'+tdWin[i]).css('opacity','1');
        }

        setTimeout(function(){
            alert('YOU WIN !!!');

            $('td') .css('background-image','none')
                    .css('opacity','1')
                    .removeAttr('class');

            $('#back').css('visibility','visible');
            $('#resetScore').css('visibility','visible');
        },300);
    }

    /*Finaliza o jogo em empate - The game ends in a draw*/
    function GameOver(){
        old=0;
        $('td').css('opacity','0.3');

        $('img#velhaImg').addClass('zoom').css('display', 'block').center = function() {
            this.css("top", ($(window).height() - this.height()) / 2 + $(window).scrollTop() + "px");
            this.css("left", ($(window).width() - this.width()) / 2 + $(window).scrollLeft() + "px");
            return this;
        };

        setTimeout(function(){
            alert('GAME OVER !!!');
            $('img#velhaImg').css('display', 'none');

            $('td') .css('background-image','none')
                    .css('opacity','1')
                    .removeAttr('class');

            $('#back').css('visibility','visible');
            $('#resetScore').css('visibility','visible');
        },300);
    }
});