import { savePosition } from '@/utils';
import { router } from '@inertiajs/react';
import { useState } from 'react';
import Modal from '../Modal';
import HallPlaces from './HallPlaces';
import HallsSelector from './HallsSelector';

export default function HallConfig({ halls, places }) {
    const [showChangesModal, setShowChangesModal] = useState(false);
    const [values, setValues] = useState(() => {
        const s_hall_id = localStorage.getItem('s0_checkedId');
        const hall_id = s_hall_id ? parseInt(s_hall_id) : halls[0].id;
        const hall = halls.find((el) => el.id === hall_id);
        return {
            id: hall.id,
            name: hall.name,
            number_of_rows: hall.number_of_rows,
            chairs_in_row: hall.chairs_in_row,
            places_arr: getPlacesArray(
                hall.id,
                hall.number_of_rows,
                hall.chairs_in_row,
            ),
        };
    });

    let placesChanged = '0';
    const placesCh = localStorage.getItem('places_change');
    placesChanged = placesCh ? placesCh : placesChanged;

    // получаем структуру расположения мест
    function getPlacesArray(hall_id, number_of_rows, chairs_in_row) {
        const hallPlaces = places.filter((place) => place.hall_id === hall_id);
        const pl_arr = [];
        if (number_of_rows > 0 && chairs_in_row > 0) {
            for (let r = 0; r < number_of_rows; r++) {
                pl_arr.push([]);
                for (let c = 0; c < chairs_in_row; c++) {
                    const ri = r + 1;
                    const ci = c + 1;
                    let place = null;
                    if (hallPlaces.length > 0) {
                        place = hallPlaces.find(function (val) {
                            return val.row === ri && val.chair === ci;
                        });
                    }

                    pl_arr[r].push({
                        hall_id: hall_id,
                        row: ri,
                        chair: ci,
                        status: place ? place.status : 'disabled',
                    });
                }
            }
        }
        return pl_arr;
    }

    // изменяем текущий зал
    function onCheckHandler0(ev) {
        if (placesChanged === '1') {
            ev.preventDefault();
            showChangesDialog();
        } else {
            if (ev.target.checked) {
                localStorage.setItem('s0_checkedId', ev.target.dataset.id);
                const hall = halls.find(
                    (el) => el.id === parseInt(ev.target.dataset.id),
                );
                setValues({
                    ...values,
                    id: hall.id,
                    name: hall.name,
                    number_of_rows: hall.number_of_rows,
                    chairs_in_row: hall.chairs_in_row,
                    places_arr: getPlacesArray(
                        hall.id,
                        hall.number_of_rows,
                        hall.chairs_in_row,
                    ),
                });
            }
        }
    }

    // показываем окно сообщения об изменении мест
    function showChangesDialog() {
        setShowChangesModal(true);
    }

    // закрываем окно сообщения об изменении мест
    function onCloseChangesModal(ev) {
        setShowChangesModal(false);
        ev.preventDefault();
    }

    // изменяем количество рядов или количество кресел в ряду
    function handleChange(e) {
        const key = e.target.id;
        const value = e.target.value;
        setValues((values) => ({
            ...values,
            [key]: value,
            places_arr: getPlacesArray(
                values.id,
                e.target.id === 'number_of_rows'
                    ? e.target.value
                    : values.number_of_rows,
                e.target.id === 'chairs_in_row'
                    ? e.target.value
                    : values.chairs_in_row,
            ),
        }));
        placesChanged = '1';
        localStorage.setItem('places_change', placesChanged);
    }

    // изменяем статус места
    function placeClickHandler(ev) {
        const pl_arr = Array.from(values.places_arr);
        if (ev.target.classList.contains('conf-step__chair_disabled')) {
            ev.target.classList.remove('conf-step__chair_disabled');
            ev.target.classList.add('conf-step__chair_standart');
            pl_arr[parseInt(ev.target.dataset.row)][
                parseInt(ev.target.dataset.col)
            ].status = 'standart';
        } else if (ev.target.classList.contains('conf-step__chair_standart')) {
            ev.target.classList.remove('conf-step__chair_standart');
            ev.target.classList.add('conf-step__chair_vip');
            pl_arr[parseInt(ev.target.dataset.row)][
                parseInt(ev.target.dataset.col)
            ].status = 'vip';
        } else {
            ev.target.classList.remove('conf-step__chair_vip');
            ev.target.classList.add('conf-step__chair_disabled');
            pl_arr[parseInt(ev.target.dataset.row)][
                parseInt(ev.target.dataset.col)
            ].status = 'disabled';
        }
        setValues((values) => ({
            ...values,
            places_arr: pl_arr,
        }));
        placesChanged = '1';
        localStorage.setItem('places_change', placesChanged);
        ev.preventDefault();
    }

    // сохраняем изменения в местах зала
    function handleSubmit(e) {
        console.log(values.places_arr);
        const pl = [];
        for (let r = 0; r < values.places_arr.length; r++) {
            const row = values.places_arr[r];
            for (let c = 0; c < row.length; c++) {
                pl.push(row[c]);
            }
        }
        savePosition();
        if (values.number_of_rows > 0 && values.chairs_in_row > 0) {
            router.post(
                route('admin.storeHallConf', [
                    {
                        hallData: {
                            id: values.id,
                            number_of_rows: values.number_of_rows,
                            chairs_in_row: values.chairs_in_row,
                        },
                        places: pl,
                    },
                ]),
            );
            placesChanged = '0';
            localStorage.setItem('places_change', placesChanged);
        }

        e.preventDefault();
    }

    // отменяем изменения в местах зала
    function handleReset(e) {
        e.preventDefault();
        placesChanged = '0';
        localStorage.setItem('places_change', placesChanged);
        savePosition();
        router.visit(route('admin.index'), { preserveScroll: true });
    }

    return (
        <>
            <HallsSelector
                sectionIndex="0"
                activeId={values.id}
                data={halls}
                onCheckHandler={onCheckHandler0}
            ></HallsSelector>
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
                            places={values.places_arr}
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
                            <p>
                                Текущая схема кресел зала "{values.name} была
                                изменена
                            </p>
                            <p>Сохраните или отмените изменения.</p>
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
