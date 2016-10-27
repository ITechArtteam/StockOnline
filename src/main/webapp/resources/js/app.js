var my_news = [
    {
        author: 'Саша	Печкин',
        text: 'В	четчерг,	четвертого	числа...',
        bigText: 'в	четыре	с	четвертью	часа	четыре	чёрненьких	чумазеньких	чертёнка	чертили  чёрными	чернилами	чертёж.'
    },
    {
        author: 'Просто	Вася',
        text: 'Считаю,	что	$	должен	стоить	35	рублей!',
        bigText: 'А	евро	42!'
    },
    {
        author: 'Гость',
        text: 'Бесплатно.	Скачать.	Лучший	сайт	-	http://localhost:3000',
        bigText: 'На	самом	деле	платно,	просто	нужно	прочитать	очень	длинное	лицензионное  соглашение'
    }
];

var News = React.createClass({

    getInitialState: function () {
        return {
            visible: false
        }
    },
    readmoreClick(e){
        e.preventDefault();
        this.setState({visible: true})
    },
    render: function () {
        var data = this.props.data;
        var visible = this.state.visible;

        return (
            <div className="article">
                <p className="news__author">{data.author}:</p>
                <p className="news__text">{data.text}</p>
                <a href="#" onClick={this.readmoreClick} className={visible ? "none" : "news_readmore"}>Подробнее</a>
                <p className={visible ? "big__text" : "none"}>{data.bigText}</p>
            </div>
        )
    }
});

var Article = React.createClass({
    getInitialState: function () {
        return {
            counter: 0
        }
    },
    render: function () {
        var data = this.props.data;
        if (data.length > 0) {
            var content = data.map(function (item, index) {
                return (
                    <div className={index}>
                        <News data={item}/>
                    </div>
                )
            });
        } else {
            var content = "Новостей нет!";
        }
        return (
            <div className="news">
                {content}
                <strong className={data.length > 0 ? "" : "none"}>Колличество
                    новостей: {data.length}</strong>
            </div>
        )
    }
});

var TextInput = React.createClass({

    render: function () {
        return (
            <input className="text_input" value="значение"/>
        );
    }
});

var App = React.createClass({
    render: function () {
        return (
            <div className="app">
                <TextInput/>
                Отображаем новости:
                <Article data={my_news}/>
            </div>
        );
    }
});

ReactDOM.render(
    <App />,
    document.getElementById('root')
);