import { useEffect } from 'react';

export default function HallsSelector(props) {
    const { sectionIndex, activeId, data, onCheckHandler } = props;
    const inputName = `chairs-hall__${sectionIndex}`;
    const clName = `conf-step__radio conf-step__radio${sectionIndex}`;

    useEffect(() => {
        const inputElements = Array.from(
            document.querySelectorAll(`.conf-step__radio${sectionIndex}`),
        );
        const searchEl = inputElements.find((el) => el.id === activeId);
        if (searchEl) {
            searchEl.checked = true;
        }
    }, [sectionIndex, activeId]);

    return (
        <div>
            {data && (
                <ul className="conf-step__selectors-box">
                    {data.map((val) => (
                        <li id={val.id} key={val.id}>
                            <input
                                id={val.id}
                                type="radio"
                                className={clName}
                                name={inputName}
                                value={val.name}
                                onChange={onCheckHandler}
                            ></input>
                            <span className="conf-step__selector">
                                {val.name}
                            </span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
