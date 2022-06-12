


// Hanlde Double CLick on Top Companies
window.handleCompanyLike = function (swiper,event){
    slideClicked = swiper.clickedSlide;
    animateCSS(slideClicked,'headShake','0.6s');
    likeBtn = slideClicked.querySelector('button.like-btn');
    handleLike(likeBtn);
}

window.handleTabChangeSearch = function (swiper){
    //Reset active
    $('.search-tab-nav').children('a').removeClass('active');
    el = swiper.slides[swiper.activeIndex];
    //console.log('a[href="#'+el.getAttribute('data-hash')+'"]')
    $('a[href="#'+el.getAttribute('data-hash')+'"]').addClass('active');
}





// Handle like active and animation
const handleLike = (el) =>{
    if(el.classList.contains('active')){
        
        animateCSS(el,'zoomOut','0.3s').then(()=>{
            el.classList.remove('active');
            animateCSS(el,'zoomIn','0.2s');
        });
    }else{
        // el.classList.add('active');
        // animateCSS(el,'rubberBand');
        animateCSS(el,'zoomOut','0.3s').then(()=>{
            el.classList.add('active');
            animateCSS(el,'zoomIn','0.2s');
        });
    }
}

//Toggle class
$('[toggle-class]').each(function(){
    $(this).click(function(){
        $(this).toggleClass($(this).attr('toggle-class'));
    })
})

//Make animation on click
$('[v-animate]').each(function(){
    $(this).click(function(){
        animateCSS($(this)[0],$(this).attr('v-animate'));
    })
})

const updateTop = () =>{
    $('a.main-nav').each(function(){
        if($(this).hasClass('active')){
            $('.v-app-top[v-name="'+$(this).attr('v-name')+'"]').removeClass('d-none');
        }else{
            $('.v-app-top[v-name="'+$(this).attr('v-name')+'"]').addClass('d-none');
        }
    })
}

updateTop();

const clearNavActive = () =>{
    $('a.main-nav').each(function(){
        $(this).removeClass('active');
    })
}

const updateNav = (swiper) =>{
    activePage = swiper.slides[swiper.activeIndex];
    pageName = activePage.getAttribute('data-hash');
    activeNav = $('a.main-nav[v-name="'+pageName+'"');
    clearNavActive();
    activeNav.addClass('active');
    updateTop();
}

const backHistory = () =>{
    history.back();
}


const forwardHistory = () =>{
    history.forward();
}