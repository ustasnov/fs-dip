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

export function minutesToTimeStr(minutes) {
    let hours = String(Math.floor(minutes / 60));
    if (hours.length === 1) {
        hours = '0' + hours;
    }
    let minut = String(minutes % 60);
    if (minut.length === 1) {
        minut = '0' + minut;
    }
    return hours + ':' + minut;
}
