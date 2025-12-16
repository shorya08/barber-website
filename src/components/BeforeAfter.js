export function initBeforeAfter() {
    const containers = document.querySelectorAll('.before-after-container');

    containers.forEach(container => {
        const slider = container.querySelector('.slider-handle');
        const beforeImage = container.querySelector('.before-image');

        const slide = (x) => {
            const containerRect = container.getBoundingClientRect();
            let position = ((x - containerRect.left) / containerRect.width) * 100;

            // Clamp execution
            if (position < 0) position = 0;
            if (position > 100) position = 100;

            beforeImage.style.width = `${position}%`;
            slider.style.left = `${position}%`;
        };

        // Mouse events
        let isDragging = false;

        slider.addEventListener('mousedown', () => isDragging = true);
        document.addEventListener('mouseup', () => isDragging = false);
        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            slide(e.clientX);
        });

        // Touch events for mobile
        slider.addEventListener('touchstart', () => isDragging = true);
        document.addEventListener('touchend', () => isDragging = false);
        document.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            slide(e.touches[0].clientX);
        });

        // Click on container to jump
        container.addEventListener('click', (e) => {
            slide(e.clientX);
        });
    });
}
