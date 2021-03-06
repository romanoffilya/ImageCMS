var activeClass = 'active',
        clonedC = 'cloned';
wnd = $(window),
        body = $('body');
/*
 *imagecms frontend plugins
 **/
function pluralStr(i, str) {
    function plural(a) {
        if (a % 10 == 1 && a % 100 != 11)
            return 0
        else if (a % 10 >= 2 && a % 10 <= 4 && (a % 100 < 10 || a % 100 >= 20))
            return 1
        else
            return 2;
    }

    switch (plural(i)) {
        case 0:
            return str[0];
        case 1:
            return str[1];
        default:
            return str[2];
    }
}

jQuery.expr[':'].regex = function(elem, index, match) {
    var matchParams = match[3].split(','),
            validLabels = /^(data|css):/,
            attr = {
        method: matchParams[0].match(validLabels) ?
                matchParams[0].split(':')[0] : 'attr',
        property: matchParams.shift().replace(validLabels, '')
    },
    regexFlags = 'ig',
            regex = new RegExp(matchParams.join('').replace(/^\s+|\s+$/g, ''), regexFlags);
    return regex.test(jQuery(elem)[attr.method](attr.property));
}

String.prototype.trim = function()
{
    return this.trimRight().trimLeft();
}
String.prototype.trimMiddle = function()
{
    var r = /\s\s+/g;
    return $.trim(this).replace(r, ' ');
}
String.prototype.pasteSAcomm = function() {
    var r = /\s,/g;
    return this.replace(r, ',');
}

jQuery.exists = function(selector) {
    return ($(selector).length > 0);
}
jQuery.existsN = function(nabir) {
    return (nabir.length > 0);
}
jQuery.testNumber = function(e) {
    if (!e)
        var e = window.event;
    var key = e.keyCode;
    if (key == null || key == 0 || key == 8 || key == 13 || key == 9 || key == 46 || key == 37 || key == 39)
        return true;
    keyChar = String.fromCharCode(key);
    if (!/\d/.test(keyChar)) {
        return false;
    }
    else
        return true;
}
jQuery.onlyNumber = function(el) {
    $(el).live('keypress', function(e) {
        if (!$.testNumber(e)) {
            $(this).tooltip();
            return false;
        }
    });
}
function setcookie(name, value, expires, path, domain, secure)
{
    var today = new Date();
    today.setTime(today.getTime());
    if (expires)
    {
        expires = expires * 1000 * 60 * 60 * 24;
    }
    var expiresDate = new Date(today.getTime() + (expires));
    document.cookie = name + "=" + encodeURIComponent(value) +
            ((expires) ? ";expires=" + expiresDate.toGMTString() : "") + ((path) ? ";path=" + path : "") +
            ((domain) ? ";domain=" + domain : "") +
            ((secure) ? ";secure" : "");
}
var ie = jQuery.browser.msie,
        ieV = jQuery.browser.version,
        ltie7 = ie && (ieV <= 7),
        ltie8 = ie && (ieV <= 8);
