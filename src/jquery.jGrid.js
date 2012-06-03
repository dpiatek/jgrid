/*
 * jquery.jGrid
 * https://github.com/dpiatek/jGrid
 *
 * Copyright (c) 2012 Dominik Piatek
 * Licensed under the MIT, GPL licenses.
 */

(function($) {

    var jGrid = {

        // Todo
        // - press ctrl-shift-l for jgrid box
        // - remove button submits and make them more CSS-safe
        // - add opacity adjustment
        // - make hide button a bit out of the box, like a pull down
        // - add position fixed to col-width
        // - add hide button for menu or maybe go straight to drag&drop ?
        // - clean-up plugin
        // - comment code
        // - make readme
        // - push to github
        // - live on / off

        // Initialize plugin
        init: function( setup ){
            this.self = this;
            this.updateID = null;
            this.keylistener();
            this.addmenu();

            this.attachForm();
            this.updateGrid();
            $('#jgrid-setup, #jgrid-overlay, #col-width').hide();
        },

        // Add styles to head and append menu to body
        addmenu: function () {
        $('head').append('<style>#jgrid-setup {position:fixed; top:0; right:0; width:100px; height:411px; background-color:#DDD; padding:0 10px; border-radius:0 0 0 5px; border-left:1px solid #999; border-bottom:1px solid #999; z-index:999; } #jgrid-form input[type=submit] , #show-hide {display:block; width:80px; height:30px; text-transform:uppercase; border:0; border-radius:3px; margin:10px 0 10px; background-color:#E54D3C; color:#fff; cursor:pointer; } #jgrid-form input[type=submit]:hover { background-color:#992215; } #show-hide         {background-color:#929292; } #show-hide:hover { background-color:#383838; } #jgrid-form                     { font-family: sans-serif; color:#222; font-size:14px; } #jgrid-form label                  { display:block; padding:0; margin:10px 0; cursor:pointer; } #jgrid-form input                  { padding:0; margin:0; border:3px solid #FFF; border-radius:3px; } #jgrid-form input[type=number]   { width:60px; height:22px;} #jgrid-form input[type=checkbox] { margin-right:3px; } #test { font-size:60px; width:500px; margin:0 auto; } #jgrid-overlay {position:fixed; top:0; left:0; width:100%; height:100%; background-color:#000; opacity:0.2; z-index:997; } #jgrid-wrapper         { width:960px; margin:0 auto; background-color:rgb(255, 192, 203); height:100%; z-index:998; } #jgrid-wrapper > span {width:70px; margin-right:10px; height:100%; background-color:#000; opacity:0.3; display:block; float:left; } #jgrid-wrapper > span:last-child     { margin-right:5px; } #jgrid-wrapper > span:first-child     { margin-left:5px; } #col-width {color: #EEE; background-color: #555; border-radius: 80px; height: 100px; width: 100px; display: block; text-align: center; line-height: 92px; font-size: 26px; }</style>');
        $('body').append('<div id="jgrid-setup"><form method="get" accept-charset="utf-8" id="jgrid-form"><label for="wrapper">Wrapper</label><input type="number" name="wrapper" placeholder="960" required pattern="^[0-9]+$" title="Only integer values"><span>px</span><label for="columns">Columns</label><input type="number" name="columns" placeholder="12" required pattern="^[0-9]+$" title="Only integer values"><label for="gutter">Gutter</label><input type="number" name="gutter" placeholder="5" required pattern="^[0-9]+$" title="Only integer values"><span>px</span><label for="marLeft">Margin left</label><input type="number" name="marLeft" required pattern="^[0-9]+$" title="Only integer values"><label for="marRight">Margin right</label><input type="number" name="marRight" required pattern="^[0-9]+$" title="Only integer values"><input type="submit" value="Go"><button id="show-hide">Hide</button></form></div>');
        },

        keylistener: function ( ) {
            var isCtrl = false,
                isShift = false,
                that = this.self;

            $('body').on('keyup', function(e) {
                if (e.which === 16) { isShift = false; }
                if (e.which === 17) { isCtrl = false; }
            });

            $('body').on('keydown', that, function(e) {
                if(e.which === 17) { isCtrl = true; }
                if(e.which === 16) { isShift = true; }


                if(e.which === 76 && isCtrl && isShift) {
                    window.clearTimeout(this.updateID);

                    $('#jgrid-setup, #jgrid-overlay, #col-width').toggle();

                    if ($('#jgrid-setup').length) {
                        that.updateGrid();
                    }
                }
            });
        },

        setupGrid: function( colWidth , setup ) {
            var cols = '',
                wrapper = null;

            if (!($('#jgrid-overlay').length)) {
                $('body').append('<div id="jgrid-overlay"><div id="jgrid-wrapper"></div></div>');
                $('#jgrid-wrapper').width( setup.wrapper );
            }

            wrapper = $('#jgrid-wrapper');
            wrapper.empty();

            for (var i = 0; i < setup.columns; i++) {
                cols += '<span></span>';
            }

            wrapper.width( setup.wrapper );
            wrapper.append(cols);
            wrapper.find('span').width(colWidth).css('margin-right', setup.gutter);
            wrapper.find('span:first-child').css('margin-left', setup.marLeft);
            wrapper.find('span:last-child').css('margin-right', setup.marRight);
        },

        calculateGrid: function( setup ) {
            var colWidth = ( setup.wrapper - setup.marLeft - setup.marRight - ( (setup.columns - 1) * setup.gutter ) ) / setup.columns;
            var checkWidth = (setup.columns * colWidth) + ( (setup.columns - 1) * setup.gutter ) + setup.marLeft + setup.marRight;
            var percentage = ((colWidth / setup.wrapper) * 100) + '%';

            // console.log(colWidth);
            // console.log(checkWidth);


            this.setupGrid( colWidth , setup );
            this.updateColsWidth( colWidth , percentage );
        },

        attachForm: function ( ) {
            $('form').on('submit',function(e){
                e.preventDefault();
                this.self.getData();
            });
        },

        getData: function () {
            var setup = {};

            setup.wrapper = parseInt($('input[name=wrapper]').val(),10) || 0;
            setup.columns = parseInt($('input[name=columns]').val(),10) || 1;
            setup.gutter = parseInt($('input[name=gutter]').val(),10) || 0;
            setup.marLeft = parseInt($('input[name=marLeft]').val(),10) || 0;
            setup.marRight = parseInt($('input[name=marRight]').val(),10) || 0;

            // console.log(setup);
            this.calculateGrid( setup );
        },

        updateColsWidth: function ( colWidth , percentage ) {
            var column = $('#col-width');

            if ( !(column.length) ) {
                $('body').append('<span id="col-width"></span>');
                column = $('#col-width');
            }
            
            if (!(typeof colWidth === 'number' && (colWidth % 1 === 0) )) {
                colWidth = Math.round( colWidth*100 ) / 100;
                column.css('color','#F00');
            } else {
                colWidth = colWidth + 'px';
                column.css('color','#EEE');
            }
            column.text( colWidth );
            column.append( '<br>' + percentage );
        },

        updateGrid: function () {
            that = this.self;
            this.getData();
            this.updateID = window.setTimeout(function ( ) {
                that.updateGrid();
            }, 2000, that);
        }

    };

    jGrid.init();

    // return $.initGrid = jGrid.calculateGrid({ wrapper:960, columns:12, gutter:10, marLeft:5, marRight:5 });
        
}(jQuery));
