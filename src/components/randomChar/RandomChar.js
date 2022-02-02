import { Component } from 'react';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/errorMessage';


import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';



class RandomChar extends Component {

    state = {
        char: {},
        loading: true,
        error: false,
        img: ''
    }


    marvelService = new MarvelService();

    componentDidMount() {
        this.updateChar();
        // this.timerId = setInterval(this.updateChar, 3000);
        // this.setState({img: this.state.char.thumbnail})

    }


    onCharLoaded = (char) => {
        this.setState({char, loading: false, img: char.thumbnail})
    }

    onError = () => {
        this.setState({loading: false, error: true})
    }

    tryIt = () => {
        this.setState({loading: true, error: false})
        this.updateChar();


    }


    updateChar = () => {
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        // const id = 1

        this.marvelService
        .getCharacter(id)
        .then(this.onCharLoaded)
        .catch(this.onError);
        

    }



    render() {
        const {char, loading, error} = this.state;
        const imgPath = this.state.img
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
                        <div onClick={this.tryIt} className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                </div>
            </div>
        )
    }

}

const View = (props) => {
    const {char, prop} = props
    console.log(props)
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