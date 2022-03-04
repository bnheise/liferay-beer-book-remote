import React, { useState } from "react";
import ClayButton from "@clayui/button";
import ClayModal, { useModal } from "@clayui/modal";
import AddBeerForm from "./AddBeerForm";
import { emptyBeer, NewBeer } from "../dto/newBeerForm";
import axios from 'axios';

type Props = {
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
    visible: boolean;
    Liferay: any;
    data: any;
    setData: React.Dispatch<any>;
};

const AddBeerModal = ({ Liferay, setVisible, visible, data, setData }: Props) => {
    const { observer, onClose } = useModal({
        onClose: () => setVisible(false),
    });

    const [formData, setFormData] = useState<NewBeer>(emptyBeer);

    const handleSubmission = async () => {

        const response = await axios.post(`${Liferay?.ThemeDisplay?.getPortalURL()}/o/c/beers?p_auth=${Liferay.authToken}`, {
            formData
        });
        console.log(response)
        setData([...data, response.data])
        // const formData = new FormData();

        // formData.append('File', selectedFile);

        // fetch(
        //     'https://freeimage.host/api/1/upload?key=<YOUR_API_KEY>',
        //     {
        //         method: 'POST',
        //         body: formData,
        //     }
        // )
        //     .then((response) => response.json())
        //     .then((result) => {
        //         console.log('Success:', result);
        //     })
        //     .catch((error) => {
        //         console.error('Error:', error);
        //     });
    };

    return (
        <>
            {visible && (
                <ClayModal
                    observer={observer}
                    size="lg"
                    // spritemap={spritemap}
                    status="info"
                >
                    <ClayModal.Header>{"Add a new beer"}</ClayModal.Header>
                    <ClayModal.Body>
                        <AddBeerForm Liferay={Liferay} formData={formData} setFormData={setFormData} handleSubmission={handleSubmission} />
                    </ClayModal.Body>
                    <ClayModal.Footer
                        last={
                            <ClayButton.Group spaced>
                                <ClayButton onClick={onClose} displayType="secondary">{"Cancel"}</ClayButton>
                                <ClayButton onClick={handleSubmission}>{"Submit"}</ClayButton>
                            </ClayButton.Group>
                        }
                    />
                </ClayModal>
            )}
        </>
    );
}
export default AddBeerModal;
