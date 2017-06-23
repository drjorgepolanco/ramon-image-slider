/* Ramon Image Slider 1.1 */
/* June 23, 2017 */
/* This image slider is as free as the air we breath. Enjoy it! */
/* Now multiple sliders can be used on the same page */

var ramonSlider = function(slider, transition) {
    var imgSlider = {
        slider: $(slider).data('name'), 
        sliderId: $('#' + $(slider).data('name')),
        slides: '.rm-slider-slide',
        transition: transition || 3000,
        currentIndex: 0,
        interval: undefined,
        slideCount: function() {
            return this.sliderId.find(this.slides).length;
        },
        makeFirstSlideActive: function() {
            this.sliderId.find(this.slides).first().addClass('active');
        },
        moveItems: function() {
            var slideItems = this.sliderId.find(this.slides);
            var currentSlide = slideItems.eq(this.currentIndex);
            slideItems.removeClass('active');
            currentSlide.addClass('active');
        },
        moveOne: function() {
            var thisObject = this;
            if (this.currentIndex > this.slideCount() - 1) {
                thisObject.currentIndex = 0;
            }
            this.moveItems();
        },
        autoSlide: function() {
            var thisObject = this;
            this.interval = window.setInterval(function() {
                thisObject.currentIndex++;
                thisObject.moveOne();
            }, thisObject.transition);
        },
        moveToNext: function() {
            var thisObject = this;
            var nextItem = this.sliderId.find('.rm-next');
            nextItem.on('click', function(e) {
                e.preventDefault();
                window.clearInterval(thisObject.interval);
                thisObject.currentIndex++;
                thisObject.moveOne();              
            });
        },
        moveToPrev: function() {
            var thisObject = this;
            var prevItem = this.sliderId.find('.rm-prev');
            prevItem.on('click', function(e) {
                e.preventDefault();
                window.clearInterval(thisObject.interval);
                thisObject.currentIndex--;
                if (thisObject.currentIndex < 0) {
                    thisObject.currentIndex = thisObject.slideCount() - 1;
                }
                thisObject.moveItems();                
            });
        }   
    }
    var init = function() {
        imgSlider.makeFirstSlideActive();
        imgSlider.moveItems();
        imgSlider.moveOne();
        imgSlider.autoSlide();
        imgSlider.moveToNext();
        imgSlider.moveToPrev();
    }
    return init();
};