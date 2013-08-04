(function ( $ ) {
    function hideOverlay(overlay) {
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

    function showOverlay(overlay) {
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
                    hideOnOutsideClick: true,
                    hideOnTargetClick: true,
                    hideOnEsc: true,
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

                var oldSettings = $(_this).data('mlOverlaySettings');
                if(oldSettings) {
                    $(oldSettings.target).unbind('click.mlOverlay');
                    $(document).unbind('click.mlOverlay');
                    $(document).unbind('keyup.mlOverlay');
                }

                $(_this).data('mlOverlaySettings', settings);
                $(_this).data('mlIsOverlayVisible', false);

                $(settings.target).bind('click.mlOverlay', function() {
                    var isOverlayVisible = $(_this).data('mlIsOverlayVisible');

                    if(isOverlayVisible) {
                        if(settings.hideOnTargetClick) {
                            hideOverlay(_this);
                        }
                    } else {
                        showOverlay(_this);
                    }
                });

                if (settings.hideOnOutsideClick) {
                    $(document).bind('click.mlOverlay', function(e) {
                        if ($(e.target).closest(settings.ignore).length == 0 && $(e.target).closest(_this).length == 0) {
                            hideOverlay(_this);
                        }
                    });
                }

                if(settings.hideOnEsc) {
                    $(document).bind('keyup.mlOverlay', function(e) {
                        if (e.keyCode == 27) {
                            hideOverlay(_this);
                        }
                    });
                }

                if(settings.saveState) {
                    if($.cookie != null) {
                        var isOverlayVisible = $.cookie('mlIsOverlayVisible');
                        if(isOverlayVisible == 'true') {
                            showOverlay(_this);
                        }
                    } else {
                        settings.saveState = false;
                    }
                }
            });
        },
        show : function() {
            this.each(function() {
                showOverlay(this);
            });
        },
        hide : function() {
            this.each(function() {
                hideOverlay(this);
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