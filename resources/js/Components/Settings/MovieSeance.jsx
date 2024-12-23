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

    return (
        <div
            className="conf-step__seances-movie"
            data-id={data.id}
            style={{ width: width, left: start_offset }}
        >
            <p className="conf-step__seances-movie-title">{data.film_name}</p>
            <p className="conf-step__seances-movie-start">{timeStr}</p>
        </div>
    );
}
