(function ( $ ) {
    var PLUGIN_IDENTIFIER = 'mlOverlay';

    function hideOverlay(overlay) {
        var settings = $(overlay).data(PLUGIN_IDENTIFIER);

        if(settings._isVisible) {
            settings.onHide(overlay);
            settings._isVisible = false;
        }

    }

    function showOverlay(overlay) {
        var settings = $(overlay).data(PLUGIN_IDENTIFIER);

        if(!settings._isVisible) {
            settings.onShow(overlay);
            settings._isVisible = true;
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

                    onShow: function(overlay) {
                        $(overlay).fadeIn();
                    },
                    onHide: function(overlay) {
                        $(overlay).fadeOut();
                    },

                    _isVisible : false
                }, options);

                if (settings.ignore.length > 0) {
                    settings.ignore += ",";
                }
                settings.ignore += settings.target;
                $(_this).data(PLUGIN_IDENTIFIER, settings);

                $(settings.target).bind('click.'+PLUGIN_IDENTIFIER, function() {
                    var isOverlayVisible = settings._isVisible;

                    if(isOverlayVisible) {
                        if(settings.hideOnTargetClick) {
                            hideOverlay(_this);
                        }
                    } else {
                        showOverlay(_this);
                    }
                });

                if (settings.hideOnOutsideClick) {
                    $(document).bind('click.'+PLUGIN_IDENTIFIER, function(e) {
                        if ($(e.target).closest(settings.ignore).length == 0 && $(e.target).closest(_this).length == 0) {
                            hideOverlay(_this);
                        }
                    });
                }

                if(settings.hideOnEsc) {
                    $(document).bind('keyup.'+PLUGIN_IDENTIFIER, function(e) {
                        if (e.keyCode == 27) {
                            hideOverlay(_this);
                        }
                    });
                }
            });
        },

        destroy: function() {
            this.each(function() {
                var settings = $(this).data(PLUGIN_IDENTIFIER);
                if(settings) {
                    $(settings.target).unbind('click.'+PLUGIN_IDENTIFIER);
                    $(document).unbind('click.'+PLUGIN_IDENTIFIER);
                    $(document).unbind('keyup.'+PLUGIN_IDENTIFIER);
                    $(this).removeData();
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
            // prevent re-initialization
            if(!$(this).data(PLUGIN_IDENTIFIER)) {
                return methods.init.apply( this, arguments );
            }
        } else {
            $.error( 'Method ' +  method + ' does not exist on jQuery.'+PLUGIN_IDENTIFIER );
        }
    };
}( jQuery ));