import React, { Component } from 'react';
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
            charEnded: false,
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
    const {onCharSelected, selectedChar} = this.props;

    const dataForView = charList;
    const spinner = loading ? <Spinner/> : null
    const content = !(loading && offset) ? <View charList={dataForView} onCharSelected={onCharSelected} selectedChar={selectedChar}/> : null
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

class View extends Component {
 

    itemRefs = [];


    setRef = (elem) => {
        this.myRef = elem
        this.itemRefs.push(elem);
    }

    addClassSelected = (id) => {
        this.itemRefs.forEach(item => item.classList.remove('char__item_selected'));
        this.itemRefs[id].classList.add('char__item_selected');
        this.itemRefs[id].focus();
    }
    

    render() {
        console.log(this.itemRefs)
        const {charList, onCharSelected} = this.props
        const elements = charList.map((item, i)=> {
            const imgPath = item.thumbnail
            const match = imgPath.match(/available/ig)
            const prop = match ? "randomchar__img randomchar__propConatain" : "randomchar__img randomchar__propCover"
            return (
            <li ref={this.setRef}
                className="char__item" 
                key={item.id}
                onClick={() => {
                onCharSelected(item.id)
                this.addClassSelected(i)}}>
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

}

export default CharList;