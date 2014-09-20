jQuery(document).ready(function($) {

    var m = {};
    var w =
    {
        x: $(window).width(),
        y: $(window).height()
    };
    var init = $.now();
    var ti = 0;
    var intervalSize = 800;

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
                (cur / w.x) * 15000,
                function() {
                        console.log("out");
                    }
            );
            //$item.find(".menu-item-lead").css({"width": 0});
        }
    };
    
    //this function, and accoutrements should be made a template, and used for stuff.
    var perlinLines = function(ms) {
        var len = (".lines .line").length;
        $(".lines .line").each(function(i) {
            var pos = ((1/len) * (i+1));
            var msi = pos + ms;
            pn = (noise.perlin2(msi, msi-Math.random()*.3) + 1) / 2;
            $(this).stop(true, false).animate(
                {
                    "margin-left": [pn*100 + "%", "linear"]
                },
                intervalSize,
                function() {
                    }
            );
            
            //$(this).css("margin-left", pn*100 + "%");
            //$(this).css("margin-top", pn*100 + "%"); because of margin calculated by width
            
        });
    }
    
    var timeInterval = function(){
        ti++;
        var now = $.now() - init;
        perlinLines(now);
    }
    
    /*****RUNTIME*****/
    
    noise.seed(Math.random());
    var timer = setInterval(timeInterval, intervalSize);
    
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

