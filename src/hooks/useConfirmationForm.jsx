import {useState} from "react";
import {useMutation} from "@tanstack/react-query";

// hooks
import useDialog from "./useDialog";

// providers
import {useNotification} from "../providers/NotificationProvider";
import {queryClient} from "../providers/ManagerProvider";

function useConfirmationForm(props) {

    const {showSuccessNotification} = useNotification();

    const {mutationFn, onError, onSuccess, queryKey, onSuccessMessage} = props;

    const [id, setId] = useState(0);

    const {open, handleClose, handleOpen} = useDialog();

    const close = () => {
        handleClose();
        setId(0);
    };

    const onClick = async (id) => {
        setId(id);
        handleOpen();
    };

    const dialogFn = useMutation({
        mutationFn: () => mutationFn([id]),
        onError: (error) => {
            console.error(error);
            if (onError) onError(error);
        },
        onSuccess: async (result) => {
            await queryClient.invalidateQueries(queryKey);
            if (onSuccess) onSuccess(result);
            showSuccessNotification({message: onSuccessMessage});
            close();
        },
    });

    return {open, onClick, close, dialogFn, isLoading: dialogFn.isPending};
}

export default useConfirmationForm;
