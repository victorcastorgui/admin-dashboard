import { useState } from "react";
import { styled } from "styled-components";

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

const FormContainer = styled.div`
  margin-top: 1rem;
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  &.second-row {
    grid-template-columns: 1fr 1fr;
    gap: 1.38rem;
  }
  &.third-row {
    grid-template-columns: repeat(3, 1fr);
    gap: 1.75rem;
  }
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Input = styled.input`
  padding: 1rem;
  border-radius: 0.25rem;
  background: #f1f1f1;
  border: 0;
`;

const Select = styled.select`
  padding: 0.75rem;
  border-radius: 0.3125rem;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background: #f1f1f1;
  box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.05);
`;

const Option = styled.option`
  border-radius: 0.3125rem;
  background: #f1f1f1;
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
  margin-top: 5rem;
  align-self: flex-end;
`;

const ErrorMessage = styled.p`
  color: red;
`;

interface FirstStepProps {
  formData: {
    name: string;
    price: number;
    weight: number;
    width: number;
    length: number;
    discount: number;
    category: string;
  };
  handleSelectChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  nextStep: () => void;
}

const MultiStepFirst: React.FC<FirstStepProps> = ({
  formData,
  handleChange,
  handleSelectChange,
  nextStep,
}) => {
  const [nameError, setNameError] = useState<string>("");
  const [priceError, setPriceError] = useState<string>("");
  const [discountError, setDiscountError] = useState<string>("");
  const [weightError, setWeightError] = useState<string>("");
  const [lengthError, setLengthError] = useState<string>("");
  const [widthError, setWidthError] = useState<string>("");

  const validateName = (value: string) => {
    if (value.length < 10) {
      setNameError("Name must have at least 10 characters");
    } else {
      setNameError("");
    }
  };

  const validatePrice = (value: number) => {
    if (value < 100 || value > 999999999) {
      setPriceError("Price must be between 100 and 999,999,999");
    } else {
      setPriceError("");
    }
  };

  const validateDiscount = (value: number) => {
    if (value < 1 || value > 100) {
      setDiscountError("Discount must be between 1 and 100");
    } else {
      setDiscountError("");
    }
  };

  const validateDimension = (value: number, dimension: string) => {
    if (value < 1 || value > 99) {
      switch (dimension) {
        case "weight":
          setWeightError("Weight must be between 1 and 99");
          break;
        case "length":
          setLengthError("Length must be between 1 and 99");
          break;
        case "width":
          setWidthError("Width must be between 1 and 99");
          break;
        default:
          break;
      }
    } else {
      switch (dimension) {
        case "weight":
          setWeightError("");
          break;
        case "length":
          setLengthError("");
          break;
        case "width":
          setWidthError("");
          break;
        default:
          break;
      }
    }
  };

  const errorExists =
    !!nameError ||
    !!priceError ||
    !!discountError ||
    !!weightError ||
    !!lengthError ||
    !!widthError;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    handleChange(e);

    switch (name) {
      case "name":
        validateName(value);
        break;
      case "price":
        validatePrice(Number(value));
        break;
      case "discount":
        validateDiscount(Number(value));
        break;
      case "weight":
      case "length":
      case "width":
        validateDimension(Number(value), name);
        break;
      default:
        break;
    }
  };

  return (
    <MultiStepContainer>
      <Title>ADD NEW PRODUCT 1/3</Title>
      <FormContainer>
        <Label>
          Product Name
          <Input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter product name..."
            required
          />
          {nameError && <ErrorMessage>{nameError}</ErrorMessage>}
        </Label>
        <FormContainer className="second-row">
          <Label>
            Price
            <Input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              placeholder="20000"
              required
            />
            {priceError && <ErrorMessage>{priceError}</ErrorMessage>}
          </Label>
          <Label>
            Discount
            <Input
              type="number"
              name="discount"
              value={formData.discount}
              onChange={handleInputChange}
              required
            />
            {discountError && <ErrorMessage>{discountError}</ErrorMessage>}
          </Label>
        </FormContainer>
        <FormContainer className="third-row">
          <Label>
            Weight
            <Input
              type="number"
              name="weight"
              value={formData.weight}
              onChange={handleInputChange}
              required
            />
            {weightError && <ErrorMessage>{weightError}</ErrorMessage>}
          </Label>
          <Label>
            Length
            <Input
              type="number"
              name="length"
              value={formData.length}
              onChange={handleInputChange}
              required
            />
            {lengthError && <ErrorMessage>{lengthError}</ErrorMessage>}
          </Label>
          <Label>
            Width
            <Input
              type="number"
              name="width"
              value={formData.width}
              onChange={handleInputChange}
              required
            />
            {widthError && <ErrorMessage>{widthError}</ErrorMessage>}
          </Label>
        </FormContainer>
        <Label>
          Category
          <Select
            name="category"
            value={formData.category}
            onChange={handleSelectChange}
            required
          >
            <Option>Choose Category</Option>
            <Option value={"Digital Watches"}>Digital Watches</Option>
            <Option value={"Classic Watches"}>Classic Watches</Option>
            <Option value={"Smart Watches"}>Smart Watches</Option>
          </Select>
        </Label>
      </FormContainer>
      <Button type="button" onClick={nextStep} disabled={errorExists}>
        Next
      </Button>
    </MultiStepContainer>
  );
};

export default MultiStepFirst;
