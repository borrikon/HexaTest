$(function (){
    $('.slider-main').slick({
        dots: true,
        arrows: true,
        asNavFor: '.sync',
        prevArrow: '.slider-arrow-left',
        nextArrow: '.slider-arrow-right',
        dotsClass: 'slider-dots',
        // customPaging: ()=>('<li></li>')
    })
    $('.second-slider').slick({
        dots: false,
        arrows: true,
        variableWidth: true,
        prevArrow: '.slider-arrow-left',
        nextArrow: '.slider-arrow-right',
        asNavFor: '.sync'
    })
    $('.third-slider').slick({
        dots: false,
        arrows: true,
        centerPadding: true,
        prevArrow: '.slider-arrow-left',
        nextArrow: '.slider-arrow-right',
        asNavFor: '.sync'
    })
})