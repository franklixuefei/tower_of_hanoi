var hanoi = function() {
    var topDiskWidth = 0;
    var bottomDiskWidth = 0;
    var gameRunning = false;
    
    // the following 4 lines are for how-to demo
    var temp_first_array = new Array();
    var temp_second_array = new Array();
    var temp_third_array = new Array();
    var changingArray = new Array();
    
    var initialize = function() {
        if (!window.localStorage.getItem("vibration")) window.localStorage.setItem("vibration", "YES");
        //if (!window.localStorage.getItem("username")) window.localStorage.username = "Player";
    };
    
    var prepareMenu = function() { // only call this once on device ready
        var control_panel = $('<div>').attr('class', 'control_panel onready');
        var buttonsArray = generateMainMenuButtons();
        for(var i = 0; i < buttonsArray.length; ++i) {
            control_panel.append(buttonsArray[i]);
        }
        return control_panel;
    };
    
    var showMenu = function(panel) {
        panel.appendTo('.body_container').addClass('fadeIn');
    };
    
    var generateMainMenuButtons = function() { // returns the array of buttons
        var buttonsArray = new Array();
        var playButton = $('<div>').attr('class','main_menu_buttons').attr('id', 'play')
        .append('<img src="img/play.png" id="play" />');
        var settingsButton = $('<div>').attr('class','main_menu_buttons').attr('id', 'settings')
        .append('<img src="img/settings.png" id="settings" />');
        var howtoButton = $('<div>').attr('class','main_menu_buttons').attr('id', 'howto')
        .append('<img src="img/howto.png" id="howto" />');
        var inputField = $('<input>').attr('type', 'text').attr('id', 'name').attr('placeholder', 'Enter your nickname')
        .bind('blur', function() {
              $(this).removeClass('active');
              window.scrollTo(0, 0);
              document.body.scrollTop = 0;
              })
        .bind('focus', function() {
              $(this).addClass('active');
              });
        window.localStorage.username ? inputField.val(window.localStorage.username) : null;
        var nameButton = $('<div>').attr('class','main_menu_buttons').attr('id', 'name')
        .append(inputField);
        var vibrationButton = $('<div>').attr('class','main_menu_buttons').attr('id', 'vibration')
        .append('<img src="img/vibrate.png" id="vibration" />');
        
        var vibrationOn = $('<img>').attr('id', 'vibration_on').attr('src', 'img/on.png').appendTo(vibrationButton);
        var vibrationOff = $('<img>').attr('id', 'vibration_off').attr('src', 'img/off.png').appendTo(vibrationButton);
        
        window.localStorage.vibration == "YES" ? vibrationOff.addClass('invisible') : vibrationOn.addClass('invisible');
        
        var settingsBackButton = $('<div>').attr('class','main_menu_buttons').attr('id', 'settingsBack')
        .append('<img src="img/settingsBack.png" id="settingsBack" />');
        playButton.bind('touchend', function() {
                        $(this).removeClass('active');
                        $(this).children().removeClass('active');
                        startGame();
                        })
        .bind('touchstart', function() {
              $(this).addClass('active');
              $(this).children().addClass('active');
              });
        settingsButton.bind('touchend', function() {
                            $(this).removeClass('active');
                            $(this).children().removeClass('active');
                            gotoSettings();
                            })
        .bind('touchstart', function() {
              $(this).addClass('active');
              $(this).children().addClass('active');
              });
        howtoButton.bind('touchend', function() {
                         $(this).removeClass('active');
                         $(this).children().removeClass('active');
                         gotoHowto();
                         })
        .bind('touchstart', function() {
              $(this).addClass('active');
              $(this).children().addClass('active');
              });
        
        vibrationButton.bind('touchend', function() {
                             $(this).removeClass('active');
                             $(this).children().removeClass('active');
                             if (window.localStorage.vibration == "YES") {
                             window.localStorage.setItem("vibration", "NO");
                             // change ON to OFF
                             $('img#vibration_on').addClass('invisible');
                             $('img#vibration_off').removeClass('invisible');
                             } else {
                             window.localStorage.setItem("vibration", "YES");
                             // changing OFF to ON, and vibrate for 200 ms
                             $('img#vibration_off').addClass('invisible');
                             $('img#vibration_on').removeClass('invisible');
                             navigator.notification.vibrate(200);
                             }
                             })
        .bind('touchstart', function() {
              $(this).addClass('active');
              $(this).children().addClass('active');
              });
        settingsBackButton.bind('touchend', function() {
                                $(this).removeClass('active');
                                $(this).children().removeClass('active');
                                backtoMainMenu('settings');
                                })
        .bind('touchstart', function() {
              $(this).addClass('active');
              $(this).children().addClass('active');
              });
        buttonsArray.push(playButton);
        buttonsArray.push(settingsButton);
        buttonsArray.push(howtoButton);
        buttonsArray.push(nameButton);
        buttonsArray.push(vibrationButton);
        buttonsArray.push(settingsBackButton);
        return buttonsArray;
    };
    
    var startGame = function() {
        $('div.control_panel').removeClass('fadeIn').addClass('fadeOut');
        $('img#game_heading').removeClass('fadeIn').addClass('fadeOut');
        $('div.menu_mask').removeClass('fadeIn2').addClass('fadeOut2');
        setTimeout(function() {
                   $('div.control_panel').remove();
                   $('div.menu_mask').remove();
                   $('img#game_heading').remove();
                   if (!window.localStorage.getItem('not_ft')) {
                   ftux.init();
                   ftux.showAll($('img.ft#pause'), $('div.pause_button'),$('img.ft#reset'), $('div.reset_button'), $('img.ft#leveldown'), $('div.level_button#minus'), $('img.ft#levelup'), $('div.level_button#plus'), $('img.ft#step'), $('div.steps'), $('img.ft#timer'), $('div.timer'));
                   }
                   }, 500);
        $('header').addClass('slideDown');
        gameRunning = true;
        stepCounter = 0;
        playHanoi.init();
    };
    
    var gotoSettings = function() {
        // slideLeft and fadeout the main menu buttons; slide in the settings button from right
        $('.main_menu_buttons').addClass('slideLeft');
    };
    
    var gotoHowto = function() {
        // fadeout the control panel, menu mask and heading, and append and fade in the subtitle wrapper.
        $('div.control_panel').removeClass('fadeIn').addClass('fadeOut');
        $('img#game_heading').removeClass('fadeIn').addClass('fadeOut');
        $('div.menu_mask').removeClass('fadeIn2').addClass('fadeOut2');
        var subtitleWrapper = $('<div>').attr('class', 'subtitle_wrapper').attr('data-role', 'header')
        .appendTo('.body_container');
        setTimeout(function() { // show subtitle wrapper
                   $('div.control_panel').hide();
                   $('img#game_heading').hide();
                   $('div.menu_mask').hide();
                   subtitleWrapper.addClass('slideDown');
                   setTimeout(function() { // blink top disk
                              ftux.blink($('div.disk#0'), 150);
                              setTimeout(function() { // show first arrow and subtitle
                                         showArrow(0);
                                         showSubtitle(0);
                                         setTimeout(function() { // fadeout first subtitle and arrow, and step one disk
                                                    stepHanoi();
                                                    fadeSubtitle(0);
                                                    fadeArrow(0);
                                                    setTimeout(function() { // show second arrow
                                                               showArrow(1);
                                                               setTimeout(function() { // show second subtitle and cross
                                                                          showSubtitle(1);
                                                                          showCross();
                                                                          setTimeout(function() { // fadeout the second subtitle and cross
                                                                                     fadeSubtitle(1);
                                                                                     fadeCross();
                                                                                     fadeArrow(1);
                                                                                     setTimeout(function() { // show third subtitle
                                                                                                showSubtitle(2);
                                                                                                setTimeout(function() { // animation
                                                                                                           animateHanoi(10);
                                                                                                           setTimeout(function() { // show THIS
                                                                                                                      showSubtitle(3);
                                                                                                                      setTimeout(function() { // reset how to and go back to main menu
                                                                                                                                 resetHowto();
                                                                                                                                 backtoMainMenu('howto');
                                                                                                                                 }, 3000);
                                                                                                                      }, 1600);
                                                                                                           }, 1000);
                                                                                                });
                                                                                     }, 2500);
                                                                          }, 1000);
                                                               }, 1000);
                                                    }, 2200);
                                         //animateHanoi(10);
                                         //stepHanoi();
                                         }, 800);
                              }, 500);
                   }, 400);
    };
    
    var showCross = function() {
        var first_stroke = $('<div>').attr('class', 'cross').attr('id', 'first');
        first_stroke.append($('<img>').attr('src', 'img/first_stroke.png'));
        first_stroke.appendTo('.body_container');
        var second_stroke = $('<div>').attr('class', 'cross').attr('id', 'second');
        second_stroke.append($('<img>').attr('src', 'img/second_stroke.png'));
        second_stroke.appendTo('.body_container');
        setTimeout(function() { // css3 transform only works after original object is fully created.
                   first_stroke.addClass('slidein'); // from top to down
                   });
        setTimeout(function() {
                   second_stroke.addClass('slidein');
                   }, 150);
    };
    
    var fadeCross = function() {
        $('div.cross').removeClass('fadeIn').addClass('fadeOut');
        setTimeout(function() {
                   $('div.cross').remove();
                   }, 400);
    };
    
    var showArrow = function(type) {
        if (type == 0) { // first arrow
            var first_arrow = $('<div>').attr('class', 'arrows').attr('id', 'first');
            first_arrow.append($('<img>').attr('src', 'img/first_arrow.png'));
            first_arrow.appendTo('.body_container');
            setTimeout(function() { // css3 transform only works after original object is fully created.
                       first_arrow.addClass('slidein');
                       });
        } else { // second arrow
            var second_arrow = $('<div>').attr('class', 'arrows').attr('id', 'second');
            second_arrow.append($('<img>').attr('src', 'img/second_arrow.png'));
            second_arrow.appendTo('.body_container');
            setTimeout(function() { // css3 transform only works after original object is fully created.
                       second_arrow.addClass('slidein');
                       });
        }
    };
    
    var fadeArrow = function(type) {
        if (type == 0) {
            $('div.arrows#first').removeClass('fadeIn').addClass('fadeOut');
            setTimeout(function() {
                       $('div.arrows#first').remove();
                       }, 400);
        } else {
            $('div.arrows#second').removeClass('fadeIn').addClass('fadeOut');
            setTimeout(function() {
                       $('div.arrows#second').remove();
                       }, 400);
        }
    };
    
    var showSubtitle = function(type) {
        if (type == 0) {
            var first_subtitle = $('<div>').attr('class', 'subtitles').attr('id', 'first');
            first_subtitle.append($('<img>').attr('src', 'img/first_subtitle.png'));
            first_subtitle.appendTo('.subtitle_wrapper');
            setTimeout(function() {
                       first_subtitle.addClass('slidein');
                       });
        } else if (type == 1) {
            var second_subtitle = $('<div>').attr('class', 'subtitles').attr('id', 'second');
            second_subtitle.append($('<img>').attr('src', 'img/second_subtitle.png'));
            second_subtitle.appendTo('.subtitle_wrapper');
            setTimeout(function() {
                       second_subtitle.addClass('slidein');
                       });
        } else if (type == 2) {
            var third_subtitle = $('<div>').attr('class', 'subtitles').attr('id', 'third');
            third_subtitle.append($('<img>').attr('src', 'img/third_subtitle.png'));
            third_subtitle.appendTo('.subtitle_wrapper');
            setTimeout(function() {
                       third_subtitle.addClass('slidein');
                       });
        } else if (type == 3) {
            var fourth_subtitle = $('<div>').attr('class', 'subtitles').attr('id', 'fourth');
            fourth_subtitle.append($('<img>').attr('src', 'img/fourth_subtitle.png'));
            fourth_subtitle.appendTo('.subtitle_wrapper');
            setTimeout(function() {
                       fourth_subtitle.addClass('slidein');
                       });
        }
    };
    
    var fadeSubtitle = function(type) {
        if (type == 0) {
            $('div.subtitles#first').removeClass('fadeIn').addClass('fadeOut');
            setTimeout(function() {
                       $('div.subtitles#first').remove();
                       }, 400);
        } else if (type == 1) {
            $('div.subtitles#second').removeClass('fadeIn').addClass('fadeOut');
            setTimeout(function() {
                       $('div.subtitles#second').remove();
                       }, 400);
        } else if (type == 2) {
            $('div.subtitles#third').removeClass('fadeIn').addClass('fadeOut');
            setTimeout(function() {
                       $('div.subtitles#third').remove();
                       }, 400);
        } else if (type == 3) {
            $('div.subtitles#fourth').removeClass('fadeIn').addClass('fadeOut');
            setTimeout(function() {
                       $('div.subtitles#fourth').remove();
                       }, 400);
        }
    };
    
    var backtoMainMenu = function(type) {
        // for settings, slide right and fadeout the settings button, slide in the main menu buttons from left
        // for howto,
        if (type == 'settings') {
            window.localStorage.username = $('input#name').val();
            $('.main_menu_buttons').removeClass('slideLeft');
        } else { // howto, fadeout and remove all subtitles and arrows and cross, slideup subtitle wrapper and remove it, fadein menu mask, fadein game heading, fadein control panel
            $('div.subtitles').removeClass('fadeIn').addClass('fadeOut');
            $('div.cross').removeClass('fadeIn').addClass('fadeOut');
            $('div.arrows').removeClass('fadeIn').addClass('fadeOut');
            $('div.subtitle_wrapper').removeClass('slideDown');
            setTimeout(function() {
                       $('div.subtitles').remove();
                       $('div.cross').remove();
                       $('div.arrows').remove();
                       $('div.subtitle_wrapper').remove();
                       $('div.control_panel').show();
                       $('img#game_heading').show();
                       $('div.menu_mask').show();
                       $('div.control_panel').removeClass('fadeOut').addClass('fadeIn');
                       $('div.menu_mask').removeClass('fadeOut2').addClass('fadeIn2');
                       $('img#game_heading').removeClass('fadeOut').addClass('fadeIn');
                       }, 400);
        }
    };
    
    var generateDisks = function(topWidth, bottomWidth) {
        stepCounter = 0;
        $('button#solve').removeAttr('disabled');
        $('button#step').removeAttr('disabled');
        $('input').removeAttr('disabled');
        var orig_len = first_pile_stack.length;
        for (var k = 0; k < orig_len; ++k) {
            first_pile_stack.pop();
        }
        var buf_len = second_pile_stack.length;
        for (var k = 0; k < buf_len; ++k) {
            second_pile_stack.pop();
        }
        var des_len = third_pile_stack.length;
        for (var k = 0; k < des_len; ++k) {
            third_pile_stack.pop();
        }
        first_pile_stack.length = second_pile_stack.length = third_pile_stack.length = 0;
        $('div.level').text(numDisks);
        topDiskWidth = topWidth;
        bottomDiskWidth = bottomWidth;
        $('div.disk_pile#p1').children().remove();
        $('div.disk_pile#p3').children().remove();
        $('div.disk_pile#p2').children().remove();
        
        for (var i = numDisks - 1; i >= 0; --i) {
            var widthDiff = (bottomDiskWidth - topDiskWidth) / (numDisks - 1);
            var newDisk = $('<div>').attr('class','disk').attr('id', i)
            .css('width', topDiskWidth+i*widthDiff + 'px')
            .css('bottom', (numDisks-1-i)*20+'px')
            .css('right', ($('div.base').width() - (topDiskWidth+i*widthDiff))/2 + 'px');
            first_pile_stack.push(newDisk);
        }
        for (var i = 0; i < numDisks; ++i) {
            $('div.disk_pile#p1').append(first_pile_stack[i]);
        }
    };
    
    var prepareHowto = function() { // call after hanoi.gen(...); call only once on device ready
        for (var i = 0; i < numDisks; ++i) {
            temp_first_array.push(first_pile_stack[i]);
        }
        calcHanoi(temp_first_array, temp_third_array, temp_second_array, $('div.disk_pile#p1'), $('div.disk_pile#p3'), $('div.disk_pile#p2'), numDisks);
    };
    
    var resetHowto = function() {
        stepCounter = 0;
        $('div.disk_pile#p1').children().remove();
        $('div.disk_pile#p3').children().remove();
        $('div.disk_pile#p2').children().remove();
        var temp_first_len = temp_first_array.length;
        for (var k = 0; k < temp_first_len; ++k) {
            temp_first_array.pop();
        }
        var temp_second_len = temp_second_array.length;
        for (var k = 0; k < temp_second_len; ++k) {
            temp_second_array.pop();
        }
        var temp_third_len = temp_third_array.length;
        for (var k = 0; k < temp_third_len; ++k) {
            temp_third_array.pop();
        }
        temp_first_array.length = temp_second_array.length = temp_third_array.length = 0;
        setTimeout(function() {
                   for (var i = 0; i < numDisks; ++i) {
                   first_pile_stack[i].removeClass('fadeOut').removeClass('fadeIn').css('opacity', '').css('-webkit-opacity', '');
                   $('div.disk_pile#p1').append(first_pile_stack[i]);
                   temp_first_array.push(first_pile_stack[i]);
                   }
                   }, 400);
    };
    
    var trackmove = function(orig, origPile, des, desPile) { // helper
        var topDisk = orig.pop();
        changingArray.push([origPile, [desPile, des.length], topDisk]);
        des.push(topDisk);
    };
    var calcHanoi = function(orig, des, buf, origPile, desPile, bufPile, n) { //
        if (!n) return;
        calcHanoi(orig, buf, des, origPile, bufPile, desPile, n-1);
        trackmove(orig, origPile, des, desPile);
        calcHanoi(buf, des, orig, bufPile, desPile, origPile, n-1);
    };
    var animateHanoi = function(timespan) { //
        if (changingArray.length) {
            var timerHanoi = setInterval(function() {
                                         if (!changingArray.hasOwnProperty(stepCounter)) {
                                         clearInterval(timerHanoi);
                                         setTimeout(function() {
                                                    solvedCallback();
                                                    }, 200);
                                         return;
                                         }
                                         var topDisk = changingArray[stepCounter][2];
                                         var origPile = changingArray[stepCounter][0];
                                         var desPile = changingArray[stepCounter][1][0];
                                         var desLenBeforePlacingTopDisk = changingArray[stepCounter][1][1];
                                         topDisk.css('opacity', '0.1').css('-webkit-opacity', '0.1');
                                         setTimeout(function() {
                                                    topDisk.css('bottom', desLenBeforePlacingTopDisk * 20 + 'px');
                                                    $('div.disk#'+topDisk.attr('id')).remove(); // this is the makeup method because the objects in changing array initially generated are not the same as the ones hanoi.gen(...) generated.
                                                    topDisk.appendTo(desPile);
                                                    }, timespan);
                                         
                                         stepCounter++;
                                         }, timespan*2);
        }
    };
    
    var solvedCallback = function() {
        $('div.disk').addClass('fadeIn3');
        setTimeout(function() {
                   $('div.disk').removeClass('fadeOut').removeClass('fadeIn3').css('opacity', '').css('-webkit-opacity', '');
                   }, 500);
    };
    
    var stepHanoi = function() {
        if (changingArray.hasOwnProperty(stepCounter)) {
            if (changingArray.length) {
                var topDisk = changingArray[stepCounter][2];
                var origPile = changingArray[stepCounter][0];
                var desPile = changingArray[stepCounter][1][0];
                var desLenBeforePlacingTopDisk = changingArray[stepCounter][1][1];
                $('div.disk#'+topDisk.attr('id')).removeClass('fadeIn').addClass('fadeOut');
                setTimeout(function() {
                           topDisk.css('bottom', desLenBeforePlacingTopDisk * 20 + 'px');
                           $('div.disk#'+topDisk.attr('id')).remove(); // this is the makeup method
                           topDisk.appendTo(desPile);
                           topDisk.removeClass('fadeOut').addClass('fadeIn');
                           setTimeout(function() {
                                      topDisk.removeClass('fadeIn').removeClass('fadeOut');
                                      }, 500);
                           }, 200);
            }
        }
    };
    
    var isRunning = function() {
        return gameRunning;
    };
    
    var setRunning = function(running) {
        gameRunning = running;
    }
    
    return {
    init: initialize,
    gen: generateDisks,
    prepareHowto: prepareHowto,
    prepareMenu: prepareMenu,
    showMenu: showMenu,
    generateMainMenuButtons: generateMainMenuButtons,
    isRunning: isRunning,
    setRunning: setRunning
    };
}();

