import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

export default function ProgressModal(props: any) {
    return (
        <>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={props.inProgress} >
                <CircularProgress color="inherit" />
            </Backdrop>
        </>
    );

}