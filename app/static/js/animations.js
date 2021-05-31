$( document ).ready(function() {
    $('#point1').click(function() {
        point1();
    });
    $('#info1').click(function() {
        point1();
    });
    $('#point2').click(function() {
        point2();
    });
    $('#info2').click(function() {
        point2();
    });
    $('#point3').click(function() {
        point3();
    });
    $('#info3').click(function() {
        point3();
    });
    $('#point4').click(function() {
        point4();
    });
    $('#info4').click(function() {
        point4();
    });
    $('#point5').click(function() {
        point5();
    });
    $('#info5').click(function() {
        point5();
    });


    $(document).on('click', 'a[href^="#"]', function (event) {
        event.preventDefault();
        $('html, body').animate({
            scrollTop: $($.attr(this, 'href')).offset().top
        }, 500);
    });


    window.addEventListener('scroll', function() {
        if(this.pageYOffset>=(parseFloat($('nav').css('height'))+parseFloat($('header').css('height'))+parseFloat($('#jungle').css('height'))+parseFloat($('#traveler').css('height'))+parseFloat($('#formContainer').css('height'))-parseFloat(window.innerHeight))){
            $('#aboutBlur').animate({ blurRadius: 4 }, {
                duration: 3000,
                easing: 'linear',
                step: function(now,fx) {
                  $(this).css('-webkit-backdrop-filter','blur('+now+'px)');
                  $(this).css('backdrop-filter','blur('+now+'px)');
                }
            });
        }
    });

    $('#compass').css('top',$('#header').height()-parseInt($("#compass").css("height"),10)/2);
    $(window).on('resize', function(){
        $('#compass').css('top',$('#header').height()-parseInt($("#compass").css("height"),10)/2);
    });
    
    $('#compass').click(function() {
        $(this).animate({ borderSpacing: Math.random() * (400 - 10) + 10 }, {
            step: function(now,fx) {
                $(this).css('-webkit-transform','rotate('+now+'deg)'); 
                $(this).css('-moz-transform','rotate('+now+'deg)');
                $(this).css('transform','rotate('+now+'deg)');
            },
            duration:'slow'
        },'linear');
    });
    
});




function point1(){
    if(($('#info1').css('opacity')=='1'|$('#info1').css('opacity')=='0')&($('#path1').css('opacity')=='1'|$('#path1').css('opacity')=='0')){
        $('#info1').delay(300).fadeToggle();
        $('#path1').fadeToggle();
    }
}
function point2(){
    if(($('#info2').css('opacity')=='1'|$('#info2').css('opacity')=='0')&($('#path2').css('opacity')=='1'|$('#path2').css('opacity')=='0')){
        $('#info2').delay(300).fadeToggle();
        $('#path2').fadeToggle();
    }
}
function point3(){
    if(($('#info3').css('opacity')=='1'|$('#info3').css('opacity')=='0')&($('#path3').css('opacity')=='1'|$('#path3').css('opacity')=='0')){
        $('#info3').delay(300).fadeToggle();
        $('#path3').fadeToggle();
    }
}
function point4(){
    if(($('#info4').css('opacity')=='1'|$('#info4').css('opacity')=='0')&($('#path4').css('opacity')=='1'|$('#path4').css('opacity')=='0')){
        $('#info4').delay(300).fadeToggle();
        $('#path4').fadeToggle();
    }
}
function point5(){
    if(($('#info5').css('opacity')=='1'|$('#info5').css('opacity')=='0')&($('#path5').css('opacity')=='1'|$('#path5').css('opacity')=='0')){
        $('#info5').delay(300).fadeToggle();
        $('#path5').fadeToggle();
    }
}