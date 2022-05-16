import { Modal } from "antd";
import React from "react";
import Layout from "./Layout";
import axios from "axios";
import blob from "../assets/blob.svg";

const Home = () => {
	const handleSubmit = (e) => {
		e.preventDefault();
		const { email, password } = e.target;

		if (email.value === "" || password.value === "") {
			Modal.warning({
				title: "Warning",
				content: "Please fill all the fields"
			});
			return;
		}

		axios("http://0.0.0.0:5000/api/user_create", {
			method: "POST",
			data: {
				email: email.value,
				password: password.value
			},
			responseType: "json"
		})
			.then((res) => {
				if (res.status == 201) {
					Modal.success({
						title: "Success",
						content: "User created successfully"
					});
				}
			})
			.catch((err) => {
				Modal.error({
					title: "Error",
					content: "Something went wrong"
				});
			});
	};

	return (
		<Layout>
			<main className="w-screen h-screen flex flex-col justify-center items-center bg-slate-100">
				<form
					className="w-[300px] bg-white p-6 flex flex-col gap-4 absolute z-[200] rounded-lg"
					onSubmit={handleSubmit}
				>
					<div className="form_group w-full flex flex-col gap-2">
						<label htmlFor="email">Email</label>
						<input type="email" className="p-2 border-[.5px] border-gray-500" id="email" name="email" />
					</div>

					<div className="form_group w-full flex flex-col gap-2">
						<label htmlFor="email">Email</label>
						<input type="password" className="p-2 border-[.5px] border-gray-500" id="password" name="password" />
					</div>

					<div className="btn_group w-full flex">
						<button className="bg-blue-500 text-white h-10 flex-1" type="submit">
							register
						</button>
						<button className="bg-slate-100 text-gray-500 h-10 flex-1" type="reset">
							reset
						</button>
					</div>
				</form>

				<img src={blob} alt="" className="w-[900px] absolute -top-[50%] -left-40 z-0" />
			</main>
		</Layout>
	);
};

export default Home;
