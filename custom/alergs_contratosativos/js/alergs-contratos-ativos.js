(function ($, Drupal) {
    var classe = '';
    if(isMobile()) {
        $(".contratos_ativos").hide();
         classe = '.contratos_ativos_mobile';
    }else{
        $(".contratos_ativos_mobile").hide();
         classe = '.contratos_ativos';
    }

    $(classe).slick({
        dots: true,
        arrows:false,
        speed: 300,
        slidesToShow: 1,
        adaptiveHeight: true,      
        rows:5,   
        slidesPerRow: 7,    
        swipeToSlide: true,
        draggable:false,  
      

       responsive: [
            {
              breakpoint: 890,
              settings: {                 
                  rows:14,
                  slidesPerRow: 1,
                  variableWidth: false,
              }
            },  
           
            {
                breakpoint: 1200,
                settings: {                 
                    variableWidth: true,
                }
              },                   
        ]
        
    }); 
  
    screen.orientation.addEventListener("change", function(e) {
       location.reload();
       }, false);

})(jQuery, Drupal);


function isMobile() {
     return (( screen.width <= 890 ) && ( screen.width <= 1050 ));
}



