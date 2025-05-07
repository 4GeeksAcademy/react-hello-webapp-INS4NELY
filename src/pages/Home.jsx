import { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Link } from "react-router-dom";

export const Home = () => {

	const { contact, dispatch } = useGlobalReducer()

	useEffect(() => {
		user()
	}, [])

	const user = async () => {
		try {
			const response = await fetch('https://playground.4geeks.com/contact/agendas/nomastrabajos', {
				method: 'GET',
				headers: {
					"Content-Type": "application/json"
				}
			}
			)

			if (response.status === 404) await createUser();

			const data = await response.json()

			dispatch({ type: 'user', payload: data })

		} catch (error) {
			console.log(error);
		}
	}

	const createUser = async () => {
		try {
			const response = await fetch('https://playground.4geeks.com/contact/agendas/nomastrabajos', {
				method: 'POST',
				headers: {
					"Content-Type": "application/json"
				}
			}
			)

			if (response.status === 201) {
				console.log('Is a new user');
				await user();
				return
			}

		} catch (error) {
			console.log(error);

		}
	}

	const deleteContact = async (id) => {
		try {
			const response = await fetch(`https://playground.4geeks.com/contact/agendas/nomastrabajos/contacts/${id}`, {
				method: 'DELETE',
				headers: {
					"Content-Type": "application/json"
				}
			}
			)

			if (response.status === 204) {
				await user();
				const modal = bootstrap.Modal.getInstance(document.getElementById(`modal-${id}`));
				if (modal) modal.hide();
				return
			}

		} catch (error) {
			console.log(error);

		}
	}

	return (
		<div>
			{typeof contact.todos.contacts === 'object' &&
				<div className="text-end m-3">
					<Link to="/CreateUser">
						<button className="btn btn-success">Add new contact</button>
					</Link>
					<div className="mt-5">
						{contact.todos.contacts.map((item) => {
							return (
								<div className="container-fluid border border-1 d-flex justify-content-between" key={item.id}>
									<div className="d-flex my-3">
										<div className="rounded-circle my-2 me-5">
											<img src="https://i.ytimg.com/vi/mmY-qAmzsI4/hqdefault.jpg" className="imgStyle" alt="" />
										</div>
										<div className="ms-5 text-start">
											<p className="fs-4 fw-semibold">{item.name}</p>
											<p><i className="ri-map-pin-2-line me-2"></i> {item.address}</p>
											<p><i className="ri-phone-fill me-2"></i>{item.phone}</p>
											<p><i className="ri-mail-line me-2"></i>{item.email}</p>
										</div>
									</div>
									<div className="d-flex align-items-start mt-3 gap-4 me-3">
										<button type="button" data-bs-toggle="modal" data-bs-target={`#modal-${item.id}`} className="btn btnStyle "><i className="ri-delete-bin-line fs-5"></i></button>
										<div className="container-fluid px-5 modal fade"id={`modal-${item.id}`} tabIndex="-1" aria-labelledby="modal" aria-hidden="true">
											<div className="modal-dialog modal-lg modal-dialog-scrollable ">
												<div className="modal-content">
													<div className="modal-header">
														<h1 className="modal-title fs-5" id="modal">Are you sure you want to delete this contact?</h1>
														<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
													</div>
													<div className="modal-body">
														<div className="d-flex my-3">
															<div className="rounded-circle my-2 me-5">
																<img src="https://i.ytimg.com/vi/mmY-qAmzsI4/hqdefault.jpg" className="imgStyle" alt="" />
															</div>
															<div className="ms-5 text-start">
																<p className="fs-4 fw-semibold">{item.name}</p>
																<p><i className="ri-map-pin-2-line me-2"></i> {item.address}</p>
																<p><i className="ri-phone-fill me-2"></i>{item.phone}</p>
																<p><i className="ri-mail-line me-2"></i>{item.email}</p>
															</div>
														</div>
													</div>
													<div className="modal-footer">
														<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
														<button type="button" className="btn btn-danger" onClick={() => { deleteContact(item.id) }}>Delete contact</button>
													</div>
												</div>
											</div>
										</div>
										<Link to={`/UpdateUser/${item.id}`} state={{ contact: item }}>
											<button className="btn p-0 mx-3"><i className="ri-pencil-line fs-5"></i></button>
										</Link>
									</div>
								</div>
							)
						})}
					</div>
				</div>}
		</div>
	);
}; 