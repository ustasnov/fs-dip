export function restorePosition() {
    const scrolly = localStorage.getItem('scrolly');
    if (scrolly) {
        window.scrollTo(0, scrolly);
        console.log(`Восстановили позицию по Y: ${scrolly}`);
        localStorage.removeItem('scrolly');
    }
}

export function savePosition() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    localStorage.setItem('scrolly', scrollTop);
}
