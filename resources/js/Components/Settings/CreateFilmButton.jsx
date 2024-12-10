import { savePosition } from '@/utils';
import { router } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import Modal from '../Modal';

export default function CreateFilmButton() {
    const [show, setShow] = useState(false);
    const [values, setValues] = useState({ name: '', description: '' });

    function onShowModal(ev) {
        setShow(true);
        ev.preventDefault();
    }

    function onCloseModal(ev) {
        setShow(false);
        ev.preventDefault();
    }

    function handleChange(e) {
        const key = e.target.dataset.id;
        const value = e.target.value;
        setValues((values) => ({
            ...values,
            [key]: value,
        }));
    }

    function closeErrorMеssage() {
        let errorTimeout = setTimeout(() => {
            const errorMessageEl = document.querySelector(
                '.conf-step__button-error',
            );
            if (errorMessageEl) {
                router.visit(route('admin.index'), { preserveScroll: true });
            }
            clearTimeout(errorTimeout);
        }, 2000);
    }

    function handleSubmit(e) {
        savePosition();
        setShow(false);
        //router.post(route('admin.store', values));
        e.preventDefault();
        closeErrorMеssage();
    }

    useEffect(() => {
        if (show) {
            setTimeout(() => {
                const formElement = document.querySelector('.create-film-form');
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
                Добавить фильм
            </button>
            <Modal show={show}>
                <form className="create-film-form" onSubmit={handleSubmit}>
                    <div className="dialog-window">
                        <div className="dialog-header">Новый фильм</div>
                        <div className="dialog-content">
                            <div className="dialog-field">
                                <label
                                    htmlFor="film-name"
                                    className="dialog-label"
                                >
                                    Наименование:
                                </label>
                                <input
                                    id="film-name"
                                    className="dialog-input"
                                    data-id="name"
                                    name="name"
                                    value={values.name}
                                    placeholder="Название фильма"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="dialog-field">
                                <label
                                    htmlFor="film-description"
                                    className="dialog-label"
                                >
                                    Описание:
                                </label>
                                <textarea
                                    id="film-description"
                                    className="dialog-input dialog-textarea"
                                    data-id="description"
                                    name="description"
                                    rows="5"
                                    value={values.description}
                                    placeholder="Краткое описание"
                                    onChange={handleChange}
                                ></textarea>
                            </div>
                            <div className="dialog-field-inline">
                                <label
                                    htmlFor="film-year"
                                    className="dialog-label"
                                >
                                    Год выпуска:
                                </label>
                                <input
                                    type="number"
                                    id="film-year"
                                    className="dialog-input"
                                    data-id="year"
                                    name="year"
                                    value={values.year}
                                    placeholder="Год"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="dialog-field-inline">
                                <label
                                    htmlFor="film-duration"
                                    className="dialog-label"
                                >
                                    Продолжительность:
                                </label>
                                <input
                                    type="number"
                                    id="film-duration"
                                    className="dialog-input"
                                    data-id="duration"
                                    name="duration"
                                    value={values.duration}
                                    placeholder="Минут"
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
