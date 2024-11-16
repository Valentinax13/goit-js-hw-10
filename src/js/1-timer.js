import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const datetimePicker = document.getElementById('datetime-picker');
const startBtn = document.querySelector('button[data-start]');
const daysSpan = document.querySelector('[data-days]');
const hoursSpan = document.querySelector('[data-hours]');
const minutesSpan = document.querySelector('[data-minutes]');
const secondsSpan = document.querySelector('[data-seconds]');

let userSelectedDate = null;
let timerInterval = null;

startBtn.disabled = true;

const options = { 
    enableTime: true, 
    time_24hr: true, 
    defaultDate: new Date(), 
    minuteIncrement: 1, 
    onClose(selectedDates) {
         const selectedDate = selectedDates[0]; 
         if (selectedDate <= new Date()) {
             iziToast.error({ 
                title: 'Error', 
                message: 'Please choose a date in the future', 
            }); 
            startBtn.disabled = true; 
        } else { 
            userSelectedDate = selectedDate; 
            startBtn.disabled = false; 
        } 
    }, 
};
flatpickr(datetimePicker, options); 
startBtn.addEventListener('click', () => {
     if (timerInterval) {
         clearInterval(timerInterval); 
        } 
        startBtn.disabled = true; 
        datetimePicker.disabled = true; 
        timerInterval = setInterval(() => { 
            const now = new Date(); 
            const timeLeft = userSelectedDate - now; 
            if (timeLeft <= 0) { 
                clearInterval(timerInterval); 
                datetimePicker.disabled = false; 
                updateTimerDisplay(0, 0, 0, 0); 
                return; }
                const { days, hours, minutes, seconds } = convertMs(timeLeft); 
                updateTimerDisplay(days, hours, minutes, seconds); 
            }, 1000); 
        });
        function convertMs(ms) { 
            const second = 1000; 
            const minute = second * 60; 
            const hour = minute * 60; 
            const day = hour * 24; 
            const days = Math.floor(ms / day); 
            const hours = Math.floor((ms % day) / hour); 
            const minutes = Math.floor(((ms % day) % hour) / minute); 
            const seconds = Math.floor((((ms % day) % hour) % minute) / second); 
            return { days, hours, minutes, seconds }; 
        }

        function updateTimerDisplay(days, hours, minutes, seconds) { 
            daysSpan.textContent = addLeadingZero(days); 
            hoursSpan.textContent = addLeadingZero(hours); 
            minutesSpan.textContent = addLeadingZero(minutes); 
            secondsSpan.textContent = addLeadingZero(seconds); 
        } 
        function addLeadingZero(value) { 
            return String(value).padStart(2, '0'); 
        }

        document.body.style.display = 'flex'; 
        document.body.style.justifyContent = 'center'; 
        document.body.style.alignItems = 'center'; 
        document.body.style.height = '100vh'; 
        document.body.style.margin = '0';

        const timer = document.querySelector('.timer'); 
        timer.style.display = 'flex'; 
        timer.style.gap = '20px'; 
        timer.style.fontSize = '48px'; 
        timer.style.fontWeight = 'bold';

        const fields = document.querySelectorAll('.field'); 
        fields.forEach(field => { 
            field.style.display = 'flex'; 
            field.style.flexDirection = 'column'; 
            field.style.alignItems = 'center'; 
        });

        const values = document.querySelectorAll('.value'); 
        values.forEach(value => { 
            value.style.fontSize = '72px'; 
            value.style.fontWeight = 'bold'; 
        });

        const labels = document.querySelectorAll('.label'); 
        labels.forEach(label => { 
            label.style.fontSize = '24px'; 
            label.style.fontWeight = 'normal'; 
        });



