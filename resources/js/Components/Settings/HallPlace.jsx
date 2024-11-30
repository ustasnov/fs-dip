export default function HallPlace({ row, col, status, handler }) {
    //const cl = `conf-step__chair conf-step__chair_${status}`;
    //const [prev_status, setStatus] = new useState(status);

    function getClass(st) {
        return `conf-step__chair conf-step__chair_${st}`;
    }

    //console.log(
    //    `In HallPlace: row: ${row}, col: ${col}, status: ${getClass(status)}`,
    //);

    return (
        <>
            <span
                className={getClass(status)}
                data-row={row}
                data-col={col}
                onClick={handler}
            ></span>
        </>
    );
}
