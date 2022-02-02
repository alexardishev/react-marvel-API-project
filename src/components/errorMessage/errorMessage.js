import img from './Error.gif'


const ErrorMessage = () => {
    return (
        <img style={{display: 'block', width: 250, height: 250, objectFit: 'contain', margin: '0 auto'}} src={img} />
    )
}

export default ErrorMessage;