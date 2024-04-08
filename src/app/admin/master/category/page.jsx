/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import Breadcrumb from "@/components/admin/breadcrumb";
import Image from "next/image";
import { use, useCallback, useEffect, useState } from "react";
import { dataNotFound } from "../../../../../public/assets";
import Loading from "@/components/admin/loading";
import ReactPaginate from "react-paginate";
import axios from "axios";
import moment from "moment";
import { apiUrl } from "../../../../../env";
import { successToast, errorToast } from "../../../../components/toster/index";
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchCategories } from '../../app/redux/slices/categorySlice';

export default function DashBoardPage() {
  //   const { theme } = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState({});
  const [modelToggle, setModelToggle] = useState(false);
  const [input, setInput] = useState({});
  const [image, setImage] = useState(null);
  const [addOrUpdate, serAddOrUpdate] = useState("");
  const [categoryId, sercategoryId] = useState("");
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);
  const [deleteId, setDeleteId] = useState([]);
  const [deleteToggle, setDeleteToggle] = useState(false);

  const addOrUpdateCatagoery = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (!input.name) {
      errorToast("Please enter category name");
      setIsLoading(false);
      return;
    } else if (!image && addOrUpdate === "add") {
      errorToast("Please select image");
      setIsLoading(false);
      return;
    }
    try {
      let formData = new FormData();
      formData.append("name", input.name);
      formData.append("image", image);
      formData.append("type", addOrUpdate);
      formData.append("categoryId", categoryId);

      let response = await axios.post(`${apiUrl}/admin/category`, formData);

      if (response.data.st === true) {
        getCategoryList();
        successToast(response.data.msg);
        setData(response.data.data);
        setIsLoading(false);
        setInput({});
        setImage(null);

        if (addOrUpdate === "update") {
          setModelToggle(false);
          sercategoryId("");
        }
      } else {
        errorToast(response.data.msg);
        setIsLoading(false);
      }
    } catch (error) {
      errorToast(error);
      setIsLoading(false);
    }
  };

  const handleCheckboxChange = (data) => {
    const indexToDelete = deleteId.indexOf(data);

    if (indexToDelete !== -1) {
      const newArrey = deleteId.filter((item, index) => item !== data);
      setDeleteId(newArrey);
    } else {
      setDeleteId([...deleteId, data]);
      console.log("else", deleteId);
    }
  };

  const deleteCategory = () => {
    try {
      axios
        .delete(`${apiUrl}/admin/category`, { data: { categoryIds: deleteId } })
        .then((response) => {
          if (response.data.st === true) {
            getCategoryList();
            successToast(response.data.msg);
            setDeleteToggle(false);
            setDeleteId([]);
          } else {
            errorToast(response.data.msg);
          }
        });
    } catch (error) {
      errorToast(error);
    }
  };

  const getCategoryList = async () => {
    setLoader(true);
    try {
      let response = await axios.get(
        `${apiUrl}/admin/category?page=${page}&limit=${perPage}`
      );

      if (response?.data.data) {
        setData(response?.data?.data);
        setPageCount(response?.data?.total_pages);
        setCurrentPage(response?.data?.current_page);

        setLoader(false);
      } else {
        setLoader(false);
      }
    } catch (error) {
      errorToast(error);
      setLoader(false);
    }
  };

  useEffect(() => {
    getCategoryList();
  }, [perPage, page]);

  return (
    <div className="row">
      <div className="col-lg-12 col-md-12 col-xl-12 col-xxl-12">
        {/* <Breadcrumb /> */}
        <div className="filter-section position flex justify-between items-center py-5">
          <div className="flex gap-5 filter-title font-sz-14 font-family">
            <p>Category</p>
            <div>
              {" "}
              <select
                value={perPage}
                onChange={(e) => setPerPage(Number(e.target.value))}
              >
                <option value={5}>5 per page</option>
                <option value={10}>10 per page</option>
                <option value={20}>20 per page</option>
              </select>
            </div>
          </div>
          <div className="flex gap-5">
            {" "}
            <button
              type="button"
              className="filter-btn flex gap-1"
              onClick={(e) => {
                setModelToggle(true);
                serAddOrUpdate("add");
              }}
            >
              Add
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                className="left-margin-10"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4.375 2.5H3.125V8.75H4.375V2.5ZM12 8.75H8L7.5 8.0625V6.8125L8 6.25H12L12.5 6.875V8.125L12 8.75ZM5.75 12.5H1.75L1.25 11.875V10.625L1.75 10H5.75L6.25 10.625V11.875L5.75 12.5ZM10.625 2.5H9.375V5H10.625V2.5ZM9.375 10H10.625V17.5H9.375V10ZM4.375 13.75H3.125V17.5H4.375V13.75ZM14.25 13.75H18.2375L18.7375 13.125V11.9375L18.2375 11.3125H14.25L13.75 11.9375V13.125L14.25 13.75ZM16.875 2.5H15.625V10H16.875V2.5ZM15.625 15H16.875V17.5H15.625V15Z"
                  fill="#CEA666"
                />
              </svg>
            </button>
            <button type="button" className="filter-btn flex gap-1">
              Delete Multiple
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                className="left-margin-10"
                onClick={(e) => {
                  if (deleteId.length > 0) {
                    setDeleteToggle(true);
                  } else {
                    errorToast("categorys not selected");
                  }
                }}
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4.375 2.5H3.125V8.75H4.375V2.5ZM12 8.75H8L7.5 8.0625V6.8125L8 6.25H12L12.5 6.875V8.125L12 8.75ZM5.75 12.5H1.75L1.25 11.875V10.625L1.75 10H5.75L6.25 10.625V11.875L5.75 12.5ZM10.625 2.5H9.375V5H10.625V2.5ZM9.375 10H10.625V17.5H9.375V10ZM4.375 13.75H3.125V17.5H4.375V13.75ZM14.25 13.75H18.2375L18.7375 13.125V11.9375L18.2375 11.3125H14.25L13.75 11.9375V13.125L14.25 13.75ZM16.875 2.5H15.625V10H16.875V2.5ZM15.625 15H16.875V17.5H15.625V15Z"
                  fill="#CEA666"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="table-section position mb-4">
          <table className="table w-full mb-0">
            <thead>
              <tr>
                <th
                  className="family px-6 py-3 text-start text-[--text-color] text-font12 whitespace-nowrap font-bold uppercase"
                  scope="col"
                >
                  NO
                </th>
                <th
                  className="family px-6 py-3 text-start text-[--text-color] text-font12 whitespace-nowrap font-bold uppercase"
                  scope="col"
                >
                  Name
                </th>
                <th
                  className="family px-6 py-3 text-start text-[--text-color] text-font12 whitespace-nowrap font-bold uppercase"
                  scope="col"
                >
                  CategoryId
                </th>
                <th
                  className="family px-6 py-3 text-start text-[--text-color] text-font12 whitespace-nowrap font-bold uppercase"
                  scope="col"
                >
                  image
                </th>
                <th
                  className="family px-6 py-3 text-start text-[--text-color] text-font12 whitespace-nowrap font-bold uppercase"
                  scope="col"
                >
                  createdAt
                </th>
                <th
                  className="family px-6 py-3 text-start text-[--text-color] text-font12 whitespace-nowrap font-bold uppercase"
                  scope="col"
                >
                  updatedAt
                </th>
                <th
                  className="family px-6 py-3 text-start text-[--text-color] text-font12 whitespace-nowrap font-bold uppercase"
                  scope="col"
                >
                  Delete
                </th>
                <th
                  className="family px-6 py-3 text-start text-[--text-color] text-font12 whitespace-nowrap font-bold uppercase"
                  scope="col"
                >
                  Update
                </th>
              </tr>
            </thead>
            <tbody>
              {loader ? (
                <tr>
                  <td colSpan={6} className="text-center">
                    <Loading />
                  </td>
                </tr>
              ) : data.length > 0 ? (
                <>
                  {data.map((item, index) => (
                    <tr key={index}>
                      <td className="family px-6 py-3 whitespace-nowrap text-font10 border-1 border-[--border] font-normal text-[--text-color] text-center">
                        {(currentPage - 1) * perPage + (index + 1)}
                      </td>
                      <td className="family px-6 py-3 whitespace-nowrap text-font10 border-1 border-[--border] font-normal text-[--text-color] text-center">
                        {item?.name}
                      </td>
                      <td className="family px-6 py-3 whitespace-nowrap text-font10 border-1 border-[--border] font-normal text-[--text-color] text-center">
                        {item?.id}
                      </td>
                      <td className="family px-6 py-3 whitespace-nowrap text-font10 border-1 border-[--border] font-normal text-[--text-color] text-center">
                        <Image
                          className="small-img"
                          width={100}
                          height={100}
                          src={`/catagory/${item?.image}`}
                          alt=""
                        />
                      </td>
                      <td className="family px-6 py-3 whitespace-nowrap text-font10 border-1 border-[--border] font-normal text-[--text-color] text-center">
                        {moment(item?.createdAt).format("DD-MM-YYYY HH:mm:ss")}
                      </td>
                      <td className="family px-6 py-3 whitespace-nowrap text-font10 border-1 border-[--border] font-normal text-[--text-color] text-center">
                        {" "}
                        {moment(item?.updatedAt).format("DD-MM-YYYY HH:mm:ss")}
                      </td>
                      <td className="family px-6 py-3 whitespace-nowrap text-font10 border-1 border-[--border] font-normal text-[--text-color] text-center">
                        <div>
                          <input
                            className="btn btn-danger"
                            type="checkbox"
                            // checked={isChecked}
                            onChange={(e) => handleCheckboxChange(item?.id)}
                          />
                        </div>
                      </td>
                      <td className="family px-6 py-3 whitespace-nowrap text-font10 border-1 border-[--border] font-normal text-[--text-color] text-center">
                        <button
                          type="button"
                          className="edit-btn"
                          aria-label="i"
                          onClick={(e) => {
                            sercategoryId(item?.id);
                            serAddOrUpdate("update");
                            setInput({
                              ...input,
                              name: item?.name,
                            });
                            setModelToggle(true);
                          }}
                        >
                          <i className="fa fa-pencil" aria-hidden="true"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </>
              ) : (
                <tr>
                  <td colSpan={6} className="text-center">
                    <div className="nodata">
                      <Image
                        width={100}
                        height={100}
                        src={dataNotFound}
                        alt=""
                      />
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="row">
            <div className="col-lg-12 col-md-12 col-xl-12 col-sm-12">
              <div id="pagination" className="mt-3">
                <div className="pagination-list">
                  <nav aria-label="Page navigation example">
                    <ReactPaginate
                      breakLabel="..."
                      breakClassName="page-item"
                      breakLinkClassName="page-link"
                      containerClassName="pagination justify-content-center"
                      pageClassName="page-item"
                      pageLinkClassName="page-link"
                      previousClassName="page-item"
                      previousLinkClassName="page-link"
                      nextClassName="page-item"
                      nextLinkClassName="page-link"
                      marginPagesDisplayed={2}
                      nextLabel={
                        <>
                          Next{" "}
                          <i
                            className="fa fa-angle-double-right"
                            aria-hidden="true"
                          ></i>
                        </>
                      }
                      onPageChange={(e) => setPage(e.selected + 1)}
                      pageRangeDisplayed={5}
                      pageCount={pageCount}
                      previousLabel={
                        <>
                          <i
                            className="fa fa-angle-double-left"
                            aria-hidden="true"
                          ></i>{" "}
                          Prev
                        </>
                      }
                      renderOnZeroPageCount={null}
                    />
                    <select
                      value={perPage}
                      onChange={(e) => setPerPage(Number(e.target.value))}
                    >
                      <option value={5}>5 per page</option>
                      <option value={10}>10 per page</option>
                      <option value={20}>20 per page</option>
                    </select>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div
          className={modelToggle ? "modal fade show " : "modal fade"}
          style={{ display: modelToggle ? "block" : "" }}
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5
                  className="modal-title font-sz-14-trans"
                  id="exampleModalLongTitle"
                ></h5>
                <button
                  type="button"
                  className="closec"
                  aria-label="span"
                  onClick={(e) => {
                    setInput({});
                    setImage(null);
                    setModelToggle(false);
                  }}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body p-4">
                <form method="post">
                  <div className="row">
                    <div className="form-group mb-2 col-md-12 col-lg-6">
                      <label
                        htmlFor="inputName"
                        className="font-sz-12 font-family mb-2"
                      >
                        category name
                      </label>
                      <input
                        value={input?.name ? input?.name : ""}
                        type="text"
                        className="form-control font-sz-14"
                        id="inputName"
                        placeholder="Name"
                        name="name"
                        onChange={(e) => {
                          setInput({
                            ...input,
                            [e.target.name]: e.target.value,
                          });
                        }}
                      />
                    </div>
                    <div className="form-group mb-2 col-md-12 col-lg-6">
                      <label
                        htmlFor="inputPhone"
                        className="font-sz-12 font-family mb-2"
                      >
                        image
                      </label>
                      <input
                        type="file"
                        className="form-control font-sz-14"
                        id="inputPhone"
                        name="file"
                        onChange={(e) => {
                          setImage(e.target.files[0]);
                        }}
                      />
                    </div>

                    <div className="form-group txt-center mt-3 col-md-12 col-lg-12">
                      <button
                        type="submit"
                        className="yellow-btn font-sz-14 float-lg-end float-sm-start"
                        disabled={isLoading}
                        onClick={(e) => {
                          addOrUpdateCatagoery(e);
                        }}
                      >
                        {isLoading
                          ? "Loading..."
                          : addOrUpdate === "add"
                          ? "Add"
                          : "Update"}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div>
            {" "}
            {modelToggle && (
              <div className=" overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-0rem)] max-h-full flex bg-black/50 transition-opacity duration-700 ">
                <div className="relative p-4 w-full max-w-[550px] max-h-full">
                  <div className="relative bg-white rounded-md shadow dark:bg-gray-700">
                    <div className="flex items-center justify-between p-4 md:p-5 rounded-t dark:border-gray-600">
                      <h3 className="text-font18 font-semibold text-[--text-color family capitalize">
                        HSN/ SAC Master
                      </h3>
                    </div>

                    <div className="p-4 md:p-5 modelshado m-4 mt-0 rounded-md rounded-b-none">
                      {/* <Formik
                        initialValues={initialValues}
                        validationSchema={hsnSchema}
                        onSubmit={async (values, actions) => {
                          try {
                            let formdata = new FormData();
                            formdata.append("platform", "WEB");
                            if (id !== 0) {
                              formdata.append("hsn_id", id);
                            }
                            formdata.append("code", values.code);
                            formdata.append("rate", values.rate);
                            formdata.append("description ", values.description);
                            let result = await axios.post(
                              Base_url + "iNeHSN",
                              formdata,
                              {
                                headers: {
                                  "Content-Type": "multipart/form-data",
                                  Authorization: `Bearer ${session.user.data.token.access}`,
                                },
                              }
                            );

                            if (result.data.message === "success") {
                              toast.success("Successfully");
                              shsnModal(false);
                              setReload(result);
                            } else if (
                              result.data.message === "HSN Code Already Exist"
                            ) {
                              toast.error("HSN Code Already Exist "); // Change from toast.success() to toast.error()
                            } else {
                              toast.error("HSN Code Already Exist");
                            }
                          } catch (error) {
                            console.error("Error:", error);
                          }
                        }}
                      >
                        {({ errors, touched }) => (
                          <Form className="max-w-sm mx-auto">
                            <Input
                              labelName="HSN/ SAC code"
                              inputName="code"
                              type="number"
                              errors={errors.code}
                              touched={touched.code}
                              star={true}
                            />
                            <Input
                              labelName="Tax rate (%)"
                              inputName="rate"
                              type="number"
                              errors={errors.rate}
                              touched={touched.rate}
                              star={true}
                            />
                            <Textarea
                              labelName="Description"
                              inputName="description"
                            />
                            <div className="gap-4 flex justify-center">
                              <button
                                type="button"
                                className="buttonUtils !font-medium !w-auto family"
                                onClick={() => {
                                  shsnModal(!close);
                                }}
                              >
                                cancel
                              </button>
                              <button
                                type="submit"
                                className="buttonUtils !font-medium !w-auto family"
                              >
                                Submit
                              </button>
                            </div>
                          </Form>
                        )}
                      </Formik> */}
                      <div className="modal-body p-4">
                        <form method="post">
                          <div className="row">
                            <div className="form-group mb-2 col-md-12 col-lg-6">
                              <label
                                htmlFor="inputName"
                                className="font-sz-12 font-family mb-2"
                              >
                                category name
                              </label>
                              <input
                                value={input?.name ? input?.name : ""}
                                type="text"
                                className="form-control font-sz-14"
                                id="inputName"
                                placeholder="Name"
                                name="name"
                                onChange={(e) => {
                                  setInput({
                                    ...input,
                                    [e.target.name]: e.target.value,
                                  });
                                }}
                              />
                            </div>
                            <div className="form-group mb-2 col-md-12 col-lg-6">
                              <label
                                htmlFor="inputPhone"
                                className="font-sz-12 font-family mb-2"
                              >
                                image
                              </label>
                              <input
                                type="file"
                                className="form-control font-sz-14"
                                id="inputPhone"
                                name="file"
                                onChange={(e) => {
                                  setImage(e.target.files[0]);
                                }}
                              />
                            </div>

                            <div className="form-group txt-center mt-3 col-md-12 col-lg-12">
                              <button
                                type="submit"
                                className="yellow-btn font-sz-14 float-lg-end float-sm-start"
                                disabled={isLoading}
                                onClick={(e) => {
                                  addOrUpdateCatagoery(e);
                                }}
                              >
                                {isLoading
                                  ? "Loading..."
                                  : addOrUpdate === "add"
                                  ? "Add"
                                  : "Update"}
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                      <div className="gap-4 flex justify-center">
                        <button
                          type="button"
                          className="buttonUtils !font-medium !w-auto family"
                          onClick={() => {
                            setModelToggle(!modelToggle);
                          }}
                        >
                          cancel
                        </button>
                        <button
                          type="submit"
                          className="buttonUtils !font-medium !w-auto family"
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* <div
          className={deleteToggle ? "modal fade show " : "modal fade"}
          style={{ display: deleteToggle ? "block" : "" }}
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5
                  className="modal-title font-sz-14-trans"
                  id="exampleModalLongTitle"
                ></h5>
                <button
                  type="button"
                  className="closec"
                  aria-label="span"
                  onClick={(e) => {
                    setDeleteToggle(false);
                  }}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body p-4">
                <div className="row">
                  <div className="form-group mb-2 col-md-12 col-lg-6">
                    <label
                      htmlFor="inputName"
                      className="font-sz-12 font-family mb-2"
                    >
                      Are you sure you want to delete this category?
                    </label>
                  </div>

                  <div className="form-group txt-center mt-3 col-md-12 col-lg-12">
                    <button
                      type="button"
                      className="yellow-btn font-sz-14 float-lg-end float-sm-start"
                      disabled={isLoading}
                      onClick={(e) => {
                        deleteCategory(e);
                      }}
                    >
                      {isLoading
                        ? "Loading..."
                        : addOrUpdate === "add"
                        ? "Add"
                        : "Update"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}
