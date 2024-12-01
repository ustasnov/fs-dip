import ConfStepHeader from '@/Components/Settings/ConfStepHeader';
import CreateHallButton from '@/Components/Settings/CreateHallButton';
import HallConfig from '@/Components/Settings/HallConfig';
import HallsList from '@/Components/Settings/HallsList';
import HallsSelector from '@/Components/Settings/HallsSelector';
import { router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import posterImgUrl from '../../images/poster.png';

export default function Settings(props) {
    const { halls, places } = props;
    const { errors } = usePage().props;
    const s_opened_str = localStorage.getItem('s_opened');
    let s_opened = ['1', '1', '1', '1', '1'];
    if (s_opened_str) {
        s_opened = JSON.parse(s_opened_str);
    }
    const s_checked_str = localStorage.getItem('s_checked');
    let s_checked = ['1', '1', '1'];
    if (s_checked_str) {
        s_checked = JSON.parse(s_checked_str);
    } else {
        localStorage.setItem('s_checked', JSON.stringify(s_checked));
    }

    const [s0_checked, setChecked0] = new useState(s_checked[0]);
    const [s1_checked, setChecked1] = new useState(s_checked[1]);
    //const [s2_checked, setChecked2] = new useState(s_checked[2]);

    //console.log(halls);

    function getErrorMessage(error) {
        if (error === 'validation.unique') {
            return 'Зал с таким именем уже есть!';
        } else if (error === 'validation.required') {
            return 'Имя зала не может быть пустым!';
        }
        return '';
    }

    function onCheckHandler0(ev) {
        if (ev.target.checked) {
            s_checked[0] = ev.target.id;
            localStorage.setItem('s_checked', JSON.stringify(s_checked));
            setChecked0(s_checked[0]);
            router.visit(route('admin.index'), { preserveScroll: true });
        }
        //ev.preventDefault();
    }

    function onCheckHandler1(ev) {
        if (ev.target.checked) {
            s_checked[1] = ev.target.id;
            localStorage.setItem('s_checked', JSON.stringify(s_checked));
            setChecked1(s_checked[1]);
            router.visit(route('admin.index'), { preserveScroll: true });
        }
        //ev.preventDefault();
    }

    /*
    function onCheckHandler2(ev) {
        if (ev.target.checked) {
            s_checked[2] = ev.target.id;
            localStorage.setItem('s_checked', JSON.stringify(s_checked));
            setChecked2(s_checked[2]);
        }
    }
    */

    return (
        <>
            <header className="page-header">
                <h1 className="page-header__title">
                    Идём<span>в</span>кино
                </h1>
                <span className="page-header__subtitle">
                    Администраторррская
                </span>
            </header>

            <main className="conf-steps">
                <section className="conf-step">
                    <ConfStepHeader
                        h_id="0"
                        title="Управление залами"
                        open={s_opened[0]}
                    ></ConfStepHeader>
                    <div className="conf-step__wrapper">
                        <p className="conf-step__paragraph">Доступные залы:</p>
                        <HallsList data={halls}></HallsList>
                        <div className="conf-step__button-with-error">
                            <CreateHallButton></CreateHallButton>
                            {errors.name && (
                                <div className="conf-step__button-error">
                                    {getErrorMessage(errors.name)}
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                <section className="conf-step">
                    <ConfStepHeader
                        h_id="1"
                        title="Конфигурация залов"
                        open={s_opened[1]}
                    ></ConfStepHeader>
                    <div className="conf-step__wrapper">
                        <p className="conf-step__paragraph">
                            Выберите зал для конфигурации:
                        </p>
                        <HallsSelector
                            sectionIndex="0"
                            activeId={s0_checked}
                            data={halls}
                            onCheckHandler={onCheckHandler0}
                        ></HallsSelector>
                        <HallConfig
                            hallId={s0_checked}
                            halls={halls}
                            places={places}
                        ></HallConfig>
                    </div>
                </section>

                <section className="conf-step">
                    <ConfStepHeader
                        h_id="2"
                        title="Конфигурация цен"
                        open={s_opened[2]}
                    ></ConfStepHeader>
                    <div className="conf-step__wrapper">
                        <p className="conf-step__paragraph">
                            Выберите зал для конфигурации:
                        </p>
                        <HallsSelector
                            sectionIndex="1"
                            activeId={s1_checked}
                            data={halls}
                            onCheckHandler={onCheckHandler1}
                        ></HallsSelector>

                        <p className="conf-step__paragraph">
                            Установите цены для типов кресел:
                        </p>
                        <div className="conf-step__legend">
                            <label className="conf-step__label">
                                Цена, рублей
                                <input
                                    type="text"
                                    className="conf-step__input"
                                    placeholder="0"
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
                                    type="text"
                                    className="conf-step__input"
                                    placeholder="0"
                                    value="350"
                                ></input>
                            </label>
                            за{' '}
                            <span className="conf-step__chair conf-step__chair_vip"></span>{' '}
                            VIP кресла
                        </div>

                        <fieldset className="conf-step__buttons text-center">
                            <button className="conf-step__button conf-step__button-regular">
                                Отмена
                            </button>
                            <input
                                type="submit"
                                value="Сохранить"
                                className="conf-step__button conf-step__button-accent"
                            ></input>
                        </fieldset>
                    </div>
                </section>

                <section className="conf-step">
                    <ConfStepHeader
                        h_id="3"
                        title="Сетка сеансов"
                        open={s_opened[3]}
                    ></ConfStepHeader>
                    <div className="conf-step__wrapper">
                        <p className="conf-step__paragraph">
                            <button className="conf-step__button conf-step__button-accent">
                                Добавить фильм
                            </button>
                        </p>
                        <div className="conf-step__movies">
                            <div className="conf-step__movie">
                                <img
                                    className="conf-step__movie-poster"
                                    alt="poster"
                                    src={posterImgUrl}
                                ></img>
                                <h3 className="conf-step__movie-title">
                                    Звёздные войны XXIII: Атака клонированных
                                    клонов
                                </h3>
                                <p className="conf-step__movie-duration">
                                    130 минут
                                </p>
                            </div>

                            <div className="conf-step__movie">
                                <img
                                    className="conf-step__movie-poster"
                                    alt="poster"
                                    src={posterImgUrl}
                                ></img>
                                <h3 className="conf-step__movie-title">
                                    Миссия выполнима
                                </h3>
                                <p className="conf-step__movie-duration">
                                    120 минут
                                </p>
                            </div>

                            <div className="conf-step__movie">
                                <img
                                    className="conf-step__movie-poster"
                                    alt="poster"
                                    src={posterImgUrl}
                                ></img>
                                <h3 className="conf-step__movie-title">
                                    Серая пантера
                                </h3>
                                <p className="conf-step__movie-duration">
                                    90 минут
                                </p>
                            </div>

                            <div className="conf-step__movie">
                                <img
                                    className="conf-step__movie-poster"
                                    alt="poster"
                                    src={posterImgUrl}
                                ></img>
                                <h3 className="conf-step__movie-title">
                                    Движение вбок
                                </h3>
                                <p className="conf-step__movie-duration">
                                    95 минут
                                </p>
                            </div>

                            <div className="conf-step__movie">
                                <img
                                    className="conf-step__movie-poster"
                                    alt="poster"
                                    src={posterImgUrl}
                                ></img>
                                <h3 className="conf-step__movie-title">
                                    Кот Да Винчи
                                </h3>
                                <p className="conf-step__movie-duration">
                                    100 минут
                                </p>
                            </div>
                        </div>

                        <div className="conf-step__seances">
                            <div className="conf-step__seances-hall">
                                <h3 className="conf-step__seances-title">
                                    Зал 1
                                </h3>
                                <div className="conf-step__seances-timeline">
                                    <div
                                        className="conf-step__seances-movie"
                                        style={{
                                            width: 60,
                                            backgroundColor:
                                                'rgb(133, 255, 137)',
                                            left: 0,
                                        }}
                                    >
                                        <p className="conf-step__seances-movie-title">
                                            Миссия выполнима
                                        </p>
                                        <p className="conf-step__seances-movie-start">
                                            00:00
                                        </p>
                                    </div>
                                    <div
                                        className="conf-step__seances-movie"
                                        style={{
                                            width: 60,
                                            backgroundColor:
                                                'rgb(133, 255, 137)',
                                            left: 360,
                                        }}
                                    >
                                        <p className="conf-step__seances-movie-title">
                                            Миссия выполнима
                                        </p>
                                        <p className="conf-step__seances-movie-start">
                                            12:00
                                        </p>
                                    </div>
                                    <div
                                        className="conf-step__seances-movie"
                                        style={{
                                            width: 65,
                                            backgroundColor:
                                                'rgb(202, 255, 133)',
                                            left: 420,
                                        }}
                                    >
                                        <p className="conf-step__seances-movie-title">
                                            Звёздные войны XXIII: Атака
                                            клонированных клонов
                                        </p>
                                        <p className="conf-step__seances-movie-start">
                                            14:00
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="conf-step__seances-hall">
                                <h3 className="conf-step__seances-title">
                                    Зал 2
                                </h3>
                                <div className="conf-step__seances-timeline">
                                    <div
                                        className="conf-step__seances-movie"
                                        style={{
                                            width: 65,
                                            backgroundColor:
                                                'rgb(202, 255, 133)',
                                            left: 595,
                                        }}
                                    >
                                        <p className="conf-step__seances-movie-title">
                                            Звёздные войны XXIII: Атака
                                            клонированных клонов
                                        </p>
                                        <p className="conf-step__seances-movie-start">
                                            19:50
                                        </p>
                                    </div>
                                    <div
                                        className="conf-step__seances-movie"
                                        style={{
                                            width: 60,
                                            backgroundColor:
                                                'rgb(133, 255, 137)',
                                            left: 660,
                                        }}
                                    >
                                        <p className="conf-step__seances-movie-title">
                                            Миссия выполнима
                                        </p>
                                        <p className="conf-step__seances-movie-start">
                                            22:00
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <fieldset className="conf-step__buttons text-center">
                            <button className="conf-step__button conf-step__button-regular">
                                Отмена
                            </button>
                            <input
                                type="submit"
                                value="Сохранить"
                                className="conf-step__button conf-step__button-accent"
                            ></input>
                        </fieldset>
                    </div>
                </section>

                <section className="conf-step">
                    <ConfStepHeader
                        h_id="4"
                        title="Открыть продажи"
                        open={s_opened[4]}
                    ></ConfStepHeader>
                    <div className="conf-step__wrapper text-center">
                        <p className="conf-step__paragraph">
                            Всё готово, теперь можно:
                        </p>
                        <button className="conf-step__button conf-step__button-accent">
                            Открыть продажу билетов
                        </button>
                    </div>
                </section>
            </main>
        </>
    );
}
