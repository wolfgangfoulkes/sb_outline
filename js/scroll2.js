jQuery(document).ready(function($) {

    var w =
    {
        x: $(window).width(),
        y: $(window).height()
    };
    
    var scr_t = 0;
    var i_cur = 0;

    var callbacks =
    {
        windowSize: function() {
            w.x = $(window).width();
            w.y = $(window).height();
            
            console.log("window.x", w.x);
            console.log("window.y", w.y);
        },
        
        scrollFix: function() {
            scr_t = $(this).scrollTop();
            scr_b = scr_t + w.y;
            $(".scroll-outer").each(function(index, element){
                var $outer = $(element);
                
                //get height of outer element just once
                var top_o = $outer.offset().top;
                var height_o = $outer.outerHeight(false); //no margins
                var bottom_o = top_o + height_o;
                
                //iterate over all .scroll objects
                $(".scroll-inner").each(function(index, element) {
                    var $inner = $(element);

                    var top_i = $inner.offset().top;
                    var height_i = $inner.outerHeight(true);
                    //if "true" it keeps reading that "top" position. a more semantic solution would be "transform"
                    var bottom_i = top_o + height_i;
                    
                    var state = "below-scroll"; //same as defining an else
                    if ((scr_b >= top_o) && (scr_t < bottom_o)) //thing is onscreen
                    {
                        if (scr_b >= bottom_i)
                        {
                            if (scr_b >= bottom_o) {state = "above-scroll";}
                            else {state = "scroll"}
                        }
                    }
                    $inner.toggleClass("below-scroll", (state == "below-scroll") );
                    $inner.toggleClass("scroll", (state == "scroll") );
                    $inner.toggleClass("above-scroll", (state == "above-scroll") );
                    console.log("index", index, "bottom_o", bottom_o, "top_o:", top_o, "bottom_i", bottom_i, "top_i:", top_i, "scr_t", scr_t, "scr_b", scr_b, "state", state);
                });
            });
        }
    };
    
    
       /*****RUNTIME*****/
    
    $(window).resize(callbacks.windowSize);
    $(window).resize(callbacks.scrollFix);
    $(window).scroll(callbacks.scrollFix);
    
});

