import { savePosition } from '@/utils';
import { router } from '@inertiajs/react';
import { useState } from 'react';
//import DeleteFilmDialog from '../DeleteFilmDialog';
import Modal from '../Modal';

export default function Movie({ data }) {
    const [showDelete, setShowDelete] = useState(false);
    const [showUpdate, setShowUpdate] = useState(false);
    const posterUrl = `/storage/${data.poster}`;

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
            router.put(route('admin.updateFilm', ev.target.dataset.id));
        }
        ev.preventDefault();
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
        </>
    );
}
