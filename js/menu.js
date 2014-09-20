jQuery(document).ready(function($) {

    var m = {};
    var w =
    {
        x: $(window).width(),
        y: $(window).height()
    };
    var init = $.now();
    var ti = 0;

    var callbacks =
    {
        windowSize: function() {
            w.x = $(window).width();
            w.y = $(window).height();
            
            console.log("window.x", w.x);
            console.log("window.y", w.y);
        },
        
        mousePos: function(e) {
            m =
            {
                x: e.pageX,
                y: e.pageY
            };
            
            console.log("mouse.x", m.x);
            console.log("mouse.y", m.y);
        },
        
        menuIn: function() {
            var $item = $(this);
            var cur = parseFloat($item.find(".menu-item-lead").css("width"));
            var dist = Math.abs(m.x - cur);
            
            /* $item.find(".menu-item-lead").css({"width": m.x}); */
            
            $item.find(".menu-item-lead").animate(
                {
                    "width": m.x
                },
                (dist / w.x) * 100,
                function() {
                        console.log("dist: in", dist / w.x);
                    }
            );
            
        },
        menuOut: function() {
            var $item = $(this);
            var cur = parseFloat($item.find(".menu-item-lead").css("width"));
            $item.find(".menu-item-lead").animate(
                {
                    "width": [0, "easeOutCubic"]
                },
                (cur / w.x) * 20000,
                function() {
                        console.log("out");
                    }
            );
            //$item.find(".menu-item-lead").css({"width": 0});
        }
    };
    
    //this function, and accoutrements should be made a template, and used for stuff.
    var perlinLines = function(ms) {
        $(".lines .line").each(function(i) {
            var msi = ms + 1/i;
            pn = (perlin2(msi, msi) + 1) / 2;
            $(this).css("height", pn + "%");
        });
    }
    
    var timeInterval = function {
        ti++;
        perlinLines(ti);
    }
    
    /*****RUNTIME*****/
    
    var timer = setInterval(timeInterval, 100);
    
    $(document).mousemove(event, function(){
        var $item = $(".menu-item:hover").first();
        callbacks.mousePos(event);
        console.log("many:", $(".menu-item:hover").length, "first:", $(".menu-item:hover").first().length);
        $item.find(".menu-item-lead").stop(true, false);
        $item.each(callbacks.menuIn);
    });
    
    $(window).resize(callbacks.windowSize);
    
    $(".menu-item").hover(function() {/*$item.find(".menu-item-lead").stop(true, false);*/}, callbacks.menuOut);
    //$(".menu-item").hover(callbacks.menuIn, callbacks.menuOut);
});

