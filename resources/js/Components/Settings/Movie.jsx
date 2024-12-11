export default function Movie({ name, duration, poster }) {

    const posterUrl = `/storage/${poster}`;
    return (
        <div className="conf-step__movie">
            <img
                className="conf-step__movie-poster"
                alt="poster"
                src={posterUrl}
            ></img>
            <h3 className="conf-step__movie-title">
                {name}
            </h3>
            <p className="conf-step__movie-duration">
                {duration} минут
            </p>
        </div>
    );
}
