import { savePosition } from '@/utils';
import { router } from '@inertiajs/react';
import { useState } from 'react';
import Modal from '../Modal';

export default function DeleteHallButton(props) {
    const [show, setShow] = useState(false);
    const { id, name } = props;

    function onShowModal(ev) {
        setShow(true);
        ev.preventDefault();
    }

    function onCloseModal(ev) {
        setShow(false);
        if (ev.target.classList.contains('conf-step__button-accent')) {
            savePosition();
            router.delete(route('admin.destroy', ev.target.dataset.id), {
                method: 'delete',
            });
        }
        ev.preventDefault();
    }

    return (
        <>
            <button
                id={id}
                className="conf-step__button conf-step__button-trash"
                onClick={onShowModal}
            ></button>
            <Modal show={show}>
                <div className="dialog-window">
                    <div className="dialog-header">Подтвердите</div>
                    <div className="dialog-content">
                        <div className="dialog-text">
                            <p>Удалить кинозал "{name}?"</p>
                            <p>
                                При удалении также будут удалены: конфигурация
                                зала, конфигурация цен зала и сеансы зала.
                            </p>
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
                            type="button"
                            data-id={id}
                            onClick={onCloseModal}
                        >
                            Удалить
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    );
}
