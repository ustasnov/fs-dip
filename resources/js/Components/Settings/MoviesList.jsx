import Movie from './Movie';

export default function MoviesList(props) {
    const { data } = props;

    return (
        <>
            {data && (
                <div className="conf-step__movies">
                    {data.map((val) => (
                        <Movie
                            name={val.name}
                            duration={val.duration}
                            poster={val.poster}
                        ></Movie>
                    ))
                    }
                </div>
            )}
        </>
    );
}
