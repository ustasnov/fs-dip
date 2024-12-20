import HallRow from './HallRow';

export default function HallPlaces(props) {
    const { places, handler } = props;

    return (
        <div className="conf-step__hall-wrapper">
            {places.map((row, index) => (
                <HallRow
                    key={index}
                    rowId={index}
                    hallRow={row}
                    handler={handler}
                ></HallRow>
            ))}
        </div>
    );
}
