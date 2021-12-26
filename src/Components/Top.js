import {useLocation, useParams} from "react-router-dom";

const top = () => {


    let params = useParams();
    console.log(params)
    let location = useLocation();
    console.log(location)

    return "Top"
};

export default top