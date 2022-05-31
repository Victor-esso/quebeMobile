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
                    vAppLoader.close();
                    window.location.href = $(this).attr('href');
                }else{
                    vAppLoader.close();
                }
            }, 3500);
        })
    })

























});