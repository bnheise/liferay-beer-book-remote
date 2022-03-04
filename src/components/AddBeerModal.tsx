import React, { useState } from "react";
import ClayButton from "@clayui/button";
import ClayModal, { useModal } from "@clayui/modal";
import AddBeerForm from "./AddBeerForm";
import { emptyBeer, NewBeer } from "../dto/newBeerForm";
import axios from "axios";

type Props = {
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
    visible: boolean;
    Liferay: any;
    data: any;
    setData: React.Dispatch<any>;
};

const AddBeerModal = ({
    Liferay,
    setVisible,
    visible,
    data,
    setData,
}: Props) => {
    const { observer, onClose } = useModal({
        onClose: () => setVisible(false),
    });

    const [selectedFile, setSelectedFile] = useState<File>();
    const [isFilePicked, setIsFilePicked] = useState(false);
    const [formData, setFormData] = useState<NewBeer>(emptyBeer);

    const handleSubmission = async () => {
        if (selectedFile) {
            const repoId = 20125;
            let dataToSend = new FormData();
            const name = formData.name.replace(" ", "_") + "_img";
            const folderId = "0";
            dataToSend.append("file", selectedFile);
            dataToSend.append("repositoryId", "20125");
            dataToSend.append("folderId", folderId);
            dataToSend.append("mimeType", selectedFile?.type);
            dataToSend.append("title", name);
            dataToSend.append("sourceFileName", selectedFile?.name);
            dataToSend.append("description", `Product image for ${formData.name}`);
            dataToSend.append("changeLog", "");
            const headers = {
                "Content-Type": "multipart/form-data",
                accept: "application/json",
                "x-csrf-token": Liferay.authToken,
            };

            try {
                const imageData: any = await axios.post(
                    `${Liferay?.ThemeDisplay?.getPortalURL()}api/jsonws/dlapp/add-file-entry`,
                    formData,
                    {
                        headers,
                    }
                );
                const uuid = imageData?.uuid;
                formData.imageUrl = `${Liferay?.ThemeDisplay?.getPortalURL()}/documents/${repoId}/${folderId}/${name}/${uuid}`
                const result = await axios.post(`${Liferay?.ThemeDisplay?.getPortalURL()}/o/c/beers/`, formData, {
                    headers: {
                        "accept": "application/json", "Content-Type": "application/json", "x-csrf-token": Liferay.authToken
                    }
                });
                console.log(result);
            } catch (error) {
                console.error(error);
            }
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
                        <AddBeerForm
                            selectedFile={selectedFile}
                            setSelectedFile={setSelectedFile}
                            isFilePicked={isFilePicked}
                            setIsFilePicked={setIsFilePicked}
                            Liferay={Liferay}
                            formData={formData}
                            setFormData={setFormData}
                            handleSubmission={handleSubmission}
                        />
                    </ClayModal.Body>
                    <ClayModal.Footer
                        last={
                            <ClayButton.Group spaced>
                                <ClayButton onClick={onClose} displayType="secondary">
                                    {"Cancel"}
                                </ClayButton>
                                <ClayButton onClick={handleSubmission}>{"Submit"}</ClayButton>
                            </ClayButton.Group>
                        }
                    />
                </ClayModal>
            )}
        </>
    );
};
export default AddBeerModal;
