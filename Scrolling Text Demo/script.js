cursor = document.getElementById("selectedImg")
document.addEventListener("mousemove", (e) => {
    if (e != null && e.target != null) {
        var x = e.clientX;
        var y = e.clientY;
        if (e.target.tagName == "H1") {
            cursor.src = e.target.parentElement.children[1].src
            cursor.style.opacity = "100%"
        }
        console.log(cursor)
        cursor.style.left = `${x}px`;
        cursor.style.top = `${y}px`;
    }
})