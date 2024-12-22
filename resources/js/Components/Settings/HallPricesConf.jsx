import { savePosition } from '@/utils';
import { router } from '@inertiajs/react';
import { useState } from 'react';
import Modal from '../Modal';
import HallsSelector from './HallsSelector';

export default function HallPricesConfig({ halls }) {
    const [showChangesModal, setShowChangesModal] = useState(false);
    const [values, setValues] = useState(() => {
        const s_hall_id = localStorage.getItem('s1_checkedId');
        const hall_id = s_hall_id ? parseInt(s_hall_id) : halls[0].id;
        const hall = halls.find((el) => el.id === hall_id);
        return {
            id: hall.id,
            name: hall.name,
            price: hall.price,
            vip_price: hall.vip_price,
        };
    });

    let pricesChanged = '0';
    const pricesCh = localStorage.getItem('prices_change');
    pricesChanged = pricesCh ? pricesCh : pricesChanged;

    // изменяем текущий зал
    function onCheckHandler1(ev) {
        if (pricesChanged === '1') {
            ev.preventDefault();
            showChangesDialog();
        } else {
            if (ev.target.checked) {
                localStorage.setItem('s1_checkedId', ev.target.dataset.id);
                const hall = halls.find(
                    (el) => el.id === parseInt(ev.target.dataset.id),
                );
                setValues({
                    ...values,
                    id: hall.id,
                    name: hall.name,
                    price: hall.price,
                    vip_price: hall.vip_price,
                });
            }
        }
    }

    // показываем окно сообщения об изменении цен
    function showChangesDialog() {
        setShowChangesModal(true);
    }

    // закрываем окно сообщения об изменении цен
    function onCloseChangesModal(ev) {
        setShowChangesModal(false);
        ev.preventDefault();
    }

    // изменяем цены
    function handleChange(e) {
        const key = e.target.id;
        const value = e.target.value;
        setValues((values) => ({
            ...values,
            [key]: value,
        }));
        pricesChanged = '1';
        localStorage.setItem('prices_change', pricesChanged);
    }

    // записываем цены
    function handleSubmit(e) {
        savePosition();
        router.post(
            route('admin.update', {
                id: values.id,
                price: values.price,
                vip_price: values.vip_price,
                _method: 'PUT',
            }),
        );

        pricesChanged = '0';
        localStorage.setItem('prices_change', pricesChanged);
        e.preventDefault();
    }

    // отменяем изменение цен
    function handleReset(e) {
        e.preventDefault();
        pricesChanged = '0';
        localStorage.setItem('prices_change', pricesChanged);
        savePosition();
        router.visit(route('admin.index'), { preserveScroll: true });
    }

    return (
        <>
            <HallsSelector
                sectionIndex="1"
                activeId={values.id}
                data={halls}
                onCheckHandler={onCheckHandler1}
            ></HallsSelector>
            <form
                className="prices-hall-form"
                onSubmit={handleSubmit}
                onReset={handleReset}
            >
                <p className="conf-step__paragraph">
                    Установите цены для типов кресел:
                </p>
                <div className="conf-step__legend">
                    <label className="conf-step__label">
                        Цена, рублей
                        <input
                            id="price"
                            name="price"
                            type="number"
                            className="conf-step__input"
                            value={values.price}
                            placeholder="цена"
                            onChange={handleChange}
                        ></input>
                    </label>
                    за{' '}
                    <span className="conf-step__chair conf-step__chair_standart"></span>{' '}
                    обычные кресла
                </div>
                <div className="conf-step__legend">
                    <label className="conf-step__label">
                        Цена, рублей
                        <input
                            id="vip_price"
                            name="vip_price"
                            type="number"
                            className="conf-step__input"
                            value={values.vip_price}
                            placeholder="vip цена"
                            onChange={handleChange}
                        ></input>
                    </label>
                    за{' '}
                    <span className="conf-step__chair conf-step__chair_vip"></span>{' '}
                    VIP кресла
                </div>

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
                                Текущие цены мест зала "{values.name} были
                                изменены
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