var playHanoi = function() {
    var fromPile; // jQuery object
    var toPile; // jQuery object
    var movingDisk; // jQuery object
    var topDisks; // array of jQuery objects
    var initialize = function() {
        $('div.steps').text(stepCounter);
        $('.disk').draggable({
                             containment: "div.hanoi_container",
                             disabled: true,
                             revert: true,
                             revertDuration: 200,
                             start: onDraggableStart,
                             stop: onDraggableStop
                             });
        topDisks = calculateTopDisks();
        //console.log(topDisks);
        enableDraggable();
        $('.disk_pile').droppable({
                                  drop: function(event, ui) {
                                  toPile = $(this);
                                  // console.log(fromPile);
                                  // console.log(toPile);
                                  movingDisk = ui.draggable;
                                  //console.log(ui.draggable);
                                  if (fromPile.attr('id') != toPile.attr('id') && checkDiskValidity()) {
                                  stepCounter++;
                                  $('div.steps').text(stepCounter);
                                  
                                  var lenOfToStack = mapPileToStack(toPile).length;
                                  if (lenOfToStack) mapPileToStack(toPile)[lenOfToStack-1].draggable( "disable" ); // disable draggability for the previous top disk
                                  // console.log(mapPileToStack(toPile));
                                  placeMovingDisk(lenOfToStack);
                                  popAndPushStacks();
                                  //movingDisk.appendTo(toPile);
                                  topDisks = calculateTopDisks();
                                  enableDraggable();
                                  }
                                  }
                                  });
    };
	
    var onDraggableStart = function() {
        $(this).addClass('active');
        //console.log($(this).parent());
        fromPile = $(this).parent();
        timer.start();
    };
	
    var onDraggableStop = function() {
        $(this).removeClass('active');
        //console.log(third_pile_stack.length);
        if (checkCompleted()) {
            
            setTimeout(function() {
                       timer.stop();
                       if (window.localStorage.vibration == "YES") navigator.notification.vibrate(200);
                       
                       navigator.notification.alert('Congratulations! You have successfully solved ' + numDisks + ' disks in ' + stepCounter + ' steps.', gameOverCallBack, 'You Win!', 'OK');
                       }, 200);
            
            
            
        }
    };
    
    var gameOverCallBack = function() {
        
    };
	
    var checkDiskValidity = function() {
        var toStack = mapPileToStack(toPile);
        if (toStack.length) return parseInt(movingDisk.attr('id')) < toStack[toStack.length-1].attr('id');
        return true;
    };
	
    var placeMovingDisk = function(len) {
        movingDisk.css('bottom', len * 20 + 'px').css('left', '').css('top', '');
        movingDisk.draggable( "option", "revert", false);
        //movingDisk.draggable( "option", "appendTo", toPile);
        movingDisk.appendTo(toPile);
        movingDisk.data("draggable").originalPosition = null;
        
        // movingDisk.draggable('destroy');
        // movingDisk.draggable({
        // disabled: true,
        // revert: true,
        // revertDuration: 200,
        // start: onDraggableStart,
        // stop: onDraggableStop
        // });
        //movingDisk.remove();
        movingDisk.draggable( "option", "revert", true);
    };
	
    var enableDraggable = function() {
        for(var i = 0; i < topDisks.length; ++i) {
            topDisks[i].draggable('enable');
        }
    };
	
	
    var popAndPushStacks = function() {
        var topDisk = mapPileToStack(fromPile).pop();
        mapPileToStack(toPile).push(topDisk);
    };
	
    var mapPileToStack = function(pile) {
        if (pile.attr('id') == 'p1') return first_pile_stack;
        if (pile.attr('id') == 'p2') return second_pile_stack;
        if (pile.attr('id') == 'p3') return third_pile_stack;
    };
	
    var calculateTopDisks = function() {
        draggableDisks = new Array();
        if (first_pile_stack.length) draggableDisks.push(first_pile_stack[first_pile_stack.length-1]);
        if (second_pile_stack.length) draggableDisks.push(second_pile_stack[second_pile_stack.length-1]);
        if (third_pile_stack.length) draggableDisks.push(third_pile_stack[third_pile_stack.length-1]);
        return draggableDisks;
    };
	
    var checkCompleted = function() {
        return third_pile_stack.length == numDisks;
    };
    
    var pauseGame = function() {
        hanoi.setRunning(false);
        timer.pause();
        $('div.background').after($('<div>').attr('class', 'menu_mask fadeIn2'));
        var control_panel = $('<div>').attr('class', 'control_panel');
        var resume_button = $('<div>').attr('class', 'pause_buttons').attr('id', 'resume')
        .append('<img src="img/resume.png" id="resume" />');
        var menu_button = $('<div>').attr('class', 'pause_buttons').attr('id', 'menu')
        .append('<img src="img/menu.png" id="menu" />');
        resume_button.bind('touchend', function() {
                           $(this).removeClass('active');
                           $(this).children().removeClass('active');
                           resumeGame();
                           })
        .bind('touchstart', function() {
              $(this).addClass('active');
              $(this).children().addClass('active');
              });
        menu_button.bind('touchend', function() {
                         $(this).removeClass('active');
                         $(this).children().removeClass('active');
                         navigator.notification.confirm("You will lose current progress if you are not done.", gotoMainMenu, 'Quit Game', 'Quit,Cancel');
                         })
        .bind('touchstart', function() {
              $(this).addClass('active');
              $(this).children().addClass('active');
              });
        control_panel.appendTo('.body_container').removeClass('fadeOut').addClass('fadeIn');
        resume_button.appendTo(control_panel);
        menu_button.appendTo(control_panel);
    };
    
    var resumeGame = function() {
        hanoi.setRunning(true);
        $('div.control_panel').removeClass('fadeIn').addClass('fadeOut');
        $('div.menu_mask').removeClass('fadeIn2').addClass('fadeOut2');
        setTimeout(function() {
                   $('div.control_panel').remove();
                   $('div.menu_mask').remove();
                   }, 500);
        timer.resume();
    };
    
    var gotoMainMenu = function(buttonID) { // equivalent to quitting the game
        if (buttonID == 1) {
            // hide the header, move down control panel, append and fadeIn title, append new buttons and bind touch events, remove old buttons, playHanoi.destroy(), reset the timer, hanoi.gen($('div.disk_pile#p1'),$('div.disk_pile#p3'),$('div.disk_pile#p2'), 5, 30, 130);.
            hanoi.setRunning(false);
            $('header').removeClass('slideDown'); // slide up the header
            setTimeout(function() {
                       $('div.control_panel').addClass('onready'); // scale the control panel
                       destroy(); // destroy the draggable and droppable functionalities.
                       timer.reset(); // reset the timer
                       $('div.control_panel').children().remove(); // fadeOut pause buttons
                       setTimeout(function() {
                                  var mainMenuButtons =  hanoi.generateMainMenuButtons();// append and fade in main menu buttons
                                  for(var i = 0; i < mainMenuButtons.length; ++i) {
                                  mainMenuButtons[i].addClass('invisible');
                                  $('div.control_panel').append(mainMenuButtons[i]);
                                  }
                                  $('div.control_panel').children().addClass('fadeIn');
                                  }, 400);
                       
                       
                       var gameHeading = $('<img>').attr('id', 'game_heading').attr('class', 'invisible').attr('src','img/heading.png').appendTo('.body_container'); // append the game heading
                       gameHeading.addClass('fadeIn'); // fade in the game heading
                       numDisks = 5;
                       stepCounter = 0;
                       hanoi.gen(30, 130); // reset the tower
                       }, 400);
            
        }
    };
	
    var destroy = function() {
        $('.disk').draggable('destroy');
        $('.disk_pile').droppable('destroy');
    };
	
    return {
    init: initialize,
    pause: pauseGame,
    destruct: destroy
    };
}();

