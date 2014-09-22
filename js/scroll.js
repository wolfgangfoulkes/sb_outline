jQuery(document).ready(function($) {

    var w =
    {
        x: $(window).width(),
        y: $(window).height()
    };
    
    var scr = 0;
    var i_cur = 0;

    var callbacks =
    {
        windowSize: function() {
            w.x = $(window).width();
            w.y = $(window).height();
            
            console.log("window.x", w.x);
            console.log("window.y", w.y);
        }
        
    };
    
       /*****RUNTIME*****/
    
    $(window).resize(callbacks.windowSize);
    $(window).scroll(function(){
        scr = $(this).scrollTop();
        i_cur = scr / w.y; //could clip this to exclude -'s
        var $item = $(".content-item").filter(function(){
            var p_cur = $(this).offset().top;
            var h_cur = $(this).outerHeight(true);
            console.log("p_cur", p_cur, "h_cur", h_cur);
            return ( (scr >= p_cur) && (scr < (p_cur + h_cur)) ); //divide h_cur by two here if you want it to scroll with content
        });
        console.log($item.length);
        if ($item.length >= 1)
        {
            var top = $item.offset().top;
            var bottom = top + $item.outerHeight(true);
            var pos = scr - top;
            $item.find(".content-item-frame").css("top", pos + "px");
            console.log(top, bottom, "tb");
        }
        
        /*
        i_pg = (i_cur - 1) / 2;
        var i_many = $(".content-item-frame").length;
        $(".content-item-frame").toggleClass("current-frame", false);
        if ((i_pg >= 0) && (i_pg < i_many))
        {
            var $pg_cur = $(".content-item-frame").eq( Math.floor(i_pg) );
            $pg_cur.toggleClass("current-frame", true);
        }
        */
        
        
        console.log("scr: ", scr, "i_cur: ", i_cur, Math.floor((i_cur-1)/2));
    });
    
});

