import { router } from '@inertiajs/react';
import { useState } from 'react';
import HallPlaces from './HallPlaces';

export default function HallConfig({ hallId, halls, places }) {
    const [prev_hallId, setHallId] = new useState(hallId);
    let hallData = halls.find(function (hall) {
        return hall.id === parseInt(hallId);
    });

    const [values, setValues] = new useState({
        number_of_rows: hallData.number_of_rows,
        chairs_in_row: hallData.chairs_in_row,
    });

    let places_arr = [];

    const hallPlaces = Array.of(places).filter(
        (place) => place.hall_id === parseInt(hallId),
    );

    function getPlacesArray() {
        const pl_arr = [];
        if (values.number_of_rows > 0 && values.chairs_in_row > 0) {
            for (let r = 0; r < values.number_of_rows; r++) {
                pl_arr.push([]);
                for (let c = 0; c < values.chairs_in_row; c++) {
                    const ri = r + 1;
                    const ci = c + 1;
                    const place = hallPlaces.find(function (val) {
                        return val.row === ri && val.chair === ci;
                    });
                    pl_arr[r].push({
                        hall_id: hallData.id,
                        row: ri,
                        chair: ci,
                        status: place ? place.status : 'disabled',
                    });
                }
            }
        }
        return pl_arr;
    }

    /*
    function clearPlacesStatus() {
        /*
        const containerEl = document.querySelector('.conf-step__hall');
        if (containerEl) {
            const placeElements =
                containerEl.querySelector('.conf-step__chair');
            if (placeElements) {
                Array.of(placeElements).forEach((el) => {
                    if (el.classList.contains('conf-step__chair_standart')) {
                        el.classList.remove('conf-step__chair_standart');
                        el.classList.add('conf-step__chair_disabled');
                    } else if (el.classList.contains('conf-step__chair_vip')) {
                        el.classList.remove('conf-step__chair_vip');
                        el.classList.add('conf-step__chair_disabled');
                    }
                });
            }
        }
        const containerEl = document.querySelector('.conf-step__hall');
        if (containerEl) {
            //containerEl.innerHTML = '';
            while (containerEl.firstChild) {
                containerEl.removeChild(containerEl.firstChild);
            }
        }
    }
    */

    places_arr = getPlacesArray();

    function handleChange(e) {
        const key = e.target.id;
        const value = e.target.value;
        setValues((values) => ({
            ...values,
            [key]: value,
        }));
        places_arr = getPlacesArray();
    }

    if (hallId !== prev_hallId) {
        setHallId(hallId);
        //clearPlacesStatus();
        setValues({
            number_of_rows: hallData.number_of_rows,
            chairs_in_row: hallData.chairs_in_row,
        });
        places_arr = getPlacesArray();
    }

    function placeClickHandler(ev) {
        if (ev.target.classList.contains('conf-step__chair_disabled')) {
            ev.target.classList.remove('conf-step__chair_disabled');
            ev.target.classList.add('conf-step__chair_standart');
            places_arr[parseInt(ev.target.dataset.row)][
                parseInt(ev.target.dataset.col)
            ].status = 'standart';
        } else if (ev.target.classList.contains('conf-step__chair_standart')) {
            ev.target.classList.remove('conf-step__chair_standart');
            ev.target.classList.add('conf-step__chair_vip');
            places_arr[parseInt(ev.target.dataset.row)][
                parseInt(ev.target.dataset.col)
            ].status = 'vip';
        } else {
            ev.target.classList.remove('conf-step__chair_vip');
            ev.target.classList.add('conf-step__chair_disabled');
            places_arr[parseInt(ev.target.dataset.row)][
                parseInt(ev.target.dataset.col)
            ].status = 'disabled';
        }
        ev.preventDefault();
    }

    function handleSubmit(e) {
        router.post(
            route(
                'admin.storeHallConf',
                [{ hallId: hallId, values: values, places: places_arr }],
                {
                    preserveScroll: true,
                },
            ),
        );
        e.preventDefault();
    }

    return (
        <>
            <form className="config-hall-form" onSubmit={handleSubmit}>
                <p className="conf-step__paragraph">
                    Укажите количество рядов и максимальное количество кресел в
                    ряду:
                </p>
                <div className="conf-step__legend">
                    <label className="conf-step__label">
                        Рядов, шт
                        <input
                            id="number_of_rows"
                            name="number_of_rows"
                            type="text"
                            className="conf-step__input"
                            value={values.number_of_rows}
                            placeholder="рядов"
                            onChange={handleChange}
                        ></input>
                    </label>
                    <span className="multiplier">x</span>
                    <label className="conf-step__label">
                        Мест, шт
                        <input
                            id="chairs_in_row"
                            name="chairs_in_row"
                            type="text"
                            className="conf-step__input"
                            value={values.chairs_in_row}
                            placeholder="мест"
                            onChange={handleChange}
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
                {values.number_of_rows > 0 && values.chairs_in_row > 0 && (
                    <div className="conf-step__hall">
                        <HallPlaces
                            places={places_arr}
                            handler={placeClickHandler}
                        ></HallPlaces>
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
            </form>
        </>
    );
}
