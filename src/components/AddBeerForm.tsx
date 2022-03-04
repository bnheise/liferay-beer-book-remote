import React, { useEffect, useState } from 'react'
import ClayForm, { ClayInput } from '@clayui/form';
import { NewBeer } from '../dto/newBeerForm';
import { ListType } from '../dto/style';
import { ClaySelect } from '@clayui/form';

type Props = {
    handleSubmission: (selectedFile: File) => void
    formData: NewBeer,
    setFormData: React.Dispatch<React.SetStateAction<NewBeer>>,
    Liferay: any;
}

interface Option {
    value: string,
    label: string,
}

const AddBeerForm = (props: Props) => {
    const { Liferay } = props;
    const [selectedFile, setSelectedFile] = useState<File>();
    const [isFilePicked, setIsFilePicked] = useState(false);
    const [styleOptions, setStyleOptions] = useState<Option[]>();
    const { setFormData } = props;
    const { name, aBV, eBC, iBU, price, style, brewer, imageUrl } = props.formData;

    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event && event.target && event.target.files) {
            setSelectedFile(event?.target?.files[0]);
            setIsFilePicked(true);
        }
    };

    useEffect(() => {
        if (Liferay.Service) {
            Liferay.Service(
                '/listtype.listtypeentry/get-list-type-entries',
                {
                    listTypeDefinitionId: 43845,
                    start: 0,
                    end: 2
                },
                function (response: ListType[]) {
                    setStyleOptions(response.map(item => ({ value: item.key, label: item.nameCurrentValue })));
                }
            );
        }
    })

    const changeName = (event: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...props.formData, name: event.target.value })
    const changeBrewer = (event: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...props.formData, brewer: event.target.value })
    const changeABV = (event: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...props.formData, aBV: Number(event.target.value) })
    const changeEBC = (event: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...props.formData, eBC: Number(event.target.value) })
    const changeIBU = (event: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...props.formData, iBU: Number(event.target.value) })
    const changePrice = (event: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...props.formData, price: Number(event.target.value) })
    const changeStyle = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setFormData({ ...props.formData, style: { key: event.target.value } })
    }


    return (
        <ClayForm>
            <ClayForm.Group className="form-group-sm">
                <label htmlFor="basicInput">Name</label>
                <ClayInput onChange={changeName} placeholder="Name" value={name} type="text"></ClayInput>
            </ClayForm.Group>
            <ClayForm.Group className="form-group-sm">
                <label htmlFor="basicInput">Brewer</label>
                <ClayInput onChange={changeBrewer} placeholder="Brewer" value={brewer} type="text"></ClayInput>
            </ClayForm.Group>
            <ClayForm.Group className="form-group-sm">
                <label htmlFor="basicInput">EBC</label>
                <ClayInput onChange={changeEBC} placeholder="EBC rating" type="number" value={eBC}></ClayInput>
            </ClayForm.Group>
            <ClayForm.Group className="form-group-sm">
                <label htmlFor="basicInput">IBU</label>
                <ClayInput onChange={changeIBU} placeholder="International bittering units" type="number" value={iBU}></ClayInput>
            </ClayForm.Group>
            <ClayForm.Group className="form-group-sm">
                <label htmlFor="basicInput">ABV</label>
                <ClayInput onChange={changeABV} placeholder="Alcohol by volume" type="number" value={aBV}></ClayInput>
            </ClayForm.Group>
            <ClayForm.Group className="form-group-sm">
                <label htmlFor="basicInput">Price</label>
                <ClayInput onChange={changePrice} placeholder="Price" type="text" value={price}></ClayInput>
            </ClayForm.Group>
            <ClayForm.Group className="form-group-sm">
                <label htmlFor="basicInput">Style</label>
                <ClaySelect onChange={changeStyle} style={{ marginBottom: "16px" }} aria-label="Select Label" id="mySelectId">
                    {styleOptions?.map(item => (
                        <ClaySelect.Option
                            key={item.value}
                            label={item.label}
                            value={item.value}
                        />
                    ))}
                </ClaySelect>
            </ClayForm.Group>
            <ClayForm.Group className="form-group-sm">
                <label htmlFor="basicInput">Upload image: </label>
                <input type="file" name="file" onChange={changeHandler} />
            </ClayForm.Group>
        </ClayForm>
    )
}

export default AddBeerForm