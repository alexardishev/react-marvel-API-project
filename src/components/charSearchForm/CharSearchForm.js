import {useState} from 'react';
import { Link } from 'react-router-dom';

import useMarvelService from '../../services/MarvelService';
import { Formik, Form, useField} from 'formik';
import * as Yup from 'yup'
import './charSearchForm.scss';

const MyTextInput = ({label, ...props}) => {
    const [field, meta] = useField(props);
    return(
        <>
             <label className='char__search-label' htmlFor={props.name}>{label}</label>
             <input {...props}  {...field}/>
             {meta.touched && meta.error ? (
                 <div className='error'>{meta.error}</div>
             ) : null}
        </>
    )

};

const CharSearchForm = () => {
const [searchChar, setSearchChar] = useState([]);
const {getCharacterName} = useMarvelService();


   const startSearch = (name) => {
        getCharacterName(name).
        then(setSearchChar)
    }

    const link = searchChar.total === 0 || searchChar.id == undefined ? <div> Такого персонажа не существует</div>
     : <Link to={`/search/${searchChar.id}`}
    >Перейти на страницу персонажа
    </Link>


    return (
  <div>
        <Formik
        initialValues = {{
            search: '',

        }}
        validationSchema= {Yup.object({
            search: Yup.string()
                     .min(3, 'Мало букв')
                     .required('Обязательное поле')
        })}
        onSubmit= { (values) => {
            startSearch(values.search);
            
        }}>
                <Form  className="char__search-form">
                    <MyTextInput
                    label="Поиск персонажа"
                    id="search"
                    name="search"
                    type="text"/>
                    <button type="submit">Найти</button>
                    {link}
                </Form>
        </Formik>
    </div>       
    )


}

export default CharSearchForm;