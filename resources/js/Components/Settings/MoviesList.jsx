import Movie from './Movie';

export default function MoviesList(props) {
    const { data } = props;

    return (
        <>
            {data && (
                <div className="conf-step__movies">
                    {data.map((val) => (
                        <Movie key={val} film={val}></Movie>
                    ))}
                </div>
            )}
        </>
    );
}
