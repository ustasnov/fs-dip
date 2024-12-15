import { minutesToTimeStr } from '@/utils';

export default function MovieSeance(props) {
    const { data } = props;
    const width = Math.ceil(data.duration * 0.5);
    const start_offset = Math.ceil(data.start * 0.5);
    const color = data.color;
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