function ieInput(els) {
    if (els == undefined)
        els = $(':input');
    els.not(':hidden').not('.visited').not('.notvis').each(function() {
        $this = $(this);
        $this.css({
            'width': function() {
                return 2 * $this.width() - $this.outerWidth();
            },
            'height': function() {
                return 2 * $this.height() - $this.outerHeight();
            }
        }).addClass('visited');
    });
}
(function($) {
    var methods = {
        init: function(options) {
            if ($.existsN($(this))) {
                var settings = $.extend({
                    wrapper: $(".frame-label:has(.niceCheck)"),
                    elCheckWrap: '.niceCheck',
                    evCond: false,
                    classRemove: null,
                    before: function() {
                    },
                    after: function() {
                    }
                }, options);
                var frameChecks = $(this),
                        wrapper = settings.wrapper,
                        elCheckWrap = settings.elCheckWrap,
                        evCond = settings.evCond,
                        classRemove = settings.classRemove,
                        frameChecks = frameChecks.selector.split(','),
                        after = settings.after;
                wrapper.find(elCheckWrap).children('input').mousedown(function(e) {
                    $(this).closest(wrapper).click();
                })
                $.map(frameChecks, function(i, n) {
                    var frameChecks = $(i.replace(' ', ''));
                    frameChecks.each(function() {
                        var thisFrameChecks = $(this);
                        thisFrameChecks.find(elCheckWrap).each(function() {
                            var $this = $(this).removeClass(classRemove),
                                    $thisInput = $this.children();
                            if (!$thisInput.is('[disabled="disabled"]')) {
                                methods.changeCheckStart($this, $thisInput);
                            }
                            else {
                                methods.checkUnChecked($this, $thisInput)
                                methods.CheckallDisabled($this, $thisInput);
                            }
                        })
                    }).find(wrapper).unbind('click').bind('click', function(e) {
                        if ($(e.target).is(':input'))
                            return false;
                        var $this = $(this),
                                $thisD = $this.is('.disabled'),
                                nstcheck = $this.find(elCheckWrap);
                        if (nstcheck.length == 0)
                            nstcheck = $this
                        if (!$thisD) {
                            if (!evCond) {
                                methods.changeCheck(nstcheck);
                                after(frameChecks, $this, nstcheck);
                            }
                            else
                                settings.before(frameChecks, $this, nstcheck);
                        }
                    });
                });
            }
        },
        changeCheckStart: function(el, input) {
            var el = el,
                    input = input;
            if (input.attr("checked")) {
                methods.checkChecked(el, input);
            }
            else {
                methods.checkUnChecked(el, input);
            }
        },
        checkChecked: function(el, input) {
            var el = el;
            if (el == undefined)
                el = this;
            var input = input;
            if (input == undefined)
                input = this.find("input");
            el.addClass(activeClass).parent().addClass(activeClass);
            input.attr("checked", true);
            $(document).trigger({'type': 'nstCheck.CC', 'el': el, 'input': input});
        },
        checkUnChecked: function(el, input) {
            var el = el;
            if (el == undefined)
                el = this;
            var input = input;
            if (input == undefined)
                input = this.find("input");
            el.removeClass(activeClass).parent().removeClass(activeClass);
            input.attr("checked", false);
            $(document).trigger({'type': 'nstCheck.CUC', 'el': el, 'input': input});
        },
        changeCheck: function(el)
        {
            var el = el;
            if (el == undefined)
                el = this;
            var input = el.find("input");
            if (!input.attr("checked")) {
                methods.checkChecked(el, input);
            }
            else {
                methods.checkUnChecked(el, input);
            }
        },
        changeCheckallchecks: function(el)
        {
            var el = el;
            if (el == undefined)
                el = this;
            el.each(function() {
                var input = el.find("input");
                el.addClass(activeClass).parent().addClass(activeClass);
                input.attr("checked", true);
            })
        },
        changeCheckallreset: function(el)
        {
            var el = el;
            if (el == undefined)
                el = this;
            el.each(function() {
                input = el.find("input");
                el.removeClass(activeClass).parent().removeClass(activeClass);
                input.attr("checked", false);
            });
        },
        CheckallDisabled: function(el)
        {
            var el = el;
            if (el == undefined)
                el = this;
            el.each(function() {
                input = el.find("input");
                el.removeClass(activeClass).addClass('disabled').parent().addClass('disabled').removeClass(activeClass);
                input.attr('disabled', 'disabled').removeAttr('checked');
            });
        },
        CheckallEnabled: function(el)
        {
            var el = el;
            if (el == undefined)
                el = this;
            el.each(function() {
                input = el.find("input");
                el.removeClass('disabled').parent().removeClass('disabled');
                input.removeAttr('disabled');
            });
        }
    };
    $.fn.nStCheck = function(method) {
        if (methods[method]) {
            return methods[ method ].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.nStCheck');
        }
    };
})(jQuery);
(function($) {
    var methods = {
        init: function(options) {
            var optionsRadio = $.extend({
                wrapper: $(".frame-label:has(.niceRadio)"),
                elCheckWrap: '.niceRadio',
                classRemove: null,
                after: function() {
                }
            }, options),
                    settings = optionsRadio;
            var $this = $(this);
            if ($.existsN($this)) {
                $this.each(function() {
                    var $this = $(this);
                    var after = settings.after,
                            classRemove = settings.classRemove,
                            wrapper = settings.wrapper,
                            elCheckWrap = settings.elCheckWrap;
                    $this.find(elCheckWrap).each(function() {
                        methods.changeRadioStart($(this), classRemove, after, true);
                    });
                    $this.find(wrapper).unbind('click.radio').bind('click.radio', function(e) {
                        methods.changeRadio($(this).find(elCheckWrap), after, false);
                    });
                    $this.find(elCheckWrap).find('input').bind('mousedown change', function(e) {
                        return false;
                    })
                })
            }
        },
        changeRadioStart: function(el, classRemove, after, start)
        {
            var input = el.find("input");
            if (input.attr("checked")) {
                methods.radioCheck(el, input, after, start);
            }
            el.removeClass(classRemove);
            return false;
        },
        changeRadio: function(el, after, start)
        {
            var input = el.find("input");
            methods.radioCheck(el, input, after, start);
        },
        radioCheck: function(el, input, after, start) {
            el.addClass(activeClass);
            el.parent().addClass(activeClass);
            input.attr("checked", true);
            after(input, start);
            input.closest('form').find('[name=' + input.attr('name') + ']').not(input).each(function() {
                methods.radioUnCheck($(this).parent(), $(this))
            })
            $(document).trigger({'type': 'nStRadio.RC', 'el': el, 'input': input});
        },
        radioUnCheck: function(el, input) {
            el.removeClass(activeClass);
            el.parent().removeClass(activeClass);
            input.attr("checked", false);
            $(document).trigger({'type': 'nStRadio.RUC', 'el': el, 'input': input});
        }
    };
    $.fn.nStRadio = function(method) {
        if (methods[method]) {
            return methods[ method ].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.nStRadio');
        }
    };
})(jQuery);
(function($) {
    var methods = {
        init: function(options) {
            var settings = $.extend({
                item: 'ul > li',
                duration: 300,
                searchPath: "/shop/search/ac",
                inputString: $('#inputString')
            }, options);
            function postSearch() {
                $.fancybox.showActivity();
                $(document).trigger({'type': 'autocomplete.before', 'el': inputString});
                $.post(searchPath, {
                    queryString: inputString.val()
                }, function(data) {
                    $.fancybox.hideActivity();
                    try {
                        var dataObj = JSON.parse(data),
                                html = _.template($('#searchResultsTemplate').html(), {
                            'items': dataObj
                        });
                    } catch (e) {
                        var html = e.toString();
                    }
                    $thisS.html(html);
                    $thisS.fadeIn(durationA, function() {
                        $(document).trigger({'type': 'autocomplete.after', 'el': $thisS, 'input': inputString});
                        $thisS.bind('click.autocomplete', function(e) {
                            e.stopImmediatePropagation();
                        })
                        body.bind('click.autocomplete', function(event) {
                            closeFrame();
                        }).bind('keydown.autocomplete', function(e) {
                            if (!e)
                                var e = window.event;
                            if (e.keyCode == 27) {
                                closeFrame();
                            }
                        });
                    });
                    if (inputString.val().length == 0)
                        closeFrame();
                    selectorPosition = -1;
                    var itemserch = $thisS.find(itemA);
                    itemserch.mouseover(function() {
                        var $this = $(this);
                        $this.addClass('selected');
                        selectorPosition = $this.index();
                        lookup(itemserch, selectorPosition);
                    }).mouseleave(function() {
                        $(this).removeClass('selected');
                    });
                    lookup(itemserch, selectorPosition);
                });
            }
            function lookup(itemserch, selectorPosition) {
                inputString.keyup(function(event) {
                    if (!event)
                        var event = window.event;
                    var code = event.keyCode;
                    if (code == 38 || code == 40)
                    {
                        if (code == 38)
                        {
                            selectorPosition -= 1;
                        }
                        if (code == 40)
                        {
                            selectorPosition += 1;
                        }

                        if (selectorPosition < 0)
                        {
                            selectorPosition = itemserch.length - 1;
                        }
                        if (selectorPosition > itemserch.length - 1)
                        {
                            selectorPosition = 0;
                        }
                        itemserch.removeClass('selected');
                        itemserch.eq(selectorPosition).addClass('selected');
                        return false;
                    }

                    // Enter pressed
                    if (code == 13)
                    {
                        var itemserchS = itemserch.filter('.selected');
                        if ($.existsN(itemserchS))
                            itemserchS.each(function(i, el) {
                                window.location = $(el).attr('href');
                                window.location = $(el).find('a').attr('href');
                            });
                        else {
                            $thisS.closest('form').submit();
                        }
                    }
                })
            }

            function closeFrame() {
                $(document).trigger({'type': 'autocomplete.close', 'el': $thisS});
                $thisS.stop().fadeOut(durationA);
                $thisS.unbind('click.autocomplete');
                body.unbind('click.autocomplete').unbind('keydown.autocomplete');
            }

            var $thisS = $(this),
                    itemA = settings.item,
                    durationA = settings.duration,
                    searchPath = settings.searchPath,
                    selectorPosition = -1,
                    inputString = settings.inputString;
            inputString.keyup(function(event) {
                if (!event)
                    var event = window.event;
                var code = event.keyCode;
                if (code != 27 && code != 40 && code != 38 && code != 13 && inputString.val().length != 0 && $.trim(inputString.val()) != "")
                    postSearch();
                else if (inputString.val().length == 0)
                    closeFrame();
            }).blur(function() {
                closeFrame();
            });
        }
    }
    $.fn.autocomplete = function(method) {
        if (methods[method]) {
            return methods[ method ].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.autocomplete');
        }
    };
})(jQuery);
(function($) {
    var methods = {
        init: function(options) {
            var tooltip = $('.tooltip').not('.' + clonedC),
                    settings = $.extend({
                title: this.attr('data-title'),
                otherClass: false,
                effect: 'notalways',
                me: true
            }, options);
            var $this = $(this), textEl = $this.find(genObj.textEl),
                    me = settings.me;
            if (textEl.is(':visible') && $.existsN(textEl) && me)
                return false;
            tooltip.text(settings.title);
            if (settings.otherClass !== false)
                tooltip.addClass(settings.otherClass);
            if (settings.effect == 'notalways')
                tooltip.hide();
            tooltip.css({
                'left': Math.ceil(this.offset().left - (tooltip.actual('outerWidth') - this.outerWidth()) / 2),
                'top': this.offset().top - tooltip.actual('outerHeight')
            }).stop().fadeIn(300, function() {
                $(document).trigger({'type': 'tooltip.show', 'el': $(this)});
            });
            $this.unbind('mouseout.tooltip').bind('mouseout.tooltip', function() {
                $(this).tooltip('remove');
            })
            $this.filter(':input').unbind('blur.tooltip').bind('blur.tooltip', function() {
                $(this).tooltip('remove');
            })

        },
        remove: function() {
            $('.tooltip').stop().fadeOut(300, function() {
                $(document).trigger({'type': 'tooltip.hide', 'el': $(this)});
            });
        }
    };
    $.fn.tooltip = function(method) {
        if (methods[method]) {
            return methods[ method ].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.tooltip');
        }
    };
    $('[data-rel="tooltip"]').live('mouseover', function() {
        $(this).tooltip();
    }).live('mouseout', function() {
        $(this).tooltip('remove');
    })
})(jQuery); /*plugin menuImageCms for main menu shop*/
(function($) {
    var methods = {
        position: function(menuW, $thisL, dropW, drop, $thisW, countColumn) {
            if (menuW - $thisL < dropW) {
                drop.removeClass('left-drop')

                if (drop.children().children().length >= countColumn)
                    drop.css('right', 0).addClass('right-drop');
                else {
                    var right = menuW - $thisW - $thisL;
                    if ($thisL + $thisW < dropW)
                        right = menuW - dropW;
                    drop.css('right', right).addClass('right-drop');
                }
            } else {
                drop.removeClass('right-drop')
                if (drop.children().children().length >= countColumn)
                    drop.css('left', 0).addClass('left-drop');
                else
                    drop.css('left', $thisL).addClass('left-drop');
            }
        },
        init: function(options) {
            var menu = $(this);
            if ($.existsN(menu)) {
                var sH = 0,
                        settings = $.extend({
                    item: this.find('li'),
                    effectOn: 'fadeIn',
                    effectOff: 'fadeOut',
                    duration: 0,
                    drop: 'li > ul',
                    countColumn: 'none',
                    columnPart: false,
                    columnClassPref: 'column_',
                    durationOn: 0,
                    durationOff: 0,
                    dropWidth: null,
                    sub2Frame: null,
                    evLF: 'hover',
                    evLS: 'hover',
                    hM: 'hoverM',
                    refresh: false
                }, options);
                var menuW = menu.width(),
                        menuItem = settings.item,
                        drop = settings.drop,
                        dropOJ = $(drop),
                        effOn = settings.effectOn,
                        effOff = settings.effectOff,
                        countColumn = settings.countColumn,
                        columnPart = settings.columnPart,
                        columnClassPref = settings.columnClassPref,
                        itemMenuL = menuItem.length,
                        dropW = settings.dropWidth,
                        sub2Frame = settings.sub2Frame,
                        duration = timeDurM = settings.duration,
                        durationOn = settings.durationOn,
                        durationOff = settings.durationOff,
                        evLF = settings.evLF,
                        evLS = settings.evLS,
                        hM = settings.frAClass,
                        refresh = settings.refresh;
                if (isTouch) {
                    evLF = 'toggle';
                    evLS = 'toggle';
                }

                var k = [],
                        kk = 0;
                menuItem.each(function(index) {
                    var $this = $(this),
                            $thisW = $this.width(),
                            $thisL = $this.position().left,
                            $thisH = $this.height(),
                            $thisDrop = $this.find(drop);
                    k[index] = false;
                    if ($thisH > sH)
                        sH = $thisH;
                    if (!dropW)
                        dropW = $thisDrop.actual('width');
                    methods.position(menuW, $thisL, dropW, $thisDrop, $thisW, countColumn);
                }).css('height', sH);
                menuItem.find('.helper:first').css('height', sH)

                $('.not-js').removeClass('not-js');
                var hoverTO = '';
                function closeMenu(el, e) {
                    var $this = el,
                            $thisDrop = $this.find(drop);
                    if ($thisDrop.length != 0)
                        menu.removeClass(hM);
                    var menuItemH = menuItem.filter('.' + hM)
                    if (e.type == 'click' && evLF == 'toggle')
                        menuItemH.click()

                    var subH = $thisDrop.children().children('.' + hM);
                    if (e.type == 'click' && evLS == 'toggle')
                        subH.click();
                    $('.firstH, .lastH').removeClass('firstH lastH');
                    clearTimeout(hoverTO);
                }
                menuItem.unbind(evLF)[evLF](
                        function(e) {
                            var $this = $(this),
                                    $thisI = $this.index();
                            $this = $(this).addClass(hM),
                                    $thisDrop = $this.find(drop);
                            if (e.type == 'click' && evLF == 'toggle') {
                                $this.siblings().filter('.' + hM).click()
                            }
                            var subH = dropOJ.children().children('.' + hM);
                            if (e.type == 'click' && evLS == 'toggle')
                                subH.click();
                            if ($thisI == 0)
                                $this.addClass('firstH');
                            if ($thisI == itemMenuL - 1)
                                $this.addClass('lastH');
                            if ($(e.relatedTarget).is(menuItem) || $.existsN($(e.relatedTarget).parents(menuItem)) || kk == 0)
                                k[$thisI] = true;
                            if (k[$thisI]) {
                                hoverTO = setTimeout(function() {
                                    $thisDrop[effOn](durationOn, function() {
                                        kk++;
                                        if ($thisDrop.length != 0)
                                            menu.addClass(hM);
                                        if (sub2Frame) {
                                            var listDrop = $thisDrop.children();
                                            if (!listDrop.is('[data-height]')) {
                                                var sumHL1 = listDrop.height(),
                                                        dropW = $thisDrop.width();
                                                listDrop.attr('data-height', sumHL1);
                                                isSub2W = $thisDrop.find(sub2Frame).addClass('is-side').actual('width');
                                            }

                                            listDrop.children().each(function() {
                                                var $this = $(this),
                                                        isSub2 = $this.find(sub2Frame);
                                                if ($.existsN(isSub2)) {
                                                    var sumHL2 = isSub2.actual('height');
                                                    if (sumHL2 > sumHL1)
                                                        var koef = Math.ceil(sumHL2 / sumHL1);
                                                    if (koef != undefined) {
                                                        subWL2 = isSub2W * koef;
                                                        if (subWL2 + dropW > menuW) {
                                                            subWL2 = menuW - dropW;
                                                        }
                                                        isSub2.css('width', dropW);
                                                    }
                                                }
                                            })[evLS](function(e) {
                                                var $this = $(this),
                                                        subFrame = $this.find(sub2Frame);
                                                if (e.type == 'click' && evLS == 'toggle') {
                                                    $this.addClass(hM).siblings().filter('.' + hM).click()
                                                }
                                                else
                                                    $this.has(sub2Frame).addClass(hM);
                                                $thisDrop.css('width', '');
                                                $thisDrop.children().add(subFrame).css('height', '');
                                                var dropW = $this.parent().parent().width(),
                                                        sumW = dropW + subFrame.width(),
                                                        subHL2 = subFrame.height(),
                                                        dropDH = $thisDrop.children().data('height');
                                                if (subHL2 < dropDH)
                                                    subHL2 = dropDH;
                                                $thisDrop.css('width', sumW);
                                                $thisDrop.children().add(subFrame).css('height', subHL2);
                                            }, function(e) {
                                                var $this = $(this),
                                                        subFrame = $this.find(sub2Frame);
                                                $thisDrop.css('width', '')
                                                $thisDrop.children().add(subFrame).css('height', '')
                                                $this.removeClass(hM)
                                            });
                                        }
                                    });
                                }, timeDurM);
                            }
                        }, function(e) {
                    var $this = $(this),
                            $thisI = $this.index();
                    k[$thisI] = true;
                    if ($this.index() == 0)
                        $this.removeClass('firstH');
                    if ($this.index() == itemMenuL - 1)
                        $this.removeClass('lastH');
                    var $thisDrop = $this.find(drop);
                    if ($.existsN($thisDrop)) {
                        if (sub2Frame) {
                            $this.find(drop)[effOff](durationOff, function() {
                                $this.removeClass(hM);
                            });
                        }
                        else {
                            $this.find(drop).stop()[effOff](durationOff, function() {
                                $this.removeClass(hM);
                            });
                        }
                    }
                    else {
                        setTimeout(function() {
                            $this.removeClass(hM);
                        }, durationOff)
                    }
                })
                menu.unbind('hover')['hover'](
                        function(e) {
                            kk = 0;
                            e.stopImmediatePropagation();
                            return timeDurM = 0;
                        },
                        function(e) {
                            kk = -1;
                            e.stopImmediatePropagation();
                            if (evLF == 'toggle' || evLS == 'toggle') {
                                $(this).find('.' + hM).click();
                            }
                            setTimeout(function() {
                                dropOJ[effOff](durationOff);
                            }, duration)
                            closeMenu(menu, e);
                            return timeDurM = duration;
                        });
                body.unbind('click.menu').bind('click.menu', function(e) {
                    closeMenu(menu, e);
                }).unbind('keydown.menu').bind('keydown.menu', function(e) {
                    if (!e)
                        var e = window.event;
                    if (e.keyCode == 27) {
                        closeMenu(menu, e);
                    }
                });
                dropOJ.find('a').click(function(e) {
                    e.stopPropagation();
                });
                if (columnPart && !sub2Frame && !refresh)
                    dropOJ.each(function() {
                        var $this = $(this),
                                columnsObj = $this.find(':regex(class,' + columnClassPref + '([0-9]+))'),
                                numbColumn = [];
                        columnsObj.each(function(i) {
                            numbColumn[i] = $(this).attr('class').match(/([0-9]+)/)[0];
                        })
                        numbColumn = $.unique(numbColumn).sort();
                        if (numbColumn.length > 1) {
                            $.map(numbColumn, function(n, i) {
                                var currC = columnsObj.filter('.' + columnClassPref + n),
                                        classCuurC = currC.first().attr('class');
                                $this.children().append('<li class="' + classCuurC + '" data-column="' + n + '"><ul></ul></li>');
                                $this.find('[data-column="' + n + '"]').children().append(currC.clone());
                            })
                            columnsObj.remove();
                        }
                    })
                menuItem.find('a').click(function(e) {
                    if ($.existsN($(this).find(drop)))
                        e.stopPropagation();
                });
            }
            return menu;
        },
        refresh: function() {
            methods.init.call($(this), $.extend(optionsMenu, {refresh: true}));
            return $(this);
        }
    };
    $.fn.menuImageCms = function(method) {
        if (methods[method]) {
            return methods[ method ].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.menuImageCms');
        }
    };
})(jQuery);
/*plugin menuImageCms end*/
(function($) {
    var methods = {
        init: function(options) {
            var $this = $(this);
            if ($.existsN($this)) {
                var settings = $.extend({
                    effectOn: 'show',
                    effectOff: 'hide',
                    durationOn: 0,
                    durationOff: 0,
                    before: function() {
                    },
                    after: function() {
                    }
                }, options);
                var tabsDiv = [],
                        tabsId = [],
                        navTabsLi = [],
                        regRefs = [],
                        thisL = this.length,
                        k = true;
                refs = [];
                attrOrdata = [];
                wST = wnd.scrollTop();
                $this.each(function(index) {
                    var $thiss = $(this),
                            effectOn = settings.effectOn,
                            effectOff = settings.effectOff,
                            durationOn = settings.durationOn,
                            durationOff = settings.durationOff;
                    navTabsLi[index] = $thiss.children();
                    refs[index] = navTabsLi[index].children();
                    attrOrdata[index] = refs[index].attr('href') != undefined ? 'attr' : 'data';
                    var tempO = $([]),
                            tempO2 = $([]);
                    refs[index].each(function(ind) {
                        var tHref = $(this)[attrOrdata[index]]('href');
                        if (ind == 0) {
                            regRefs[index] = "";
                            tempO = tempO.add($(tHref));
                            tempO2 = tempO2.add('[data-id=' + tHref + ']');
                            regRefs[index] += tHref;
                        }
                        else {
                            tempO = tempO.add($(tHref));
                            tempO2 = tempO2.add('[data-id=' + tHref + ']');
                            regRefs[index] += '|' + tHref;
                        }
                    })
                    tabsDiv[index] = tempO;
                    tabsId[index] = tempO2;
                    regRefs[index] = new RegExp(regRefs[index]);
                    refs[index].bind('click.tabs', function(e) {
                        var $this = $(this);
                        if ($this.is('a'))
                            e.preventDefault();
                        var condRadio = $thiss.data('type') == 'itemsView',
                                condB = e.button == 0 || e.trigger;
                        e.trigger = false;
                        if (!$this.parent().hasClass('disabled')) {
                            var $thisA = $this[attrOrdata[index]]('href'),
                                    $thisAO = $($thisA),
                                    $thisS = $this.data('source'),
                                    $thisDD = $this.data('drop') != undefined;
                            function tabsDivT() {
                                tabsDiv[index].add(tabsId[index])[effectOff](durationOff).removeClass(activeClass);
                                $thisAO.add('[data-id=' + $thisA + ']')[effectOn](durationOn).addClass(activeClass);
                            }
                            if (!$thisDD) {
                                if (!condRadio || e.button == 0) {
                                    navTabsLi[index].removeClass(activeClass);
                                    $this.parent().addClass(activeClass);
                                    if (e.start && $thisS != undefined)
                                        tabsDivT()

                                    if (!condRadio) {
                                        if ($thisS != undefined && !$thisAO.hasClass('visited')) {
                                            $thisAO.addClass('visited');

                                            $(document).trigger({'type': 'tabs.before', "els": tabsDiv[index], "el": $thisAO})

                                            $thisAO.load($thisS, function() {
                                                $(document).trigger({'type': 'tabs.after', "els": tabsDiv[index], "el": $thisAO})
                                                tabsDivT()
                                            })
                                        }
                                        else {
                                            tabsDivT()
                                        }

                                        if (e.scroll)
                                            wnd.scrollTop($this.offset().top);
                                        if (ltie7)
                                            ieInput();
                                    }
                                    else {
                                        setcookie('listtable', $this.parent().index(), 0, '/');
                                    }
                                }
                            }
                            if (!condRadio) {
                                if (attrOrdata[index] != 'data') {
                                    if (condB) {
                                        var wLH = window.location.hash;
                                        temp = wLH;
                                        try {
                                            if (wLH.indexOf($thisA) == -1) {
                                                temp = temp.replace(wLH.match(regRefs[index])[0], $thisA)
                                            }
                                            if (wLH.charAt(wLH.indexOf($thisA)) != '') {
                                                temp += $thisA;
                                            }
                                            window.location.hash = temp;
                                        } catch (e) {
                                            window.location.hash += $thisA;
                                        }
                                    }
                                    else if (!$thisDD && k) {
                                        window.location.hash = hashs[0].join('');
                                        k = false;
                                    }
                                    if ($thisDD && !condB)
                                        $this.trigger('click.drop')
                                }
                            }
                            else if (e.button == 0) {
                                refs[index].each(function() {
                                    var $thisDH = $(this).data('href');
                                    if ($thisDH == $thisA)
                                        $($thiss.data('elchange')).addClass($thisA)
                                    else
                                        $($thiss.data('elchange')).removeClass($thisDH)
                                })
                            }
                        }
                        if (condB) {
                            settings.after($thiss);
                        }
                    })

                    wnd.bind('hashchange', function(e) {
                        function scrollTop(wST) {
                            if (e.scroll || e.scroll == undefined)
                                wnd.scrollTop(wST);
                        }

                        //chrome bug
                        if ($.browser.webkit)
                            scrollTop(wST - 100);
                        scrollTop(wST);
                    })

                    if (thisL - 1 == index) {
                        methods.location();
                        methods.startCheck();
                    }
                });
            }
            return $this;
        },
        location: function() {
            hashs = [];
            hashs2 = [];
            if (location.hash == '')
            {
                var i = 0,
                        j = 0;
                $(refs).each(function(index) {
                    var index = index,
                            $this = refs[index].first(),
                            attrOrdataL = $this.attr('href') != undefined ? 'attr' : 'data';
                    if ($this.data('drop') == undefined && attrOrdataL != 'data') {
                        hashs[i] = $this[attrOrdataL]('href');
                        i++;
                    }
                    else if (attrOrdataL == 'data') {
                        hashs2[j] = $this[attrOrdataL]('href');
                        j++;
                    }
                })
                return hashs = [hashs, hashs2];
            }
            else {
                $(refs).each(function(index) {
                    var index = index,
                            j = 0,
                            $this = refs[index].first(),
                            attrOrdataL = $this.attr('href') != undefined ? 'attr' : 'data';
                    if (attrOrdataL == 'data') {
                        hashs2[j] = $this[attrOrdataL]('href');
                        j++;
                    }
                });
                var t = location.hash,
                        s = '#',
                        m = s.length, res = 0,
                        i = 0, pos = [];
                while (i < t.length - 1)
                {
                    var ch = t.substr(i, m)
                    if (ch == s) {
                        res += 1;
                        i = i + m
                        pos[res - 1] = t.indexOf(s, i - m)
                    } else
                        i++
                }
                var i = 0;
                while (i < pos.length) {
                    hashs[i] = t.substring(pos[i], pos[i + 1]);
                    i++;
                }
                return hashs = [hashs, hashs2];
            }
        },
        startCheck: function() {
            $.map(hashs[1].concat(hashs[0]), function(n, i) {
                var attrOrdataNew = "";
                $('[href=' + n + ']').length == 0 ? attrOrdataNew = 'data-href' : attrOrdataNew = 'href';
                $('[' + attrOrdataNew + '=' + n + ']').trigger({'type': 'click.tabs', 'start': true});
            });
        }
    };
    $.fn.tabs = function(method) {
        if (methods[method]) {
            return methods[ method ].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.tabs');
        }
    }
})(jQuery);
(function($) {
    var methods = {
        init: function(options) {
            var $this = $(this),
                    settings = $.extend({
                after: function() {
                }
            }, options),
                    mouseWhell = settings.mouseWhell,
                    elEven = settings.elEven,
                    onlyDif = settings.onlyDif,
                    allParams = settings.allParams,
                    hoverParent = settings.hoverParent,
                    jScrollPane = settings.jScrollPane || false,
                    after = settings.after,
                    scrollPane = settings.scrollPane;
            $this.each(function(index) {
                var $this = $(this),
                        visThis = $this.is(':visible');
                if (visThis) {
                    var left = $this.find(settings.left),
                            right = $this.find(settings.right),
                            liLength = left.length;
                    if (!$this.is('[data-equalHorizCell]')) {
                        var h = 0,
                                liH = [],
                                frameScroll = $this.find(settings.frameScroll),
                                frameScrollC = frameScroll.children(),
                                frameScrollCL = frameScrollC.length,
                                scrollNSP = settings.scrollNSP && $.exists(frameScroll),
                                scrollNSPT = settings.scrollNSPT;
                        for (var j = 0; j < liLength; j++) {
                            nab = $([]);
                            right.each(function() {
                                nab = nab.add($(this).find(elEven).eq(j))
                            })
                            var tempNabir = left.eq(j).add(nab);
                            tempNabir.each(function(index) {
                                var thisCh = $(this);
                                liH[index] = thisCh.outerHeight();
                                liH[index] > h ? h = liH[index] : h = h;
                            });
                            tempNabir.add(tempNabir.find('.helper')).css('height', h).attr('data-equalHorizCell', '');
                            liH = [];
                            h = 0;
                        }
                        var w = 0;
                        frameScroll.children().each(function() {
                            w += $(this).outerWidth(true);
                        })
                        frameScroll.css('width', w);
                        var frameScrollP = frameScroll.parent(),
                                frameScrollPW = frameScrollP.width(),
                                scrollW = w - frameScrollPW;
                        if (scrollNSP && frameScrollCL != 0) {
                            scrollNSPT = $this.find(scrollNSPT);
                            topScrollNSP = scrollNSPT.position().top + scrollNSPT.height();
                            $this.children('.scrollNSP').remove();
                            $this.append('<div class="scrollNSP" style = "overflow:auto;"><div style="width:' + w + 'px;"></div></div>')
                        }
                        var firstScrl = frameScrollP.css('overflow', 'hidden'),
                                secScrl = $([]);
                        if (scrollNSP) {
                            secScrl = $this.children('.scrollNSP');
                            if (jScrollPane)
                                secScrl.addClass('jScrollPane')
                            secScrl.css({
                                'width': frameScrollPW,
                                'top': topScrollNSP
                            })
                        }
                        var api = '';
                        function initNSS() {
                            api = $(secScrl).jScrollPane(scrollPane);
                            api = api.data('jsp');
                            return api;
                        }
                        if (jScrollPane)
                            api = initNSS();
                        if (mouseWhell && scrollW > 0) {
                            firstScrl.add(secScrl).unbind('mousewheel').bind('mousewheel', function(event, delta, deltaX, deltaY) {
                                if (jScrollPane)
                                    $thisSL = api.getContentPositionX();
                                else
                                    $thisSL = $(this).scrollLeft();
                                if ($thisSL != scrollW && deltaY < 0) {
                                    if (jScrollPane)
                                        api.scrollToX($thisSL + w / frameScrollCL)
                                    else
                                        firstScrl.add(secScrl).scrollLeft($thisSL + w / frameScrollCL);
                                    return false;
                                }
                                if ($thisSL > 0 && deltaY > 0) {
                                    if (jScrollPane)
                                        api.scrollToX($thisSL - w / frameScrollCL)
                                    else
                                        firstScrl.add(secScrl).scrollLeft($thisSL - w / frameScrollCL);
                                    return false;
                                }
                            });
                        }
                        if (jScrollPane)
                            api.scrollToX(0)
                        else
                            firstScrl.add(secScrl).scrollLeft('0');
                        if (scrollW > 0)
                            secScrl.unbind('scroll').bind('scroll', function() {
                                if (jScrollPane)
                                    $thisSL = api.getContentPositionX();
                                else
                                    $thisSL = $(this).scrollLeft();
                                firstScrl.add(secScrl).scrollLeft($thisSL);
                            });
                        $this.attr('data-equalHorizCell', '');
                    }
                    var right = right.find(hoverParent),
                            left = left.parent(hoverParent).children();
                    left.each(function(ind) {
                        if (ind % 2 == 0)
                            $(this).removeClass('evenC').addClass('oddC');
                        else
                            $(this).removeClass('oddC').addClass('evenC')
                    });
                    right.each(function() {
                        $(this).find(elEven).each(function(ind) {
                            var $this = $(this),
                                    $thisCL = $this.children(':last');
                            $thisCL.text($thisCL.text().trimMiddle().pasteSAcomm());
                            if (ind % 2 == 0)
                                $this.removeClass('evenC').addClass('oddC');
                            else
                                $this.removeClass('oddC').addClass('evenC')
                        });
                    });
                    methods.hoverComprasion(left, right, elEven);
                    onlyDif.die('click').live('click', function() {
                        methods.onlyDifM(left, right, liLength, elEven);
                    }).parent('.' + activeClass).children().click();
                    allParams.die('click').live('click', function() {
                        methods.allParamsM(left, right, elEven);
                    }).parent('.' + activeClass).children().click();
                    after($this);
                }
            })
            return $this;
        },
        refresh: function(optionCompare) {
            var $this = $(this);
            $('[data-equalHorizCell]').removeAttr('data-equalHorizCell').filter(':not([data-refresh])').removeAttr('style');
            $this.equalHorizCell(optionCompare)
            return $this;
        },
        headComprasion: function() {
            compHead = $('.comprasion-head');
            if (compHead.attr('data-equalHorizCell') != undefined && compHead.height() > left.first().height() - 70)
                compHead.find('.tabs').css('height', left.first().height() - 70);
            else
                compHead.find('.tabs').css('height', left.first().height() - 70).attr('data-equalHorizCell');
        },
        hoverComprasion: function(left, right, elEven) {
            left.add(right.find(elEven)).hover(function() {
                var $this = $(this),
                        index = $this.index(),
                        nab = $([]);
                right.each(function() {
                    nab = nab.add($(this).find(elEven).eq(index))
                })
                $([]).add(left.eq(index)).add(nab).addClass('hover')
            },
                    function() {
                        var $this = $(this),
                                index = $this.index(),
                                nab = $([]);
                        right.each(function() {
                            nab = nab.add($(this).find(elEven).eq(index))
                        })
                        $([]).add(left.eq(index)).add(nab).removeClass('hover')
                    });
        },
        onlyDifM: function(left, right, liLength, elEven) {
            var liH = [],
                    genObjC = $([]),
                    tempText = '',
                    k = 0;
            for (var j = 0; j < liLength; j++) {
                var nab = $([]);
                right.each(function() {
                    nab = nab.add($(this).find(elEven).eq(j))
                })
                var tempNabir = nab;
                tempNabir.each(function(index) {
                    var thisCh = $(this);
                    liH[index] = thisCh.text();
                    if (tempText == liH[index])
                        k++;
                    tempText = liH[index];
                });
                if (k == tempNabir.length - 1 && k != 0)
                    genObjC = genObjC.add(left.eq(j)).add(tempNabir);
                liH = [];
                k = 0;
                tempText = '';
            }
            right.each(function() {
                $(this).find(elEven).not(genObjC).removeClass('evenC').removeClass('oddC').each(function(ind) {
                    if (ind % 2 == 0)
                        $(this).addClass('oddC');
                    else
                        $(this).addClass('evenC')
                });
            });
            left.not(genObjC).removeClass('evenC').removeClass('oddC').each(function(ind) {
                if (ind % 2 == 0)
                    $(this).addClass('oddC');
                else
                    $(this).addClass('evenC')
            });
            genObjC.hide();
        },
        allParamsM: function(left, right, elEven) {
            left.removeClass('evenC').removeClass('oddC').each(function(ind) {
                if (ind % 2 == 0)
                    $(this).addClass('oddC');
                else
                    $(this).addClass('evenC')
            }).show();
            right.each(function() {
                $(this).find(elEven).removeClass('evenC').removeClass('oddC').each(function(ind) {
                    if (ind % 2 == 0)
                        $(this).addClass('oddC');
                    else
                        $(this).addClass('evenC')
                }).show();
            })
        }
    };
    $.fn.equalHorizCell = function(method) {
        if (methods[method]) {
            return methods[ method ].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.equalHorizCell');
        }
    };
})(jQuery);
(function($) {
    $.fn.actual = function() {
        if (arguments.length && typeof arguments[0] == 'string') {
            var dim = arguments[0];
            clone = $(this).clone().addClass(clonedC).appendTo('body');
            clone.css({
                position: 'absolute',
                top: '-9999px'
            }).show();
            var dimS = clone[dim]();
            clone.remove();
            return dimS;
        }
        return undefined;
    };
}(jQuery));
(function($) {
    var methods = {
        init: function(options) {
            var optionsDrop = $.extend({
                exit: '[data-closed = "closed-js"]',
                effon: 'show',
                effoff: 'hide',
                duration: 200,
                place: 'center',
                dataSource: $('[data-drop]'),
                placement: 'noinherit',
                before: function() {
                },
                after: function() {
                },
                close: function() {
                }
            }, options);
            var settings = optionsDrop,
                    $thisD = this,
                    selector = $thisD.selector,
                    dataSource = settings.dataSource,
                    exit = $(settings.exit),
                    effon = settings.effon,
                    effoff = settings.effoff,
                    duration = settings.duration, close = settings.close,
                    arrDrop = [];
            dataSource.bind('click.drop', function(e) {
                wST = wnd.scrollTop();
                $.fancybox.showActivity();
                e.stopPropagation();
                e.preventDefault();
                var $this = $(this);
                elSet = $this.data();
                function showDrop(elSetSource, isajax, e) {
                    var place = elSet.place || settings.place,
                            placement = elSet.placement || settings.placement,
                            $thisEOff = elSet.effectOff || effoff,
                            $thisD = elSet.duration || duration;
                    $this.each(function() {
                        var $this = $(this),
                                $thisSource = elSet.drop;
                        $this.attr('data-placement', placement);
                        $this.attr('data-place', place);
                        $($thisSource).attr('data-effect-off', $thisEOff).attr('data-duration', $thisD).attr('data-elrun', $thisSource).unbind('click.drop').bind('click.drop', function(e) {
                            if ($(selector + '.' + activeClass).length > 1 && place == 'center')
                                methods.triggerBtnClick($(selector + '.' + activeClass).not($(this)), selector, close);
                            if (!($(e.target).is(settings.exit) || $(e.target).closest(settings.exit).length != 0))
                                e.stopImmediatePropagation();
                        });
                    });
                    var $thisEOn = elSet.effectOn || effon,
                            $thisEOff = elSet.effectOff || effoff,
                            $thisD = elSet.duration || duration,
                            overlayColor = elSet.overlaycolor || settings.overlayColor,
                            overlayOpacity = elSet.overlayopacity != undefined ? elSet.overlayopacity.toString() : elSet.overlayopacity || settings.overlayOpacity;
                    condOverlay = overlayColor != undefined && overlayOpacity != undefined && overlayOpacity != '0';
                    if (condOverlay) {
                        if (!$.exists('.overlayDrop')) {
                            body.append('<div class="overlayDrop" style="display:none;position:fixed;width:100%;height:100%;left:0;top:0;z-index: 1101;"></div>')
                        }
                        dropOver = $('.overlayDrop');
                        dropOver.css({
                            'background-color': overlayColor,
                            'opacity': overlayOpacity
                        });
                    }
                    else
                        dropOver = $([]);
                    if (elSetSource.is('.' + activeClass)) {
                        methods.triggerBtnClick(elSetSource, selector, close);
                    }
                    else {
                        settings.before($this, elSetSource, isajax);
                        //                            starget trigger click in drop on show drop element (js_template.tpl showCart)
                        $thisDrop = $this.closest('[data-elrun]');
                        if ($.existsN($thisDrop))
                            methods.triggerBtnClick($thisDrop, selector, close);
                        $thisDrop = $(e.starget).closest('[data-elrun]');
                        if ($.existsN($thisDrop))
                            methods.triggerBtnClick($thisDrop, selector, close);
                        if (e.button == undefined && place != "center")
                            wnd.scrollTop($this.offset().top);
                        var wndW = wnd.width();
                        if (elSetSource.actual('width') > wndW)
                            elSetSource.css('width', wndW - 40);
                        else
                            elSetSource.removeAttr('style');
                        methods.positionDrop($this, placement, place);
                        if (place == "center")
                            methods.dropScroll(elSetSource);
                        if (condOverlay) {
                            dropOver.show()
                            dropOver.unbind('click').bind('click', function(e) {
                                e.stopPropagation();
                                methods.triggerBtnClick(false, selector, close);
                            })
                        }
                        elSetSource[$thisEOn]($thisD, function() {
                            elSetSource.addClass(activeClass);
                            if (ltie7)
                                ieInput();
                            settings.after($this, elSetSource, isajax);
                        });
                    }
                    $.fancybox.hideActivity();
                    body.add($('iframe').contents().find('body')).unbind('click.bodydrop').unbind('keydown.bodydrop').bind('click.bodydrop', function(e) {
                        if ((e.which || e.button == 0) && e.relatedTarget == null) {
                            methods.triggerBtnClick(false, selector, close);
                        }
                    }).bind('keydown.bodydrop', function(e) {
                        if (!e)
                            var e = window.event;
                        key = e.keyCode;
                        if (key == 27) {
                            methods.triggerBtnClick(false, selector, close);
                        }
                    });
                }

                $this.parent().addClass(activeClass);
                elSetSource = $(elSet.drop);
                if ($.existsN(elSetSource)) {
                    if (!$.existsN(elSetSource.parent('body')) && elSet.place != 'inherit')
                        body.append(elSetSource)
                    showDrop(elSetSource, false, e);
                }
                else if (elSet.source) {
                    if ($.inArray(elSet.source, arrDrop) != 0) {
                        arrDrop.push(elSet.source);
                        $.post(elSet.source, function(data) {
                            body.append(data);
                            elSetSource = $(elSet.drop);
                            showDrop(elSetSource, true, e);
                            var el = elSetSource.find('[data-drop]');
                            methods.init.call(selector, $.extend(optionsDrop, {dataSource: el}));
                        })
                    }
                }
                return false;
            })
            exit.live('click', function() {
                methods.triggerBtnClick($(this).closest('[data-elrun]'), selector, close);
            })
        },
        triggerBtnClick: function(sel, selector, close) {
            if (!sel || typeof sel == 'function')
                var drop = $('[data-elrun].' + activeClass);
            else
                var drop = sel;
            if ($.existsN(drop)) {
                $(document).trigger({'type': 'drop.beforeClose', 'el': drop})
                drop.removeClass(activeClass).each(function() {
                    var $this = $(this),
                            $thisEOff = $this.attr('data-effect-off'),
                            $thisD = $this.attr('data-duration');
                    var $thisB = $('.' + activeClass + ' > [data-drop = "' + $this.attr('data-elrun') + '"]');
                    $thisB.parent().removeClass(activeClass);
                    var $thisHref = $thisB.attr('href');
                    if ($thisHref != undefined) {
                        var $thisHrefL = $thisHref.length,
                                wLH = location.hash, wLHL = wLH.length;
                        try {
                            var indH = wLH.match($thisHref + '(?![a-z])').index;
                            location.hash = wLH.substring(0, indH) + wLH.substring(indH + $thisHrefL, wLHL)
                        } catch (err) {
                        }
                    }
                    var dropOver = $('.overlayDrop');
                    if (!$.existsN($(selector + '.' + activeClass)) && dropOver.is(':visible')) {
                        if ($(document).height() - wnd.height() > 0) {
                            dropOver.removeClass('dropOverlayFixed');
                            body.removeClass('isScroll');
                        }
                        dropOver.hide();
                    }
                    $this[$thisEOff]($thisD, function() {
                        $(this).removeAttr('style');
                        if (close != undefined)
                            close($thisB, $(this));
                        if (typeof sel == 'function')
                            sel();
                    });
                });
            }
            else {
                if (typeof sel == 'function')
                    sel();
            }
            wnd.unbind('resize.drop');
        },
        dropScroll: function(elSetSource) {
            elSetSource.css({
                'top': (wnd.height() - elSetSource.actual('height')) / 2 + wnd.scrollTop(),
                'left': (wnd.width() - elSetSource.actual('width')) / 2 + wnd.scrollLeft()
            }, {
                queue: false
            });
        },
        positionDrop: function($this, placement, place) {
            var $this = $this;
            if ($this == undefined)
                $this = $(this);
            if (placement == undefined)
                placement = $this.data('placement');
            if (place == undefined)
                place = $this.data('place');
            var elSetSource = $($this.data().drop),
                    $thisP = place,
                    dataSourceH = 0,
                    dataSourceW = 0,
                    $thisW = $this.width(),
                    $thisH = $this.height();
            if ($thisP == 'noinherit') {
                var $thisPMT = placement.toLowerCase().split(' ');
                if ($thisPMT[0] == 'bottom' || $thisPMT[1] == 'bottom')
                    dataSourceH = -elSetSource.actual('height');
                if ($thisPMT[0] == 'top' || $thisPMT[1] == 'top')
                    dataSourceH = $thisH;
                if ($thisPMT[0] == 'left' || $thisPMT[1] == 'left')
                    dataSourceW = 0;
                if ($thisPMT[0] == 'right' || $thisPMT[1] == 'right')
                    dataSourceW = -elSetSource.actual('width') + $thisW;
                $thisT = $this.offset().top + dataSourceH;
                $thisL = $this.offset().left + dataSourceW;
                if ($thisL < 0)
                    $thisL = 0;
                elSetSource.css({'top': $thisT,
                    'left': $thisL
                });
                if ($thisL == 0)
                    elSetSource.css('margin-left', 0);
            }
            if ($thisP == 'center') {
                if ($(document).height() - wnd.height() > 0) {
                    body.addClass('isScroll');
                    dropOver.addClass('dropOverlayFixed');
                }
            }
            wnd.bind('resize.drop', function() {
                if ($thisP == 'center') {
                    methods.dropScroll(elSetSource)
                }
            });
        }
    };
    $.fn.drop = function(method) {
        if (methods[method]) {
            return methods[ method ].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.drop');
        }
    };
})(jQuery);
(function($) {
    var methods = {init: function(options) {
            var settings = $.extend({
                prev: '',
                next: '',
                ajax: false,
                after: function() {
                },
                before: function() {
                }
            }, options);
            if (this.length > 0) {
                return this.each(function() {
                    var $this = $(this),
                            prev = settings.prev.split('.'),
                            next = settings.next.split('.'),
                            ajax = settings.ajax,
                            $thisPrev = $this,
                            $thisNext = $this,
                            regS = '', regM = '';
                    $.each(prev, function(i, v) {
                        regS = v.match(/\(.*\)/);
                        if (regS != null) {
                            regM = regS['input'].replace(regS[0], '');
                            regS = regS[0].substring(1, regS[0].length - 1)
                        }
                        if (regS == null)
                            regM = v;
                        $thisPrev = $thisPrev[regM](regS);
                    })
                    $.each(next, function(i, v) {
                        regS = v.match(/\(.*\)/);
                        if (regS != null) {
                            regM = regS['input'].replace(regS[0], '');
                            regS = regS[0].substring(1, regS[0].length - 1)
                        }
                        if (regS == null)
                            regM = v;
                        $thisNext = $thisNext[regM](regS);
                    })
                    $thisNext.not('[disabled="disabled"]').unbind('click.pM').bind('click.pM', function(e) {
                        var el = $(this),
                                input = $this.focus(),
                                inputVal = parseInt(input.val());
                        if (!input.is(':disabled')) {
                            settings.before(e, el, input);
                            if (isNaN(inputVal))
                                input.val(1);
                            else
                                input.val(inputVal + 1);
                            if (settings.ajax && !checkProdStock)
                                $.fancybox.showActivity();
                            if (settings.ajax && inputVal + 1 <= input.data('max') && checkProdStock)
                                $.fancybox.showActivity();
                            if (checkProdStock)
                                input.maxValue();
                            settings.after(e, el, input);
                        }
                    })
                    $thisPrev.not('[disabled="disabled"]').unbind('click.pM').bind('click.pM', function(e) {
                        var el = $(this),
                                input = $this.focus(),
                                inputVal = parseInt(input.val());
                        if (!input.is(':disabled')) {
                            settings.before(e, el, input);
                            if (isNaN(inputVal))
                                input.val(1)
                            else if (inputVal > 1) {
                                if (ajax)
                                    $.fancybox.showActivity();
                                input.val(inputVal - 1)
                            }

                            settings.after(e, el, input);
                        }
                    })
                })
            }
        }
    };
    $.fn.plusminus = function(method) {
        if (methods[method]) {
            return methods[ method ].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.plusminus');
        }
    };
})(jQuery);
(function($) {
    var methods = {
        init: function(e) {
            var $this = $(this),
                    $min = $(this).attr('data-min'),
                    $thisVal = parseInt($this.val());
            if (!e)
                var e = window.event;
            var key = e.keyCode;
            if ((key == 48 || key == 96) && ($thisVal.length == 0 || $thisVal == '0')) {
                $this.val($min);
            }
        }
    };
    $.fn.minValue = function(method) {
        if (methods[method]) {
            return methods[ method ].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.minValue');
        }
    };
})(jQuery);
(function($) {
    var methods = {
        init: function(e, f) {
            var $this = $(this), $thisVal = $this.val(),
                    $max = parseInt($this.attr('data-max'));
            if (!e)
                var e = window.event;
            var key = e.keyCode;
            keyChar = parseInt(String.fromCharCode(key));
            if ((keyChar > $max || $thisVal > $max) && checkProdStock) {
                $this.val($max);
                if (typeof f == 'function')
                    f();
                return $max;
            }
            else
                return true;
        }
    };
    $.fn.maxValue = function(method) {
        if (methods[method]) {
            return methods[ method ].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.maxValue');
        }
    };
    $('[data-max]').live('keydown keyup', function(e) {
        $(this).maxValue(e);
    })
})(jQuery);
/*plugin myCarousel use jQarousel with correction behavior prev and next buttons*/
(function($) {
    var methods = {
        init: function(options) {
            if ($.existsN($(this))) {
                var $jsCarousel = $(this);
                var settings = $.extend({
                    item: 'li',
                    prev: '.prev',
                    next: '.next',
                    content: '.content-carousel',
                    groupButtons: '.group-button-carousel',
                    before: function() {
                    },
                    after: function() {
                    }
                }, options);
                var item = settings.item,
                        prev = settings.prev,
                        next = settings.next,
                        content = settings.content,
                        groupButtons = settings.groupButtons, adding = settings.adding;
                $jsCarousel.each(function() {
                    var $this = $(this),
                            $item = $this.find(content).children().children(item + ':visible'),
                            $content = $this.find(content),
                            $itemL = $item.filter(':visible').length,
                            $itemW = $item.outerWidth(true),
                            $itemH = $item.outerHeight(true),
                            $thisPrev = $this.find(prev),
                            $thisNext = $this.find(next),
                            $marginR = $itemW - $item.outerWidth(),
                            $marginB = $itemH - $item.outerHeight(),
                            contW = $content.width(),
                            contH = $content.height(),
                            groupButton = $this.find(groupButtons);
                    settings.before($this);
                    var $countV = (contW / $itemW).toFixed(1);
                    var k = false, isVert = $.existsN($this.closest('.vertical-carousel')),
                            isHorz = $.existsN($this.closest('.horizontal-carousel')),
                            condH = $itemW * $itemL - $marginR > contW && isHorz,
                            condV = ($itemH * $itemL - $marginB > contH) && isVert;
                    if (condH || condV)
                        k = true;
                    if (k) {
                        var mainO = {
                            buttonNextHTML: $thisNext,
                            buttonPrevHTML: $thisPrev,
                            visible: $countV,
                            scroll: 1
                        }
                        $this.jcarousel($.extend(
                                adding
                                , mainO)).addClass('iscarousel');
                        $thisNext.add($thisPrev).css('display', 'inline-block');
                        groupButton.append($thisNext.add($thisPrev));
                    }
                    else {
                        if (isHorz)
                            $item.parent().css('width', $itemW * $itemL);
                        if (isVert) {
                            $item.parent().css('height', $itemH * $itemL);
                            $content.css('height', 'auto');
                        }
                        $thisNext.add($thisPrev).hide();
                    }
                    if (body.lazyload() == body) {
                        $thisNext.add($thisPrev).bind('click', function(e) {
                            if (!$(this).is('[disabled="disabled"]'))
                                wnd.scroll();
                        })
                    }
                    settings.after($this);
                });
            }
            return $jsCarousel;
        }
    };
    $.fn.myCarousel = function(method) {
        if (methods[method]) {
            return methods[ method ].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.myCarousel');
        }
    }
})(jQuery);
/*
 *imagecms shop plugins
 **/
