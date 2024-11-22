import DeleteHallButton from './DeleteHallButton';

export default function HallsList(props) {
    const { data } = props;

    return (
        <div>
            {data && (
                <ul className="conf-step__list">
                    {data.map((val) => (
                        <li id={val.id} key={val.id}>
                            {val.name}
                            <DeleteHallButton
                                id={val.id}
                                name={val.name}
                            ></DeleteHallButton>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
