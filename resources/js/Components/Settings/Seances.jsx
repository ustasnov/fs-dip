import HallSeances from './HallSeances';

export default function Seances(props) {
    const { halls, seances } = props;

    return (
        <>
            {halls && (
                <>
                    <div className="conf-step__seances">
                        {halls.map((val, index) => (
                            <HallSeances
                                key={index}
                                hall={val}
                                seances={seances}
                            ></HallSeances>
                        ))}
                    </div>
                    <fieldset className="conf-step__buttons text-center">
                        <button className="conf-step__button conf-step__button-regular">
                            Отмена
                        </button>
                        <input
                            type="submit"
                            value="Сохранить"
                            className="conf-step__button conf-step__button-accent"
                        ></input>
                    </fieldset>
                </>
            )}
        </>
    );
}
