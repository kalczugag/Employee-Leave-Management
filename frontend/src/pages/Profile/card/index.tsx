import { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetEmployeeQuery } from "../../../store";
import { EmailOutlined } from "@mui/icons-material";
import { Tooltip, IconButton } from "@mui/material";
import DefaultPage from "../../../layout/DefaultPage";
import Modal from "../../../components/Modal";

const ProfileCard = () => {
    const { id } = useParams();
    const [openEmail, setOpenEmail] = useState<boolean>(false);
    const [openImg, setOpenImg] = useState<boolean>(false);

    const { data } = useGetEmployeeQuery({ id: id! });

    return (
        <>
            <DefaultPage breadCrumbs={false} bg>
                <div className="flex flex-col items-center space-y-24">
                    <div className="relative bg-primary p-16 w-full">
                        <div className="w-[200px] h-[200px] mx-auto -mb-32 rounded-full bg-white">
                            <img
                                src={data?.img}
                                alt="profile pic"
                                onClick={() => setOpenImg(true)}
                                className="w-[200px] h-[200px] object-cover rounded-full border-white border-2 hover:opacity-90 hover:cursor-pointer"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col items-center space-y-2">
                        <h3 className="text-2xl">{`${data?.firstName} ${data?.lastName}`}</h3>
                        <div className="flex flex-row">
                            <Tooltip title="Send Email">
                                <IconButton
                                    // href={`mailto:${data?.email}?subject=Email%20Subject&body=Email%20Body`}
                                    onClick={() => setOpenEmail(true)}
                                >
                                    <EmailOutlined />
                                </IconButton>
                            </Tooltip>
                        </div>
                    </div>
                </div>
            </DefaultPage>
            <Modal open={openImg} handleClose={() => setOpenImg(false)}>
                <img src={data?.img} alt="profile pic" />
            </Modal>
            <Modal open={openEmail} handleClose={() => setOpenEmail(false)}>
                <h6 className="text-xl">Email to {data?.email}</h6>
            </Modal>
        </>
    );
};

export default ProfileCard;