var ftux = function() {
    
    var initialize = function() {
        $('div.background').after($('<div>').attr('class', 'ft_mask fadeIn2'));
        $('div.background').after('<img class="ft" id="pause" src="img/pause_txt.png"/>'+
                                  '<img class="ft" id="reset" src="img/reset_txt.png"/>'+
                                  '<img class="ft" id="leveldown" src="img/leveldown_txt.png" />'+
                                  '<img class="ft" id="levelup" src="img/levelup_txt.png" />'+
                                  '<img class="ft" id="step" src="img/step_txt.png" />'+
                                  '<img class="ft" id="timer" src="img/timer_txt.png" />');
        var ft_confirm = $('<div>').attr('class', 'ft_confirm').append('<img src="img/ft_confirm_1.png" />');
        ft_confirm.bind('touchend', function() {
                        $(this).removeClass('active');
                        $(this).children().removeClass('active');
                        txtFadeOut($('img.ft'));
                        txtFadeOut($('div.ft_confirm'));
                        $('div.ft_mask').removeClass('fadeIn2').addClass('fadeOut2');
                        window.localStorage.setItem('not_ft', true);
                        setTimeout(function() {
                                   $('div.ft_mask').remove();
                                   $('div.ft_confirm').remove();
                                   $('img.ft').remove();
                                   buttonBlink($('div.disk#0'), 200);
                                   }, 500);
                        
                        })
        .bind('touchstart', function() {
              $(this).addClass('active');
              $(this).children().addClass('active');
              });
        $('div.background').after(ft_confirm);
        
    };
    
    var buttonBlink = function(elem, timespan) {
        var timerFTUX;
        var blinkCounter = 0;
        var pressed = false;
        timerFTUX = setInterval(function() {
                                if (blinkCounter == 4) {
                                clearInterval(timerFTUX);
                                return;
                                }
                                if (pressed) {
                                elem.removeClass('active');
                                blinkCounter++;
                                } else {
                                elem.addClass('active');
                                blinkCounter++;
                                }
                                pressed = !pressed;
                                }, timespan);
    };
    
    var txtFadeIn = function(txtElem) {
        txtElem.removeClass('fadeOut');
        txtElem.addClass('fadeIn');
    };
    
    var txtFadeOut = function(txtElem) {
        txtElem.removeClass('fadeIn');
        txtElem.addClass('fadeOut');
    };
    
    var showEachFt = function(txtElem, buttonElem) {
        setTimeout(function() {
                   txtFadeIn(txtElem);
                   }, 500);
        setTimeout(function() {
                   buttonBlink(buttonElem, 120);
                   }, 700);
    };
    
    var showAllFt = function(txtElem1, buttonElem1, txtElem2, buttonElem2, txtElem3, buttonElem3, txtElem4, buttonElem4, txtElem5, buttonElem5, txtElem6, buttonElem6 ) {
        showEachFt(txtElem1, buttonElem1);
        setTimeout(function() {
                   showEachFt(txtElem2, buttonElem2);
                   }, 1000);
        setTimeout(function() {
                   showEachFt(txtElem3, buttonElem3);
                   }, 2000);
        setTimeout(function() {
                   showEachFt(txtElem4, buttonElem4);
                   }, 3000);
        setTimeout(function() {
                   showEachFt(txtElem5, buttonElem5);
                   }, 4000);
        setTimeout(function() {
                   showEachFt(txtElem6, buttonElem6);
                   }, 5000);
        setTimeout(function() {
                   txtFadeIn($('div.ft_confirm'));
                   }, 6500);
    };
    
    
    return {
    init: initialize,
    blink: buttonBlink,
        //fadein: txtFadeIn,
        //fadeout: txtFadeOut,
        //show: showEachFt,
    showAll: showAllFt
    };
}();

