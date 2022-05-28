$(document).ready(function(){

    //Full ScreenMode
    $("#fullscreen-toggle").on('click', function() {
        if(IsFullScreenCurrently())
            GoOutFullscreen();
        else
            GoInFullscreen($('body').get(0));
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

    

    

























});