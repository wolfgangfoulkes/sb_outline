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

            $(".content-item").each(function(index, element) {
                var top = $(element).offset().top;
                var height = $(element).outerHeight(false);
                var bottom = top + height;
                var $frame = $(element).find(".content-item-frame");
                var step = 0;
                if ((scr_b >= top) && (scr_t < bottom))
                {
                    if (scr_b < bottom)
                    {
                        step = 1;
                    }
                    else
                    {
                        step = 2;
                    }
                }
                $frame.toggleClass("abs-top", (step == 0));
                $frame.toggleClass("fixed", (step == 1));
                $frame.toggleClass("abs-bottom", (step == 2));
                console.log("index", index, "scr_t", scr_t, "scr_b", scr_b, "top", top, "bottom", bottom, "step", step);
                });
            }
        };
    
       /*****RUNTIME*****/
    
    $(window).resize(callbacks.windowSize);
    $(window).resize(callbacks.scrollFix);
    $(window).scroll(callbacks.scrollFix);
    
});

