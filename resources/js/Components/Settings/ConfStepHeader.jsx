import { useState } from 'react';

export default function ConfStepHeader(props) {
    const { h_id, title, open } = props;
    const [opened, setOpened] = new useState(open === "1");

    function onClickHandler(ev) {
        const op = !opened;
        let opened_arr = ["1", "1", "1", "1", "1"];
        let opened_arr_str = localStorage.getItem('s_opened');
        if (opened_arr_str) {
            opened_arr = JSON.parse(opened_arr_str);
        }
        opened_arr[parseInt(h_id)] = op ? "1" : "0";
        localStorage.setItem('s_opened', JSON.stringify(opened_arr));
        setOpened(op);
        ev.preventDefault();
    }

    return (
        <header
            className={`conf-step__header ${opened ? 'conf-step__header_opened' : 'conf-step__header_closed'}`}
            onClick={onClickHandler}
        >
            <h2 className="conf-step__title">{title}</h2>
        </header>
    );
}
