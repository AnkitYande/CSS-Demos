document.addEventListener("scroll", () => {
    b = document.body
    percent =  (window.scrollY) / (b.scrollHeight - window.innerHeight)
    text = document.getElementById("text")
    numWords = text.children.length
    for(i=0; i< numWords; i++){
        element = text.children[i]
        element.style.opacity =  i < Math.ceil(percent*numWords) ? 1 : 0.25
    }
    // console.log(percent)
});
