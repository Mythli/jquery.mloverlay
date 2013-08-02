(function ( $ ) {
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

    $.fn.mlOverlay = function(options) {
        this.each(function() {
            var elementReference = this;

            var settings = $.extend({
                ignore: '',
                target: '',
                closeOnOutsideClick: true,
                closeOnTargetClick: true,
                closeOnEsc: true,
                saveState: true,

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
            $(elementReference).data('mlOverlaySettings', settings);
            $(elementReference).data('mlIsOverlayVisible', false);

            $(settings.target).click(function() {
                var isOverlayVisible = $(elementReference).data('mlIsOverlayVisible');

                if(isOverlayVisible == true) {
                    if(settings.closeOnTargetClick) {
                        mlHideOverlay(elementReference);
                    }
                } else {
                    mlShowOverlay(elementReference);
                }
            });

            if (settings.closeOnOutsideClick) {
                $(document).click(function(e) {
                    if ($(e.target).closest(settings.ignore).length == 0 && $(e.target).closest(elementReference).length == 0) {
                        mlHideOverlay(elementReference);
                    }
                });
            }

            if(settings.closeOnEsc) {
                $(document).keyup(function(e) {
                    if (e.keyCode == 27) {
                        mlHideOverlay(elementReference);
                    }
                });
            }

            if(settings.saveState) {
                if($.cookie != null) {
                    var isOverlayVisible = $.cookie('mlIsOverlayVisible');
                    if(isOverlayVisible != false) {
                        mlShowOverlay(elementReference);
                    }
                } else {
                    throw 'In order to use saveState you have to include jquery.cookie!';
                }
            }
        });


    };

    $.fn.mlOpen = function() {
        mlShowOverlay(this);
    };

    $.fn.mlClose = function() {
        mlHideOverlay(this);
    };
}( jQuery ));