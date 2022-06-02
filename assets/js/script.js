$(document).ready(function(){


    // Update the height of the page
    const updatePageHeight = () =>{

        vApp = $('body');

        if(!vApp[0].hasAttribute('v-fixedHeight')){
            return false;
        }

        if(!vApp[0].hasAttribute('initial-height')){
            useHeight = window.innerHeight+'px';
            vApp.attr('initial-height',useHeight);
        }else{
            if(IsFullScreenCurrently()){
                useHeight = vApp.attr('initial-height');
            }else{
                useHeight = screen.height+'px';
            }
        }

        vApp.css('height',useHeight);

        //$('[stuff]').html( `InitialHiehght = ${vApp.attr('initial-height')} <br> ScreeHeight = ${screen.height+'px'} <br> useHeight = ${useHeight}`);

        
    }

    updatePageHeight();

    //Full ScreenMode
    $("#fullscreen-toggle").on('click', function() {
        if(IsFullScreenCurrently())
            GoOutFullscreen();
        else
            GoInFullscreen($('body').get(0));
            
        updatePageHeight();
    });

    $(document).on('fullscreenchange webkitfullscreenchange mozfullscreenchange MSFullscreenChange', function() {
        if(IsFullScreenCurrently()) {
            $("#fullscreen-toggle").addClass('active');

        }
        else {
            $("#fullscreen-toggle").removeClass('active');
        }
        
    });

    // Stater swiper js
    const starterSwiper = new Swiper('.starterSwiper',{
        effect:"fade",
        navigation: {
            nextEl: '.starterSwiper-next',
            prevEl: '.swiper-button-prev',
          },
        pagination: {
            el: '.starterSwiper-pagnation',
            clickable: true,
        },
    });


    // Handles getting to the last slide and moving to another page
    starterSwiper.on('slideChange',function(){
        var starterSwiperNext = $('.starterSwiper-next');
        const reachEnd = () => {
            if(starterSwiper.isEnd && (starterSwiper.activeIndex == starterSwiper.slides.length-1) ){
                window.location.href = starterSwiperNext.attr('href');
            }
        }

            if(starterSwiper.isEnd && (starterSwiper.activeIndex == starterSwiper.slides.length-1) ){
                starterSwiperNext.removeAttr('disabled');
                starterSwiperNext.on('click',reachEnd);
                starterSwiper.on('touchEnd',reachEnd);
            }else{
                starterSwiperNext.off('click');
                starterSwiper.off('touchEnd',reachEnd);
            }
 
            
             
    })


    // Lets get started
    const letsGetStarted = new Swiper('.getStartedSwiper',{
        slidesPerView: "auto",
        centeredSlides: true,
        spaceBetween: 30
    });


    // Continue Button is Clicked on Lets get started
    $('#getStartedSwiperBtn').click(function(){
        activeSlide = letsGetStarted.slides[letsGetStarted.activeIndex];
        window.location.href = activeSlide.getAttribute('href');
    });


    // loader
    const vAppLoader = {
        container: $('#v-loader'),
        content:'<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>',
        open:function(){
            this.container.css('top','0%');
            this.container.html(this.content);
        },
        close:function(){
            this.container.css('top','100%');
            this.container.html(' ');
        }
    }


    $('.demoSubmit').each(function(){
        $(this).submit(function(e){
            e.preventDefault();
            vAppLoader.open();


            setTimeout(() => {
                if($(this)[0].hasAttribute('href')){
                    window.location.href = $(this).attr('href');
                    vAppLoader.close();
                }else{
                    vAppLoader.close();
                }
            }, 3500);
        })
    })



    //Handles carrat change on otp input
    $('.otpInputContainer').find('input').each(function() {
        $(this).attr('maxlength', 1);
        $(this).on('keyup', function(e) {
            var parent = $($(this).parent());
            if(e.keyCode === 8 || e.keyCode === 37 || $(this).val().trim() == '') {
                var prev = parent.find('input#' + $(this).data('previous'));
                
                if(prev.length) {
                    $(prev).select();
                }
            } else if((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 65 && e.keyCode <= 90) || (e.keyCode >= 96 && e.keyCode <= 105) || e.keyCode === 39 || $(this).val().length == 1) {
                var next = parent.find('input#' + $(this).data('next'));
                
                if(next.length) {
                    $(next).select();
                } else {
                    if(parent.data('autosubmit')) {
                        parent.submit();
                    }
                }
            }
        });
    });






















});