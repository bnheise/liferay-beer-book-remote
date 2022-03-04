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

    const [selectedFile, setSelectedFile] = useState<File>();
    const [isFilePicked, setIsFilePicked] = useState(false);
    const [formData, setFormData] = useState<NewBeer>(emptyBeer);

    const handleSubmission = async () => {
        if (selectedFile) {
            Liferay.Service(
                '/dlapp/add-file-entry',
                {
                    repositoryId: 20125,
                    folderId: 0,
                    sourceFileName: selectedFile?.name,
                    mimeType: selectedFile?.type,
                    title: formData.name.replace(" ", "_") + "_img",
                    description: `Product image for ${formData.name}`,
                    changeLog: '',
                    file: selectedFile
                },
                function (response: any) {
                    console.log(response);
                },
                function (error: any) {
                    console.log(error)
                }

            );
        }
        try {


            const response = await axios.post(`${Liferay?.ThemeDisplay?.getPortalURL()}/o/c/beers/`, formData, {
                headers: {
                    "accept": "application/json", "Content-Type": "application/json", "x-csrf-token": Liferay.authToken
                }
            });
            console.log("DATA returned", data, response.data)
            setData([...data, response.data])
        } catch (error) {
            let message
            if (error instanceof Error) message = error.message
            console.error(message)
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
                        <AddBeerForm selectedFile={selectedFile} setSelectedFile={setSelectedFile} isFilePicked={isFilePicked} setIsFilePicked={setIsFilePicked} Liferay={Liferay} formData={formData} setFormData={setFormData} handleSubmission={handleSubmission} />
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
