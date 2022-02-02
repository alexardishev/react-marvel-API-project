import { Component } from 'react';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/errorMessage';


import './charList.scss';
import abyss from '../../resources/img/abyss.jpg';

class CharList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            charList: [],
            loading: true,
            error: false,
            limit: 9
        }
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.getListChar();
    }

    updateListChar() {
        this.marvelService.getAllCharacters(this.state.limit).
        then(res => this.setState({charList: res.slice(this.state.limit - 9), loading: false, limit: this.state.limit + 9}))
    }
    getListChar() {
        this.marvelService.getAllCharacters(this.state.limit).
        then(res => this.setState({charList: res, loading: false, limit: this.state.limit + 9}))

    }

render() {
    const {charList, loading,limit} = this.state;
    const {onCharSelected} = this.props;

    const dataForView = charList;
    const spinner = loading ? <Spinner/> : null
    const content = !(loading && limit) ? <View charList={dataForView} onCharSelected={onCharSelected}/> : null
    return (
        <div className="char__list">
            <ul className="char__grid">
              {spinner}
              {content}
            </ul>
            <button onClick={()=> {this.updateListChar()}} className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div>
    )
}


}

const View = ({charList, onCharSelected}) => {

    console.log(charList)
    console.log(onCharSelected);
    const elements = charList.map((item)=> {
        const imgPath = item.thumbnail
        const match = imgPath.match(/available/ig)
        const prop = match ? "randomchar__img randomchar__propConatain" : "randomchar__img randomchar__propCover"
        return (
        <li 
            className="char__item" 
            key={item.id}
            onClick={() => onCharSelected(item.id)}>
            <img className={prop} src={item.thumbnail} alt="abyss"/>
            <div className="char__name">{item.name}</div>
        </li>

        )
    })
    
    return (
        <>
    {elements}
    </>
    )
}

export default CharList;