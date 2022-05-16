import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import { Modal, Table } from "antd";
import axios from "axios";
import moment from "moment";

const Data = () => {
  const [state, setState] = useState({
    data: [],
    refresh: false,
    editRow: null,
    showEditModal: false,
  });

  // delete user
  const handleDelete = (id) => {
    Modal.confirm({
      title: "Are you sure delete this user?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: () => {
        axios
          .delete(`http://0.0.0.0:5000/api/user_delete/${id}`)
          .then((res) => {
            setState({
              ...state,
              refresh: !state.refresh,
            });
          })
          .catch((err) => {
            console.log(err);
            Modal.error({
              title: "Error",
              content: "Something went wrong",
            });
          });
      },
    });
  };

  // handle edit
  const handleEdit = (id, email) => {
    setState({
      ...state,
      editRow: {
        id: id,
        email: email,
      },
      showEditModal: true,
    });
  };

  // confirm edit
  const confirmEdit = (e) => {
    e.preventDefault();
    const { email, password } = e.target;
    axios
      .put(`http://0.0.0.0:5000/api/user_update/${state.editRow.id}`, {
        email: email.value,
        password: password.value,
      })
      .then((res) => {
        if (res.status == 201) {
          Modal.success({
            title: "Success",
            content: "User updated successfully",
            onOk: () => {
              setState({
                ...state,
                refresh: !state.refresh,
                showEditModal: false,
              });
            },
          });
        }
      })
      .catch((err) => {
        Modal.error({
          title: "Error",
          content: "Something went wrong",
          onOk: () => {
            setState({
              ...state,
              refresh: !state.refresh,
              showEditModal: false,
            });
          },
        });
      });
  };

  const columns = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "createdAt",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => {
        return moment(createdAt).format("DD/MM/YYYY hh:mm");
      },
    },
    {
      title: "action",
      dataIndex: "action",
      key: "action",
      render: (t, r, i) => {
        return (
          <div className="w-120px flex">
            <button
              className="h-6 bg-green-500 text-white flex justify-center items-center flex-1"
              onClick={() => {
                handleEdit(r.id, r.email);
              }}
            >
              {"edit"}
            </button>
            <button
              className="h-6 bg-red-500 text-white flex justify-center items-center flex-1"
              onClick={() => handleDelete(r.id)}
            >
              {"delete"}
            </button>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    axios("http://localhost:5000/api/user_read").then((res) => {
      setState({
        ...state,
        data: res.data,
      });
    });
  }, [state.refresh]);

  if (state.showEditModal) {
    return (
      <main className="w-screen h-screen bg-gray-500 flex flex-col justify-center items-center">
        <form
          className="w-[300px] p-6 bg-white shadow-lg flex flex-col gap-4"
          onSubmit={confirmEdit}
        >
          <div className="form_group w-full flex flex-col gap-2">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="p-2 border-[.5px] border-gray-500"
              id="email"
              name="email"
              defaultValue={state.editRow.email}
            />
          </div>

          <div className="form_group w-full flex flex-col gap-2">
            <label htmlFor="password">password</label>
            <input
              type="password"
              className="p-2 border-[.5px] border-gray-500"
              id="password"
              name="password"
            />
          </div>
          <div className="btn_group w-full flex">
            <button
              className="bg-blue-500 text-white h-10 flex-1"
              type="submit"
            >
              {"save"}
            </button>
            <button
              className="bg-gray-200 text-gray-500 h-10 flex-1"
              onClick={() => setState({ ...state, showEditModal: false })}
            >
              {"cancel"}
            </button>
          </div>
        </form>
      </main>
    );
  }

  return (
    <Layout>
      <main className="w-screen h-screen flex flex-col justify-start p-12 items-start bg-slate-100">
        <Table
          columns={columns}
          dataSource={state.data}
          className="w-full "
          rowKey={"id"}
        />
      </main>
    </Layout>
  );
};

export default Data;
