export default function Movie({ data }) {
    const posterUrl = `/storage/${data.poster}`;

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
        //const parentEl = ev.target.closest('.dropdown');

        const dropdownEl = ev.currentTarget.querySelector('.dropdown-content');
        if (dropdownEl) {
            closeAllOtherMenu(dropdownEl);
            dropdownEl.classList.toggle('show');
        }

        //ev.preventDefault();
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
    }

    return (
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
            <p className="conf-step__movie-duration">{data.duration} минут</p>

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
    );
}
