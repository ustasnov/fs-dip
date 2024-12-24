import { minutesToTimeStr } from '@/utils';
import { useEffect } from 'react';

export default function MovieSeance({ data }) {
    const width = Math.ceil(data.duration * 0.5);
    const start_offset = Math.ceil(data.start * 0.5);
    const timeStr = minutesToTimeStr(data.start);

    function getFilmColor(film_id) {
        const films = document.querySelectorAll('.conf-step__movie');
        const filmEl = Array.from(films).find(
            (el) => parseInt(el.dataset.id) === film_id,
        );
        let bg_color = 'rgb(255, 255, 255)';
        if (filmEl) {
            bg_color = window
                .getComputedStyle(filmEl)
                .getPropertyValue('background-color');
        }
        return bg_color;
    }

    useEffect(() => {
        const seances = document.querySelectorAll('.conf-step__seances-movie');
        const seanceEl = Array.from(seances).find(
            (el) => parseInt(el.dataset.id) === data.id,
        );
        seanceEl.style.backgroundColor = getFilmColor(data.film_id);
    }, [data]);

    function closeAllOtherMenu(el) {
        const dropdowns = document.getElementsByClassName('dropdown-content');
        for (let i = 0; i < dropdowns.length; i++) {
            const openDropdown = dropdowns[i];
            if (openDropdown !== el) {
                if (openDropdown.classList.contains('show')) {
                    openDropdown.classList.remove('show');
                }
            }
        }
    }

    function closeMenu(ev) {
        const parentEl = ev.currentTarget.closest('.dropdown-content');
        if (parentEl) {
            if (parentEl.classList.contains('show')) {
                parentEl.classList.remove('show');
            }
        }
    }

    function clickHandler(ev) {
        const dropdownEl = ev.currentTarget.querySelector('.dropdown-content');
        if (dropdownEl) {
            closeAllOtherMenu(dropdownEl);
            dropdownEl.classList.toggle('show');
        }
        ev.stopPropagation();
    }

    function editHandler(ev) {
        closeMenu(ev);
        ev.preventDefault();
        ev.stopPropagation();
        //showUpdateModal();
    }

    function deleteHandler(ev) {
        closeMenu(ev);
        ev.preventDefault();
        ev.stopPropagation();
        //showDeleteModal();
    }

    return (
        <div
            className="conf-step__seances-movie"
            data-id={data.id}
            style={{ width: width, left: start_offset }}
            onClick={clickHandler}
        >
            <div className="dropdown">
                <p className="conf-step__seances-movie-title">
                    {data.film_name}
                </p>
                <p className="conf-step__seances-movie-start">{timeStr}</p>
                <div className="dropdown-content">
                    <a href="#" onClick={editHandler}>
                        Редактировать
                    </a>
                    <a href="#" onClick={deleteHandler}>
                        Удалить
                    </a>
                </div>
            </div>
        </div>
    );
}
