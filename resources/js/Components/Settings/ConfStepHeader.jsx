import { useState } from 'react';

export default function ConfStepHeader(props) {
    const { title, open } = props;
    const [opened, setOpened] = new useState(open === 1);

    function onClickHandler(ev) {
        setOpened(!opened);
        ev.preventDafault();
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
