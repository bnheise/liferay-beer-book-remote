import React, { useEffect, useState } from "react";
import ClayButton from "@clayui/button";
import ClayModal, { useModal } from "@clayui/modal";
import AddBeerForm from "./AddBeerForm";
import { emptyBeer } from "../interfaces/newBeerForm";
import { components } from "../api/schema";
import { postImage } from "../api/image";
import { IImageData } from "../interfaces/image";
import { deleteBeer, saveBeer } from "../api/beers";

type Props = {
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
    visible: boolean;
    data: components["schemas"]["Beer"][] | undefined;
    setData: React.Dispatch<components["schemas"]["Beer"][]>;
    folderId: string;
    repoId: string;
    styleListId: string;
    selectedBeer?: components["schemas"]["Beer"]
};

const AddBeerModal = ({
    setVisible,
    visible,
    data,
    setData,
    folderId,
    repoId,
    styleListId,
    selectedBeer
}: Props) => {
    const [selectedFile, setSelectedFile] = useState<File>();
    const [isFilePicked, setIsFilePicked] = useState(false);
    const [formData, setFormData] = useState<components["schemas"]["Beer"]>(selectedBeer || emptyBeer);

    const { observer, onClose } = useModal({
        onClose: () => {
            setVisible(false);
            setFormData(emptyBeer);
        },
    });

    const deleteHandler = async () => {
        const id = formData.id;
        try {
            await deleteBeer(formData);
            if (data) {
                const newData = data.reduce((arr: components["schemas"]["Beer"][], item) => {
                    if (item.id !== id) arr.push(item);
                    return arr;
                }, [])
                setData(newData);
            }
            onClose()
        } catch (e) {
            console.log(e)
        }

    }

    useEffect(() => {
        if (selectedBeer) setFormData(selectedBeer);
    }, [selectedBeer])

    const handleSubmission = async () => {
        if (selectedFile) {
            try {
                if (selectedFile) {
                    const { uuid, name: filename }: IImageData = await postImage(selectedFile, formData.name || "", repoId, folderId);
                    formData.imageUrl = `/documents/${repoId}/${folderId}/${filename}/${uuid}`
                }

                const savedBeer: components["schemas"]["Beer"] = await saveBeer(formData, selectedBeer?.id);
                if (selectedBeer) {
                    const updateIndex: number = data?.findIndex(item => item.id === savedBeer.id) || -1;
                    if (data) {
                        data[updateIndex] = savedBeer;
                        setData(data);
                    }
                } else {
                    if (data) setData([...data, savedBeer])
                }

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
                    <ClayModal.Header>{selectedBeer?.id ? "Update this beer" : "Add a new beer"}</ClayModal.Header>
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
                        first={
                            selectedBeer?.id ?
                                <ClayButton onClick={deleteHandler} displayType="danger">
                                    {"Delete"}
                                </ClayButton> : <></>
                        }
                    />
                </ClayModal>
            )}
        </>
    );
};
export default AddBeerModal;
