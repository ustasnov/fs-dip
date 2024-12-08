import { router } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import Modal from '../Modal';

export default function CreateHallButton() {
    const [show, setShow] = useState(false);
    const [values, setValues] = useState({ name: '' });

    function onShowModal(ev) {
        setShow(true);
        ev.preventDefault();
    }

    function onCloseModal(ev) {
        setShow(false);
        ev.preventDefault();
    }

    function handleChange(e) {
        const key = e.target.id;
        const value = e.target.value;
        setValues((values) => ({
            ...values,
            [key]: value,
        }));
    }

    function handleSubmit(e) {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        localStorage.setItem('scrolly', scrollTop);
        setShow(false);
        router.post(route('admin.store', values));
        e.preventDefault();
    }

    useEffect(() => {
        if (show) {
            setTimeout(() => {
                const formElement = document.querySelector('.create-hall-form');
                const inputField = formElement.querySelector('.dialog-input');
                if (inputField) {
                    inputField.focus();
                }
            }, 100);
        }
    }, [show]);

    return (
        <>
            <button
                className="conf-step__button conf-step__button-accent"
                onClick={onShowModal}
            >
                Создать зал
            </button>
            <Modal show={show}>
                <form className="create-hall-form" onSubmit={handleSubmit}>
                    <div className="dialog-window">
                        <div className="dialog-header">Новый кинозал</div>
                        <div className="dialog-content">
                            <div className="dialog-field">
                                <label htmlFor="name" className="dialog-label">
                                    Наименование:
                                </label>
                                <input
                                    className="dialog-input"
                                    id="name"
                                    name="name"
                                    value={values.name}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="dialog-footer">
                            <button
                                className="conf-step__button conf-step__button-regular"
                                type="button"
                                onClick={onCloseModal}
                            >
                                Отмена
                            </button>
                            <button
                                className="conf-step__button conf-step__button-accent"
                                type="submit"
                            >
                                Создать
                            </button>
                        </div>
                    </div>
                </form>
            </Modal>
        </>
    );
}
