import { useParams } from "react-router-dom";
import { useGetEmployeeQuery } from "../../../store";
import DefaultPage from "../../../layout/DefaultPage";

const ProfileCard = () => {
    const { id } = useParams();

    const { data } = useGetEmployeeQuery({ id: id! });

    return (
        <DefaultPage breadCrumbs={false} bg>
            <div className="flex flex-col">
                <div className="bg-primary"></div>
                <div></div>
            </div>
        </DefaultPage>
    );
};

export default ProfileCard;
