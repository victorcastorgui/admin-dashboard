import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../config";
import { useFetch } from "../../hooks/useFetch";
import { ProductType } from "../../types/types";
import MultiStepFirst from "../MultiStep/MultiStepFirst";
import MultiStepSecond from "../MultiStep/MultiStepSecond";
import MultiStepThird from "../MultiStep/MultiStepThird";

const ProductAdd = () => {
  const navigate = useNavigate();
  const [count, setCount] = useState<number>(1);
  const { fetchData } = useFetch<ProductType>();
  const [formData, setFormData] = useState<ProductType>({
    name: "",
    price: 0,
    discount: 0,
    weight: 0,
    length: 0,
    width: 0,
    category: "",
    caseDetail: "",
    dial: "",
    hand: "",
    material: "",
    importantNote: "",
    movement: "",
    model: [],
  });

  const URL = `${API_URL}/products`;
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleNextPage = () => {
    setCount((prevStep) => prevStep + 1);
  };

  const handlePrevPage = () => {
    setCount((prevStep) => prevStep - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchData(URL, options);
    console.log("Submitted", formData);
    navigate("/product");
  };

  return (
    <form onSubmit={handleSubmit}>
      {count === 1 && (
        <MultiStepFirst
          formData={formData}
          handleChange={handleChange}
          handleSelectChange={handleSelectChange}
          nextStep={handleNextPage}
        />
      )}
      {count === 2 && (
        <MultiStepSecond
          formData={formData}
          setFormData={setFormData}
          prevStep={handlePrevPage}
          nextStep={handleNextPage}
        />
      )}
      {count === 3 && (
        <MultiStepThird
          formData={formData}
          handleTextAreaChange={handleTextAreaChange}
          prevStep={handlePrevPage}
          handleSubmit={handleSubmit}
        />
      )}
    </form>
  );
};

export default ProductAdd;
