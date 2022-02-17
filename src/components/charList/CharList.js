import { Component } from 'react';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';



import './charList.scss';


class CharList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            charList: [],
            loading: true,
            error: false,
            offset: 210,
            charEnded: false
        }
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.getListChar();
    }

    updateListChar() {


        this.setState({loading:true})
        this.marvelService.getAllCharacters(this.state.offset).
        then(res => this.setState({charList: res, loading: false, offset: this.state.offset + 9, charEnded: res.length < 9 ? true : false}))
    }
    getListChar() {
        this.marvelService.getAllCharacters(this.state.offset).
        then(res => this.setState({charList: res, loading: false, offset: this.state.offset + 9}))

    }

render() {
    const {charList, loading,offset, charEnded} = this.state;
    const {onCharSelected} = this.props;

    const dataForView = charList;
    const spinner = loading ? <Spinner/> : null
    const content = !(loading && offset) ? <View charList={dataForView} onCharSelected={onCharSelected}/> : null
    return (
        <div className="char__list">
            <ul className="char__grid">
              {spinner}
              {content}
            </ul>
            <button onClick={()=> {this.updateListChar()}} 
            className="button button__main button__long"
            disabled={loading}
            style={{'display': charEnded ? 'none' : 'block'}}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}


}

const View = ({charList, onCharSelected}) => {

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