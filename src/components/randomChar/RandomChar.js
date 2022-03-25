import {useState, useEffect} from 'react';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/errorMessage';


import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';



const RandomChar = (props) => {
    const [char, setChar] = useState({});
    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(false);
    const [img, setImg] = useState('');
    const {loading, error, getCharacter, clearError} = useMarvelService();

    useEffect(() => {
        updateChar();
    }, [])



   const onCharLoaded = (res) => {
       setChar(char => res);
       setImg(res.thumbnail);
    }


   const updateChar = () => {
       clearError();
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        // const id = 1

        getCharacter(id)
        .then(res => onCharLoaded(res));
        

    }





        const imgPath = img
        const match = imgPath.match(/available/ig)
        const prop = match ? "randomchar__img randomchar__propConatain" : "randomchar__img randomchar__propCover"
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? <View char={char} prop={prop}/> : null;


        return (
            <div className="randomchar">
                {errorMessage}
                {spinner}
                {content}
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br/>
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button className="button button__main">
                        <div onClick={updateChar} className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                </div>
            </div>
        )
    }


const View = (props) => {
    const {char, prop} = props
    const strDesc = String(char.description)



    return(
        <div className="randomchar__block">
        <img  src={char.thumbnail} alt="Random character" className={prop}/>
        <div className="randomchar__info">
            <p className="randomchar__name">{char.name}</p>
            <p className="randomchar__descr">
             {strDesc.length > 200 ? strDesc.slice(0,200) + '...' : char.description}
            </p>
            <div className="randomchar__btns">
                <a href={char.homepage} className="button button__main">
                    <div className="inner">homepage</div>
                </a>
                <a href={char.wiki} className="button button__secondary">
                    <div className="inner">Wiki</div>
                </a>
            </div>
        </div>
    </div>
    )
}






export default RandomChar;