if (!Array.indexOf) {
    Array.prototype.indexOf = function(obj, start) {
        for (var i = (start || 0); i < this.length; i++) {
            if (this[i] == obj) {
                return i;
            }
        }
        return -1;
    }
}
var Shop = {
    //var Cart = new Object();
    currentItem: {},
    Cart: {
        totalPrice: 0,
        totalCount: 0,
        popupCartSelector: 'script#cartPopupTemplate',
        countChanged: false,
        shipping: 0,
        shipFreeFrom: 0,
        giftCertPrice: 0,
        add: function(cartItem, el) {
            //trigger before_add_to_cart
            $(document).trigger({
                type: 'before_add_to_cart',
                cartItem: _.clone(cartItem)
            });
            //
            var data = {
                'quantity': cartItem.count,
                'productId': cartItem.id,
                'variantId': cartItem.vId
            };
            var url = '/shop/cart_api/add';
            if (cartItem.kit) {
                data = {
                    'quantity': cartItem.count,
                    'kitId': cartItem.kitId
                };
                url += '/ShopKit';
            }

            Shop.currentItem = cartItem;
            $.post(url, data,
                    function(data) {
                        try {
                            responseObj = JSON.parse(data);
                            //save item to storage
                            Shop.Cart._add(Shop.currentItem, el);
                        } catch (e) {
                            return;
                        }
                    });
            return;
        },
        _add: function(cartItem, el) {
            var currentItem = this.load(cartItem.storageId());
            if (currentItem)
                currentItem.count += cartItem.count;
            else
                currentItem = cartItem;
            this.save(currentItem);
            ////trigger after_add_to_cart
            $(document).trigger({
                type: 'after_add_to_cart',
                cartItem: _.clone(cartItem),
                starget: el
            });
            $(document).trigger({
                type: 'cart_changed'
            });
            //
            return this;
        },
        rm: function(cartItem) {
            Shop.currentItem = this.load('cartItem_' + cartItem.id + '_' + cartItem.vId);
            if (Shop.currentItem.kit)
                var key = 'ShopKit_' + Shop.currentItem.kitId;
            else
                var key = 'SProducts_' + Shop.currentItem.id + '_' + Shop.currentItem.vId;
            //Shop.currentItem = cartItem;
            $.getJSON('/shop/cart_api/delete/' + key, function() {
                localStorage.removeItem('cartItem_' + Shop.currentItem.id + '_' + Shop.currentItem.vId);
                Shop.Cart.totalRecount();
                $(document).trigger({
                    type: 'cart_rm',
                    cartItem: Shop.currentItem
                });
                $(document).trigger({
                    type: 'cart_changed'
                });
            });
            return this;
        },
        chCount: function(cartItem, f) {
            Shop.Cart.currentItem = this.load(cartItem.storageId());
            if (Shop.Cart.currentItem) {

                Shop.Cart.currentItem.count = cartItem.count;
                //this.countChanged = true;

                Shop.currentCallbackFn = f;
                if (cartItem.kit)
                    var postName = 'kits[ShopKit_' + Shop.Cart.currentItem.kitId + ']';
                else
                    var postName = 'products[SProducts_' + cartItem.id + '_' + cartItem.vId + ']';
                var postData = {
                    recount: 1
                };
                postData[postName] = cartItem.count;
                $.post('/shop/cart_api/recount', postData, function(data) {
                    var dataObj = JSON.parse(data);
                    if (dataObj.hasOwnProperty('count'))
                        Shop.Cart.currentItem.count = dataObj.count;
                    Shop.Cart.save(Shop.Cart.currentItem);
                    (Shop.currentCallbackFn());
                    $(document).trigger({
                        type: 'count_changed',
                        cartItem: _.clone(cartItem)
                    });
                    $(document).trigger({
                        type: 'cart_changed'
                    });
                });
                return this.totalRecount();
            }
        },
        clear: function() {
            $.getJSON('/shop/cart_api/clear',
                    function() {
                        var items = Shop.Cart.getAllItems();
                        for (var i = 0; i < items.length; i++)
                            localStorage.removeItem(items[i].storageId());
                        delete items;
                        $(document).trigger({
                            type: 'cart_changed'
                        });
                        Shop.Cart.totalRecount();
                    }
            );
        },
        //work with storage
        load: function(key) {
            try {
                return new Shop.cartItem(JSON.parse(localStorage.getItem(key)));
            } catch (e) {
                return false;
            }
        },
        save: function(cartItem) {
            if (!cartItem.storageId().match(/undefined/)) {
                localStorage.setItem(cartItem.storageId(), JSON.stringify(cartItem));
                this.totalRecount();
                ////trigger cart_changed
                $(document).trigger({
                    type: 'cart_changed'
                });
                //
            }
            return this;
        },
        getAllItems: function() {
            var pattern = /cartItem_*/;
            var items = [];
            for (var i = 0; i < localStorage.length; i++) {

                var key = localStorage.key(i);
                try {
                    if (key.match(pattern))
                        items.push(this.load(key));
                } catch (err) {
                }
            }
            return items;
        }, length: function() {
            var pattern = /cartItem_*/;
            var length = 0;
            for (var i = 0; i < localStorage.length; i++)
                if (localStorage.key(i).match(pattern))
                    length++;
            return length;
        },
        totalRecount: function() {
            var items = this.getAllItems();
            this.totalPrice = 0;
            this.totalCount = 0;
            for (var i = 0; i < items.length; i++) {
                this.totalPrice += items[i].price * items[i].count;
                this.totalCount += parseInt(items[i].count);
            }

            return this;
        },
        getTotalPrice: function() {
            if (this.totalPrice == 0)
                return this.totalRecount().totalPrice;
            else
                return this.totalPrice;
        },
        getTotalAddPrice: function() {
            if (this.totalPrice == 0)
                return this.totalRecount().totalPrice;
            else
                return this.totalPrice;
        },
        getFinalAmount: function() {
            if (this.shipFreeFrom > 0)
                if (this.shipFreeFrom <= this.getTotalPrice())
                    this.shipping = 0.0;
            return (this.getTotalPrice() + this.shipping - parseFloat(this.giftCertPrice)) >= 0 ? (this.getTotalPrice() + this.shipping - parseFloat(this.giftCertPrice)) : 0;
        },
        renderPopupCart: function(selector) {
            if (typeof selector == 'undefined' || selector == '')
                selector = this.popupCartSelector;
            return template = _.template($(selector).html(), Shop.Cart);
        },
        sync: function() {
            $.getJSON('/shop/cart_api/sync', function(data) {
                if (typeof(data) == 'object') {

                    var items = Shop.Cart.getAllItems();
                    for (var i = 0; i < items.length; i++)
                        if (!items[i].kit)
                            localStorage.removeItem('cartItem_' + items[i]['id'] + '_' + items[i]['vId']);
                    delete items;
                    _.each(_.keys(data.data.items), function(key) {
                        if (!data.data.items[key].kit)
                            localStorage.setItem(key, JSON.stringify(data.data.items[key]));
                        else
                        {
                            try {
                                var kit = Shop.Cart.load('cartItem_' + items[i]['id'] + '_' + items[i]['vId']);
                                kit.count = data.data.items[key].count;
                                Shop.Cart.save('cartItem_' + kit['id'] + '_' + kit['vId']);
                            } catch (err) {
                            }
                        }
                    });
                    $(document).trigger({
                        type: 'cart_changed'
                    });
                    $(document).trigger({
                        type: 'sync_сart'
                    });
                }
                if (data == false)
                    Shop.Cart.clear();
            });
        },
        updatePage: function() {
        }
    },
    cartItem: function(obj) {
        if (typeof obj == 'undefined' || obj == false)
            obj = {
                id: false,
                vId: false,
                name: false,
                count: false,
                kit: false,
                maxcount: 0,
                number: '',
                vname: false,
                url: false,
                addprices: false,
                addprice: false
            };
        return prototype = {id: obj.id ? obj.id : 0,
            vId: obj.vId ? obj.vId : 0,
            price: obj.price ? obj.price : 0,
            addprice: obj.addprice ? obj.addprice : 0,
            name: obj.name ? obj.name : '',
            count: obj.count ? obj.count : 1,
            kit: obj.kit ? obj.kit : false,
            prices: obj.prices ? obj.prices : 0,
            addprices: obj.addprices ? obj.addprices : 0,
            kitId: obj.kitId ? obj.kitId : 0,
            maxcount: obj.maxcount ? obj.maxcount : 0,
            number: obj.number ? obj.number : 0,
            vname: obj.vname ? obj.vname : '',
            url: obj.url ? obj.url : '',
            img: obj.img ? obj.img : '',
            prodStatus: obj.prodStatus ? obj.prodStatus : '',
            storageId: function() {
                return 'cartItem_' + this.id + '_' + this.vId;
            }
        };
    },
    composeCartItem: function($context) {
        var cartItem = new Shop.cartItem();
        cartItem.id = $context.data('prodid');
        cartItem.vId = $context.data('varid');
        cartItem.count = $context.attr('data-count');
        cartItem.price = parseFloat($context.data('price')).toFixed(pricePrecision);
        cartItem.addprice = parseFloat($context.data('addprice')).toFixed(pricePrecision);
        cartItem.name = $context.data('name');
        cartItem.kit = $context.data('kit');
        cartItem.prices = $context.data('prices');
        cartItem.addprices = $context.data('addprices');
        cartItem.kitId = $context.data('kitid');
        cartItem.maxcount = $context.data('maxcount');
        cartItem.number = $context.data('number');
        cartItem.vname = $context.data('vname');
        cartItem.url = $context.data('url');
        cartItem.img = $context.data('img');
        cartItem.prodStatus = $context.data('prodstatus');
        return cartItem;
    },
    //settings manager
    Settings: {get: function(key) {
            return localStorage.getItem(key);
        },
        set: function(key, value) {
            localStorage.setItem(key, value);
            return this;
        }
    },
    WishList: {
        items: [],
        all: function() {
            return JSON.parse(localStorage.getItem('wishList')) ? _.compact(JSON.parse(localStorage.getItem('wishList'))) : [];
        },
        add: function(key, vid, price, curentEl) {
            Shop.WishList.items = this.all();
            localStorage.setItem('wishList_' + key + '_' + vid, JSON.stringify({
                id: key,
                vid: vid,
                price: price
            }));
            if (this.items.indexOf(key) == -1) {
                $.post('/shop/wish_list_api/add', {
                    productId_: key,
                    variantId_: vid
                }, function(data) {
                    try {
                        var dataObj = JSON.parse(data);
                        dataObj.id = key;
                        if (dataObj.success == true) {
                            Shop.WishList.items.push(key);
                            //localStorage.setItem('wishList', JSON.stringify(Shop.WishList.items));
                            var arr = JSON.parse(localStorage.getItem('wishList')) ? _.compact(JSON.parse(localStorage.getItem('wishList'))) : [];
                            arr.push(key + '_' + vid)
                            localStorage.setItem('wishList', JSON.stringify(arr));
                            if (Shop.WishList.items.length != dataObj.count) {
                                Shop.WishList.sync();
                                return;
                            }
                            $(document).trigger({
                                type: 'wish_list_add',
                                dataObj: dataObj
                            });
                        }
                        else {
                            if (dataObj.errors.match('not_logged_in')) {
                                $(loginButton).click();
                            }
                        }
                    } catch (e) {
                    }
                });
            }
        },
        rm: function(key, el, vid, price) {
            this.items = this.all();
            $.get('/shop/wish_list_api/delete/' + key + '_' + vid, function(data) {
                try {
                    dataObj = JSON.parse(data);
                    dataObj.id = key;
                    if (dataObj.success == true) {
                        Shop.WishList.items = _.without(Shop.WishList.items, key + '_' + vid);
                        localStorage.setItem('wishList', JSON.stringify(Shop.WishList.items));
                        $(document).trigger({
                            type: 'wish_list_rm',
                            dataObj: dataObj
                        });
                    }
                } catch (e) {
                }
            });
            deleteWishListItem($(el), key, vid, price);
        },
        sync: function() {
            $.getJSON('/shop/wish_list_api/sync', function(data) {
                if (typeof(data) == 'Array' || typeof(data) == 'object') {
                    localStorage.setItem('wishList', JSON.stringify(data));
                }
                if (data === false) {
                    localStorage.setItem('wishList', []);
                }

                $(document).trigger({
                    type: 'wish_list_sync'
                });
            });
        }
    },
    CompareList: {
        items: [],
        all: function() {
            return JSON.parse(localStorage.getItem('compareList')) ? _.compact(JSON.parse(localStorage.getItem('compareList'))) : [];
        },
        add: function(key) {
            this.items = this.all();
            if (this.items.indexOf(key) === -1) {
                $.get('/shop/compare_api/add/' + key, function(data) {
                    try {
                        dataObj = JSON.parse(data);
                        dataObj.id = key;
                        if (dataObj.success == true) {
                            Shop.CompareList.items.push(key);
                            localStorage.setItem('compareList', JSON.stringify(Shop.CompareList.items));
                            $(document).trigger({
                                type: 'compare_list_add',
                                dataObj: dataObj
                            });
                        }
                    } catch (e) {
                    }
                });
            }
        },
        rm: function(key, el) {
            this.items = JSON.parse(localStorage.getItem('compareList')) ? JSON.parse(localStorage.getItem('compareList')) : [];
            if (this.items.indexOf(key) !== -1) {

                this.items = _.without(this.items, key);
                this.items = this.all();
                $.get('/shop/compare_api/remove/' + key, function(data) {
                    try {
                        dataObj = JSON.parse(data);
                        dataObj.id = key;
                        if (dataObj.success == true) {
                            Shop.CompareList.items = _.without(Shop.CompareList.items, key);
                            localStorage.setItem('compareList', JSON.stringify(Shop.CompareList.items));
                            $(document).trigger({
                                type: 'compare_list_rm',
                                dataObj: dataObj
                            });
                        }
                    } catch (e) {
                    }
                });
            }

            $(document).trigger({
                type: 'delete_compare',
                el: $(el),
            });
        },
        sync: function() {
            $.getJSON('/shop/compare_api/sync', function(data) {
                if (typeof(data) == 'object' || typeof(data) == 'Array') {
                    localStorage.setItem('compareList', JSON.parse(data));
                    $(document).trigger({
                        type: 'compare_list_sync'
                    });
                }
                else
                if (data === false) {
                    localStorage.removeItem('compareList');
                    $(document).trigger({
                        type: 'compare_list_sync'
                    });
                }
            });
        }
    }
};
/**
 * AuthApi ajax client
 * Makes simple request to api controllers and get return data in json
 * 
 * @author Avgustus
 * @copyright ImageCMS (c) 2013, Avgustus <avgustus@yandex.ru>
 * 
 * Get JSON object with fields list:
 *      'status'    -   true/false - if the operation was successful,
 *      'msg'       -   info message about result,
 *      'refresh'   -   true/false - if true refreshes the page,
 *      'redirect'  -   url - redirects to needed url
 *    
 * List of api methods:
 *      Auth.php:
 *          '/auth/authapi/login',
 *          '/auth/authapi/logout',
 *          '/auth/authapi/register',
 *          '/auth/authapi/forgot_password',
 *          '/auth/authapi/reset_password',
 *          '/auth/authapi/change_password',
 *          '/auth/authapi/cancel_account',
 *          '/auth/authapi/banned',
 *          '/shop/ajax/getApiNotifyingRequest',
 *          '/shop/callbackApi'
 * 
 **/

