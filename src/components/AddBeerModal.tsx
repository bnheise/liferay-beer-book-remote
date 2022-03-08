import React, { useState } from "react";
import ClayButton from "@clayui/button";
import ClayModal, { useModal } from "@clayui/modal";
import AddBeerForm from "./AddBeerForm";
import { emptyBeer, NewBeer } from "../interfaces/newBeerForm";
import { components } from "../api/schema";
import { postImage } from "../api/image";
import { IImageData } from "../interfaces/image";
import { postBeer } from "../api/beers";

type Props = {
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
    visible: boolean;
    data: any;
    setData: React.Dispatch<components["schemas"]["Beer"][]>;
    folderId: string;
    repoId: string;
    styleListId: string;
};

const AddBeerModal = ({
    setVisible,
    visible,
    data,
    setData,
    folderId,
    repoId,
    styleListId
}: Props) => {
    const { observer, onClose } = useModal({
        onClose: () => setVisible(false),
    });

    const [selectedFile, setSelectedFile] = useState<File>();
    const [isFilePicked, setIsFilePicked] = useState(false);
    const [formData, setFormData] = useState<NewBeer>(emptyBeer);

    const handleSubmission = async () => {
        if (selectedFile) {
            try {

                const { uuid, name: filename }: IImageData = await postImage(selectedFile, formData.name, repoId, folderId);

                formData.imageUrl = `/documents/${repoId}/${folderId}/${filename}/${uuid}`

                const newBeer: components["schemas"]["Beer"] = await postBeer(formData);

                setData([...data, newBeer])
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
                    status="info"
                >
                    <ClayModal.Header>{"Add a new beer"}</ClayModal.Header>
                    <ClayModal.Body>
                        <AddBeerForm
                            selectedFile={selectedFile}
                            setSelectedFile={setSelectedFile}
                            isFilePicked={isFilePicked}
                            setIsFilePicked={setIsFilePicked}
                            formData={formData}
                            setFormData={setFormData}
                            styleListId={styleListId}
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
