import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetEmployeeQuery } from "../../../store";
import { Phone, EmailOutlined } from "@mui/icons-material";
import { Tooltip, IconButton, Box, TextField } from "@mui/material";
import DefaultPage from "../../../layout/DefaultPage";
import Dialog from "@components/Dialog";
import Modal from "@components/Modal";

const ProfileCard = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [openImg, setOpenImg] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");

    const { data } = useGetEmployeeQuery({ id: id! });

    const handleSubmit = () => {
        console.log(message);
    };

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
                    <div className="flex flex-col items-center space-y-1">
                        <p className="text-gray-500 font-bold">{data?.roles}</p>
                        <h3 className="text-2xl ">{`${data?.firstName} ${data?.lastName}`}</h3>
                        <div className="flex flex-row">
                            <Dialog
                                label="Send Email"
                                buttonIcon={<EmailOutlined />}
                                onSubmit={handleSubmit}
                                fullScreen
                            >
                                <Box sx={{ p: 2 }}>
                                    <TextField
                                        label="Message"
                                        multiline
                                        rows={8}
                                        variant="outlined"
                                        fullWidth
                                        value={message}
                                        onChange={(e) =>
                                            setMessage(e.target.value)
                                        }
                                    />
                                </Box>
                            </Dialog>
                            <Tooltip title="Mobile Number">
                                <IconButton
                                // href={`mailto:${data?.email}?subject=Email%20Subject&body=Email%20Body`}
                                >
                                    <Phone />
                                </IconButton>
                            </Tooltip>
                        </div>
                    </div>
                </div>
            </DefaultPage>
            <Modal open={openImg} handleClose={() => setOpenImg(false)}>
                <img
                    src={data?.img}
                    alt="profile pic"
                    className="max-h-[80vh] object-contain"
                />
            </Modal>
        </>
    );
};

export default ProfileCard;
