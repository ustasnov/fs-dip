import { savePosition } from '@/utils';
import { router, useForm } from '@inertiajs/react';
import { useState } from 'react';
import Modal from '../Modal';

export default function Movie({ film, halls }) {
    const [showCreate, setCreateSeance] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [showUpdate, setShowUpdate] = useState(false);
    const { data, setData, post, processing, errors } = useForm({
        name: film.name,
        description: film.description,
        year: film.year,
        duration: film.duration,
        poster: film.poster,
    });

    const posterUrl = `/storage/${film.poster}`;

    function showCreateModal() {
        setCreateSeance(true);
    }

    function onCloseCreateModal(ev) {
        setCreateSeance(false);
        ev.preventDefault();
    }

    function handleSubmitCreate(ev) {
        ev.preventDefault();
        const form = document.forms.createSeanceForm;
        const hall = halls.find((el) => el.name === form.hall.value);
        const start =
            parseInt(form.starthours.value) * 60 +
            parseInt(form.startminutes.value);
        const end = start + film.duration;
        setCreateSeance(false);
        console.log(
            `film_id=${film.id}, hall_id=${hall.id}, start=${start}, end=${end}`,
        );
        savePosition();
        router.post(
            route('admin.storeSeance', {
                film_id: film.id,
                hall_id: hall.id,
                start: start,
                end: end,
            }),
        );
        closeErrorMessage();
    }

    function showDeleteModal() {
        setShowDelete(true);
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

    function showUpdateModal() {
        setShowUpdate(true);
    }

    function onCloseUpdateModal(ev) {
        setShowUpdate(false);
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
        ev.preventDefault();
        post(
            route('admin.updateFilm', {
                id: ev.target.dataset.id,
                _method: 'PUT',
            }),
        );
        closeErrorMessage();
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
        showCreateModal();
    }

    function editHandler(ev) {
        closeMenu(ev);
        ev.preventDefault();
        ev.stopPropagation();
        showUpdateModal();
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
                data-id={film.id}
                onClick={clickHandler}
            >
                <img
                    className="conf-step__movie-poster"
                    alt="poster"
                    src={posterUrl}
                ></img>
                <h3 className="conf-step__movie-title">{film.name}</h3>
                <p className="conf-step__movie-duration">
                    {film.duration} минут
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
                            <p>Удалить фильм "{film.name}?"</p>
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
                            data-id={film.id}
                            onClick={onCloseDeleteModal}
                        >
                            Удалить
                        </button>
                    </div>
                </div>
            </Modal>
            <Modal show={showUpdate}>
                <form
                    className="update-film-form"
                    data-id={film.id}
                    onSubmit={handleSubmit}
                >
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
                                Сохранить
                            </button>
                        </div>
                    </div>
                </form>
            </Modal>
            <Modal show={showCreate}>
                <form
                    className="create-seance-form"
                    name="createSeanceForm"
                    onSubmit={handleSubmitCreate}
                >
                    <div className="dialog-window">
                        <div className="dialog-header">Новый сеанс</div>
                        <div className="dialog-content">
                            <div className="dialog-field">
                                <label
                                    htmlFor="hall-name"
                                    className="dialog-label"
                                >
                                    Зал:
                                </label>
                                <select
                                    id="hall-name"
                                    name="hall"
                                    className="dialog-input"
                                >
                                    {halls && (
                                        <>
                                            {halls.map((val) => (
                                                <option
                                                    key={val}
                                                    value={val.name}
                                                >
                                                    {val.name}
                                                </option>
                                            ))}
                                        </>
                                    )}
                                </select>
                            </div>
                            <div className="dialog-field-inline">
                                <label
                                    htmlFor="seance-start-hours"
                                    className="dialog-label"
                                >
                                    Начало сеанса:
                                </label>
                                <input
                                    type="number"
                                    id="seance-start-hours"
                                    className="dialog-input"
                                    data-id="hours"
                                    name="starthours"
                                    placeholder="Часов"
                                />
                            </div>
                            <div className="dialog-field-inline">
                                <label
                                    htmlFor="seance-start-minutes"
                                    className="dialog-label"
                                ></label>
                                <input
                                    type="number"
                                    id="seance-start-minutes"
                                    className="dialog-input"
                                    data-id="minutes"
                                    name="startminutes"
                                    placeholder="Минут"
                                />
                            </div>
                        </div>
                        <div className="dialog-footer">
                            <button
                                className="conf-step__button conf-step__button-regular"
                                type="button"
                                onClick={onCloseCreateModal}
                            >
                                Отмена
                            </button>
                            <button
                                className="conf-step__button conf-step__button-accent"
                                type="submit"
                            >
                                Сохранить
                            </button>
                        </div>
                    </div>
                </form>
            </Modal>
        </>
    );
}
