import React, {useState, useEffect, useRef} from 'react';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';



import './charList.scss';


const CharList = (props) => {

    const [charList, setCharList] = useState([]);
    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(false)
    const [offset, setOffset] = useState(210)
    const [charEnded, setCharEnded] = useState(false);



   const {loading, error, getAllCharacters} = useMarvelService();

   useEffect(() => {
    getListChar();
   }, [])


   const updateListChar= () => {
        // setLoading(true);
        getAllCharacters(offset).
        then(res => {
            setCharList(res);
            setOffset(offset => offset + 9)
            setCharEnded(res.length < 9 ? true : false)
        })
    }

   const getListChar = () => {
        getAllCharacters(offset).
        then(res => {
            setCharList(res);
            // setLoading(false);
            setOffset(offset => offset + 9)
        })

    }

    const {onCharSelected, selectedChar} = props;

    const dataForView = charList;
    const spinner = loading ? <Spinner/> : null
    const content = !(loading && offset) ? <View charList={dataForView} onCharSelected={onCharSelected} selectedChar={selectedChar}/> : null
    return (
        <div className="char__list">
            <ul className="char__grid">
              {spinner}
              {content}
            </ul>
            <button onClick={()=> {updateListChar()}} 
            className="button button__main button__long"
            disabled={loading}
            style={{'display': charEnded ? 'none' : 'block'}}>
                <div className="inner">load more</div>
            </button>
        </div>
    )



}

const View = (props) => {
 

    const itemRefs = useRef([]);


    const addClassSelected = (id) => {
        console.log(itemRefs);
        itemRefs.current.forEach(item => item.classList.remove('char__item_selected'));
        itemRefs.current[id].classList.add('char__item_selected');
        itemRefs.current[id].focus();
    }
    


        const {charList, onCharSelected} = props
        const elements = charList.map((item, i)=> {
            const imgPath = item.thumbnail
            const match = imgPath.match(/available/ig)
            const prop = match ? "randomchar__img randomchar__propConatain" : "randomchar__img randomchar__propCover"
            return (
            <li ref={el => itemRefs.current[i] = el}
                className="char__item" 
                key={item.id}
                onClick={() => {
                onCharSelected(item.id)
                addClassSelected(i)}}>
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