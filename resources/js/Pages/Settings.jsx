import ConfStepHeader from '@/Components/Settings/ConfStepHeader';
import CreateFilmButton from '@/Components/Settings/CreateFilmButton';
import CreateHallButton from '@/Components/Settings/CreateHallButton';
import HallConfig from '@/Components/Settings/HallConfig';
import HallPricesConfig from '@/Components/Settings/HallPricesConf';
import HallsList from '@/Components/Settings/HallsList';
import HallsSelector from '@/Components/Settings/HallsSelector';
import MoviesList from '@/Components/Settings/MoviesList';
import { restorePosition } from '@/utils';
import { router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import posterImgUrl from '../../images/poster.png';

export default function Settings(props) {
    const { halls, places, movies } = props;
    const { errors } = usePage().props;
    const s_opened_str = localStorage.getItem('s_opened');
    let s_opened = ['1', '1', '1', '1', '1'];
    if (s_opened_str) {
        s_opened = JSON.parse(s_opened_str);
    }
    const s_checked_str = localStorage.getItem('s_checked');
    const firstHallId = halls.length === 0 ? '0' : halls[0].id.toString();
    let s_checked = [firstHallId, firstHallId];
    if (s_checked_str) {
        s_checked = JSON.parse(s_checked_str);
    } else {
        localStorage.setItem('s_checked', JSON.stringify(s_checked));
    }

    restorePosition();

    const [s0_checked, setChecked0] = useState(s_checked[0]);
    const [s1_checked, setChecked1] = useState(s_checked[1]);

    function getErrorMessage(error) {
        //console.log(`error: ${error}`);
        if (error === 'validation.unique') {
            return 'Зал с таким именем уже есть!';
        } else if (error === 'validation.required') {
            return 'Имя зала не может быть пустым!';
        }
        return error;
    }

    /*
    function handleCheck(ev, sectionId) {
        s_checked[sectionId] = ev.target.dataset.id;
        localStorage.setItem('s_checked', JSON.stringify(s_checked));
        setChecked0(s_checked[sectionId]);
        //savePosition();
        router.visit(route('admin.index'), { preserveScroll: true });
    }
    */

    function onCheckHandler0(ev) {
        if (ev.target.checked) {
            s_checked[0] = ev.target.dataset.id;
            localStorage.setItem('s_checked', JSON.stringify(s_checked));
            setChecked0(s_checked[0]);
            //savePosition();
            router.visit(route('admin.index'), { preserveScroll: true });
        }
    }

    function onCheckHandler1(ev) {
        if (ev.target.checked) {
            s_checked[1] = ev.target.dataset.id;
            localStorage.setItem('s_checked', JSON.stringify(s_checked));
            setChecked1(s_checked[1]);
            //savePosition();
            router.visit(route('admin.index'), { preserveScroll: true });
        }
    }

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
                        <HallPricesConfig
                            hallId={s1_checked}
                            halls={halls}
                        ></HallPricesConfig>
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
                            <div className="conf-step__button-with-error">
                                <CreateFilmButton></CreateFilmButton>
                                {errors.name && (
                                    <div className="conf-step__button-error">
                                        {errors.name}
                                    </div>
                                )}
                                {errors.year && (
                                    <div className="conf-step__button-error">
                                        {errors.year}
                                    </div>
                                )}
                                {errors.duration && (
                                    <div className="conf-step__button-error">
                                        {errors.duration}
                                    </div>
                                )}
                                {errors.poster && (
                                    <div className="conf-step__button-error">
                                        {errors.poster}
                                    </div>
                                )}
                            </div>
                        </p>

                        <MoviesList data={movies}></MoviesList>

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
