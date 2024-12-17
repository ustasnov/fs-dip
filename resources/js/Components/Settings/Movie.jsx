import { savePosition } from '@/utils';
import { router } from '@inertiajs/react';
import { useState } from 'react';
//import DeleteFilmDialog from '../DeleteFilmDialog';
import Modal from '../Modal';

export default function Movie({ data }) {
    const [showDelete, setShowDelete] = useState(false);
    const [showUpdate, setShowUpdate] = useState(false);
    const [values, setValues] = useState({
        name: data.name,
        description: data.description,
        year: data.year,
        duration: data.duration,
        poster: data.poster,
    });
    const posterUrl = `/storage/${data.poster}`;

    //console.log(values.value);

    function showDeleteModal(ev) {
        setShowDelete(true);
        ev.preventDefault();
    }

    function onCloseDeleteModal(ev) {
        setShowDelete(false);
        if (ev.target.classList.contains('conf-step__button-accent')) {
            savePosition();
            router.delete(route('admin.destroyFilm', ev.target.dataset.id), {
                method: 'delete',
            });
        }
        ev.preventDefault();
    }

    function showUpdateModal(ev) {
        setShowUpdate(true);
        ev.preventDefault();
    }

    function onCloseUpdateModal(ev) {
        setShowUpdate(false);
        if (ev.target.classList.contains('conf-step__button-accent')) {
            savePosition();
            put(route('admin.updateFilm', ev.target.dataset.id));
        }
        ev.preventDefault();
    }

    function handleChange(e) {
        const key = e.target.dataset.id;
        const value = key === 'poster' ? e.target.files[0] : e.target.value;

        setValues((values) => ({
            ...values,
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

    function closeErrorMessage() {
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

    function handleSubmit(ev) {
        savePosition();
        setShowUpdate(false);
        const path = route('admin.updateFilm', ev.target.dataset.id);
        console.log(path);
        //router.put(path, {
        //    method: 'put',
        //});
        e.preventDefault();
        //closeErrorMessage();
    }

    function closeAllOtherMenu(el) {
        const dropdowns = document.getElementsByClassName('dropdown-content');
        for (let i = 0; i < dropdowns.length; i++) {
            const openDropdown = dropdowns[i];
            if (openDropdown !== el) {
                if (openDropdown.classList.contains('show')) {
                    openDropdown.classList.remove('show');
                }
            }
        }
    }

    function closeMenu(ev) {
        const parentEl = ev.currentTarget.closest('.dropdown-content');
        if (parentEl) {
            if (parentEl.classList.contains('show')) {
                parentEl.classList.remove('show');
            }
        }
    }

    function clickHandler(ev) {
        const dropdownEl = ev.currentTarget.querySelector('.dropdown-content');
        if (dropdownEl) {
            closeAllOtherMenu(dropdownEl);
            dropdownEl.classList.toggle('show');
        }
        ev.stopPropagation();
    }

    function createSeanceHandler(ev) {
        closeMenu(ev);
        ev.preventDefault();
        ev.stopPropagation();
    }

    function editHandler(ev) {
        closeMenu(ev);
        ev.preventDefault();
        ev.stopPropagation();
        showUpdateModal(ev);
    }

    function deleteHandler(ev) {
        closeMenu(ev);
        ev.preventDefault();
        ev.stopPropagation();
        showDeleteModal();
    }

    return (
        <>
            <div
                className="conf-step__movie dropdown"
                data-id={data.id}
                onClick={clickHandler}
            >
                <img
                    className="conf-step__movie-poster"
                    alt="poster"
                    src={posterUrl}
                ></img>
                <h3 className="conf-step__movie-title">{data.name}</h3>
                <p className="conf-step__movie-duration">
                    {data.duration} минут
                </p>

                <div className="dropdown-content">
                    <a href="#" onClick={createSeanceHandler}>
                        Создать сеанс
                    </a>
                    <a href="#" onClick={editHandler}>
                        Редактировать
                    </a>
                    <a href="#" onClick={deleteHandler}>
                        Удалить
                    </a>
                </div>
            </div>
            <Modal show={showDelete}>
                <div className="dialog-window">
                    <div className="dialog-header">Подтвердите</div>
                    <div className="dialog-content">
                        <div className="dialog-text">
                            <p>Удалить фильм "{data.name}?"</p>
                            <p>
                                Если имеются несохраненные изменения в сеансах,
                                сначала сохраните их, а затем удаляйте фильм!
                                При удалении фильма будут удалены: сеансы этого
                                фильма и бронирования на эти сеансы.
                            </p>
                        </div>
                    </div>
                    <div className="dialog-footer">
                        <button
                            className="conf-step__button conf-step__button-regular"
                            type="button"
                            onClick={onCloseDeleteModal}
                        >
                            Отмена
                        </button>
                        <button
                            className="conf-step__button conf-step__button-accent"
                            type="button"
                            data-id={data.id}
                            onClick={onCloseDeleteModal}
                        >
                            Удалить
                        </button>
                    </div>
                </div>
            </Modal>
            <Modal show={showUpdate}>
                <form className="update-film-form" onSubmit={handleSubmit}>
                    <div className="dialog-window">
                        <div className="dialog-header">Редактировать фильм</div>
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
                                    value={values.value}
                                    placeholder="Файл постера"
                                    onChange={handleChange}
                                />
                                <div className="dialog-image">
                                    <img
                                        className="poster-img"
                                        src={posterUrl}
                                    ></img>
                                </div>
                            </div>
                        </div>

                        <div className="dialog-footer">
                            <button
                                className="conf-step__button conf-step__button-regular"
                                type="button"
                                onClick={onCloseUpdateModal}
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
