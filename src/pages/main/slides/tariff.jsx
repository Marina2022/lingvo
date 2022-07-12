import React from "react";

export default function Top () {
    return (
        <div className="landing-tariff">
            <div className="landing-container">
            <div className="landing-h2">Тарифы</div>
            <div className="landing-tariff__wrapper">
                <div className="tariff-item">
                    <div className="tariff-item__title">Начальный</div>
                    <div className="tariff-item__price">Бесплатно</div>
                    <div className="tariff-item__long">Первые 3 мес</div>
                    <div className="tariff-item__text">
                        Вы не можете взимать плату за свой контент. Тренировка
                        для ваших подписчиков бесплатна
                    </div>
                    <div className="tariff-item__info-title">
                        Публикаций в месяц
                    </div>
                    <div className="tariff-item__info-detail"> до 4</div>
                    <div className="tariff-item__info-title">
                        Фраз в публикации
                    </div>
                    <div className="tariff-item__info-detail"> до 10</div>
                    <div className="tariff-item__info-title">
                        Количество подписчиков
                    </div>
                    <div className="tariff-item__info-detail">
                        {" "}
                        Не ограничено
                    </div>
                    <button className="btn">Заказать</button>
                </div>
                <div className="tariff-item tariff-item_active">
                    <div className="tariff-item__title">Средний</div>
                    <div className="tariff-item__price">1 000 ₽</div>
                    <div className="tariff-item__long">в месяц</div>
                    <div className="tariff-item__text">
                        Вы получаете 30% от суммы купленого подписчиками
                        контента для тренировки{" "}
                    </div>
                    <div className="tariff-item__info-title">
                        Публикаций в месяц
                    </div>
                    <div className="tariff-item__info-detail"> до 10</div>
                    <div className="tariff-item__info-title">
                        Фраз в публикации
                    </div>
                    <div className="tariff-item__info-detail"> до 20</div>
                    <div className="tariff-item__info-title">
                        Количество подписчиков
                    </div>
                    <div className="tariff-item__info-detail">
                        {" "}
                        Не ограничено
                    </div>
                    <button className="btn">Заказать</button>
                </div>
                <div className="tariff-item">
                    <div className="tariff-item__title">Начальный</div>
                    <div className="tariff-item__price">5 000 ₽</div>
                    <div className="tariff-item__long">в месяц</div>
                    <div className="tariff-item__text">
                        Вы получаете 50% от суммы купленого подписчиками
                        контента для тренировки{" "}
                    </div>
                    <div className="tariff-item__info-title">
                        Публикаций в месяц
                    </div>
                    <div className="tariff-item__info-detail">
                        {" "}
                        Не ограничено
                    </div>
                    <div className="tariff-item__info-title">
                        Фраз в публикации
                    </div>
                    <div className="tariff-item__info-detail"> до 10</div>
                    <div className="tariff-item__info-title">
                        Количество подписчиков
                    </div>
                    <div className="tariff-item__info-detail">
                        {" "}
                        Не ограничено
                    </div>
                    <button className="btn">Заказать</button>
                </div>
            </div>
            <div className="landing-tariff__text">Не нашли подходящий? </div>
            <a href="/#" className="landing-link">
                Давайте обсудим индивидуальный
            </a>
            </div>
        </div>
    );
 }
 