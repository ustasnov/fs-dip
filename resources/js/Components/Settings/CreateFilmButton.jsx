import { savePosition } from '@/utils';
import { router, useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import Modal from '../Modal';

export default function CreateFilmButton() {
    const [show, setShow] = useState(false);
    const { data, setData, post } = useForm({
        name: null,
        description: null,
        year: null,
        duration: null,
        poster: '',
    });

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
        const value = key === 'poster' ? e.target.files[0] : e.target.value;
        setData((data) => ({
            ...data,
            [key]: value,
        }));
        if (key === 'poster') {
            //console.log('Загружаем изображение');
            let reader = new FileReader();
            reader.onload = (e) =>
                (document.querySelector('.poster-img').src = e.target.result);
            reader.readAsDataURL(e.target.files[0]);
        }
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
        }, 5000);
    }

    function handleSubmit(e) {
        savePosition();
        setShow(false);
        post(route('admin.storeFilm'));
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
                                    value={data.name}
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
                                    value={data.description}
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
                                    value={data.year}
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
                                    value={data.duration}
                                    placeholder="Минут"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="dialog-field">
                                <label
                                    htmlFor="film-poster"
                                    className="dialog-label"
                                >
                                    Постер:
                                </label>
                                <input
                                    type="file"
                                    id="film-poster"
                                    className="dialog-input"
                                    data-id="poster"
                                    name="poster"
                                    value={data.value}
                                    placeholder="Файл постера"
                                    onChange={handleChange}
                                />
                                <div className="dialog-image">
                                    <img className="poster-img"></img>
                                </div>
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
