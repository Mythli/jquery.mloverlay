(function ( $ ) {
    function mlHideOverlay(overlay) {
        var isOverlayVisible = $(overlay).data('mlIsOverlayVisible');

        if(isOverlayVisible) {
            var settings = $(overlay).data('mlOverlaySettings');
            settings.onHide(overlay);
            isOverlayVisible = false;
            $(overlay).data('mlIsOverlayVisible', isOverlayVisible);

            if(settings.saveState) {
                $.cookie('mlIsOverlayVisible', isOverlayVisible);
            }
        }
    }

    function mlShowOverlay(overlay) {
        var isOverlayVisible = $(overlay).data('mlIsOverlayVisible');

        if(!isOverlayVisible) {
            var settings = $(overlay).data('mlOverlaySettings');
            settings.onShow(overlay);
            isOverlayVisible = true;
            $(overlay).data('mlIsOverlayVisible', isOverlayVisible);

            if(settings.saveState) {
                $.cookie('mlIsOverlayVisible', isOverlayVisible);
            }
        }
    }


    var methods = {
        init : function(options) {
            this.each(function() {
                var _this = this;

                var settings = $.extend({
                    ignore: '',
                    target: '',
                    closeOnOutsideClick: true,
                    closeOnTargetClick: true,
                    closeOnEsc: true,
                    saveState: false,

                    onShow: function(overlay) {
                        $(overlay).fadeIn();
                    },
                    onHide: function(overlay) {
                        $(overlay).fadeOut();
                    }
                }, options);
                if (settings.ignore.length > 0) {
                    settings.ignore += ",";
                }
                settings.ignore += settings.target;
                $(_this).data('mlOverlaySettings', settings);
                $(_this).data('mlIsOverlayVisible', false);

                $(settings.target).click(function() {
                    var isOverlayVisible = $(_this).data('mlIsOverlayVisible');

                    if(isOverlayVisible) {
                        if(settings.closeOnTargetClick) {
                            mlHideOverlay(_this);
                        }
                    } else {
                        mlShowOverlay(_this);
                    }
                });

                if (settings.closeOnOutsideClick) {
                    $(document).click(function(e) {
                        if ($(e.target).closest(settings.ignore).length == 0 && $(e.target).closest(_this).length == 0) {
                            mlHideOverlay(_this);
                        }
                    });
                }

                if(settings.closeOnEsc) {
                    $(document).keyup(function(e) {
                        if (e.keyCode == 27) {
                            mlHideOverlay(_this);
                        }
                    });
                }

                if(settings.saveState) {
                    if($.cookie != null) {
                        var isOverlayVisible = $.cookie('mlIsOverlayVisible');
                        if(isOverlayVisible == 'true') {
                            mlShowOverlay(_this);
                        }
                    } else {
                        throw 'To save the overlay state you need the jquery.cookie plugin. You can download it here: https://github.com/carhartl/jquery-cookie';
                    }
                }
            });
        },
        show : function() {
            this.each(function() {
                mlShowOverlay(this);
            });
        },
        hide : function() {
            this.each(function() {
                mlHideOverlay(this);
            });
        }
    };

    $.fn.mlOverlay = function(methodOrOptions) {
        if ( methods[methodOrOptions] ) {
            return methods[ methodOrOptions ].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof methodOrOptions === 'object' || ! methodOrOptions ) {
            return methods.init.apply( this, arguments );
        } else {
            $.error( 'Method ' +  method + ' does not exist on jQuery.mlOverlay' );
        }
    };
}( jQuery ));