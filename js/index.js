

wow = new WOW(
    {
    boxClass:     'wow',      // default
    animateClass: 'animated', // default
    offset:       0,          // default
    mobile:       true,       // default
    live:         true        // default
    }
                    )
    wow.init();

/*------------------------------------------*/

$(function () {
  $(document).scroll(function () {
  
      if($("body").scrollTop() > 100)
          {
              $('.navbar').attr('style', 'background-color:#b70000 !important');
          }
      else 
          {
              $('.navbar').attr('style', 'background-color: transparent');
          }
  });
});

/*-------------------------------*/
$(".h").on('click', function () {
    $('html, body').animate({
        'scrollTop': $("header").offset().top
    }, 600);
});
/*-------------------------------*/
$(".a").on('click', function () {
    $('html, body').animate({
        'scrollTop': $(".about").offset().top - '150'
    }, 600);
});
/*-------------------------------*/
$(".s").on('click', function () {
    $('html, body').animate({
        'scrollTop': $(".skill-title").offset().top
    }, 600);
});

/*-------------------------------*/
$(".f").on('click', function () {
    $('html, body').animate({
        'scrollTop': $(".projects").offset().top
    }, 600);
});

/*-------------------------------*/
$(".c").on('click', function () {
    $('html, body').animate({
        'scrollTop': $("footer").offset().top
    }, 600);
});

/*-------------------------------*/
$(".hire").on('click', function () {
    $('html, body').animate({
        'scrollTop': $(".cv-div").offset().top - '200'
    }, 600);
});

/*-------------------------------*/
$(".fa-whatsapp").on('click', function () {
    $('html, body').animate({
        'scrollTop': $("footer").offset().top
    }, 600);
});

/*--------------------------------------------------------------------*/

$(".back-btn").click(function(){
    $("html , body").animate({
        scrollTop:0
    },1300)
})

/*---------------------------------------------------------------------*/


$(".btn-pro").click(function(){
    $(".project-info").css("display","block");
    
    var img_scr = $(this).next().children().attr('src');
    
    $("nav").css("display" , "none")
    
    $(".project-img").attr("src" , img_scr);
    
    var btn_href = $(this).children().attr('href');
    
    $(".proo-btn").children().attr("href" , btn_href);
    
    var btn_href_git = $(this).children().last().attr('href');
    
    $(".git-btn").children().attr("href" , btn_href_git);

});


$(".close-btn").click(function(){
    $(".project-info").css("display","none");
    $("nav").css("display" , "block");
   
})




/*--------------------------------------------------------------------------*/

$(document).ready(function(){
    
    $(".spinner").fadeOut(10000 , function(){
        
        $(".loadingscreen").fadeOut(1000);
        $("body").css("overflow","auto")
    });
})


