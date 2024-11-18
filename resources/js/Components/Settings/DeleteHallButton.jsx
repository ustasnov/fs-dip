import { router } from '@inertiajs/react'
import { useState } from 'react';
import Modal from '../Modal';

export default function DeleteHallButton(props) {
    const [show, setShow] = new useState(false);
    const { id, name } = props;

    function onShowModal(ev) {
        setShow(true);
        ev.preventDefault();
    }

    function onCloseModal(ev) {
        setShow(false);
        if (ev.target.classList.contains("conf-step__button-accent")) {
            router.delete(route('admin.destroy', ev.target.id), { method: 'delete' });
        }
        ev.preventDefault();
    }

    return (
        <>
            <button id={id} className="conf-step__button conf-step__button-trash" onClick={onShowModal}></button>
            <Modal show={show}>
                <div class="dialog-window">
                    <div class="dialog-header">
                        Подтвердите
                    </div>
                    <div class="dialog-content">
                        <div class="dialog-text">
                            <p>Удалить кинозал "{name}"</p>
                            <p>При удалении также будут удалены: конфигурация зала, конфигурация цен зала и сеансы зала. </p>
                        </div>
                    </div>
                    <div class="dialog-footer">
                        <button class="conf-step__button conf-step__button-regular" type="button" onClick={onCloseModal}>
                            Отмена
                        </button>
                        <button id={id} class="conf-step__button conf-step__button-accent" type="button" onClick={onCloseModal}>
                            Удалить
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    )
}
