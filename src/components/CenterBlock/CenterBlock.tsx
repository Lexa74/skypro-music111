import Link from "next/link";

export default function CenterBlock() {
    return (
        <div className="centerblock">
            {/* SEARCH */}
            <div className="centerblock__search">
                <svg className="search__svg">
                    <use xlinkHref="/img/icon/sprite.svg#icon-search"></use>
                </svg>

                <input
                    className="search__text"
                    type="search"
                    placeholder="Поиск"
                    name="search"
                />
            </div>

            {/* TITLE */}
            <h2 className="centerblock__h2">Треки</h2>

            {/* FILTERS */}
            <div className="centerblock__filter">
                <div className="filter__title">Искать по:</div>
                <div className="filter__button">исполнителю</div>
                <div className="filter__button">году выпуска</div>
                <div className="filter__button">жанру</div>
            </div>

            {/* CONTENT */}
            <div className="centerblock__content">
                <div className="content__title">
                    <div className="playlistTitle__col col01">Трек</div>
                    <div className="playlistTitle__col col02">Исполнитель</div>
                    <div className="playlistTitle__col col03">Альбом</div>
                    <div className="playlistTitle__col col04">
                        <svg className="playlistTitle__svg">
                            <use xlinkHref="/img/icon/sprite.svg#icon-watch"></use>
                        </svg>
                    </div>
                </div>

                {/* PLAYLIST */}
                <div className="content__playlist">
                    {/* ЭТА ЧАСТЬ ПОЗЖЕ ВЫНЕСЕМ В ОТДЕЛЬНЫЙ КОМПОНЕНТ Playlist */}
                    <div className="playlist__item">
                        <div className="playlist__track">
                            <div className="track__title">
                                <div className="track__titleImage">
                                    <svg className="track__titleSvg">
                                        <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
                                    </svg>
                                </div>

                                <div className="track__title-text">
                                    <Link className="track__titleLink" href="">
                                        Guilt <span className="track__titleSpan"></span>
                                    </Link>
                                </div>
                            </div>

                            <div className="track__author">
                                <Link className="track__authorLink" href="">
                                    Nero
                                </Link>
                            </div>

                            <div className="track__album">
                                <Link className="track__albumLink" href="">
                                    Welcome Reality
                                </Link>
                            </div>

                            <div className="track__time">
                                <svg className="track__timeSvg">
                                    <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
                                </svg>
                                <span className="track__timeText">4:44</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
