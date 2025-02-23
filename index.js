         // Stats Counter Animation
         const counters = document.querySelectorAll('.counter');
         const speed = 200;
 
         const startCounters = () => {
             counters.forEach(counter => {
                 const updateCount = () => {
                     const target = parseInt(counter.getAttribute('data-target'));
                     const count = parseInt(counter.innerText);
                     const increment = target / speed;
 
                     if (count < target) {
                         counter.innerText = Math.ceil(count + increment);
                         setTimeout(updateCount, 1);
                     } else {
                         counter.innerText = target;
                     }
                 };
                 updateCount();
             });
         };
 
         // Intersection Observer to start counter when in view
         const statsSection = document.querySelector('.stats-section');
         const observer = new IntersectionObserver((entries) => {
             entries.forEach(entry => {
                 if (entry.isIntersecting) {
                     startCounters();
                     observer.unobserve(entry.target);
                 }
             });
         }, { threshold: 0.5 });
 

         document.addEventListener('DOMContentLoaded', function() {
             const slides = document.querySelectorAll('.slide');
             const dots = document.querySelectorAll('.slider-dot');
             let currentSlide = 0;
 
             // Add active classes for initial state
             slides[0].classList.add('opacity-100');
             dots[0].classList.add('bg-[#FFBA08]', 'scale-125');
 
             function showSlide(index) {
                 slides.forEach(slide => slide.classList.remove('opacity-100'));
                 dots.forEach(dot => {
                     dot.classList.remove('bg-[#FFBA08]', 'scale-125');
                     dot.classList.add('bg-[#FFBA08]/50');
                 });
                 slides[index].classList.add('opacity-100');
                 dots[index].classList.remove('bg-[#FFBA08]/50');
                 dots[index].classList.add('bg-[#FFBA08]', 'scale-125');
             }
 
             function nextSlide() {
                 currentSlide = (currentSlide + 1) % slides.length;
                 showSlide(currentSlide);
             }
 
             // Add click events to dots
             dots.forEach((dot, index) => {
                 dot.addEventListener('click', () => {
                     currentSlide = index;
                     showSlide(currentSlide);
                 });
             });
 
             // Change slide every 5 seconds
             setInterval(nextSlide, 5000);
         });
         document.addEventListener('DOMContentLoaded', function() {
             const dateInput = document.getElementById('bookingDate');
             const timeInput = document.getElementById('bookingTime');
             const dateError = document.getElementById('dateError');
             const timeError = document.getElementById('timeError');
             const form = document.querySelector('form');
 
             if (dateInput && timeInput) {
                 // Set minimum date to today
                 const today = new Date();
                 const tomorrow = new Date(today);
                 tomorrow.setDate(tomorrow.getDate() + 1);
                 const formattedTomorrow = tomorrow.toISOString().split('T')[0];
                 dateInput.min = formattedTomorrow;
 
                 // Example of booked slots (in reality, this would come from your backend)
                 const bookedSlots = [
                     { date: '2025-02-01', time: '10:00' },
                     { date: '2025-02-01', time: '14:00' },
                 ];
 
                 // Validate date selection
                 dateInput.addEventListener('change', function() {
                     const selectedDate = new Date(this.value);
                     const today = new Date();
                     
                     if (selectedDate < today) {
                         dateError.textContent = 'Please select a future date';
                         dateError.classList.remove('hidden');
                         this.value = '';
                     } else {
                         dateError.classList.add('hidden');
                     }
                 });
 
                 // Validate time selection
                 timeInput.addEventListener('change', function() {
                     const selectedTime = this.value;
                     const [hours, minutes] = selectedTime.split(':');
                     
                     // Check if time is within business hours (8 AM - 5 PM)
                     if (hours < 8 || hours >= 17) {
                         timeError.textContent = 'Please select a time between 8:00 AM and 5:00 PM';
                         timeError.classList.remove('hidden');
                         this.value = '';
                         return;
                     }
 
                     // Check if slot is already booked
                     const selectedDate = dateInput.value;
                     const isBooked = bookedSlots.some(slot => 
                         slot.date === selectedDate && slot.time === selectedTime
                     );
 
                     if (isBooked) {
                         timeError.textContent = 'This time slot is already booked. Please select another time.';
                         timeError.classList.remove('hidden');
                         this.value = '';
                     } else {
                         timeError.classList.add('hidden');
                     }
                 });
 
                 // Form submission validation
                 form.addEventListener('submit', function(e) {
                     const selectedDate = new Date(dateInput.value);
                     const selectedTime = timeInput.value;
                     const today = new Date();
                     let hasError = false;
 
                     // Validate date
                     if (selectedDate < today) {
                         dateError.textContent = 'Please select a future date';
                         dateError.classList.remove('hidden');
                         hasError = true;
                     }
 
                     // Validate time
                     const [hours, minutes] = selectedTime.split(':');
                     if (hours < 8 || hours >= 17) {
                         timeError.textContent = 'Please select a time between 8:00 AM and 5:00 PM';
                         timeError.classList.remove('hidden');
                         hasError = true;
                     }
 
                     // Check if slot is booked
                     const isBooked = bookedSlots.some(slot => 
                         slot.date === dateInput.value && slot.time === selectedTime
                     );
 
                     if (isBooked) {
                         timeError.textContent = 'This time slot is already booked. Please select another time.';
                         timeError.classList.remove('hidden');
                         hasError = true;
                     }
 
                     if (hasError) {
                         e.preventDefault();
                     }
                 });
             }
         });
