import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { API_URL } from "../../config";
import { useFetch } from "../../hooks/useFetch";
import * as S from "./style";

interface DataItem {
  id: number;
  name: string;
  category: string;
  price: number;
  discount: number;
}
const ProductList = () => {
  const navigate = useNavigate();
  const handleAddProduct = () => {
    navigate("/product/add");
  };
  const handleDetail = (id: number) => {
    navigate(`/product/${id}`);
  };
  const handleEdit = (id: number) => {
    navigate(`/product/${id}/edit`);
  };

  const { data, fetchData, setData } = useFetch<DataItem[]>();
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [selectedItemName, setSelectedName] = useState<string>("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const { fetchData: delData } = useFetch();

  const [searchInput, setSearchInput] = useState<string>("");

  useEffect(() => {
    const URL = `${API_URL}/products`;
    const options = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    const searchParams = searchInput
      ? `?name_like=${encodeURIComponent(searchInput)}`
      : "";
    fetchData(`${URL}${searchParams}`, options);
  }, [searchInput]);

  const handleDeleteClick = (id: number, name: string) => {
    setSelectedItemId(id);
    setSelectedName(name);
    setIsModalOpen(true);
  };

  const handleDeleteCancel = () => {
    if (selectedItemId !== null) {
      setSelectedItemId(null);
    }
    setIsModalOpen(false);
  };

  const handleDeleteConfirm = () => {
    const URL = `${API_URL}/products/${selectedItemId}`;
    const options = {
      method: "DELETE",
    };
    delData(URL, options);
    const updatedData = (data || []).filter(
      (item) => item.id !== selectedItemId
    );
    setData(updatedData);
    setIsModalOpen(false);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data?.slice(indexOfFirstItem, indexOfLastItem);
  const IDRFormat = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  });

  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | null>(null);
  const handleSortByName = () => {
    const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newSortOrder);

    const sortedData = [...(data || [])].sort((a, b) => {
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();

      if (newSortOrder === "asc") {
        return nameA.localeCompare(nameB);
      } else {
        return nameB.localeCompare(nameA);
      }
    });
    setData(sortedData);
  };

  return (
    <S.PageLayout>
      <S.ProductListContainer>
        <S.ProductListTitle>PRODUCT LIST</S.ProductListTitle>
        <S.ProductHeadingRight>
          <S.AddProductButton onClick={handleAddProduct}>
            Add Product
          </S.AddProductButton>
          <S.ProductListSearchForm>
            <S.ProductListSearchInput
              type="text"
              placeholder="Search by name"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            ></S.ProductListSearchInput>
          </S.ProductListSearchForm>
        </S.ProductHeadingRight>
      </S.ProductListContainer>
      <div>
        <S.Table>
          <thead>
            <S.TableR>
              <S.TableH>ID</S.TableH>
              <S.TableH onClick={handleSortByName}>Name</S.TableH>
              <S.TableH>Category</S.TableH>
              <S.TableH>Prices</S.TableH>
              <S.TableH>Discount</S.TableH>
              <S.TableH className="row"></S.TableH>
            </S.TableR>
          </thead>
          {currentItems &&
            currentItems?.map((item) => (
              <tbody key={item.id}>
                <S.TableR key={item.id}>
                  <S.TableContent>{item.id}</S.TableContent>
                  <S.TableContent>{item.name}</S.TableContent>
                  <S.TableContent>{item.category}</S.TableContent>
                  <S.TableContent>
                    {IDRFormat.format(item.price as number)}
                  </S.TableContent>
                  <S.TableContent>{item.discount}%</S.TableContent>
                  <S.TableContent className="row">
                    <img
                      onClick={() => handleEdit(item.id)}
                      src="/src/assets/icons/edit.svg"
                      alt="edit icon"
                    />
                    <img
                      onClick={() => handleDeleteClick(item.id, item.name)}
                      src="/src/assets/icons/trash.svg"
                      alt="delete icon"
                    />
                    <img
                      onClick={() => handleDetail(item.id)}
                      src="/src/assets/icons/menu.svg"
                      alt="menu icon"
                    />
                  </S.TableContent>
                </S.TableR>
              </tbody>
            ))}
        </S.Table>
      </div>
      {isModalOpen && (
        <S.ModalContainer>
          <S.ModalContent>
            <S.ModalTitle>
              Confirm Delete
              <p
                onClick={() => setIsModalOpen(false)}
                style={{ float: "right", cursor: "pointer" }}
              >
                &#9747;
              </p>
            </S.ModalTitle>
            <S.Container>
              <p style={{ fontSize: "1.25rem", color: "#666" }}>
                Are you sure you want to delete{" "}
                <span style={{ color: "#D84727" }}>{selectedItemName}</span> ?
              </p>
            </S.Container>
            <S.ButtonContainer>
              <S.Button onClick={handleDeleteConfirm}>Yes</S.Button>
              <S.Button className="cancel" onClick={handleDeleteCancel}>
                No
              </S.Button>
            </S.ButtonContainer>
          </S.ModalContent>
        </S.ModalContainer>
      )}
      <S.ButtonContainer className="pagination">
        {Array.from(
          { length: Math.ceil((data as DataItem[])?.length / itemsPerPage) },
          (_, index) => (
            <S.Button
              className="pagination"
              key={index}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </S.Button>
          )
        )}
      </S.ButtonContainer>
    </S.PageLayout>
  );
};

export default ProductList;