var timer = function() {
    var timer;
    var sec = 0;
    var min = 0;
    var stopped = true;
    
    var runTimer = function() {
        sec++;
        if (sec <= 9) {
            $('span#sec').text("0"+sec);
        } else if (sec > 59) {
            sec = 0;
            $('span#sec').text("00");
            min++;
            if (min <= 9) {
                $('span#min').text("0" + min);
            } else {
                $('span#min').text(min);
            }
            
        } else {
            $('span#sec').text(sec);            
        }
        if (min == 59 && sec == 59) {
            clearInterval(timer);
            stopped = true;
        }
    };
    
    var startTimer = function() {
        if (stopped) {
            stopped = false;
            timer = setInterval(runTimer, 1000);
        }
    };
    
    var pauseTimer = function() {
        stopped = true;
        clearInterval(timer);
    };
    
    var stopTimer = function() {
        pauseTimer();
        timer = null;
    };
    
    var resumeTimer = function() {
        if (typeof(timer) == "number") {
            startTimer();
        }
    };
    
    var resetTimer = function() {
        stopped = true;
        clearInterval(timer);
        timer = null;
        sec = 0;
        min = 0;
        $('span#sec').text("00");
        $('span#min').text("00");
    };
    
    var isPaused = function() {
        return stopped;
    };
    return {
    start: startTimer,
    pause: pauseTimer,
    stop: stopTimer,
    reset: resetTimer,
    resume: resumeTimer
    }
}();


