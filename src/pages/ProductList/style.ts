import styled from "styled-components";

export const PageLayout = styled.div`
  margin-left: 16.7rem;
  padding-top: 3rem;
  height: 100vh;
`;
export const ProductListContainer = styled.div`
  width: 80%;
  margin: auto;
  display: flex;
  justify-content: space-between;
`;

export const ProductListTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
`;

export const AddProductButton = styled.button`
  border-radius: 0.5rem;
  background: ${(props) => props.theme.primary};
  color: white;
  width: 7rem;
  height: 2.375rem;
  border: none;
`;

export const ProductListSearchForm = styled.form``;
export const ProductListSearchInput = styled.input`
  width: 15.0625rem;
  height: 2.25rem;
  border-radius: 0.5rem;
  border: 0.3px solid ${(props) => props.theme.textSecondary};
  padding: 0.75rem;
`;

export const Table = styled.table`
  width: 80%;
  margin: auto;
  border-radius: 0.5rem;
  border: 1px solid #e4e4ef;
  border-collapse: collapse;
  margin-top: 1rem;
  background-color: white;
`;

export const TableR = styled.tr`
  text-align: center;
`;
export const TableH = styled.th`
  border: 1px solid #e4e4ef;
  color: black;
  &.row {
    width: 10rem;
  }
`;
export const TableContent = styled.td`
  border: 1px solid #e4e4ef;
  color: black;
  &.row {
    display: flex;
    justify-content: space-around;
  }
`;
export const ModalContainer = styled.div`
  background-color: rgba(36, 32, 35, 0.5);
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 1;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalContent = styled.div`
  width: 37.6875rem;
  height: 12.4375rem;
  border-radius: 0.5rem;
  background: #f7f6f4;
`;

export const ModalTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 400;
  color: ${(props) => props.theme.primary};
  margin-top: 1.32rem;
  margin-left: 1.44rem;
  margin-right: 1.44rem;
`;
export const ButtonContainer = styled.div`
  display: flex;
  gap: 0.69rem;
  justify-content: end;
  margin-top: 0.31rem;
  margin-left: 1.44rem;
  margin-right: 1.44rem;
  &.pagination {
    margin-top: 2rem;
    justify-content: center;
  }
`;
export const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 5.75rem;
  height: 1.8125rem;
  padding: 0.75rem;
  border-radius: 0.5rem;
  background: ${(props) => props.theme.primary};
  border: 1px solid black;
  color: white;
  &.cancel {
    border: 2px solid #d84727;
    background: none;
    color: black;
  }
  &.pagination {
    color: black;
    background: white;
    width: auto;
  }
`;

export const Container = styled.div`
  border-top: 1px solid #bababa;
  border-bottom: 1px solid #bababa;
  display: flex;
  height: 6.56rem;
  justify-content: center;
  align-items: center;
`;

export const ProductHeadingRight = styled.div`
  display: flex;
  gap: 0.81rem;
`;
