'use strict';
import requestAnimationFramePlyfil from './polyfil.js';
import ButtonUpDown from './ButtonUpDown'

new ButtonUpDown({
        canvasStyle: {
            radius: 30,
            top: '20%',
            side: 'right',
            indent: '10px'
        },
        toggleVisibilityPoint: 600,
        color: 'rgb(96, 150, 219)',
        barOpacity: 0.8,
        barOpacityTimeAnimation: 0.3,
        imgSrc : './img/up-arrow-icon-top-small.png',
        animationTime: 0.2
    }
);


new ButtonUpDown({
        canvasStyle: {
            radius: 20,
            top: '50%',
            side: 'left',
            indent: '20px'
        },
        toggleVisibilityPoint: 1000,
        color: 'rgb(96, 150, 219)',
        barOpacity: 0.6,
        barOpacityTimeAnimation: 0.3,
        imgSrc : './img/up-arrow-icon-top-small.png',
        animationTime: 0.3
    }
);



exports.ButtonUpDown = ButtonUpDown //выгрузка во внешнюю переменную
