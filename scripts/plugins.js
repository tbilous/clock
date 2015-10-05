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

    var date = new Date();
    date.setDate(date.getDate() + 1);
    $(".daynow").text(date.getDate());
    var month = date.getMonth();
    switch(month) {
        case 0:
        {
            $(".monthnow").text('января');
            break;
        }
        case 1:
        {
            $(".monthnow").text('февраля');
            break;
        }
        case 2:
        {
            $(".monthnow").text('марта');
            break;
        }
        case 3:
        {
            $(".monthnow").text('апреля');
            break;
        }
        case 4:
        {
            $(".monthnow").text('мая');
            break;
        }
        case 5:
        {
            $(".monthnow").text('июня');
            break;
        }
        case 6:
        {
            $(".monthnow").text('июля');
            break;
        }
        case 7:
        {
            $(".monthnow").text('августа');
            break;
        }
        case 8:
        {
            $(".monthnow").text('сентября');
            break;
        }
        case 9:
        {
            $(".monthnow").text('октября');
            break;
        }
        case 10:
        {
            $(".monthnow").text('ноября');
            break;
        }
        case 11:
        {
            $(".monthnow").text('декабря');
            break;
        }
    }
    dateEnd = date;
    console.log(dateEnd);

    //CLOCK
    var tomorrow = moment().endOf('day').valueOf() + 1;
    //var end = moment("2015-10-31").valueOf()+1; //ТУТ МЕНЯТЬ ДАТУ ФОРМАТ: "ГОД - МЕСЯЦ - ЧИСЛО"
    var now = moment().valueOf();
    var interval = (tomorrow - now) / 1000;
    var clock = $('.clock').FlipClock(interval, {
        clockFace: 'HourlyCounter',
        countdown: true,
        language: 'ru',
        showSeconds: false
    });
    var clockTop = $('.clock-top').FlipClock(interval, {
        clockFace: 'HourlyCounter',
        countdown: true,
        language: 'ru',
        showSeconds: false
    });
    var clockBottom = $('.clock-bottom').FlipClock(interval, {
        clockFace: 'HourlyCounter',
        countdown: true,
        language: 'ru',
        showSeconds: false
    });


    $('.nav-justified a').click(function (e) {
        e.preventDefault();
        $('.nav-justified > li').removeClass('active');
        $(this).parent('li').addClass('active');
    });

//SCROLL TO ANCHOR
    function scroll_if_anchor(href) {
        href = typeof(href) == "string" ? href : $(this).attr("href");
        var fromTop = 50;
        if (href.indexOf("#") == 0) {
            var $target = $(href);
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
    $window = $(window);

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
                    if (block.hasClass('animated')) {
                        block.addClass(action);
                        block.css('animation-delay', delay + 's');
                        if (block.hasClass('steps')) {
                            block.addClass('start');
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
            //console.log(this)
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
    $('.count').viewportChecker({
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
                    //console.log(curValue >= targetValue);

                    curValue = curValue + delta;
                    $(el).html(curValue);

                    if (curValue >= targetValue)
                        clearInterval(intervalHandle);
                }, 50);
            });
        }
    });

    //PARALLAX
    $('.parallax[data-type="background"]').each(function () {
        var $bgobj = $(this); // ��������� �����
        $(window).scroll(function () {
            var yPos = -($window.scrollTop() / $bgobj.data('speed'));
            var coords = '50% ' + yPos + 'px';
            $bgobj.css({backgroundPosition: coords});
        });

    });
    $('.action[data-type="background"]').each(function () {
        var $bgobj = $(this); // ��������� �����
        $(window).scroll(function () {
            var yPos = -(($window.scrollTop()/2) / $bgobj.data('speed'));
            var coords = '50% ' + yPos + 'px';
            $bgobj.css({backgroundPosition: coords});
        });

    });
    $('.action1[data-type="background"]').each(function () {
        var $bgobj = $(this); // ��������� �����
        $(window).scroll(function () {
            var yPos = -(($window.scrollTop()/3) / $bgobj.data('speed'));
            var coords = '50% ' + yPos + 'px';
            $bgobj.css({backgroundPosition: coords});
        });

    });

//PARALLAX
/*    $('.action').parallax({
            imageSrc: 'img/parallax-2-bg-hires.jpg',
            speed: 0.3,
            positionY: 'bottom'
        }
    );*/
/*    $('.action1').parallax({
            imageSrc: 'img/parallax-3-bg-hires.jpg',
            speed: 0.3,
            positionY: 'top'
        }
    );*/

//CENTERED MODAL
    $(".start-modal").click(function () {
        var d_tar = $(this).attr('data-target');
        $(d_tar).show();
        var modal_he = $(d_tar).find('.modal-dialog .modal-content').height();
        var win_height = $(window).height();
        var marr = win_height - modal_he;
        $('.modal-dialog').css('margin-top', marr / 2);
    });
//RESET FORM
    function resetForm(formid) {
        $(':input', formid).not(':button, :submit, :reset, :hidden').val('')
            .removeAttr('checked').removeAttr('selected');
    }

//SUBMIT FORM
    //MODAL FORM
    $("#requestForm").submit(function () {
        $.ajax({
            type: "POST",
            url: "mail.php", //mail script
            data: $(this).serialize()
        }).done(function () {
            $(this).find("input").val("");
            alert("true offersForm");
            resetForm('#requestForm');
        });
        $('#orderModal').modal('hide');
        return false;
    });
//HEADER COUNT FORM
    $("#headerForm").submit(function () {
        $.ajax({
            type: "POST",
            url: "mail.php", //mail script
            data: $(this).serialize()
        }).done(function () {
            $(this).find("input").val("");
            alert("true headerForm");
            resetForm('#headerForm');
        });
        return false;
    });
//Query-block FORM
    $("#actionForm0").submit(function () {
        $.ajax({
            type: "POST",
            url: "mail.php", //mail script
            data: $(this).serialize()
        }).done(function () {
            $(this).find("input").val("");
            alert("true bottomForm0");
            resetForm('#bottomForm0');
        });
        return false;
    });
//BODY COUNER-FORM
    $("#actionForm1").submit(function () {
        $.ajax({
            type: "POST",
            url: "mail.php", //mail script
            data: $(this).serialize()
        }).done(function () {
            $(this).find("input").val("");
            alert("true bottomForm1");
            resetForm('#bottomForm1');
        });
        return false;
    });
});