import { Component } from 'react';
import PropTypes from 'prop-types'

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/errorMessage';
import Skeleton from '../skeleton/Skeleton';
import MarvelService from '../../services/MarvelService';


import './charInfo.scss';
import thor from '../../resources/img/thor.jpeg';

class CharInfo extends Component {

    state = {
        char: null,
        loading: false,
        error: false,
        img: '',
        clazz: '',
        full: false
    }


    marvelService = new MarvelService();


    componentDidMount() {
        this.updateChar();
        
    }

    componentDidUpdate(prevProps, prevState) {
            if(prevProps.charId != this.props.charId) {
                this.updateChar();

            
            }
    }


    updateChar = () => {
        const {charId} = this.props;
        if(!charId) {
            return;
        }
        this.onCharLoading();

        this.marvelService.
        getCharacter(charId)
        .then(this.onCharLoaded)
        .catch(this.onError)



    }

    onFullList = () => {
        this.setState({full: !this.state.full})
    }
    onCharLoaded = (char) => {
        const imgPath = char.thumbnail
        const match = imgPath.match(/available/ig)
        const prop = match ? "char__basics_propContain" : "char__basics_propCover"
        this.setState({char, loading: false, img: char.thumbnail, clazz: prop, full: false})

    }

    onError = () => {
        this.setState({loading: false, error: true})
    }

    onCharLoading = () => {
        this.setState({loading: true})
    }

   render () {
    


    const {char, loading, error, clazz, full} = this.state;
    const newComics = char ?  !full ? char.comics.slice(0, 10) : char.comics : null;
    const defaultList = [{name:'Комиксы отсутствуют у данного персонажа. Пожалуйста сделайте выбор другого персонажа'}]
    const button =  char ? char.comics.length > 10 ?  <button onClick={this.onFullList}>Развернуть больше</button> : null : null;
    const skeleton = char || loading || error ? null : <Skeleton/>
    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !char) ? <View char={char} prop={clazz} newComics={newComics.length > 1 ? newComics : defaultList}/> : null;


    return (
        <div className="char__info">
            {skeleton}
            {errorMessage}
            {spinner}
            {content}
            {button}
        </div>
    )
   }
}

const View = ({char, prop, newComics}) => {
    const {name, description, thumbnail, homepage, wiki, comics} = char;


    return (
        <>
                    <div className="char__basics">
                <img className={prop} src={thumbnail} alt={name}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {
                    newComics.map((item, i)=> {
                        return (
                            <li key={i} className="char__comics-item">
                                {i+1}. {item.name}
                            </li>
                        )
                    })
                }

            </ul>
        </>
    )
}


CharInfo.propTypes = {
    charId: PropTypes.number
}


export default CharInfo;