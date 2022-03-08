import React, { useEffect, useState } from 'react'
import ClayForm, { ClayInput, ClaySelect } from '@clayui/form';
import { Option } from '../interfaces/option';
import { getStyles } from '../api/styles';
import { components } from '../api/schema';

type Props = {
    formData: components["schemas"]["Beer"],
    setFormData: React.Dispatch<React.SetStateAction<components["schemas"]["Beer"]>>,
    selectedFile: File | undefined,
    setSelectedFile: React.Dispatch<React.SetStateAction<File | undefined>>,
    isFilePicked: boolean,
    setIsFilePicked: React.Dispatch<React.SetStateAction<boolean>>,
    styleListId: string
}

const AddBeerForm = (props: Props) => {
    const { styleListId, setSelectedFile, setIsFilePicked, formData, setFormData } = props;
    const [styleOptions, setStyleOptions] = useState<Option[]>();
    const { name, aBV, eBC, iBU, price, brewer } = formData;

    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event && event.target && event.target.files) {
            setSelectedFile(event?.target?.files[0]);
            setIsFilePicked(true);
        }
    };

    useEffect(() => getStyles(styleListId, setStyleOptions), []);

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