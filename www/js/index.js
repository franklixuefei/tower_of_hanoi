/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var first_pile_stack = new Array();
var second_pile_stack = new Array();
var third_pile_stack = new Array();
var numDisks = 5;
var stepCounter = 0;
var app = {
    // Application Constructor
initialize: function() {
    this.bindEvents();
},
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // `load`, `deviceready`, `offline`, and `online`.
bindEvents: function() {
    document.addEventListener('deviceready', this.onDeviceReady, false);

    document.body.addEventListener('touchmove', function(e) {
                                   e.preventDefault();
                                   }, false);
},
    // deviceready Event Handler
    //
    // The scope of `this` is the event. In order to call the `receivedEvent`
    // function, we must explicity call `app.receivedEvent(...);`
onDeviceReady: function() {
    app.receivedEvent();
        
},
    // Update DOM on a Received Event
receivedEvent: function() {
    //        var parentElement = document.getElementById(id);
    //        var listeningElement = parentElement.querySelector('.listening');
    //        var receivedElement = parentElement.querySelector('.received');
    //
    //        listeningElement.setAttribute('style', 'display:none;');
    //        receivedElement.setAttribute('style', 'display:block;');
    //
    //        console.log('Received Event: ' + id);
    $("body").nodoubletapzoom(); // prevent double tap zoom
    document.addEventListener("pause", this.onDevicePause, false);
    setTimeout(function() {
               navigator.splashscreen.hide();
               }, 400);
    

    
    hanoi.init(); // initialize the settings.
    hanoi.gen(30, 130);
    hanoi.prepareHowto();
    var control_panel = hanoi.prepareMenu();
    setTimeout(function() {
               hanoi.showMenu(control_panel);
               
               }, 400);

    
    
    var confirmCallback_1 = function(buttonID) {
        if (buttonID == 1) {
            timer.reset();
            numDisks++;
            stepCounter = 0;
            hanoi.gen(30, 130);
            playHanoi.init();
        } else {
            timer.resume();
        }
    };
    
    var confirmCallback_2 = function(buttonID) {
        if (buttonID == 1) {
            timer.reset();
            numDisks--;
            stepCounter = 0;
            hanoi.gen(30, 130);
            playHanoi.init();
        } else {
            timer.resume();
        }
    };
    
    var confirmCallback_3 = function(buttonID) {
        if (buttonID == 1) {
            timer.reset();
            stepCounter = 0;
            hanoi.gen(30, 130);
            playHanoi.init();
        } else {
            timer.resume();
        }
    };
    
    $('div.level_button#plus').bind('touchend', function() {
                                    $(this).removeClass('active');
                                    if (numDisks == 10) return;
                                    
                                    
                                    if (first_pile_stack.length == numDisks) {
                                    timer.reset();
                                    confirmCallback_1(1);
                                    } else {
                                    timer.pause();
                                    navigator.notification.confirm("Your current progress will be reset first.", confirmCallback_1, 'Level Up', 'Level Up,Cancel');
                                    }
                                    return;
                                    })
    .bind('touchstart', function() {
          $(this).addClass('active');
          });
    $('div.level_button#minus').bind('touchend', function() {
                                     $(this).removeClass('active');
                                     if (numDisks == 2) return;
                                     if (first_pile_stack.length == numDisks) {
                                     timer.reset();
                                     confirmCallback_2(1);
                                     } else {
                                     timer.pause();
                                     navigator.notification.confirm("Your current progress will be reset first.", confirmCallback_2, 'Level Down', 'Level Down,Cancel');
                                     }
                                     return;
                                     })
    .bind('touchstart', function() {
          $(this).addClass('active');
          });
    $('div.reset_button').bind('touchend', function() {
                               $(this).removeClass('active');
                               if (first_pile_stack.length == numDisks) {
                               timer.reset();
                               confirmCallback_3(1);
                               } else {
                               timer.pause();
                               navigator.notification.confirm("Your current progress will be reset.", confirmCallback_3, 'Reset Game', 'Reset,Cancel');
                               
                               }
                               return;
                               })
    .bind('touchstart', function() {
          $(this).addClass('active');
          });
    $('div.pause_button').bind('touchend', function() {
                               $(this).removeClass('active');
                               playHanoi.pause();
                               return;
                               })
    .bind('touchstart', function() {
          $(this).addClass('active');
          });
    
    
    
    
    
    
},
onDevicePause: function() {
    if (hanoi.isRunning()) playHanoi.pause();
}
};
