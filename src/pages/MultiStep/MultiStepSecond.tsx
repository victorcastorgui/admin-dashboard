import React, { useState } from "react";
import styled from "styled-components";
import { Model, ProductType } from "../../types/types";

interface SecondStepProps {
  formData: ProductType;
  setFormData: React.Dispatch<React.SetStateAction<ProductType>>;
  prevStep: () => void;
  nextStep: () => void;
}

const MultiStepContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 65%;
  margin: auto;
  margin-left: 22rem;
  justify-content: center;
  height: 100vh;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
`;

const ModelTitle = styled.p`
  font-size: 1.25rem;
  font-weight: 600;
  color: black;
  &.item {
    font-weight: 400;
  }
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  color: black;
  &.upload {
    border-radius: 0.25rem;
    padding: 1rem;
    width: 3rem;
    height: 3rem;
    background-color: ${(props) => props.theme.primary};
  }
`;

const Input = styled.input`
  padding: 1rem;
  border-radius: 0.25rem;
  background: #f1f1f1;
  border: 0;
  &.image {
    display: none;
  }
`;

const ModelContainer = styled.div`
  border-radius: 0.5rem;
  border: 0.5px solid #000;
  padding: 2rem;
  background-color: white;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: end;
  margin-top: 2.81rem;
  margin-bottom: 3rem;
  gap: 1.44rem;
`;
const ImageContainer = styled.div`
  display: flex;
  gap: 0.61rem;
  overflow-y: scroll;
  align-items: center;
`;
const ImageItem = styled.div`
  display: flex;
  width: 12.5rem;
  height: 5.4375rem;
  border-radius: 0.25rem;
  background: #f1f1f1;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
`;
const Button = styled.button`
  display: flex;
  align-items: center;
  width: 7rem;
  height: 2.375rem;
  padding: 0.75rem 2.4375rem;
  background-color: ${(props) => props.theme.primary};
  color: white;
  border: 0;
  align-self: flex-end;
  &.add {
    margin-top: 2.38rem;
    padding: 0;
    justify-content: center;
  }
`;
const DeleteImage = styled.button`
  background-color: ${(props) => props.theme.primary};
  width: 2.40588rem;
  height: 2.1875rem;
  border: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Image = styled.img`
  width: 3.9375rem;
  height: 5.0625rem;
  &.upload {
    width: 1.3125rem;
    height: 1.5625rem;
  }
`;

const ErrorMessage = styled.p`
  color: red;
`;

const MultiStepSecond: React.FC<SecondStepProps> = ({
  formData,
  setFormData,
  prevStep,
  nextStep,
}) => {
  const [nameError, setNameError] = useState<string>("");
  const [stockError, setStockError] = useState<string>("");

  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const handleModelChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    index: number
  ) => {
    const { name, value } = e.target;
    validateName(value);
    const updatedModels = [...formData.model];
    updatedModels[index] = { ...updatedModels[index], [name]: value };
    setFormData({ ...formData, model: updatedModels });
  };

  const handleStockChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value } = e.target;
    validateStock(Number(value));
    const updatedModels = [...formData.model];
    updatedModels[index] = {
      ...updatedModels[index],
      stock: parseInt(value, 10),
    };
    setFormData({ ...formData, model: updatedModels });
  };

  const handleAddModel = () => {
    setImagePreviews([]);
    setFormData({
      ...formData,
      model: [...formData.model, { name: "", photos: [], stock: 1 }],
    });
  };

  const handleImageChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const files = e.target.files;

    if (files) {
      try {
        const selectedImages: string[] = [];

        for (let i = 0; i < files.length; i++) {
          const file = files[i];

          const formData = new FormData();
          formData.append("file", file);
          formData.append("upload_preset", "adminmatoa");

          const response = await fetch(
            "https://api.cloudinary.com/v1_1/adminmatoa/image/upload",
            {
              method: "POST",
              body: formData,
            }
          );

          const result = await response.json();

          selectedImages.push(result.secure_url);
        }

        setImagePreviews([...imagePreviews, ...selectedImages]);
        const updatedModels = [...formData.model];
        updatedModels[index] = {
          ...updatedModels[index],
          photos: selectedImages,
        };
        setFormData({ ...formData, model: updatedModels });
      } catch (error) {
        console.error("Error uploading images to Cloudinary:", error);
      }
    }
  };

  const validateName = (value: string) => {
    if (value.length < 10) {
      setNameError("Name must have at least 10 characters");
    } else {
      setNameError("");
    }
  };

  const validateStock = (value: number) => {
    if (value < 1 || value > 99) {
      setStockError("Stock must be between 1 to 99");
    } else {
      setStockError("");
    }
  };

  const errorExists = !!nameError || !!stockError;

  return (
    <MultiStepContainer>
      <Title>ADD NEW PRODUCT 2/3</Title>
      {formData.model.map((model: Model, index: number) => (
        <ModelContainer key={index}>
          <ModelTitle>Model</ModelTitle>
          <Label>Model Name:</Label>
          <Input
            type="text"
            name="name"
            value={model.name}
            onChange={(e) => handleModelChange(e, index)}
            required
          />
          {nameError && <ErrorMessage>{nameError}</ErrorMessage>}
          <ModelTitle>Product Images:</ModelTitle>
          <Input
            className="image"
            type="file"
            accept=".png, .jpeg, .jpg"
            multiple
            onChange={(e) => handleImageChange(e, index)}
            required
            id="file-input"
            name="photos"
          />
          <ImageContainer>
            {imagePreviews.map((preview, i) => (
              <ImageItem>
                <Image key={i} src={preview} alt={`Preview ${i}`} />
                <DeleteImage>
                  <Image
                    className="upload"
                    src="/src/assets/icons/delete.svg"
                    alt="delete icon"
                  />
                </DeleteImage>
              </ImageItem>
            ))}
            <Label className="upload" htmlFor="file-input">
              <img src="/src/assets/icons/upload.svg" alt="upload icon" />
            </Label>
          </ImageContainer>
          <Label>Stock:</Label>
          <Input
            type="number"
            name="stock"
            value={model.stock}
            onChange={(e) => handleStockChange(e, index)}
            required
          />
          {stockError && <ErrorMessage>{stockError}</ErrorMessage>}
        </ModelContainer>
      ))}

      <Button onClick={handleAddModel}>Add Model</Button>
      <ButtonContainer>
        <Button onClick={prevStep}>Back</Button>
        <Button onClick={nextStep} disabled={errorExists}>
          Next
        </Button>
      </ButtonContainer>
    </MultiStepContainer>
  );
};

export default MultiStepSecond;
