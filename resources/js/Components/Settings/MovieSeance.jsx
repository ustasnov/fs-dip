import { minutesToTimeStr } from '@/utils';

function getFilmColor(film_id) {
    const films = document.querySelector('.conf-step__movie');
    const filmEl = films.find((el) => el.dataset.id === film_id);
    let bg_color = rgb(133, 255, 211);
    if (filmEl) {
        bg_color = window
            .getComputedStyle(filmEl)
            .getPropertyValue('background-color');
    }
    return bg_color;
}

export default function MovieSeance(props) {
    const { data } = props;
    const width = Math.ceil(data.duration * 0.5);
    const start_offset = Math.ceil(data.start * 0.5);
    const color = getFilmColor(data.film_id);
    const timeStr = minutesToTimeStr(data.start);

    return (
        <div
            className="conf-step__seances-movie"
            style={{
                width: { width },
                backgroundColor: { color },
                left: { start_offset },
            }}
        >
            <p className="conf-step__seances-movie-title">{data.film_name}</p>
            <p className="conf-step__seances-movie-start">{timeStr}</p>
        </div>
    );
}
