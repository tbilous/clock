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

    $('div[data-type="background"]').each(function () {
        var $bgobj = $(this); // Назначаем объек
        $(window).scroll(function () {
            // Прокручиваем фон со скоростью var.
            // Значение yPos отрицательное, так как прокручивание осуществляется вверх!
            var yPos = -($window.scrollTop() / $bgobj.data('speed'));

            // Размещаем все вместе в конечной точке
            var coords = '50% ' + yPos + 'px';

            // Смещаем фон
            $bgobj.css({backgroundPosition: coords});
        });

    });


});