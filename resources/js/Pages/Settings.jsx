import { Head, Link } from '@inertiajs/react';
import posterImgUrl from '../../images/poster.png';
import ConfStepHeader from '@/Components/Settings/ConfStepHeader';
import HallsList from '@/Components/Settings/HallsList';
import CreateHallButton from '@/Components/Settings/CreateHallButton';

export default function Settings(props) {
    const { halls } = props;

    return (
        <>
            <header className="page-header">
                <h1 className="page-header__title">Идём<span>в</span>кино</h1>
                <span className="page-header__subtitle">Администраторррская</span>
            </header>

            <main className="conf-steps">
                <section className="conf-step">
                    <ConfStepHeader title="Управление залами"></ConfStepHeader>
                    <div className="conf-step__wrapper">
                        <p className="conf-step__paragraph">Доступные залы:</p>
                        <HallsList data={halls}></HallsList>
                        <CreateHallButton></CreateHallButton>
                    </div>
                </section>

                <section className="conf-step">
                    <ConfStepHeader title="Конфигурация залов"></ConfStepHeader>
                    <div className="conf-step__wrapper">
                        <p className="conf-step__paragraph">Выберите зал для конфигурации:</p>
                        <ul className="conf-step__selectors-box">
                            <li><input type="radio" className="conf-step__radio" name="chairs-hall" value="Зал 1" checked></input><span className="conf-step__selector">Зал 1</span></li>
                            <li><input type="radio" className="conf-step__radio" name="chairs-hall" value="Зал 2"></input><span className="conf-step__selector">Зал 2</span></li>
                        </ul>
                        <p className="conf-step__paragraph">Укажите количество рядов и максимальное количество кресел в ряду:</p>
                        <div className="conf-step__legend">
                            <label className="conf-step__label">Рядов, шт<input type="text" className="conf-step__input" placeholder="10" ></input></label>
                            <span className="multiplier">x</span>
                            <label className="conf-step__label">Мест, шт<input type="text" className="conf-step__input" placeholder="8" ></input></label>
                        </div>
                        <p className="conf-step__paragraph">Теперь вы можете указать типы кресел на схеме зала:</p>
                        <div className="conf-step__legend">
                            <span className="conf-step__chair conf-step__chair_standart"></span> — обычные кресла
                            <span className="conf-step__chair conf-step__chair_vip"></span> — VIP кресла
                            <span className="conf-step__chair conf-step__chair_disabled"></span> — заблокированные (нет кресла)
                            <p className="conf-step__hint">Чтобы изменить вид кресла, нажмите по нему левой кнопкой мыши</p>
                        </div>

                        <div className="conf-step__hall">
                            <div className="conf-step__hall-wrapper">
                                <div className="conf-step__row">
                                    <span className="conf-step__chair conf-step__chair_disabled"></span><span className="conf-step__chair conf-step__chair_disabled"></span>
                                    <span className="conf-step__chair conf-step__chair_disabled"></span><span className="conf-step__chair conf-step__chair_standart"></span>
                                    <span className="conf-step__chair conf-step__chair_standart"></span><span className="conf-step__chair conf-step__chair_disabled"></span>
                                    <span className="conf-step__chair conf-step__chair_disabled"></span><span className="conf-step__chair conf-step__chair_disabled"></span>
                                </div>

                                <div className="conf-step__row">
                                    <span className="conf-step__chair conf-step__chair_disabled"></span><span className="conf-step__chair conf-step__chair_disabled"></span>
                                    <span className="conf-step__chair conf-step__chair_standart"></span><span className="conf-step__chair conf-step__chair_standart"></span>
                                    <span className="conf-step__chair conf-step__chair_standart"></span><span className="conf-step__chair conf-step__chair_standart"></span>
                                    <span className="conf-step__chair conf-step__chair_disabled"></span><span className="conf-step__chair conf-step__chair_disabled"></span>
                                </div>

                                <div className="conf-step__row">
                                    <span className="conf-step__chair conf-step__chair_disabled"></span><span className="conf-step__chair conf-step__chair_standart"></span>
                                    <span className="conf-step__chair conf-step__chair_standart"></span><span className="conf-step__chair conf-step__chair_standart"></span>
                                    <span className="conf-step__chair conf-step__chair_standart"></span><span className="conf-step__chair conf-step__chair_standart"></span>
                                    <span className="conf-step__chair conf-step__chair_standart"></span><span className="conf-step__chair conf-step__chair_disabled"></span>
                                </div>

                                <div className="conf-step__row">
                                    <span className="conf-step__chair conf-step__chair_standart"></span><span className="conf-step__chair conf-step__chair_standart"></span>
                                    <span className="conf-step__chair conf-step__chair_standart"></span><span className="conf-step__chair conf-step__chair_vip"></span>
                                    <span className="conf-step__chair conf-step__chair_vip"></span><span className="conf-step__chair conf-step__chair_standart"></span>
                                    <span className="conf-step__chair conf-step__chair_standart"></span><span className="conf-step__chair conf-step__chair_disabled"></span>
                                </div>

                                <div className="conf-step__row">
                                    <span className="conf-step__chair conf-step__chair_standart"></span><span className="conf-step__chair conf-step__chair_standart"></span>
                                    <span className="conf-step__chair conf-step__chair_vip"></span><span className="conf-step__chair conf-step__chair_vip"></span>
                                    <span className="conf-step__chair conf-step__chair_vip"></span><span className="conf-step__chair conf-step__chair_vip"></span>
                                    <span className="conf-step__chair conf-step__chair_standart"></span><span className="conf-step__chair conf-step__chair_disabled"></span>
                                </div>

                                <div className="conf-step__row">
                                    <span className="conf-step__chair conf-step__chair_standart"></span><span className="conf-step__chair conf-step__chair_standart"></span>
                                    <span className="conf-step__chair conf-step__chair_vip"></span><span className="conf-step__chair conf-step__chair_vip"></span>
                                    <span className="conf-step__chair conf-step__chair_vip"></span><span className="conf-step__chair conf-step__chair_vip"></span>
                                    <span className="conf-step__chair conf-step__chair_standart"></span><span className="conf-step__chair conf-step__chair_disabled"></span>
                                </div>

                                <div className="conf-step__row">
                                    <span className="conf-step__chair conf-step__chair_standart"></span><span className="conf-step__chair conf-step__chair_standart"></span>
                                    <span className="conf-step__chair conf-step__chair_vip"></span><span className="conf-step__chair conf-step__chair_vip"></span>
                                    <span className="conf-step__chair conf-step__chair_vip"></span><span className="conf-step__chair conf-step__chair_vip"></span>
                                    <span className="conf-step__chair conf-step__chair_standart"></span><span className="conf-step__chair conf-step__chair_disabled"></span>
                                </div>

                                <div className="conf-step__row">
                                    <span className="conf-step__chair conf-step__chair_standart"></span><span className="conf-step__chair conf-step__chair_standart"></span>
                                    <span className="conf-step__chair conf-step__chair_standart"></span><span className="conf-step__chair conf-step__chair_standart"></span>
                                    <span className="conf-step__chair conf-step__chair_standart"></span><span className="conf-step__chair conf-step__chair_standart"></span>
                                    <span className="conf-step__chair conf-step__chair_standart"></span><span className="conf-step__chair conf-step__chair_disabled"></span>
                                </div>

                                <div className="conf-step__row">
                                    <span className="conf-step__chair conf-step__chair_standart"></span><span className="conf-step__chair conf-step__chair_standart"></span>
                                    <span className="conf-step__chair conf-step__chair_standart"></span><span className="conf-step__chair conf-step__chair_standart"></span>
                                    <span className="conf-step__chair conf-step__chair_standart"></span><span className="conf-step__chair conf-step__chair_standart"></span>
                                    <span className="conf-step__chair conf-step__chair_standart"></span><span className="conf-step__chair conf-step__chair_standart"></span>
                                </div>

                                <div className="conf-step__row">
                                    <span className="conf-step__chair conf-step__chair_standart"></span><span className="conf-step__chair conf-step__chair_standart"></span>
                                    <span className="conf-step__chair conf-step__chair_standart"></span><span className="conf-step__chair conf-step__chair_standart"></span>
                                    <span className="conf-step__chair conf-step__chair_standart"></span><span className="conf-step__chair conf-step__chair_standart"></span>
                                    <span className="conf-step__chair conf-step__chair_standart"></span><span className="conf-step__chair conf-step__chair_standart"></span>
                                </div>
                            </div>
                        </div>

                        <fieldset className="conf-step__buttons text-center">
                            <button className="conf-step__button conf-step__button-regular">Отмена</button>
                            <input type="submit" value="Сохранить" className="conf-step__button conf-step__button-accent"></input>
                        </fieldset>
                    </div>
                </section>

                <section className="conf-step">
                    <ConfStepHeader title="Конфигурация цен"></ConfStepHeader>
                    <div className="conf-step__wrapper">
                        <p className="conf-step__paragraph">Выберите зал для конфигурации:</p>
                        <ul className="conf-step__selectors-box">
                            <li><input type="radio" className="conf-step__radio" name="prices-hall" value="Зал 1"></input><span className="conf-step__selector">Зал 1</span></li>
                            <li><input type="radio" className="conf-step__radio" name="prices-hall" value="Зал 2" checked></input><span className="conf-step__selector">Зал 2</span></li>
                        </ul>

                        <p className="conf-step__paragraph">Установите цены для типов кресел:</p>
                        <div className="conf-step__legend">
                            <label className="conf-step__label">Цена, рублей<input type="text" className="conf-step__input" placeholder="0" ></input></label>
                            за <span className="conf-step__chair conf-step__chair_standart"></span> обычные кресла
                        </div>
                        <div className="conf-step__legend">
                            <label className="conf-step__label">Цена, рублей<input type="text" className="conf-step__input" placeholder="0" value="350"></input></label>
                            за <span className="conf-step__chair conf-step__chair_vip"></span> VIP кресла
                        </div>

                        <fieldset className="conf-step__buttons text-center">
                            <button className="conf-step__button conf-step__button-regular">Отмена</button>
                            <input type="submit" value="Сохранить" className="conf-step__button conf-step__button-accent"></input>
                        </fieldset>
                    </div>
                </section>

                <section className="conf-step">
                    <ConfStepHeader title="Сетка сеансов"></ConfStepHeader>
                    <div className="conf-step__wrapper">
                        <p className="conf-step__paragraph">
                            <button className="conf-step__button conf-step__button-accent">Добавить фильм</button>
                        </p>
                        <div className="conf-step__movies">
                            <div className="conf-step__movie">
                                <img className="conf-step__movie-poster" alt="poster" src={posterImgUrl}></img>
                                <h3 className="conf-step__movie-title">Звёздные войны XXIII: Атака клонированных клонов</h3>
                                <p className="conf-step__movie-duration">130 минут</p>
                            </div>

                            <div className="conf-step__movie">
                                <img className="conf-step__movie-poster" alt="poster" src={posterImgUrl}></img>
                                <h3 className="conf-step__movie-title">Миссия выполнима</h3>
                                <p className="conf-step__movie-duration">120 минут</p>
                            </div>

                            <div className="conf-step__movie">
                                <img className="conf-step__movie-poster" alt="poster" src={posterImgUrl}></img>
                                <h3 className="conf-step__movie-title">Серая пантера</h3>
                                <p className="conf-step__movie-duration">90 минут</p>
                            </div>

                            <div className="conf-step__movie">
                                <img className="conf-step__movie-poster" alt="poster" src={posterImgUrl}></img>
                                <h3 className="conf-step__movie-title">Движение вбок</h3>
                                <p className="conf-step__movie-duration">95 минут</p>
                            </div>

                            <div className="conf-step__movie">
                                <img className="conf-step__movie-poster" alt="poster" src={posterImgUrl}></img>
                                <h3 className="conf-step__movie-title">Кот Да Винчи</h3>
                                <p className="conf-step__movie-duration">100 минут</p>
                            </div>
                        </div>

                        <div className="conf-step__seances">
                            <div className="conf-step__seances-hall">
                                <h3 className="conf-step__seances-title">Зал 1</h3>
                                <div className="conf-step__seances-timeline">
                                    <div className="conf-step__seances-movie" style={{ width: 60, backgroundColor: 'rgb(133, 255, 137)', left: 0 }}>
                                        <p className="conf-step__seances-movie-title">Миссия выполнима</p>
                                        <p className="conf-step__seances-movie-start">00:00</p>
                                    </div>
                                    <div className="conf-step__seances-movie" style={{ width: 60, backgroundColor: 'rgb(133, 255, 137)', left: 360 }}>
                                        <p className="conf-step__seances-movie-title">Миссия выполнима</p>
                                        <p className="conf-step__seances-movie-start">12:00</p>
                                    </div>
                                    <div className="conf-step__seances-movie" style={{ width: 65, backgroundColor: 'rgb(202, 255, 133)', left: 420 }}>
                                        <p className="conf-step__seances-movie-title">Звёздные войны XXIII: Атака клонированных клонов</p>
                                        <p className="conf-step__seances-movie-start">14:00</p>
                                    </div>
                                </div>
                            </div>
                            <div className="conf-step__seances-hall">
                                <h3 className="conf-step__seances-title">Зал 2</h3>
                                <div className="conf-step__seances-timeline">
                                    <div className="conf-step__seances-movie" style={{ width: 65, backgroundColor: 'rgb(202, 255, 133)', left: 595 }}>
                                        <p className="conf-step__seances-movie-title">Звёздные войны XXIII: Атака клонированных клонов</p>
                                        <p className="conf-step__seances-movie-start">19:50</p>
                                    </div>
                                    <div className="conf-step__seances-movie" style={{ width: 60, backgroundColor: 'rgb(133, 255, 137)', left: 660 }}>
                                        <p className="conf-step__seances-movie-title">Миссия выполнима</p>
                                        <p className="conf-step__seances-movie-start">22:00</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <fieldset className="conf-step__buttons text-center">
                            <button className="conf-step__button conf-step__button-regular">Отмена</button>
                            <input type="submit" value="Сохранить" className="conf-step__button conf-step__button-accent"></input>
                        </fieldset>
                    </div>
                </section >

                <section className="conf-step">
                    <ConfStepHeader title="Открыть продажи"></ConfStepHeader>
                    <div className="conf-step__wrapper text-center">
                        <p className="conf-step__paragraph">Всё готово, теперь можно:</p>
                        <button className="conf-step__button conf-step__button-accent">Открыть продажу билетов</button>
                    </div>
                </section>
            </main >
        </>
    )
}
