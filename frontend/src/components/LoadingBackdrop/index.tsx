import { LinearProgress } from "@mui/material";
// Backdrop, CircularProgress

interface Props {
    isLoading: boolean;
}

const LoadingBackdrop = ({ isLoading = false }: Props) => {
    return (
        <div>
            {isLoading && (
                <LinearProgress
                    color="primary"
                    sx={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        right: 0,
                        zIndex: "100",
                    }}
                />
            )}
            {/* <Backdrop
                sx={{
                    color: "#fff",
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
                open={isLoading}
            >
                <CircularProgress color="inherit" />
            </Backdrop> */}
        </div>
    );
};
export default LoadingBackdrop;
