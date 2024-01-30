import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { API_URL } from "../../config";
import { useFetch } from "../../hooks/useFetch";
import { ProductType } from "../../types/types";

interface ThirdStepProps {
  formData: {
    caseDetail: string;
    dial: string;
    hand: string;
    material: string;
    importantNote: string;
    movement: string;
  };
  handleTextAreaChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  prevStep: () => void;
  handleSubmit: (e: React.FormEvent) => void;
}

const MultiStepContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 65%;
  margin: auto;
  margin-left: 22rem;
  justify-content: center;
  min-height: 100vh;
  padding-top: 4rem;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
`;

const Detail = styled.p`
  font-size: 1.25rem;
  font-weight: 600;
  margin-top: 1.12rem;
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const Input = styled.textarea`
  padding: 1rem;
  height: 8rem;
  border-radius: 0.25rem;
  background: #f1f1f1;
  border: 0;
  box-sizing: border-box;
  resize: none;
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
`;

const InputSubmit = styled.input`
  width: 7rem;
  height: 2.375rem;
  background-color: ${(props) => props.theme.primary};
  color: white;
  border: 0;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: end;
  margin-top: 5rem;
  margin-bottom: 3rem;
  gap: 1.44rem;
`;
const ErrorMessage = styled.p`
  color: red;
`;
const MultiStepThird: React.FC<ThirdStepProps> = ({
  formData,
  handleTextAreaChange,
  prevStep,
  handleSubmit,
}) => {
  const [materialError, setMaterialError] = useState<string>("");
  const [caseError, setCaseError] = useState<string>("");
  const [movementError, setMovementError] = useState<string>("");
  const [dialError, setDialError] = useState<string>("");
  const [handError, setHandError] = useState<string>("");
  const [importantError, setImportantError] = useState<string>("");

  const validateInput = (value: string, type: string) => {
    if (value.length < 5 || value.length > 500) {
      switch (type) {
        case "material":
          setMaterialError(
            "Input must be more than 5 characters and less than 500 characters"
          );
          break;
        case "caseDetail":
          setCaseError(
            "Input must be more than 5 characters and less than 500 characters"
          );
          break;
        case "movement":
          setMovementError(
            "Input must be more than 5 characters and less than 500 characters"
          );
          break;
        case "dial":
          setDialError(
            "Input must be more than 5 characters and less than 500 characters"
          );
          break;
        case "hand":
          setHandError(
            "Input must be more than 5 characters and less than 500 characters"
          );
          break;
        case "importantNote":
          setImportantError(
            "Input must be more than 5 characters and less than 500 characters"
          );
          break;
      }
    } else {
      switch (type) {
        case "material":
          setMaterialError("");
          break;
        case "caseDetail":
          setCaseError("");
          break;
        case "movement":
          setMovementError("");
          break;
        case "dial":
          setDialError("");
          break;
        case "hand":
          setHandError("");
          break;
        case "importantNote":
          setImportantError("");
          break;
      }
    }
  };

  const errorExists =
    !!materialError ||
    !!dialError ||
    !!movementError ||
    !!handError ||
    !!importantError ||
    !!caseError;

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    handleTextAreaChange(e);

    switch (name) {
      case "material":
      case "caseDetail":
      case "movement":
      case "hand":
      case "dial":
      case "importantNote":
        validateInput(value, name);
        break;
      default:
        break;
    }
  };

  const { id } = useParams();

  const { data, fetchData } = useFetch<ProductType>();

  useEffect(() => {
    const URL = `${API_URL}/products/${id}`;
    const options = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetchData(URL, options);
  }, []);

  return (
    <MultiStepContainer>
      <Title>EDIT PRODUCT 3/3</Title>
      <Detail>DETAIL</Detail>
      <Label>
        Material
        <Input
          name="material"
          placeholder="ex: kayu jadi mod"
          value={formData.material || data?.material}
          onChange={handleInputChange}
          required
        />
        {materialError && <ErrorMessage>{materialError}</ErrorMessage>}
      </Label>
      <Label>
        Case
        <Input
          name="caseDetail"
          placeholder="ex: kayu jadi mod"
          value={formData.caseDetail || data?.caseDetail}
          onChange={handleInputChange}
          required
        />
        {caseError && <ErrorMessage>{caseError}</ErrorMessage>}
      </Label>
      <Label>
        Movement
        <Input
          name="movement"
          placeholder="ex: kayu jadi mod"
          value={formData.movement || data?.movement}
          onChange={handleInputChange}
          required
        />
        {movementError && <ErrorMessage>{movementError}</ErrorMessage>}
      </Label>
      <Label>
        Dial
        <Input
          name="dial"
          placeholder="ex: kayu jadi mod"
          value={formData.dial || data?.dial}
          onChange={handleInputChange}
          required
        />
        {dialError && <ErrorMessage>{dialError}</ErrorMessage>}
      </Label>
      <Label>
        Hand
        <Input
          name="hand"
          placeholder="ex: kayu jadi mod"
          value={formData.hand || data?.hand}
          onChange={handleInputChange}
          required
        />
        {handError && <ErrorMessage>{handError}</ErrorMessage>}
      </Label>
      <Label>
        Important Note
        <Input
          name="importantNote"
          placeholder="ex: kayu jadi mod"
          value={formData.importantNote || data?.importantNote}
          onChange={handleInputChange}
          required
        />
        {importantError && <ErrorMessage>{importantError}</ErrorMessage>}
      </Label>
      <ButtonContainer>
        <Button onClick={prevStep}>Prev</Button>
        <InputSubmit
          type="submit"
          value="Submit"
          onSubmit={handleSubmit}
          disabled={errorExists}
        />
      </ButtonContainer>
    </MultiStepContainer>
  );
};

export default MultiStepThird;
