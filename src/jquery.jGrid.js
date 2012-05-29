/*
 * jquery.jGrid
 * https://github.com/dpiatek/jGrid
 *
 * Copyright (c) 2012 Dominik Piatek
 * Licensed under the MIT, GPL licenses.
 */

(function($) {

    // Options - default grid
    // Listen for keyboard shortcut
    // Show grid setup or run from cache/local storage/whatever
    // Draw grid

    var jGrid = {

        // Initialize plugin
        init: function(){
            this.keylistener();
            this.menu();
        },

        // add style to head and menu to body
        menu: function () {
        $('head').append('<style>#jgrid-setup {position:fixed; top:0; right:0; width:100px; height:336px; background-color:#DDD; padding:0 10px; border-radius:0 0 0 5px; border-left:1px solid #999; border-bottom:1px solid #999; z-index:999; } #jgrid-form input[type=submit] , #show-hide {display:block; width:80px; height:30px; text-transform:uppercase; border:0; border-radius:3px; margin:0 0 10px; background-color:#E54D3C; color:#fff; cursor:pointer; } #jgrid-form input[type=submit]:hover { background-color:#992215; } #show-hide     {background-color:#929292; } #show-hide:hover { background-color:#383838; } #jgrid-form            { font-family: sans-serif; color:#222; font-size:14px; } #jgrid-form label          { display:block; padding:0; margin:10px 0; cursor:pointer; } #jgrid-form input          { padding:0; margin:0; border:3px solid #FFF; border-radius:3px; } #jgrid-form input[type=number]   { width:60px; height:22px;} #jgrid-form input[type=checkbox] { margin-right:3px; } #test { font-size:60px; width:500px; margin:0 auto; } #jgrid-overlay {position:fixed; top:0; left:0; width:100%; height:100%; background-color:#000; opacity:0.2; z-index:997; } #jgrid-wrapper    { width:960px; margin:0 auto; background-color:rgb(255, 192, 203); height:100%; z-index:998; } #jgrid-wrapper > span {width:70px; margin-right:10px; height:100%; background-color:#000; opacity:0.3; display:block; float:left; } #jgrid-wrapper > span:last-child  { margin-right:5px; }#jgrid-wrapper > span:first-child   { margin-left:5px; }</style>');
        $('body').append('<div id=\"jgrid-setup\"> <form method=\"get\" accept-charset=\"utf-8\" id=\"jgrid-form\"> <label for="wrapper-width">Wrapper</label> <input type="number" name="wrapper-width" placeholder="960" required pattern="^[0-9]+$" title="Only integer values"> <span>px</span> <label for="columns">Columns</label> <input type="number" name="columns" placeholder="12" required pattern="^[0-9]+$" title="Only integer values"> <label for="gutter-width">Gutter</label> <input type="number" name="gutter-width" placeholder="5"  required pattern="^[0-9]+$" title="Only integer values"> <span>px</span> <label for="margin-left"> <input type="checkbox" name="margin-left">Margin left </label> <label for="margin-right"> <input type="checkbox" name="margin-right">Margin right </label> <input type="submit" value="Go"> <button id="show-hide">Hide</button> </form> </div>');
        },

        keylistener: function () {
            var isCtrl = false,
                isShift = false;

            $('body').keyup(function(e) {
                if(e.which == 16) {
                    isShift = false;
                }
            });

            $('body').keydown(function(e) {
                if(e.which == 17) {
                    isCtrl = true;
                }
                if(e.which == 16) {
                    isShift = true;
                }
                if(e.which == 76 && isCtrl && isShift) {
                    $('#jgrid-setup').toggle();
                }
            });
        }
    };

  jGrid.init();

}(jQuery));
