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
            let imageData = new FormData();
            let random = Math.random()
            const name = formData.name.replace(" ", "_") + "_img" + random;
            const folderId = 0;

            imageData.append("file", selectedFile);
            imageData.append("repositoryId", String(repoId));
            imageData.append("folderId", String(folderId));
            imageData.append("mimeType", selectedFile?.type);
            imageData.append("title", name);
            imageData.append("sourceFileName", selectedFile?.name.replace(".", `${random}.`));
            imageData.append("description", `Product image for ${formData.name}`);
            imageData.append("changeLog", "");

            try {

                const imagePostUrl = `${Liferay?.ThemeDisplay?.getPortalURL()}/api/jsonws/dlapp/add-file-entry?p_auth=${Liferay.authToken}`;
                const response: Response = await fetch(imagePostUrl, {
                    method: 'POST',
                    body: imageData
                });

                const body = await response.json();

                const uuid = body.uuid;

                formData.imageUrl = `/documents/${repoId}/${folderId}/${name}/${uuid}`
                const result = await axios.post(`${Liferay?.ThemeDisplay?.getPortalURL()}/o/c/beers/`, formData, {
                    headers: {
                        "accept": "application/json", "Content-Type": "application/json", "x-csrf-token": Liferay.authToken
                    }
                });
                setData([...data, result.data])
                onClose();
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
