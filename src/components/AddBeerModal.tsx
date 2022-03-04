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
        try {
            console.log(`${Liferay?.ThemeDisplay?.getPortalURL()}/o/c/beers/`)
            console.log(formData)
            const response = await axios.post(`${Liferay?.ThemeDisplay?.getPortalURL()}/o/c/beers/`, {
                formData
            }, {
                headers: {
                    "accept": "application/json", "Content-Type": "application/json", "x-csrf-token": Liferay.authToken
                }
            });
            setData([...data, response.data.items])
        } catch (error) {
            let message
            if (error instanceof Error) message = error.message
            console.log(message)
        }
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
