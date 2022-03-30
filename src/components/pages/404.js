import ErrorMessage from "../errorMessage/errorMessage"
import { Link } from "react-router-dom";

const Page404 = () => {
    return (
        <div>
            <ErrorMessage/>
            <p>Страница не существует</p>
            <Link to='/'>Вернутся на глаывную страницу</Link>
        </div>
    )
}

export default Page404;