import MovieSeance from './MovieSeance';

export default function HallSeances(props) {
    const { hall, seances } = props;

    const hall_seances = seances.filter((el) => el.hall_id === hall.id);

    return (
        <div className="conf-step__seances-hall">
            <h3 className="conf-step__seances-title">{hall.name}</h3>
            {seances && (
                <div className="conf-step__seances-timeline">
                    {hall_seances.map((val) => (
                        <MovieSeance key={val} data={val}></MovieSeance>
                    ))}
                </div>
            )}
        </div>
    );
}
