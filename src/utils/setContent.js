import Spinner from '../components/spinner/Spinner';
import ErrorMessage from '../components/errorMessage/errorMessage';
import Skeleton from '../components/skeleton/Skeleton';

const setContent = (process, Component, data, clazz=null, comicData=null) => {
    switch(process) {
        case 'waiting':
            return <Skeleton/>;
            break
        case 'loading':
            return <Spinner/>
            break
        case 'confirmed':
            return  <Component data={data} prop={clazz} newComics={comicData}/>;
            break;
        case 'error':
            return <ErrorMessage/>
            break
        default:
            throw new Error('Unexpected process state');
    }
}

export default setContent;