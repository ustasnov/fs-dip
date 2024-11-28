export default function HallConfig(props) {
    const { hallId, halls, places } = props;

    //console.log(halls);
    //console.log(hallId);
    const hallData = halls.find(function (hall) {
        return hall.id === parseInt(hallId);
    });
    //console.log(hallData);
    const hallPlaces = Array.of(places).filter(
        (place) => place.hall_id === parseInt(hallId),
    );
    //console.log(hallPlaces);
    const places_arr = [];
    if (hallData.number_of_rows > 0 && hallData.chairs_in_row > 0) {
        for (let r = 0; r < hallData.number_of_rows; r++) {
            places_arr.push([]);
            for (let c = 0; c < hallData.chairs_in_row; c++) {
                places_arr[r].push({
                    hall_id: hallData.id,
                    row: r + 1,
                    chair: c + 1,
                    status: 'disabled',
                });
            }
        }
    }

    return (
        <>
            <p className="conf-step__paragraph">
                Укажите количество рядов и максимальное количество кресел в
                ряду:
            </p>
            <div className="conf-step__legend">
                <label className="conf-step__label">
                    Рядов, шт
                    <input
                        type="text"
                        className="conf-step__input"
                        value={hallData.number_of_rows}
                        placeholder="10"
                    ></input>
                </label>
                <span className="multiplier">x</span>
                <label className="conf-step__label">
                    Мест, шт
                    <input
                        type="text"
                        className="conf-step__input"
                        value={hallData.chairs_in_row}
                        placeholder="8"
                    ></input>
                </label>
            </div>
            <p className="conf-step__paragraph">
                Теперь вы можете указать типы кресел на схеме зала:
            </p>
            <div className="conf-step__legend">
                <span className="conf-step__chair conf-step__chair_standart"></span>{' '}
                — обычные кресла
                <span className="conf-step__chair conf-step__chair_vip"></span>{' '}
                — VIP кресла
                <span className="conf-step__chair conf-step__chair_disabled"></span>{' '}
                — заблокированные (нет кресла)
                <p className="conf-step__hint">
                    Чтобы изменить вид кресла, нажмите по нему левой кнопкой
                    мыши
                </p>
            </div>
            {hallData.number_of_rows > 0 && hallData.chairs_in_row > 0 && (
                <div className="conf-step__hall">
                    <div className="conf-step__hall-wrapper">
                        <div className="conf-step__row">
                            <span className="conf-step__chair conf-step__chair_disabled"></span>
                            <span className="conf-step__chair conf-step__chair_disabled"></span>
                            <span className="conf-step__chair conf-step__chair_disabled"></span>
                            <span className="conf-step__chair conf-step__chair_standart"></span>
                            <span className="conf-step__chair conf-step__chair_standart"></span>
                            <span className="conf-step__chair conf-step__chair_disabled"></span>
                            <span className="conf-step__chair conf-step__chair_disabled"></span>
                            <span className="conf-step__chair conf-step__chair_disabled"></span>
                        </div>

                        <div className="conf-step__row">
                            <span className="conf-step__chair conf-step__chair_disabled"></span>
                            <span className="conf-step__chair conf-step__chair_disabled"></span>
                            <span className="conf-step__chair conf-step__chair_standart"></span>
                            <span className="conf-step__chair conf-step__chair_standart"></span>
                            <span className="conf-step__chair conf-step__chair_standart"></span>
                            <span className="conf-step__chair conf-step__chair_standart"></span>
                            <span className="conf-step__chair conf-step__chair_disabled"></span>
                            <span className="conf-step__chair conf-step__chair_disabled"></span>
                        </div>

                        <div className="conf-step__row">
                            <span className="conf-step__chair conf-step__chair_disabled"></span>
                            <span className="conf-step__chair conf-step__chair_standart"></span>
                            <span className="conf-step__chair conf-step__chair_standart"></span>
                            <span className="conf-step__chair conf-step__chair_standart"></span>
                            <span className="conf-step__chair conf-step__chair_standart"></span>
                            <span className="conf-step__chair conf-step__chair_standart"></span>
                            <span className="conf-step__chair conf-step__chair_standart"></span>
                            <span className="conf-step__chair conf-step__chair_disabled"></span>
                        </div>

                        <div className="conf-step__row">
                            <span className="conf-step__chair conf-step__chair_standart"></span>
                            <span className="conf-step__chair conf-step__chair_standart"></span>
                            <span className="conf-step__chair conf-step__chair_standart"></span>
                            <span className="conf-step__chair conf-step__chair_vip"></span>
                            <span className="conf-step__chair conf-step__chair_vip"></span>
                            <span className="conf-step__chair conf-step__chair_standart"></span>
                            <span className="conf-step__chair conf-step__chair_standart"></span>
                            <span className="conf-step__chair conf-step__chair_disabled"></span>
                        </div>

                        <div className="conf-step__row">
                            <span className="conf-step__chair conf-step__chair_standart"></span>
                            <span className="conf-step__chair conf-step__chair_standart"></span>
                            <span className="conf-step__chair conf-step__chair_vip"></span>
                            <span className="conf-step__chair conf-step__chair_vip"></span>
                            <span className="conf-step__chair conf-step__chair_vip"></span>
                            <span className="conf-step__chair conf-step__chair_vip"></span>
                            <span className="conf-step__chair conf-step__chair_standart"></span>
                            <span className="conf-step__chair conf-step__chair_disabled"></span>
                        </div>

                        <div className="conf-step__row">
                            <span className="conf-step__chair conf-step__chair_standart"></span>
                            <span className="conf-step__chair conf-step__chair_standart"></span>
                            <span className="conf-step__chair conf-step__chair_vip"></span>
                            <span className="conf-step__chair conf-step__chair_vip"></span>
                            <span className="conf-step__chair conf-step__chair_vip"></span>
                            <span className="conf-step__chair conf-step__chair_vip"></span>
                            <span className="conf-step__chair conf-step__chair_standart"></span>
                            <span className="conf-step__chair conf-step__chair_disabled"></span>
                        </div>

                        <div className="conf-step__row">
                            <span className="conf-step__chair conf-step__chair_standart"></span>
                            <span className="conf-step__chair conf-step__chair_standart"></span>
                            <span className="conf-step__chair conf-step__chair_vip"></span>
                            <span className="conf-step__chair conf-step__chair_vip"></span>
                            <span className="conf-step__chair conf-step__chair_vip"></span>
                            <span className="conf-step__chair conf-step__chair_vip"></span>
                            <span className="conf-step__chair conf-step__chair_standart"></span>
                            <span className="conf-step__chair conf-step__chair_disabled"></span>
                        </div>

                        <div className="conf-step__row">
                            <span className="conf-step__chair conf-step__chair_standart"></span>
                            <span className="conf-step__chair conf-step__chair_standart"></span>
                            <span className="conf-step__chair conf-step__chair_standart"></span>
                            <span className="conf-step__chair conf-step__chair_standart"></span>
                            <span className="conf-step__chair conf-step__chair_standart"></span>
                            <span className="conf-step__chair conf-step__chair_standart"></span>
                            <span className="conf-step__chair conf-step__chair_standart"></span>
                            <span className="conf-step__chair conf-step__chair_disabled"></span>
                        </div>

                        <div className="conf-step__row">
                            <span className="conf-step__chair conf-step__chair_standart"></span>
                            <span className="conf-step__chair conf-step__chair_standart"></span>
                            <span className="conf-step__chair conf-step__chair_standart"></span>
                            <span className="conf-step__chair conf-step__chair_standart"></span>
                            <span className="conf-step__chair conf-step__chair_standart"></span>
                            <span className="conf-step__chair conf-step__chair_standart"></span>
                            <span className="conf-step__chair conf-step__chair_standart"></span>
                            <span className="conf-step__chair conf-step__chair_standart"></span>
                        </div>

                        <div className="conf-step__row">
                            <span className="conf-step__chair conf-step__chair_standart"></span>
                            <span className="conf-step__chair conf-step__chair_standart"></span>
                            <span className="conf-step__chair conf-step__chair_standart"></span>
                            <span className="conf-step__chair conf-step__chair_standart"></span>
                            <span className="conf-step__chair conf-step__chair_standart"></span>
                            <span className="conf-step__chair conf-step__chair_standart"></span>
                            <span className="conf-step__chair conf-step__chair_standart"></span>
                            <span className="conf-step__chair conf-step__chair_standart"></span>
                        </div>
                    </div>
                </div>
            )}

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
    );
}
