



$(document).ready(function(){

    //height equal width
    $('.height-equal-width').each(function(){
        $(this).css('height',$(this).css('width'));
    })
    
    $('[height-percentage-width]').each(function(){

        let w = numberOnly($(this).css('width'))*1;
        console.log(w);
        let percent = numberOnly($(this).attr('height-percentage-width'));
        
        if(percent.trim() != '' && percent != 0 && percent >0){
            let newWidth = ((percent / 100) * w);
            
            $(this).css('height',newWidth + 'px');
        }
        

    });
    
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


    //Slick one page sroll
    $('.v-slick-page').each(function(){
        vSlickPage = new Swiper($(this)[0], {
            direction: "vertical",
            slidesPerView: "auto",
            autoHeight:true,
            observer:true,
            focusableElements:'video',
            freeMode: true,
            scrollbar: {
              el: ".swiper-scrollbar",
            },
            mousewheel: true,
          });
    })


    // making row swiper
    $('.v-row-swiper').each(function(){
        elProps = isJson($(this).attr('swiper-props')) ? JSON.parse($(this).attr('swiper-props')) : false;
        defaultProp = {
            direction:'horizontal',
            slidesPerView:'auto',
            loop:false,
            freeMode: true,
            centeredSlides: false,
            a11y:{enabled:false},
            nested:true,
        }

        defaultProp = (elProps) ? {...defaultProp,...elProps} : defaultProp;
        $(this).removeAttr('swiper-props')
        
        var vRowSwiper = new Swiper($(this)[0], defaultProp);


        //Request double click
        if($(this)[0].hasAttribute('swiper-dbclick')){
            var dbFunc = $(this).attr('swiper-dbclick');
            vRowSwiper.on('doubleClick',function(swiper,event){
                window[dbFunc](swiper,event);            
            });
        }
        //Request double click
        if($(this)[0].hasAttribute('swiper-change')){
            var dbFunc = $(this).attr('swiper-change');
            console.log(dbFunc)
            vRowSwiper.on('slideChange',function(swiper){
                window[dbFunc](swiper);     
                     
            });
        }
        
    })

    
    //Clicking on the like button
   $('button.like-btn').each(function(){
       $(this).click(function(){
           handleLike($(this)[0]);
       })
   }) 


    
   const vSwiperMainPage = new Swiper(".vSwiperMainPage", {
        spaceBetween: 30,
        hashNavigation: {
            watchState: true,
        },
        followFinger:false,
        speed:200,
        threshold:25,
        on:{
            init:function(swiper){
                updateNav(swiper);
            },
            slideChange:function(swiper){
                updateNav(swiper);
            },
        }
  });

  $('.trigger-history-back').each(function(){
    $(this).click(()=>backHistory());
  });

  $('.trigger-back').each(function(){
    $(this).click(function(e){
       if(e.target.classList.contains('trigger-back')){
        backHistory()
       }
    });
  });


  $('[check]').click(function(){
     el = $('.v-loader');
     vPages.open(el);
  });

  $('[check2]').click(function(){
    el = $('.v-loader2');
    vPages.open(el);
 });

 


 //Handle Pages
  const vPages = {
      open:function(el,animation="fadeInUp"){
       
        //Setting up page key
        if(!el[0].hasAttribute('v-page-key')){
            pageKey = key(20);
            el.attr('v-page-key',pageKey);
        }else{
            pageKey = el.attr('v-page-key');
        }
       //push to history
       this.setKey(pageKey);
       history.pushState({pageKey},'',`#${pageKey}`);




        el.css('transition','unset');
        el.css('top',0);
        el.attr('vPageOpened');
        animateCSS(el[0],animation,'0.3s');

      },
      close:function(el,animation="fadeOutDown"){
        animateCSS(el[0],animation,'0.3s').then(function(){
            el.css('top','100%');
            el.removeAttr('vPageOpened')
        });

        this.popKey();
      },
      onload:function(){
          sessionStorage.setItem('vPagesHistory',JSON.stringify([]));
      },
      setKey:function(key){
          let pageArray = JSON.parse(sessionStorage.getItem('vPagesHistory'));
          pageArray[pageArray.length] = key;
          sessionStorage.setItem('vPagesHistory',JSON.stringify(pageArray));
          this.currentKey = key;
      },
      currentKey:false,
      popKey:function(){
        let pageArray = JSON.parse(sessionStorage.getItem('vPagesHistory'));
        pageArray.pop();
        if(pageArray.length){
            this.currentKey = pageArray[pageArray.length - 1];
        }else{
            this.currentKey = false;
        }

      },
      closeAllPages:function(){
          $('[vPages]').each(function(){
            if($(this)[0].hasAttribute('vPageOpened')){
                $(this).css('top','100%');
                $(this).removeAttr('vPageOpened');
            }
          })
      }
      

  }

  vPages.onload();

  window.addEventListener('popstate',e => {
        if(vPages.currentKey){
            vPages.close($('[v-page-key="'+vPages.currentKey+'"]'));
        }else{
            vPages.closeAllPages();
        }
  });


$('.v-link-page').each(function(){
    $(this).click(function(e){
        e.preventDefault();
        let pageCalled = $(this)[0].hasAttribute('vref') ? $(this).attr('vref') : false;
        pageCalled = pageCalled ? $('[vpage-name="'+pageCalled+'"]') : false;
        vPages.open(pageCalled);
        
    })
})


$('.preventDefault').each(function(){
    $(this).click(function(e){
        e.preventDefault;
    })
})

$('.rev-select[top]').each(function(){
    opt = $(this).children('.select-options');
    opt.css('top',`-${parseFloat(opt.css('height'))+6}px`);
})




// TabMaker
$('.tab-content-maker').each(function(){
    var tabBtns = $(this).children('.tab-btns');
    const resetTabContentContainer = (btns) =>{
        btns.each(function(){
            if($(this)[0].hasAttribute('for') && $('#'+$(this).attr('for')).length){
                $('#'+$(this).attr('for')).css('display','none');
            }
        })
    }
    const resetTabContentBtns = (btns) =>{
        btns.each(function(){
            $(this).removeClass('active');
        })
    }

    //Selecting the active btn and tab
    resetTabContentContainer(tabBtns);
    tabBtns.each(function(){
        if($(this).hasClass('active') && $(this)[0].hasAttribute('for') && $('#'+$(this).attr('for')).length){
            $('#'+$(this).attr('for')).css('display','block');
        }
    })

    tabBtns.each(function(){
        $(this).click(function(){
            resetTabContentBtns(tabBtns);
            $(this).addClass('active')

            if($(this)[0].hasAttribute('for') && $('#'+$(this).attr('for')).length){
                resetTabContentContainer(tabBtns);
                $('#'+$(this).attr('for')).css('display','block');
            }
        })
    })
})


//Accordion
const accordionItemHeaders = document.querySelectorAll(".accordion-item-header");

accordionItemHeaders.forEach(accordionItemHeader => {
  accordionItemHeader.addEventListener("click", event => {
    
    // Uncomment in case you only want to allow for the display of only one collapsed item at a time!
    
    if(accordionItemHeader.parentElement.parentElement.classList.contains("single-accordion")){
        const currentlyActiveAccordionItemHeader = document.querySelector(".accordion-item-header.active");
        if(currentlyActiveAccordionItemHeader && currentlyActiveAccordionItemHeader!==accordionItemHeader) {
        currentlyActiveAccordionItemHeader.classList.toggle("active");
        currentlyActiveAccordionItemHeader.parentElement.classList.toggle("active");
        currentlyActiveAccordionItemHeader.nextElementSibling.style.maxHeight = 0;
        }
    }

    accordionItemHeader.classList.toggle("active");
    accordionItemHeader.parentElement.classList.toggle("active");
    const accordionItemBody = accordionItemHeader.nextElementSibling;
    if(accordionItemHeader.classList.contains("active")) {
      accordionItemBody.style.maxHeight = accordionItemBody.scrollHeight + "px";
    }
    else {
      accordionItemBody.style.maxHeight = 0;
    }
    
  });

  if(accordionItemHeader.parentElement.classList.contains("active")){
    accordionItemHeader.nextElementSibling.style.maxHeight = accordionItemHeader.nextElementSibling.scrollHeight + "px";
    accordionItemHeader.classList.add("active");
  }


});


// Update Swiper on touch or click
$('[swiper-update-ontouch]').each(function(){
    swiperupdate = $(this)[0].swiper;
    swiperupdate.on('click', function (swiper, event) {
        swiper.update();
        setTimeout(function(){
            swiper.update();
        },200);
    });
    // swiperupdate.on('touchStart', function (swiper, event) {
    //     swiper.update();
    //     setTimeout(function(){
    //         swiper.update();
    //     },400);
    // });
})
$('[swiper-re-init]').each(function(){
    
        swiperInit = $(this)[0].swiper;
        swiperInit.update();
        setTimeout(function(){
            swiperInit.update();
        },200);
})







$('.selection-item-holder').each(function(){
    $(this).on('taphold',function(e){
        
        let selectionItemHolder = $(this);
        let selectionBtnHolder = $('.selection-btns-cont');
        if(!$(this).hasClass('active')){
           // Vibrate the phone
            navigator.vibrate(50);
            selectionItemHolder.addClass('active');
            selectionBtnHolder.addClass('active');
            activeHoldElement = e.target.closest('.selection-item');
            activeHoldCheckInput = activeHoldElement.querySelector('.selection-box input[type="checkbox"]');
            activeHoldCheckInput.checked = true;
       }
    })
})

$('.selection-item-holder').each(function(){
    
    let selectionItemHolder = $(this);
    let selectionBtnHolder = $('.selection-btns-cont');
    checkInput = $(this).find('.selection-box input[type="checkbox"]');
        //Checks if anyInput is checked
        const anyCheckedInput = (checkInput) => {
            counter = 0;
            checkInput.each(function(){
                if($(this).prop('checked')){
                    counter++;
                }
            })
            return counter;
        }

        checkInput.each(function(){
            $(this).change(function(){
                if(!anyCheckedInput($('.selection-box input[type="checkbox"]'))){
                    selectionItemHolder.removeClass('active');
                    selectionBtnHolder.removeClass('active');
                    navigator.vibrate(50);
                }
            })
        })
})






});