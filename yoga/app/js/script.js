

window.addEventListener('DOMContentLoaded', function () {
    let tab = document.querySelectorAll('.info-header-tab'),
        info = document.querySelector('.info-header'),
        tabContent = document.querySelectorAll('.info-tabcontent');

    function hideTabContent(a) {
        for(let i = a; i < tabContent.length; i++){
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');
        }
    }
    hideTabContent(1);

    function showTabContent(b) {
        if (tabContent[b].classList.contains('hide')) {
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add('show');
        }
    }

    info.addEventListener('click', function(e){
        if (e.target && e.target.classList.contains('info-header-tab')) {
            for(let i = 0;i<tab.length;i++) {
                if (e.target == tab[i]) {
                    hideTabContent(0);
                    showTabContent(i)
                    break;
                }
            }
        }
    });

    //Timer

    let deadLine = '2020-05-01';

    function getTimeRemaining (endtime) {
        let t = Date.parse(endtime) - Date.parse(new Date()),
            seconds = Math.floor((t/1000) % 60),
            minutes = Math.floor((t/1000/60) % 60),
            hours = Math.floor((t/(1000*60*60)));
            // days = Math.floor((t/(1000*60*60*24)));
            return {
                'total' : t,
                'hours' : hours,
                'minutes' : minutes,
                'sec' : seconds
            };
    }

    function setClock (id, endTime){
        let timer = document.getElementById(id),
            hours = timer.querySelector('.hours'),
            minutes = document.querySelector('.minutes'),
            seconds = document.querySelector('.seconds'),
            timeInterval = setInterval(updateClock, 1000)

        function updateClock(){
            let t = getTimeRemaining(endTime);
            hours.textContent = t.hours;
            minutes.textContent = t.minutes;
            seconds.textContent = t.sec;

            if (t.total <= 0) {
                clearInterval(timeInterval)
            }
        }
    }

    setClock('timer', deadLine);

    //Modal

    let more = document.querySelector('.more'),
        overlay = document.querySelector('.overlay'),
        close = document.querySelector('.popup-close');

        more.addEventListener('click', function(){
            overlay.style.display = 'block';
            this.classList.add('more-splash');
            document.body.style.overflow = 'hidden';
        });

        close.addEventListener('click', function (){
            overlay.style.display = 'none';
            more.classList.add('more-splash');
            document.body.style.overflow = '';
        });

        //Slider
        
        let slideIndex = 1,
            slides = document.querySelectorAll('.slider-item'),
            prev = document.querySelector('.prev'),
            next = document.querySelector('.next'),
            dotsWrap = document.querySelector('.slider-dots'),
            dots = document.querySelectorAll('.dot');

        showSlides(slideIndex);

        function showSlides(n) {

            if (n > slides.length){
                slideIndex = 1;
            }
            if (n < 1 ){
                slideIndex = slides.length;
            }

            slides.forEach((item) => item.style.display = 'none');
            dots.forEach((item) => item.classList.remove('dot-active'));

            slides[slideIndex - 1].style.display = 'block';
            dots[slideIndex - 1].classList.add('dot-active');
        }

        function plusSlides(n) {
            showSlides(slideIndex += n);
        }

        function currentSlide(n) {
            showSlides(slideIndex = n);
        }

        prev.addEventListener('click', function() {
            plusSlides(-1);
        });

        next.addEventListener('click', function() {
            plusSlides(1);
        });

        dotsWrap.addEventListener('click', function(e) {
            for (let i = 0; i < dots.length + 1; i++ ) {
                if (e.target.classList.contains('dot') && e.target == dots[i - 1]) {
                    currentSlide(i);
                }
            }
        });

        //Calculator

        let persons = document.querySelectorAll('.counter-block-input')[0],
            restDays = document.querySelectorAll('.counter-block-input')[1],
            place = document.getElementById("select"),
            totalValue = document.getElementById("total"),
            personsSum = 0,
            daysSum = 0,
            totalSum = 0;

            totalValue.innerHTML = 0;

            persons.addEventListener('change', function() {
                personsSum = +this.value;
                totalSum = (daysSum + personsSum) * 4000;

                if (restDays.value == '' || persons.value == '') {
                    totalValue.innerHTML = 0;
                } else {
                    totalValue.innerHTML = totalSum;
                }
            });

            restDays.addEventListener('change', function() {
                daysSum = +this.value;
                totalSum = (daysSum + personsSum) * 4000;

                if (persons.value == '' || restDays.value == '') {
                    totalValue.innerHTML = 0;
                } else {
                    totalValue.innerHTML = totalSum;
                }
            });

            place.addEventListener('change', function(){
                if (restDays.value == '' || persons.value == ''){
                    totalValue.innerHTML = 0;
                } else {
                    let a = totalSum;
                    totalValue.innerHTML = a * this.options[this.selectedIndex].value;
                }
            });

});