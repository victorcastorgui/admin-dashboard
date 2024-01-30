import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { API_URL } from "../../config";
import { useFetch } from "../../hooks/useFetch";
import { ProductType } from "../../types/types";

const PageLayout = styled.div`
  margin-left: 16.7rem;
  padding-top: 3rem;
  height: 100vh;
`;

const DetailListContainer = styled.div`
  width: 80%;
  margin: auto;
  padding-bottom: 3rem;
`;

const Image = styled.img`
  width: 19.5625rem;
  &.not-active {
    width: 5.75rem;
    opacity: 0.5;
  }
  &.active {
    width: 5.75rem;
  }
`;

const ImageContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: end;
  margin-right: 5rem;
`;

const Information = styled.p`
  color: ${(props) => props.theme.textSecondary};
  font-size: 1.25rem;
  &.price {
    font-size: 1.5rem;
    color: black;
  }
  &.detail {
    color: ${(props) => props.theme.primary};
    font-size: 1.25rem;
    font-weight: 600;
  }
  &.info-title {
    margin-top: 1.75rem;
    font-size: 1.5rem;
  }
  &.info-content {
    margin-top: 0.5rem;
    font-size: 1rem;
    color: ${(props) => props.theme.textSecondary};
  }
`;
const Button = styled.button`
  width: 6.9375rem;
  height: 3.25rem;
  padding: 0.75rem;
  border-radius: 0.5rem;
  background: none border;
  border: 2px solid ${(props) => props.theme.primary};
  color: ${(props) => props.theme.primary};
`;

const ProductName = styled.h2`
  font-size: 3.75rem;
`;
const ProductDetail = () => {
  const { id } = useParams();
  const [mainPhoto, setMainPhoto] = useState<string>();
  const { data, fetchData } = useFetch<ProductType>();
  useEffect(() => {
    const URL = `${API_URL}/products/${id}`;
    const options = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetchData(URL, options);
  }, []);

  useEffect(() => {
    setMainPhoto(data?.model[0].photos[0]);
  }, [data]);
  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/product");
  };
  const IDRFormat = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  });

  return (
    <PageLayout>
      <ButtonContainer>
        <Button onClick={handleBack}>Back</Button>
      </ButtonContainer>
      <DetailListContainer>
        <ImageContainer>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {data &&
              data.model.map((value) => {
                return value.photos.map((photo) => {
                  return (
                    <Image
                      role="product-image"
                      className={photo !== mainPhoto ? "not-active" : "active"}
                      onClick={() => setMainPhoto(photo)}
                      key={photo}
                      src={photo}
                    />
                  );
                });
              })}
          </div>
          <Image src={mainPhoto} alt="test" />
          <div>
            <ProductName>{data?.name}</ProductName>
            <Information data-testid="paragraph">
              Disc {data?.discount}%
            </Information>
            <Information data-testid="paragraph" className="price">
              {IDRFormat.format(data?.price as number)}
            </Information>
            <Information data-testid="paragraph">
              quantity {data?.model[0].stock}
              <span style={{ color: "#D84727" }}> pcs</span>
            </Information>
          </div>
        </ImageContainer>
        <Information data-testid="paragraph" className="detail">
          Detail
        </Information>
        <Information data-testid="paragraph" className="info-title">
          Material
        </Information>
        <Information data-testid="paragraph" className="info-content">
          {data?.material}
        </Information>
        <Information data-testid="paragraph" className="info-title">
          Case
        </Information>
        <Information data-testid="paragraph" className="info-content">
          {data?.caseDetail}
        </Information>
        <Information data-testid="paragraph" className="info-title">
          Movement
        </Information>
        <Information data-testid="paragraph" className="info-content">
          {data?.movement}
        </Information>
        <Information data-testid="paragraph" className="info-title">
          Dial
        </Information>
        <Information data-testid="paragraph" className="info-content">
          {data?.dial}
        </Information>
        <Information data-testid="paragraph" className="info-title">
          Hand
        </Information>
        <Information data-testid="paragraph" className="info-content">
          {data?.hand}
        </Information>
        <Information data-testid="paragraph" className="info-title">
          Important to Note
        </Information>
        <Information data-testid="paragraph" className="info-content">
          {data?.importantNote}
        </Information>
      </DetailListContainer>
    </PageLayout>
  );
};

export default ProductDetail;
