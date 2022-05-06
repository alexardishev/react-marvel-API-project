import {useState, useEffect, useContext} from 'react';
import {useParams, Link} from 'react-router-dom'
import useMarvelService from '../../services/MarvelService';


const SearchPageChar = () => {
    const [char, setChar] = useState();
    const {getCharacter} = useMarvelService();
    const {searchId} = useParams();
    
    
    useEffect(()=> {
        charLoad();
    }, [searchId])


    const charLoad = () => {
        getCharacter(searchId).
        then(setChar)
    }
    



    console.log(char);

    const content = char ? <div><div>{char.name}</div> <div>{char.description}</div><img src={char.thumbnail}/></div> : <div> No name</div> 
    return(
        <>
        {content}
        </>
    )


    
}

export default SearchPageChar;