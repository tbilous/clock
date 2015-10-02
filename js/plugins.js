// Avoid `console` errors in browsers that lack a console.
(function () {
    var method;
    var noop = function () {
    };
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

$(document).ready(function () {
    $('.nav-justified a').click(function (e) {
        e.preventDefault();
        $('.nav-justified > li').removeClass('active');
        $(this).parent('li').addClass('active');
    });

//SCROLL TO ANCHOR
    function scroll_if_anchor(href) {
        href = typeof(href) == "string" ? href : $(this).attr("href");
        // You could easily calculate this dynamically if you prefer
        var fromTop = 50;
        // If our Href points to a valid, non-empty anchor, and is on the same page (e.g. #foo)
        // Legacy jQuery and IE7 may have issues: http://stackoverflow.com/q/1593174
        if (href.indexOf("#") == 0) {
            var $target = $(href);
            // Older browser without pushState might flicker here, as they momentarily
            // jump to the wrong position (IE < 10)
            if ($target.length) {
                var time = 1000;
                $('html, body').animate({scrollTop: $target.offset().top - fromTop}, time);
                if (history && "pushState" in history) {
                    history.pushState({}, document.title, window.location.pathname + href);
                    return false;
                }
            }
        }
    }

// Intercept all anchor clicks
    $("body").on("click", ".anchor", scroll_if_anchor);
    // Кешируем объект окна
    $window = $(window);


    //PARALLAX

    $('.parallax[data-type="background"]').each(function () {
        var $bgobj = $(this); // Назначаем объек
        $(window).scroll(function () {
            var yPos = -($window.scrollTop() / $bgobj.data('speed'));
            var coords = '50% ' + yPos + 'px';
            $bgobj.css({backgroundPosition: coords});
        });

    });

    //VIEWPORT CHECK

    /* Mobile & Animation */
    var Android = navigator.userAgent.search(/Android/i);
    var iPhone = navigator.userAgent.search(/iPhone/i);
    var iPad = navigator.userAgent.search(/iPad/i);
    if (Android != -1 || iPhone != -1 || iPad != -1) {
        $('html').css('width', window.innerWidth + 'px');
    } else {
        $(".scroll").each(function () {
            var block = $(this);
            var action = $(this).data('action');
            var delay = $(this).data('delay');
            $(window).scroll(function () {
                var top = block.offset().top;
                var bottom = block.height() + top;
                top = top - $(window).height();
                var scroll_top = $(this).scrollTop();
                if ((scroll_top > top) && (scroll_top < bottom)) {
                    /*                    if (!block.hasClass("animated")) {
                     block.addClass("animated");
                     block.trigger('animateIn');
                     }      */
                    if (block.hasClass('animated')) {
                        block.addClass(action);
                        block.css('animation-delay', delay + 's');
                        //block.trigger('animateIn');
                        if (block.hasClass('steps')) {
                            block.addClass('start');
                            //block.addClass('start');
                        }
                    }
                }
                else {
                    if (!block.hasClass('no-repeat')) {
                        block.removeClass(action).removeClass('start');
                        block.trigger('animateOut');
                    }
                }
            });
        });

        /* Time Parser */
        $(".steps .count").each(function () {
            $(this).attr("data-number", parseInt($(this).text()));
            console.log(this)
        });

        //$('start').trigger('animateIn');
        $(".steps").on("animateIn", function () {
            var inter = 1;
            $(this).find(".count").each(function () {
                var count = parseInt($(this).attr("data-number")), block = $(this), timeout = null, step = 1;
                timeout = setInterval(function () {
                    if (step == 25) {
                        block.text(count.toString());
                        clearInterval(timeout);
                    } else {
                        block.text((Math.floor(count * step / 25)).toString());
                        step++;
                    }
                }, 60);
            });
        });

    }
    $('.count').delay(800).viewportChecker({
        classToAdd: 'start',
        classToRemove: 'start',
        offset: 200,
        repeat: true,
        callbackFunction: function runDigitFlow(elem, action) {
            $("[data-value]").each(function (i, el) {
                var targetValue = $(el).attr('data-value');
                var curValue = 1;
                //var curValue = parseInt($("[data-number]").html());
                var intervalHandle = setInterval(function () {
                    var delta = Math.round(Math.max(Math.min((targetValue - curValue) / 7, 59), 1));
                    console.log(curValue >= targetValue);

                    curValue = curValue + delta;
                    $(el).html(curValue);

                    if (curValue >= targetValue)
                        clearInterval(intervalHandle);
                }, 50);
            });
        }
    });
    $('.action').parallax({
            imageSrc: 'img/parallax-2-bg-hires.jpg',
            speed: 0.3,
            positionY: 'bottom'
        }
    );

});