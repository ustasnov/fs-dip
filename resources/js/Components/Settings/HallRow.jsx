import HallPlace from './HallPlace';

export default function HallRow(props) {
    const { rowId, hallRow, handler } = props;

    return (
        <div className="conf-step__row">
            {hallRow.map((place, index) => (
                <HallPlace
                    key={place}
                    row={rowId}
                    col={index}
                    status={place.status}
                    handler={handler}
                ></HallPlace>
            ))}
        </div>
    );
}
