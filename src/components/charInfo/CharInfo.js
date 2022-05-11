import {useState, useEffect} from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';

import setContent from '../../utils/setContent';
import useMarvelService from '../../services/MarvelService';
import CharSearchForm from '../charSearchForm/CharSearchForm';



import './charInfo.scss';

const CharInfo= (props) => {
    const [char, setChar] = useState(null);
    const [img, setImg] = useState('');
    const [clazz, setClazz] = useState('');
    const [full, setFull] = useState(true);
    const [minCom, setMinCom] = useState(false)



   const {loading, error, getCharacter, clearError, process, setProcess} = useMarvelService()


    useEffect(() => {
        updateChar();
    }, [props.charId])


  const  updateChar = () => {
        const {charId} = props;
        if(!charId) {
            return;
        }
        clearError();
        getCharacter(charId)
        .then(onCharLoaded)
        .then(function() {
            setProcess('confirmed');
        })



    }

   const onFullList = () => {
       setFull(full => !full);
    }
    const onCharLoaded = (char) => {
        setChar(char);
        setFull(false);
        if (char.comics.length === 1) {
            setMinCom(true)
        } else {
            setMinCom(false)
        }
        const imgPath = char.thumbnail
        const match = imgPath.match(/available/ig)
        const prop = match ? "char__basics_propContain" : "char__basics_propCover"
        setImg(char.thumbnail);
        setClazz(prop);



    }
    const newCom = char ?  !full ? char.comics.slice(0, 10) : char.comics : null;
    const button =  char && char.comics.length > 10 && !full ?  
    <button onClick={onFullList}>Развернуть больше</button> : 
    <button onClick={onFullList}>Свернуть</button>;


    return (
        <div className="char__info">
            {setContent(process, View, char, clazz, newCom)}
            {minCom || !char ? null : button}
            <CharSearchForm/>
        </div>

    )
   
}

const View = ({data, prop, newComics}) => {
    const {name, description, thumbnail, homepage, wiki, comics} = data;
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