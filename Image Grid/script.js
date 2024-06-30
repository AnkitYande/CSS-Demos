document.addEventListener('DOMContentLoaded', () => {

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

    document.addEventListener('mousemove', (e) => updateView(e));
    window.addEventListener('resize', (e) => updateView(e));


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

    function changeColor(coll, color) {

        for (var i = 0, len = coll.length; i < len; i++) {
            coll[i].style["background-color"] = color;
        }
    }

});
