import { savePosition } from '@/utils';
import { router } from '@inertiajs/react';
import { useState } from 'react';
import HallPlaces from './HallPlaces';
import Modal from '../Modal';

export default function HallConfig({ hallId, halls, places }) {
    const [prev_hallId, setHallId] = useState(hallId);
    const [showChangesModal, setShowChangesModal] = useState(false);
    //const [placesChanged, setPlacesChanged] = useState(false);
    let placesChanged = false;

    let hallData = halls.find(function (hall) {
        return hall.id === parseInt(hallId);
    });

    if (!hallData) {
        return '';
    }

    const [values, setValues] = useState({
        number_of_rows: hallData.number_of_rows,
        chairs_in_row: hallData.chairs_in_row,
    });

    let places_arr = [];

    const hallPlaces = places.filter(
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
                    let place = null;
                    if (hallPlaces.length > 0) {
                        place = hallPlaces.find(function (val) {
                            return val.row === ri && val.chair === ci;
                        });
                    }

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

    places_arr = getPlacesArray();

    function showChangesDialog() {
        setShowChangesModal(true);
        //ev.preventDefault();
    }

    function handleChange(e) {
        if (placesChanged) {
            showChangesDialog();
        }
        else {
            const key = e.target.id;
            const value = e.target.value;
            setValues((values) => ({
                ...values,
                [key]: value,
            }));
            places_arr = getPlacesArray();
        }

        /*
        const key = e.target.id;
        const value = e.target.value;
        setValues((values) => ({
            ...values,
            [key]: value,
        }));
        places_arr = getPlacesArray();
        */

        e.preventDefault();
    }

    if (hallId !== prev_hallId) {
        setHallId(hallId);
        setValues({
            number_of_rows: hallData.number_of_rows,
            chairs_in_row: hallData.chairs_in_row,
        });
        places_arr = getPlacesArray();
    }

    function placeClickHandler(ev) {
        console.log(places_arr);
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
        //console.log(places_arr);
        //setPlacesChanged(true);
        placesChanged = true;
        ev.preventDefault();
    }

    function handleSubmit(e) {
        const h = [{ id: hallId, ...values }];
        const pl = [];
        console.log(places_arr);
        for (let r = 0; r < places_arr.length; r++) {
            const row = places_arr[r];
            for (let c = 0; c < row.length; c++) {
                pl.push(row[c]);
            }
        }
        //setPlacesChanged(false);
        placesChanged = false;
        savePosition();
        router.post(
            route('admin.storeHallConf', [{ hallData: h, places: pl }]),
        );

        e.preventDefault();
    }

    function handleReset(e) {
        e.preventDefault();
        savePosition();
        router.visit(route('admin.index'), { preserveScroll: true });
    }

    function onCloseChangesModal(ev) {
        setShowChangesModal(false);
        ev.preventDefault();
    }

    return (
        <>
            <form
                className="config-hall-form"
                onSubmit={handleSubmit}
                onReset={handleReset}
            >
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
                    <button
                        type="reset"
                        className="conf-step__button conf-step__button-regular"
                    >
                        Отмена
                    </button>
                    <input
                        type="submit"
                        value="Сохранить"
                        className="conf-step__button conf-step__button-accent"
                    ></input>
                </fieldset>
            </form>
            <Modal show={showChangesModal}>
                <div className="dialog-window">
                    <div className="dialog-header">Предупреждение</div>
                    <div className="dialog-content">
                        <div className="dialog-text">
                            <p>Текущая схема кресел зала "{hallData.name} была изменена</p>
                            <p>
                                Сохраните или отмените изменения.
                            </p>
                        </div>
                    </div>
                    <div className="dialog-footer">
                        <button
                            className="conf-step__button conf-step__button-accent"
                            type="button"
                            onClick={onCloseChangesModal}
                        >
                            Ок
                        </button>
                    </div>
                </div>
            </Modal>

        </>
    );
}
