import {useState, useEffect} from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/errorMessage';
import Skeleton from '../skeleton/Skeleton';
import useMarvelService from '../../services/MarvelService';


import './charInfo.scss';

const CharInfo= (props) => {
    console.log(props.charId);
    const [char, setChar] = useState(null);
    // const [loading, setLoading] = useState(false);
    // const [error, setError] = useState(false);
    const [img, setImg] = useState('');
    const [clazz, setClazz] = useState('');
    const [full, setFull] = useState(false);


   const {loading, error, getCharacter, clearError} = useMarvelService()


    useEffect(() => {
        updateChar();
    }, [props.charId])


  const  updateChar = () => {
        const {charId} = props;
        if(!charId) {
            return;
        }
        // onCharLoading();

        // marvelService.
        clearError();
        getCharacter(charId)
        .then(onCharLoaded);



    }

   const onFullList = () => {
       setFull(full => !full);
    }
    const onCharLoaded = (char) => {
        const imgPath = char.thumbnail
        const match = imgPath.match(/available/ig)
        const prop = match ? "char__basics_propContain" : "char__basics_propCover"
        setChar(char);
        // setLoading(false);
        setImg(char.thumbnail);
        setClazz(prop);
        setFull(false);

    }

//   const onError = () => {
//         setLoading(false);
//         setError(true);
//     }

//    const onCharLoading = () => {
//        setLoading(true);
//     }


    const newComics = char ?  !full ? char.comics.slice(0, 10) : char.comics : null;
    const defaultList = [{name:'Комиксы отсутствуют у данного персонажа. Пожалуйста сделайте выбор другого персонажа'}]
    const button =  char && char.comics.length > 10 ?  <button onClick={onFullList}>Развернуть больше</button> : null;
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
                        const link = item.resourceURI && item.resourceURI !=null ? item.resourceURI : '23733';
                        console.log(link);
                        const result = link ? link.match(/\d{5}/g) || link.match(/\d{4}/g) : null;
                        return (
                            <Link to={`/comics/${result}`}>
                                 <li key={i} className="char__comics-item">
                                {i+1}. {item.name}
                            </li>
                            </Link>

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