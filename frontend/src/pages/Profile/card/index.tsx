import { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetEmployeeQuery } from "../../../store";
import { EmailOutlined, Edit } from "@mui/icons-material";
import { Tooltip, IconButton } from "@mui/material";
import DefaultPage from "../../../layout/DefaultPage";
import Modal from "../../../components/Modal";

const ProfileCard = () => {
    const { id } = useParams();
    const [mouseOver, setMouseOver] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);

    const { data } = useGetEmployeeQuery({ id: id! });

    return (
        <>
            <DefaultPage breadCrumbs={false} bg>
                <div className="flex flex-col items-center space-y-24">
                    <div
                        onMouseOver={() => setMouseOver(true)}
                        onMouseLeave={() => setMouseOver(false)}
                        className="relative bg-primary p-16 w-full hover:bg-primary/[.90]"
                    >
                        <img
                            src={data?.img}
                            alt="profile pic"
                            className="w-[200px] h-[200px] mx-auto -mb-32 rounded-full border-2 border-white object-cover"
                        />
                        {mouseOver && (
                            <div className="absolute right-2 bottom-2">
                                <IconButton>
                                    <Edit className="text-gray-300" />
                                </IconButton>
                            </div>
                        )}
                    </div>
                    <div className="flex flex-col items-center space-y-2">
                        <h3 className="text-2xl">{`${data?.firstName} ${data?.lastName}`}</h3>
                        <div className="flex flex-row">
                            <Tooltip title="Send Email">
                                <IconButton
                                    // href={`mailto:${data?.email}?subject=Email%20Subject&body=Email%20Body`}
                                    onClick={() => setOpen(true)}
                                >
                                    <EmailOutlined />
                                </IconButton>
                            </Tooltip>
                        </div>
                    </div>
                </div>
            </DefaultPage>
            <Modal open={open} handleClose={() => setOpen(false)}>
                <h6 className="text-xl">Email to {data?.email}</h6>
            </Modal>
        </>
    );
};

export default ProfileCard;
