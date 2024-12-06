export default function HallPlace({ row, col, status, handler }) {
    function getClass(st) {
        return `conf-step__chair conf-step__chair_${st}`;
    }

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
