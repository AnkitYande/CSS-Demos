document.addEventListener('DOMContentLoaded', () => {

    ////////////////////////////////
    // move based on mouse position
    ////////////////////////////////

    function updateView(e) {
        const wrapper = document.getElementById('wrapper');

        // Calculate the maximum translation values
        const maxTranslateX = wrapper.clientWidth - window.innerWidth;
        const maxTranslateY = wrapper.clientHeight - window.innerHeight;

        // Calculate the translation values based on mouse position
        const translateX = (e.clientX / window.innerWidth) * maxTranslateX * 1.1;
        const translateY = (e.clientY / window.innerHeight) * maxTranslateY * 1.22; // Adjusted scaling factor

        // console.log(translateX, translateY);

        // Apply the translation
        wrapper.style.transform = `translate3d(${-translateX}px, ${-translateY}px, 0)`;
    }

    ////////////////////////////////
    // move based on touch screen
    ////////////////////////////////

    var sx = 0, sy = 0, cx = 0, cy = 0;

    function ts(event) {
        event.preventDefault();
        const e = event.changedTouches[0];
        sx = e.pageX - cx;
        sy = e.pageY - cy;
    }

    function tm(event) {
        const e = event.changedTouches[0];
        const wrapper = document.getElementById('wrapper');
        cx = e.pageX - sx;
        cy = e.pageY - sy;
        wrapper.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
    }

    function te(event) {
        const wrapper = document.getElementById('wrapper');
        const wrapperRect = wrapper.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        let shouldBounce = false;

        cx = -cx;
        cy = -cy;

        if (cx < 0) { cx = 0; shouldBounce = true; }
        if (cx > wrapperRect.width - viewportWidth) { cx = wrapperRect.width - viewportWidth; shouldBounce = true; }
        if (cy < 0) { cy = 0; shouldBounce = true; }
        if (cy > wrapperRect.height - viewportHeight) { cy = wrapperRect.height - viewportHeight; shouldBounce = true; }

        cx = -cx;
        cy = -cy;

        if (shouldBounce) {
            wrapper.style.transition = 'transform 0.2s ease-out';
            wrapper.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
        } else {
            const e = event.changedTouches[0];
            cx = e.pageX - sx;
            cy = e.pageY - sy;
        }
    }

    ////////////////////////////////
    // Decide navigation on platform
    ////////////////////////////////

    if ("maxTouchPoints" in navigator && navigator.maxTouchPoints > 0) {
        document.getElementById("wrapper").scale = '2';
        document.addEventListener('touchstart', ts, { passive: false });
        document.addEventListener('touchmove', tm, false);
        document.addEventListener('touchend', te, false);
    } else {
        console.log("here")
        window.addEventListener('mousemove', updateView, false);
        window.addEventListener('resize', updateView, false);
    }


    ////////////////////////////////
    // Hover effects for web
    ////////////////////////////////

    Array.from(document.getElementsByClassName('image-container')).forEach((element) => {
        element.addEventListener('mouseover', () => {
            console.log("mouseover");
            document.getElementById("footer").style.opacity = '1';
            document.getElementById("footer").style.bottom = '0px';
            document.getElementById("overlay").style.opacity = '1';
            document.getElementById("overlay").style.zIndex = '5';
            document.getElementById("selection").style.gridArea = window.getComputedStyle(element).gridArea
            document.getElementById("selection").style.transform = 'scale(1.2)'
            document.getElementById("selection").style.zIndex = '8'
            element.style.zIndex = '10';
        });
        element.addEventListener('mouseout', () => {
            console.log("mouseout");
            document.getElementById("footer").style.opacity = '0';
            document.getElementById("footer").style.bottom = '-200px';
            document.getElementById("overlay").style.opacity = '0';
            document.getElementById("overlay").style.zIndex = '1';
            document.getElementById("selection").style.transform = 'scale(1.1)'
            document.getElementById("selection").style.zIndex = '1'
            element.style.zIndex = '3';
        });
    });

});
