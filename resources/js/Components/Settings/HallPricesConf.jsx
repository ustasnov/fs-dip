import { savePosition } from '@/utils';
import { router } from '@inertiajs/react';
import { useState } from 'react';

export default function HallPricesConfig({ hallId, halls }) {
    const [prev_hallId, setHallId] = useState(hallId);
    const hallData = halls.find(function (hall) {
        return hall.id === parseInt(hallId);
    });

    if (!hallData) {
        return '';
    }

    const [values, setValues] = useState({
        price: hallData.price,
        vip_price: hallData.vip_price,
    });

    function handleChange(e) {
        const key = e.target.id;
        const value = e.target.value;
        setValues((values) => ({
            ...values,
            [key]: value,
        }));
    }

    if (hallId !== prev_hallId) {
        setHallId(hallId);
        setValues({
            price: hallData.price,
            vip_price: hallData.vip_price,
        });
    }

    function handleSubmit(e) {
        savePosition();
        router.put(route('admin.update', hallId), { ...values });
        e.preventDefault();
    }

    function handleReset(e) {
        e.preventDefault();
        savePosition();
        router.visit(route('admin.index'), { preserveScroll: true });
    }

    return (
        <>
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
        </>
    );
}