var ImageCMSApi = {
    defSet: function() {
        return imageCmsApiDefaults;
    },
    returnMsg: function(msg) {
        if (window.console) {
            console.log(msg);
        }
    },
    formAction: function(url, selector, obj) {
        //collect data from form
        var DS = this.defSet();
        $.extend(DS, obj)
        if (selector !== '')
            var dataSend = this.collectFormData(selector);
        else
            var dataSend = '';
        //send api request to api controller
        $.ajax({
            type: "post",
            data: dataSend,
            url: url,
            dataType: "json",
            beforeSend: function() {
                ImageCMSApi.returnMsg("=== Sending api request to " + url + "... ===");
            },
            success: function(obj) {
                if (obj !== null) {
                    var form = $(selector);
                    ImageCMSApi.returnMsg("[status]:" + obj.status);
                    ImageCMSApi.returnMsg("[message]: " + obj.msg);
                    if (obj.status == true) {
                        if (DS.hideForm)
                            form.hide();
                        if (DS.messagePlace == 'ahead')
                            $(message.success(obj.msg)).prependTo(form.parent());
                        if (DS.messagePlace == 'behind')
                            $(message.success(obj.msg)).appendTo(form.parent());
                        $(document).trigger({'type': 'imageapi.pastescsmsg', 'el': form.parent()})
                    }
                    if (obj.cap_image != 'undefined' && obj.cap_image != null) {
                        ImageCMSApi.addCaptcha(obj.cap_image, DS);
                    }
                    if (obj.validations != 'undefined' && obj.validations != null) {
                        ImageCMSApi.sendValidations(obj.validations, selector, DS);
                    }
                    if (obj.refresh == true)
                        location.reload();
                    if (obj.redirect !== null && typeof obj.redirect !== 'undefined' && obj.redirect !== false)
                        location.href = obj.redirect;

                    if (obj.refresh != true && obj.redirect !== 'undefined') {
                        var k = true;
                        if (typeof DS.callback == 'function')
                            k = DS.callback(obj.msg, obj.status, form, DS);
                        if (k)
                            setTimeout((function() {
                                form.parent().find(genObj.msgF).fadeOut();
                                if (DS.hideForm)
                                    form.show();
                            }), DS.durationHideForm);
                    }
                    $(form).find(':input').unbind('input').bind('input', function() {
                        var $this = $(this),
                                form = $this.closest('form'),
                                $thisТ = $this.attr('name'),
                                elMsg = form.find('[for=' + $thisТ + ']');

                        if ($.exists(elMsg)) {
                            $this.removeClass(genObj.err + ' ' + genObj.scs);
                            elMsg.hide();
                        }
                    });
                }
                return this;
            },
        }).done(function() {
            ImageCMSApi.returnMsg("=== Api request success!!! ===");
        }).fail(function() {
            ImageCMSApi.returnMsg("=== Api request breake with error!!! ===");
        });
        return;
    },
    //find form by data-id attr and create serialized string for send
    collectFormData: function(selector) {
        var findSelector = $(selector);
        var queryString = findSelector.serialize();
        return queryString;
    },
    /**
     * for displaying validation messages 
     * in the form, which needs validation, for each validate input
     * 
     * */
    sendValidations: function(validations, selector, DS) {
        var thisSelector = $(selector);
        if (typeof validations === 'object') {
            for (var key in validations) {
                if (validations[key] != "") {
                    var input = thisSelector.find('[name=' + key + ']');
                    input.addClass(genObj.err);
                    input[DS.cMsgPlace](DS.cMsg(key, validations[key], genObj.err, thisSelector));
                    thisSelector.find(':input.' + genObj.err + ':first').focus();
                }
            }
        } else {
            return false;
        }
    },
    /**
     * add captcha block if needed
     * @param {type} captcha_image
     * @returns {undefined}
     */
    addCaptcha: function(cI, DS) {
        pIn.html(DS.captcha(cI));
        return false;
    }
}