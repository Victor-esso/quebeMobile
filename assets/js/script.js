$(document).ready(function(){
    

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

























});