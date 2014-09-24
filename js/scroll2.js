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
                var state = "off"; //same as defining an else
                if ((scr_b >= top) && (scr_t < bottom)) //thing is onscreen
                {
                    if (scr_t >= top)
                        {
                            if (scr_b >= bottom) {state = "m_bottom";} //margin for margin-is
                            else {state = "fullscreen";}
                        }
                    else {state = "m_top";}
                }
                $(element).toggleClass("off", (state == "off") );
                $(element).toggleClass("m_top", (state == "m_top") );
                $(element).toggleClass("fullscreen", (state == "fullscreen") );
                $(element).toggleClass("m_bottom", (state == "m_bottom") );
                console.log("index", index, "scr_t", scr_t, "scr_b", scr_b, "state", state);
                });
            }
        };
    
       /*****RUNTIME*****/
    
    $(window).resize(callbacks.windowSize);
    $(window).resize(callbacks.scrollFix);
    $(window).scroll(callbacks.scrollFix);
    
});

